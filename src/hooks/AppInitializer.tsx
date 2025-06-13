import { useEffect } from "react";
import { auth, database } from "../../credenciales"; // Ajustá según tu ruta
import { doc, onSnapshot } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
// import { getStoredLocalData, sincronizarEncuestasLocal } from "./asyncStorageFunctions";
import { useAuthActions } from "./authActions";
import { useAuthVariables } from "./authActions";
import { storage } from "../storages/storage";
import { onAuthStateChanged } from "firebase/auth";
import { format } from "date-fns";

interface PropsT {
  children: React.ReactNode;
}

// Este componente envuelve a la aplicación y proporciona el contexto del usuario
export const AppInitializer = ({ children }: PropsT) => {
   const { setUserData, setLoading, setIsLoggedIn, setMessageStatus, logOut } = useAuthActions();
   const { userData, isLoggedIn } = useAuthVariables();

   const { isInternetReachable } = useNetInfo(); // Hook para obtener el estado de Internet
   // const [encuestasEnLocal, setEncuestasLocal] = useState([]);
   // const [sincronizando, setSincronizando] = useState(false);

   // función para almacenar en local --> se exporta en el useUser
   // const saveEncuestaLocal = async (nuevaEncuesta) => {
   //    try{
   //       const clave = "encuestas_pendientes";
   //       // Obtener lista actual (si hay)
   //       const listaJson = await AsyncStorage.getItem(clave);
   //       const listaActual = listaJson ? JSON.parse(listaJson) : [];

   //       // Agregar nueva encuesta
   //       listaActual.push(nuevaEncuesta);

   //       // Guardar de nuevo en AsyncStorage
   //       setEncuestasLocal(listaActual);       // set Context global
   //       await AsyncStorage.setItem(clave, JSON.stringify(listaActual));

   //       // console.log('Encuesta guardada offline');
   //    } catch (error) {
   //       console.error('Error al guardar encuesta offline:', error);
   //    }
   // }

   useEffect(() => {
      setMessageStatus("Obteniendo datos..."); // mensaje de carga

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         if(!user) {                
            setMessageStatus("Redirigiendo..."); // mensaje de carga
            setIsLoggedIn(false);
            setUserData(null);
            setLoading(false);
            await storage.remove("userData"); // Elimina los datos del AsyncStorage
            return;
         }

         try{
            // sin conexión a Internet 
            if(!isInternetReachable) {
               const storedUserData = await storage.get("userData"); // Obtener datos del usuario desde AsyncStorage
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

//             try {
//                 if( encuestasEnLocal.length > 0 ){
//                     setSincronizando(true);
//                     const ok = await sincronizarEncuestasLocal(encuestasEnLocal);
//                     if (ok) setEncuestasLocal([]);
//                     setSincronizando(false);
//                 }
//             } catch { setSincronizando(false); }

            const docRef = doc(database, "registros", auth.currentUser.uid); // Referencia al documento del usuario en Firestore

            // suscripción en tiempo real a los cambios en el documento
            const unsubscribeSnapshot = onSnapshot(docRef, async (docSnapshot) => {
               if (docSnapshot.exists()) {
                  const data = docSnapshot.data();

                  // formatear la fecha de registro 'dd-MM-yyyy HH:mm'
                  data.fechaRegistro = format(data.fechaRegistro, 'dd-MM-yyyy HH:mm'); // asigna la fecha a la data

                  setUserData(data); 
                  await storage.set("userData", data, true);
                  setIsLoggedIn(true);
                  setLoading(false);
               }else{
                  // algún error al cargar el documento
                  console.log("User Loggeado: No existe el documento del usuario. Cerrando sesión.");
                  logOut();   // cierra y limpia todo los estados
                  setLoading(false);
               }
            });
            return () => unsubscribeSnapshot(); // Limpiar la suscripción al desmontar el componente

         } catch (e) {
            console.error("Error cargando usuario", e);
         }
      });
      return () => unsubscribe(); // limpiador
   }, [isInternetReachable]);

    return children;
};
