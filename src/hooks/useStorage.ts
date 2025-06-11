import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

// hook para el storage ----

export function useStorage(key:string, defaultValue: string=""){
    const [value, setValue] = useState<string>(defaultValue);

    useEffect( () => {
        AsyncStorage.getItem(key)
        .then((stored)=> {
            if(stored !== null ) setValue(stored);  // guarda la info del local en el State
        });
    },[] );

    // actualizar datos
    const save = async (newValue: string) => {
        setValue(newValue);
        await AsyncStorage.setItem(key, newValue);
    };

    return [value, save] as const;  // retorna como tupla y no como lista
}