import { StyleSheet, TextInput, useColorScheme } from "react-native";
import { Colors } from '../constants/colors';
// import { useState } from "react";

type Props = {
    // nombreParam: string;
    tipoTeclado?: 'email-address' | 'number-pad' | 'default'  //| 'numeric';
    placeholder: string;
    value?: string;
    secureTextEntry?: boolean;
    onChangeText?: (text: string) => void;  // metodo que queremos que se ejecute al cambiar el texto
    maxLength?: number;
    onBlur?: () => void; // metodo que queremos que se ejecute al perder el foco
}


export default function InputX( {tipoTeclado, placeholder, value, onChangeText, secureTextEntry = false, maxLength, onBlur} : Props ) {
  const colorScheme = useColorScheme() ?? 'light'; // default 'light'
    
  return(
    <TextInput
        style={[
            styles.input, 
            {
                borderColor: Colors[colorScheme].text,
                color: Colors[colorScheme].text,
                backgroundColor: Colors[colorScheme].background,
            }
        ]}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={ "#A9A9A9" }

        value={value}
        onChangeText={onChangeText}
        keyboardType={ tipoTeclado }
        maxLength={maxLength}
        onBlur={onBlur}
    />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 20,
        width: "100%",

        // maxWidth: ,
        maxHeight: 45,

        marginBottom: 12,
      },
})