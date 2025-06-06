import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";

export type PropsInputX = {
    tipoTeclado?: "email-address" | "ascii-capable" | "number-pad" | "default"  //| 'numeric';
    placeholder?: string;
    value?: string;
    passInp?: boolean;
    onChangeText?: (text: string) => void;  // metodo que queremos que se ejecute al cambiar el texto
    maxLength?: number;
    onBlur?: () => void; // metodo que queremos que se ejecute al perder el foco
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    bgColorInput?: string;
    colorTexto?: string;
    editable?: boolean;

}


export default function InputX( { tipoTeclado, placeholder, value, onChangeText, passInp = false, maxLength, onBlur, autoCapitalize, bgColorInput, editable = true, colorTexto } : PropsInputX ) {
    const { passwordVisibility, eyeIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

    return(
        <View style={[styles.inputContainer, { backgroundColor: bgColorInput ?? "white", }]}>
            <TextInput
                style={[
                    styles.input, 
                    {
                        color: colorTexto ?? "black",
                    }
                ]}
                placeholder={placeholder}
                placeholderTextColor={"#A9A9A9"}

                editable={editable}
                secureTextEntry={ passInp ? passwordVisibility : false}
                value={value}
                
                maxLength={maxLength}
                onBlur={onBlur}
                autoCapitalize={autoCapitalize}
                keyboardType={tipoTeclado}
                onChangeText={onChangeText}
            />
            {
                passInp && (
                    <Pressable onPress={handlePasswordVisibility} style={styles.pressable}>
                        <Image source={eyeIcon} style={styles.eyeImage} />
                    </Pressable>
                )
            }
            {
                // !passInp && (
                //     // si no es editable overlay tapa todo el input para no seleccionar
                //   <View style={[styles.overlay, 
                //      !editable ? {width: "100%"}
                //        : {width: 50 }
                //   ]} 
                //      pointerEvents="box-only" 
                //   />
                // )
            }
            
            
        </View>
    );
}

const styles = StyleSheet.create({    
    inputContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 45,

        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d7d7d7',
    },
    input: {
        borderRadius: 8,
        fontSize: 20,
        paddingLeft: 10,
        width: "100%"
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        borderRadius: 8,

        backgroundColor: 'transparent',
        opacity: 0.3,
        borderWidth: 0.1,
        borderColor: 'transparent',
    },
    pressable: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 50,  // Tamaño de la zona no clickeable
        height: '100%',
        paddingRight: 10,
    },
    eyeImage: {
        alignSelf: "flex-end",
        resizeMode: "contain",
        width: 24,
        opacity: 0.7,
        marginVertical: -3.3,   // 3.3 tamaño ok

    },
})