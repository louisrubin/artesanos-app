import { Pressable, StyleSheet, Text, Image } from "react-native";

// https://dev.to/9bytes/crafting-a-custom-button-component-in-react-native-2inj

export default function ButtonX(props) {
    return (
        <Pressable
            style={({ pressed }) => [
            {
                backgroundColor: props.disabled
                    ? "#ccc"
                    : pressed
                    ? props.bgColorPressed
                    : "#E0F393"             // Verde  Agricultura
                    // : props.color || "#8A9A46",
            },
            styles.container,
            props.buttonStyles,
          ]}

            disabled={props.disabled}
            onPress={props.onPress}
            // accessible
            // accessibilityLabel={props.accessibilityLabel || "A Button"}
        >
            <Text style={[styles.text, props.textStyles]}>
                {props.children || "Pulsar"}
            </Text>
            
            {   props.iconParam 
                ? <Image source={props.iconParam} 
                    style={{ height: 22, width: 22, marginLeft: 5 }} />
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
        padding: 15,
        borderRadius: 8,

        shadowColor: '#000',        // Color de la sombra
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento
        shadowOpacity: 0.4,         // Opacidad de la sombra
        shadowRadius: 4,            // Difuminado
        elevation: 6,               // (solo Android)
    },
    text: { 
        color: "black",
        fontSize: 16,
        fontWeight: 'bold',
    },
});
    