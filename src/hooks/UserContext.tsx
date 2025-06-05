import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, database } from "../../credenciales"; // Ajustá según tu ruta
import { doc, onSnapshot } from "firebase/firestore";
import { format } from "date-fns";
import { onAuthStateChanged } from "firebase/auth";
import { useNetInfo } from "@react-native-community/netinfo";
import { getStoredLocalData, sincronizarEncuestasLocal } from "./firebaseHooks";

const UserContext = createContext(null);    // Crear el contexto del usuario --> valor default null



// UserProviderContext component para proveer el contexto GLOBAL del usuario
// Este componente envuelve a la aplicación y proporciona el contexto del usuario
export const UserProviderContext = ({ children }) => {
    const [userData, setUserData] = useState(null);     // almacenar los datos del usuario
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [messageStatus, setMessageStatus] = useState(""); // almacenar el mensaje de error
    const { isInternetReachable } = useNetInfo(); // Hook para obtener el estado de Internet
    const [encuestasEnLocal, setEncuestasLocal] = useState([]);
    const [sincronizando, setSincronizando] = useState(false);

    // función para almacenar en local --> se exporta en el useUser
    const saveEncuestaLocal = async (nuevaEncuesta) => {
        try{
            const clave = "encuestas_pendientes";
            // Obtener lista actual (si hay)
            const listaJson = await AsyncStorage.getItem(clave);
            const listaActual = listaJson ? JSON.parse(listaJson) : [];

            // Agregar nueva encuesta
            listaActual.push(nuevaEncuesta);

            // Guardar de nuevo en AsyncStorage
            setEncuestasLocal(listaActual);       // set Context global
            await AsyncStorage.setItem(clave, JSON.stringify(listaActual));

            // console.log('Encuesta guardada offline');
        } catch (error) {
            console.error('Error al guardar encuesta offline:', error);
        }
    }

    useEffect( () => {
        setMessageStatus("Obteniendo datos..."); // mensaje de carga

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            // detecta si ya habia usuario logueado o no
            
            const listaJson = await AsyncStorage.getItem("encuestas_pendientes");
            setEncuestasLocal( listaJson ? JSON.parse(listaJson) : [] );
            
            if(!user) {                
                setMessageStatus("Redirigiendo..."); // mensaje de carga
                setIsLoggedIn(false);
                setUserData(null);
                setLoading(false);
                await AsyncStorage.removeItem("userData"); // Elimina los datos del usuario de AsyncStorage
                return;
            }

            try {
                // sin conexión a Internet 
                if(!isInternetReachable) {
                    const storedUserData = await getStoredLocalData(); // Obtener datos del usuario desde AsyncStorage
                    if (storedUserData) {
                        setUserData(storedUserData); // Si hay datos, los establece en el estado
                        setIsLoggedIn(true); // Usuario está logueado
                        setLoading(false); // Termina la carga
                        return; 
                    } else {
                        console.log("No hay datos locales disponibles.");
                        setLoading(false);
                        return;
                    }
                }
                try {
                    if( encuestasEnLocal.length > 0 ){
                        setSincronizando(true);
                        const ok = await sincronizarEncuestasLocal(encuestasEnLocal);
                        if (ok) setEncuestasLocal([]);
                        setSincronizando(false);
                    }
                } catch { setSincronizando(false); }
                                

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
                        setLoading(false);
                    } else {
                        // algún error al cargar el documento
                        console.log("User Loggeado: No existe el documento del usuario. Cerrando sesión.");
                        setUserData(null);
                        setIsLoggedIn(false);   // return
                        await AsyncStorage.removeItem("userData"); // Elimina los datos del usuario de AsyncStorage
                        auth.signOut(); // Cerrar sesión
                        setLoading(false);
                    };
                });
                return () => unsubscribeSnapshot(); // Limpiar la suscripción al desmontar el componente
            
            } catch (e) {
                console.error("Error cargando usuario", e);
            } finally {
                // setLoading(false);                
            }
        });
        // setIsLoggedIn(true);
        // setUserData({
        //     "nombre": "el pepe", "apellido": "gonzales", 
        //     "email": "elpepe@correo.com", "aprobado": true, 
        //     "isAdmin": true,
        // })
        // setLoading(false);

        return () => unsubscribe(); // limpiador        
    }, [ isInternetReachable, ]); // Dependencia del estado de la conexión a Internet

    return (
        // Proveer el contexto Global del usuario a los componentes hijos
        <UserContext.Provider 
        value={{ 
            userData, setUserData, 
            isLoggedIn, isInternetReachable, 
            loading, messageStatus,
            encuestasEnLocal, saveEncuestaLocal,
            sincronizando,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
