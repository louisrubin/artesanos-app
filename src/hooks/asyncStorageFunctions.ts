import { doc, getDoc } from "firebase/firestore";
import { database } from "../../credenciales";

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