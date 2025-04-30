import { StyleSheet, TextInput, useColorScheme } from "react-native";
import { Colors } from '../constants/colors';
// import { useState } from "react";

type Props = {
    // nombreParam: string;
    tipoTeclado: 'email-address' | 'number-pad' | 'default'  //| 'numeric';
    placeholder: string;
    value: string;
    secureTextEntry?: boolean;
    onChangeText: (text: string) => void;
}


export default function InputX( {tipoTeclado, placeholder, value, onChangeText, secureTextEntry = false} : Props ) {
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