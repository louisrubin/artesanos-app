import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export const storage = {
    // LEER DATOS STORAGE
    async get(key: string){
        try{
            const item = await AsyncStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }catch(err){
            console.error("Error al LEER datos Storage:", err);
            return null;
        }
    },

    // GUARDAR DATOS STORAGE
    async set(key: string, value: any, formatDate?: boolean){
        try{
            if(formatDate){                
                // formatear fecha de registro en local
                value.fechaRegistro = format(value.fechaRegistro, 'dd-MM-yyyy HH:mm'); // fecha a formato dd/MM/yyyy
            }
            const stringifiedValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, stringifiedValue);
            return true;
        }catch(err){
            console.error("Error al GUARDAR Storage:", err);
            return null;
        }
    },

    // ELIMINAR DATOS STORAGE
    async remove(key: string){
        try{
            await AsyncStorage.removeItem(key);
        }catch(err){
            console.error("Error al BORRAR Storage:", err);
            return null;
        }
    },
}

