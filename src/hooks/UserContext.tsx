import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, database } from "../../credenciales"; // Ajustá según tu ruta
import { doc, onSnapshot } from "firebase/firestore";
import { format } from "date-fns";
import { onAuthStateChanged } from "firebase/auth";
import { useNetInfo } from "@react-native-community/netinfo";

const UserContext = createContext(null);    // Crear el contexto del usuario --> valor default null

// UserProviderContext component para proveer el contexto GLOBAL del usuario
// Este componente envuelve a la aplicación y proporciona el contexto del usuario
export const UserProviderContext = ({ children }) => {
    const [userData, setUserData] = useState(null);     // almacenar los datos del usuario
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [messageStatus, setMessageStatus] = useState(""); // almacenar el mensaje de error
    const { isInternetReachable } = useNetInfo(); // Hook para obtener el estado de Internet

    useEffect( () => {
        setMessageStatus("Obteniendo datos..."); // mensaje de carga
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const docRef = doc(database, "registros", auth.currentUser.uid);

                    // suscripción en tiempo real a los cambios en el documento
                    const unsubscribeSnapshot = onSnapshot(docRef, async (docSnapshot) => {
                        if (docSnapshot.exists()) {
                            const data = docSnapshot.data();

                            // formatear la fecha de registro 'dd-MM-yyyy HH:mm'
                            const fechaFormateada = format(data.fechaRegistro, 'dd-MM-yyyy HH:mm'); // Convierte la fecha a formato dd/MM/yyyy
                            data.fechaRegistro = fechaFormateada; // asigna la fecha a la data 

                            setMessageStatus("Sincronizando datos...");
                            setUserData(data);
                            
                            await AsyncStorage.setItem("userData", JSON.stringify(data));
                        } else {
                            // algún error al cargar el documento
                            console.log("User Loggeado: No existe el documento del usuario. Cerrado sesión.");
                            setUserData(null);
                            setIsLoggedIn(false);   // return
                            await AsyncStorage.removeItem("userData"); // Elimina los datos del usuario de AsyncStorage
                            auth.signOut(); // Cerrar sesión
                        };
                        
                    });
                    setIsLoggedIn(true);
                    return () => unsubscribeSnapshot(); // Limpiar la suscripción al desmontar el componente
                
                } catch (e) {
                    console.error("Error cargando usuario", e);
                } finally {
                    setLoading(false);
                }
            } else {
                // usuario no logueado
                setMessageStatus("Redirigiendo..."); // mensaje de carga
                setIsLoggedIn(false);
                setUserData(null);
                setLoading(false);
                await AsyncStorage.removeItem("userData"); // Elimina los datos del usuario de AsyncStorage
            }

    });

    return () => unsubscribe(); // limpiador
  }, []);

    return (
        // Proveer el contexto Global del usuario a los componentes hijos
        // El valor del contexto incluye los datos del usuario, la función para actualizarlo
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn, isInternetReachable, loading, messageStatus }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
