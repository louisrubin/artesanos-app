// hooks de firebase

import { doc, getDoc } from "firebase/firestore";
import { database } from "../../credenciales";
import AsyncStorage from "@react-native-async-storage/async-storage";

// OBTENER DATOS DESDE FIREBASE
export const getUserInfo = async (userId) => {
    // Verifica si el userId es válido y retorna
    const docRef = doc(database, 'registros', userId);    
    const document = await getDoc(docRef);

    if (document.exists()) {
        return document.data();
    } else {
        console.log('getUserInfo: No such document!');
        return null;
    }
}

// OBTENER DATOS DESDE ASYNCSTORAGE
export const getStoredUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');    // obtiene los datos del usuario
    return userData ? JSON.parse(userData) : null; // si no hay datos retorna null
}

// GUARDAR DATOS EN ASYNCSTORAGE
export const saveUserData = async (userData) => {
    const data = JSON.stringify(userData); // Convierte los datos del usuario a JSON    
    try {
        await AsyncStorage.setItem('userData', data); // Guardar datos del usuario en AsyncStorage
        console.log('saveUserData: OK');
    } catch (error) {
        console.error('Error al guardar los datos del usuario:', error);
    }
}
