import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export const storage = {
    // LEER DATOS STORAGE
    async get(key: string){
        try{
            return await AsyncStorage.getItem(key);
        }catch(err){
            console.error("Error al LEER datos Storage:", err);
            return null;
        }
    },

    // GUARDAR DATOS STORAGE
    async set(key: string, value: any){
        try{
            if(key === "userData"){
                // formatear fecha de registro en local
                const fechaFormateada = format(value.fechaRegistro, 'dd-MM-yyyy HH:mm'); // Convierte la fecha a formato dd/MM/yyyy
                value.fechaRegistro = fechaFormateada; // asigna la fecha a la data
            }
            console.log("set: datos guardados");
            
            return await AsyncStorage.setItem(key, value);
        }catch(err){
            console.error("Error al GUARDAR datos Storage:", err);
            return null;
        }
    },

    // ELIMINAR DATOS STORAGE
    async remove(key: string){
        try{
            return await AsyncStorage.removeItem(key);
        }catch(err){
            console.error("Error al BORRAR datos Storage:", err);
            return null;
        }
    },
}

