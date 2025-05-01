import { Pressable, StyleSheet, Text, Image } from "react-native";

// https://dev.to/9bytes/crafting-a-custom-button-component-in-react-native-2inj

let fontSizeParam;  // tamaño de la fuente y alinear con el icono del botón

export default function ButtonX(props) {
    fontSizeParam = props.fontSize;
    return (
        <Pressable
            style={({ pressed }) => [
            {
                backgroundColor: props.disabled
                    ? "#ccc"
                    : pressed
                    ? props.bgColorPressed
                    // : "#E0F393"             // Verde  Agricultura
                    : props.color || "#BCB850",
            },
            styles.container,
            props.buttonStyles,
          ]}

            disabled={props.disabled}
            onPress={props.onPress}
            // accessible
            // accessibilityLabel={props.accessibilityLabel || "A Button"}
        >
            <Text style={[styles.text, props.textStyles, { fontSize: fontSizeParam }]}>
                {props.children || "Pulsar"}
            </Text>
            
            {   props.iconParam 
                ? <Image source={props.iconParam} 
                    style={{ height: fontSizeParam, width: fontSizeParam, marginLeft: 5 }} />
                : null
            }
        </Pressable >
    );
};
    
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // padding: 10,
        borderRadius: 8,

        shadowColor: '#000',        // Color de la sombra
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento
        shadowOpacity: 0.4,         // Opacidad de la sombra
        shadowRadius: 4,            // Difuminado
        elevation: 12,               // (solo Android)
    },
    text: { 
        // fontSize: fontSizeParam,
        // fontWeight: 'bold',
    },
});
    