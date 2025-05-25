import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, database } from "../../credenciales"; // Ajustá según tu ruta
import { doc, onSnapshot } from "firebase/firestore";
import { format } from "date-fns";
import { onAuthStateChanged } from "firebase/auth";
import { useNetInfo } from "@react-native-community/netinfo";
import { getStoredUserData } from "./firebaseHooks";

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
            // detecta si ya habia usuario logueado o no
            if(!user) {
                setMessageStatus("Redirigiendo..."); // mensaje de carga
                setIsLoggedIn(false);
                setUserData(null);
                setLoading(false);
                await AsyncStorage.removeItem("userData"); // Elimina los datos del usuario de AsyncStorage
                return;
            }

            // hay usuario logueado pero no hay conexión a Internet
            if (!isInternetReachable) {
                setMessageStatus("Redirigiendo..."); // mensaje de carga
                const storedUserData = await getStoredUserData(); // Obtener datos del usuario desde AsyncStorage
                if (storedUserData) {
                    setUserData(storedUserData); // Si hay datos, los establece en el estado
                    setIsLoggedIn(true); // Usuario está logueado
                }
                setLoading(false); // Termina la carga
                return; // Si no hay conexión, no se procede a verificar el usuario en Firebase
            }

            try {
                const docRef = doc(database, "registros", auth.currentUser.uid); // Referencia al documento del usuario en Firestore
                // suscripción en tiempo real a los cambios en el documento
                const unsubscribeSnapshot = onSnapshot(docRef, async (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const data = docSnapshot.data();

                        // formatear la fecha de registro 'dd-MM-yyyy HH:mm'
                        data.fechaRegistro = format(data.fechaRegistro, 'dd-MM-yyyy HH:mm');; // asigna la fecha a la data 

                        setMessageStatus("Sincronizando datos...");
                        setUserData(data);
                        await AsyncStorage.setItem("userData", JSON.stringify(data));
                        setIsLoggedIn(true); // Usuario está logueado
                    } else {
                        // algún error al cargar el documento
                        console.log("User Loggeado: No existe el documento del usuario. Cerrando sesión.");
                        setUserData(null);
                        setIsLoggedIn(false);   // return
                        await AsyncStorage.removeItem("userData"); // Elimina los datos del usuario de AsyncStorage
                        auth.signOut(); // Cerrar sesión
                    };
                });
                return () => unsubscribeSnapshot(); // Limpiar la suscripción al desmontar el componente
            
            } catch (e) {
                console.error("Error cargando usuario", e);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe(); // limpiador        
    }, [isInternetReachable]); // Dependencia del estado de la conexión a Internet

    return (
        // Proveer el contexto Global del usuario a los componentes hijos
        <UserContext.Provider 
        value={{ 
            userData, setUserData, 
            isLoggedIn, isInternetReachable, 
            loading, messageStatus 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
