import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { database } from "../../credenciales";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

// // OBTENER DATOS DESDE FIREBASE
export const getUserInfoFirebase = async (userId, path = 'registros') => {
    // Verifica si el userId es válido y retorna
    const docRef = doc(database, path, userId);
    const document = await getDoc(docRef);

    if (document.exists()) {
        return document.data();
    } else {
        console.log('getUserInfo: No such document!');
        return null;
    }
}


// OBTENER DATOS DESDE ASYNCSTORAGE
export const getStoredLocalData = async (pathStorage = 'userData') => {
    const userData = await AsyncStorage.getItem(pathStorage);    // obtiene los datos del usuario
    return userData ? JSON.parse(userData) : null; // si no hay datos retorna null
}


// GUARDAR DATOS EN ASYNCSTORAGE
export const saveLocalData = async (dataParam, pathStorage = "userData") => {
    if(pathStorage === "userData"){
        // formatear fecha de registro en local
        const fechaFormateada = format(dataParam.fechaRegistro, 'dd-MM-yyyy HH:mm'); // Convierte la fecha a formato dd/MM/yyyy
        dataParam.fechaRegistro = fechaFormateada; // asigna la fecha a la data
    }
    // const dataFinal = JSON.stringify(dataParam); // Convierte los datos del usuario a JSON    

    try {
        await AsyncStorage.setItem(pathStorage, JSON.stringify(dataParam)); // Guardar datos del usuario en AsyncStorage
    } catch (error) {
        console.error('Error al guardar los datos del usuario:', error);
    }
}

// export const saveEncuestaLocal = async (nuevaEncuesta) => {
//     const { setEncuestasLocal } = useUser();
//     try{
//         // Obtener lista actual (si hay)
//         const listaJson = await AsyncStorage.getItem(claveEncuestasLocal);
//         const listaActual = listaJson ? JSON.parse(listaJson) : [];

//         // Agregar nueva encuesta
//         listaActual.push(nuevaEncuesta);

//         // Guardar de nuevo en AsyncStorage
//         setEncuestasLocal(listaActual);       // set Context global
//         await AsyncStorage.setItem(claveEncuestasLocal, JSON.stringify(listaActual));

//         // console.log('Encuesta guardada offline');
//     } catch (error) {
//         console.error('Error al guardar encuesta offline:', error);
//     }
// }

export const sincronizarEncuestasLocal  = async (listaParam) => {
    try {
        // const listaJson = await AsyncStorage.getItem("encuestas_pendientes");
        // const encuestasPendientes = listaJson ? JSON.parse(listaJson) : [];

        for (const encuesta of listaParam) {
            await addDoc(collection(database, "encuestas"), encuesta);
        }

        // Limpiar la lista
        await AsyncStorage.removeItem("encuestas_pendientes");        
        return true;

    } catch (error) {
        console.error('Error al sincronizar encuestas:', error);
        return false;
    }
};
