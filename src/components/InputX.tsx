import { Image, Pressable, StyleSheet, TextInput, useColorScheme, View } from "react-native";
import { Colors } from '../constants/colors';
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";

type Props = {
    // nombreParam: string;
    tipoTeclado?: 'email-address' | 'number-pad' | 'default'  //| 'numeric';
    placeholder: string;
    value?: string;
    passwordInput?: boolean;
    onChangeText?: (text: string) => void;  // metodo que queremos que se ejecute al cambiar el texto
    maxLength?: number;
    onBlur?: () => void; // metodo que queremos que se ejecute al perder el foco
    autoCapitalize?: any;
}


export default function InputX( {tipoTeclado, placeholder, value, onChangeText, passwordInput = false, maxLength, onBlur, autoCapitalize} : Props ) {
    const colorScheme = useColorScheme() ?? 'light'; // default 'light'
    const { passwordVisibility, eyeIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

    return(
        <View style={styles.inputContainer}>
            <TextInput
                style={[
                    styles.input, 
                    {
                        borderColor: Colors[colorScheme].text,
                        color: Colors[colorScheme].text,
                        backgroundColor: Colors[colorScheme].background,
                    }
                ]}
                placeholder={placeholder}
                placeholderTextColor={"#A9A9A9"}

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
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d7d7d7'
    },
    input: {
        // borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 20,
        width: "90%",
    },
    eyeImage: {
        resizeMode: "contain",
        width: 24,
        opacity: 0.7,
        marginVertical: -3.3,   // 3.3 tamaño ok
    },
})