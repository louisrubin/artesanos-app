import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, database } from "../../credenciales"; // Ajustá según tu ruta
import { doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext(null);    // Crear el contexto del usuario --> valor default null

// UserProviderContext component para proveer el contexto GLOBAL del usuario
// Este componente envuelve a la aplicación y proporciona el contexto del usuario
export const UserProviderContext = ({ children }) => {
    const [userData, setUserData] = useState(null);     // almacenar los datos del usuario
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLoggedIn(true);
                try {
                    const stored = await AsyncStorage.getItem("userData");  // si hay datos del usuario
                    if (stored) {
                        setUserData(JSON.parse(stored));
                    } else {
                        const docRef = doc(database, "registros", auth.currentUser.uid);
                        const snapshot = await getDoc(docRef);

                        if (snapshot.exists()) {
                            const data = snapshot.data();

                            // format a la fecha de registro 'dd-MM-yyyy HH:mm'
                            const fechaFormateada = format(data.fechaRegistro, 'dd-MM-yyyy HH:mm'); // Convierte la fecha a formato dd/MM/yyyy
                            data.fechaRegistro = fechaFormateada; // asigna la fecha a la data 

                            setUserData(data);
                            await AsyncStorage.setItem("userData", JSON.stringify(data));
                        }
                    }
                } catch (e) {
                    console.error("Error cargando usuario", e);
                } finally {
                    setLoading(false);
                }
            } else {
                // usuario no logueado
                setUserData(null);
                setLoading(false);
                await AsyncStorage.removeItem("userData"); // Elimina los datos del usuario de AsyncStorage
                setIsLoggedIn(false);
            }

    });

    return () => unsubscribe(); // limpiador
  }, []);

    return (
        // Proveer el contexto Global del usuario a los componentes hijos
        // El valor del contexto incluye los datos del usuario, la función para actualizarlo
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
