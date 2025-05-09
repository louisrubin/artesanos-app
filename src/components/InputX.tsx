import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";

export type PropsInputX = {
    // nombreParam: string;
    tipoTeclado?: 'email-address' | 'number-pad' | 'default'  //| 'numeric';
    placeholder?: string;
    value?: string;
    passwordInput?: boolean;
    onChangeText?: (text: string) => void;  // metodo que queremos que se ejecute al cambiar el texto
    maxLength?: number;
    onBlur?: () => void; // metodo que queremos que se ejecute al perder el foco
    autoCapitalize?: any;
    bgColorInput?: string;
    colorTexto?: string;
    editable?: boolean;

}


export default function InputX( { tipoTeclado, placeholder, value, onChangeText, passwordInput = false, maxLength, onBlur, autoCapitalize, bgColorInput, editable, colorTexto } : PropsInputX ) {
    const { passwordVisibility, eyeIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

    return(
        <View style={[styles.inputContainer, { backgroundColor: bgColorInput ?? "white", }]}>
            <TextInput
                style={[
                    styles.input, 
                    {
                        width: passwordInput ? "90%" : "100%",
                        color: colorTexto ?? "black",
                    }
                ]}
                placeholder={placeholder}
                placeholderTextColor={"#A9A9A9"}

                editable={editable}
                secureTextEntry={passwordInput ? passwordVisibility : false}
                value={value}
                
                maxLength={maxLength}
                onBlur={onBlur}
                autoCapitalize={autoCapitalize}
                keyboardType={tipoTeclado}
                onChangeText={onChangeText}
            />
            {
                passwordInput && (
                    <Pressable onPress={handlePasswordVisibility}>
                        <Image source={eyeIcon} style={styles.eyeImage} />
                    </Pressable>
                )
            }
            
        </View>
    );
}

const styles = StyleSheet.create({    
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d7d7d7'
    },
    input: {
        borderRadius: 8,
        padding: 10,
        fontSize: 20,
    },
    eyeImage: {
        resizeMode: "contain",
        width: 24,
        opacity: 0.7,
        marginVertical: -3.3,   // 3.3 tamaño ok
    },
})