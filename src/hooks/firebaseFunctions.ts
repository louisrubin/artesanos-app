import { getStorage, ref, uploadBytes, getDownloadURL, uploadString, uploadBytesResumable } from "firebase/storage";
import * as FileSystem from 'expo-file-system';
import { app } from "../../credenciales";

// LISTA DE URL DE FOTOS
export async function getArrayUrlFotosSubidas(arrayFotosState: any[]): Promise<string[]> {
    // RETORNA LISTA CON URL DE TODAS LAS FOTOS
    
    const fotosSubidas: string[] = [];

    for (let x = 0; x < arrayFotosState.length; x++) {
        const uri = arrayFotosState[x];
        if (uri) {
            const ruta = `encuestas/foto_${Date.now()}_${x}.jpg`;
            // const ruta = `encuestas`;
            const url = await subirFotoAsync(uri, ruta);
            fotosSubidas.push(url);
        } else {
            fotosSubidas.push("");
        }
    }
    console.log(fotosSubidas);
    return fotosSubidas;
}

// URL DE UNA FOTO
export async function subirFotoAsync(uri, pathUpload): Promise<string> {
    // RETORNA EL URL DE UNA SOLA FOTO
    // console.log(uri);
    
    // const fetchRespuesta = await fetch(uri);
    // const theBlob = await fetchRespuesta.blob();

    // const imageRef = ref(getStorage(), pathUpload);

    // const subirFirebase = uploadBytesResumable(imageRef, theBlob);


    // return new Promise((resolve, reject) => {
    //     subirFirebase.on(
    //         "state_changed",
    //         // (snapshot) => {
    //         //     const progress =
    //         //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         //     onProgress && onProgress(progress);
    //         // },
    //         (error) => {
    //             // Handle unsuccessful uploads
    //             console.log(error);
    //             reject(error);
    //         },
    //         async () => {
    //             const downloadUrl = await getDownloadURL(subirFirebase.snapshot.ref);
    //             resolve({
    //                 downloadUrl,
    //                 metadata: subirFirebase.snapshot.metadata,
    //             });
    //         }
    //     );
    // });



    console.log(uri);
    console.log(pathUpload);
    


    try{
        const storage = getStorage();   // obtiene la instanacia Storage de la app actual
        // Convertir la imagen a blob
        const uriBase64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        // const respuesta = await fetch(uri);
        // const data = Uint8Array.from(atob(respuesta), c => c.charCodeAt(0));
        // const blob = await respuesta.blob();

        // Subir a Firebase Storage
        const storageRef = ref(storage, pathUpload);  // Returns a StorageReference for the given url.
        await uploadString(storageRef, uriBase64, "base64");    // Uploads data to this object's location.
        
        // Obtener URL de descarga
        const downloadURL = await getDownloadURL(storageRef);   // Returns the download URL for the given StorageReference.
        return downloadURL; // url de la foto (string)
    } catch(error){
        console.log(error);
        // return error;
    }
    
}

// TRADUCIR MENSAJE ERROR DE FIREBASE
export const getFirebaseErrorMessage = (errorCode: string): string => {   
    // console.log("getFirebaseError:",errorCode);
     
    return firebaseErrorMessages[errorCode] || "Ocurrió un error inesperado. Intenta nuevamente.";
}

// OBTENER MENSAJE SEGUN ERROR DE FIREBASE
const firebaseErrorMessages: Record<string, string> = {
    "permission-denied": "Permisos insuficientes.",
    "auth/invalid-credential": "Credenciales inválidas.",
    "auth/invalid-email": "El correo electrónico no es válido.",
    "auth/network-request-failed": "Error de red. Verifica tu conexión.",
    "auth/email-already-in-use": "Este correo ya está en uso.",
    "auth/user-not-found": "Usuario no encontrado.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/weak-password": "La contraseña es demasiado débil (mínimo 6 caracteres).",
    "auth/too-many-requests": "Demasiados intentos. Intenta más tarde.",
    "auth/internal-error": "Ocurrió un error interno. Intenta nuevamente.",
    "auth/operation-not-allowed": "La operación no está permitida.",
    "auth/credential-already-in-use": "La credencial ya está en uso.",
}