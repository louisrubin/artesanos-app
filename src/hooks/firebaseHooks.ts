// // hooks de firebase

import { doc, getDoc } from "firebase/firestore";
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


// // OBTENER DATOS DESDE ASYNCSTORAGE
// export const getStoredUserData = async (pathStorage = 'userData') => {
//     const userData = await AsyncStorage.getItem(pathStorage);    // obtiene los datos del usuario
//     return userData ? JSON.parse(userData) : null; // si no hay datos retorna null
// }


// GUARDAR DATOS EN ASYNCSTORAGE
export const saveLocalUserData = async (userData) => {
    const fechaFormateada = format(userData.fechaRegistro, 'dd-MM-yyyy HH:mm'); // Convierte la fecha a formato dd/MM/yyyy
    userData.fechaRegistro = fechaFormateada; // asigna la fecha a la data    
    const data = JSON.stringify(userData); // Convierte los datos del usuario a JSON    

    try {
        await AsyncStorage.setItem('userData', data); // Guardar datos del usuario en AsyncStorage
    } catch (error) {
        console.error('Error al guardar los datos del usuario:', error);
    }
}
