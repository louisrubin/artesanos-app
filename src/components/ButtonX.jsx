import { Pressable, StyleSheet, Text, Image } from "react-native";

// https://dev.to/9bytes/crafting-a-custom-button-component-in-react-native-2inj

export default function ButtonX(props) {
    const fontSizeParam = props.fontSize;

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: props.disabled
                        ? "#ccc"
                        : pressed
                        ? props.bgColorPressed
                        : props.color || "#BCB850",
                },
                styles.container,
                props.buttonStyles,
            ]}
            disabled={props.disabled}
            onPress={props.onPress}
        >
            {/* Renderizar ícono antes o después del texto según iconPosition */}
            {props.iconParam && props.iconPosition === "left" ? (
                <Image
                    source={props.iconParam}
                    style={{
                        height: fontSizeParam,
                        width: fontSizeParam,
                        marginRight: 5, // Espacio entre ícono y texto
                    }}
                />
            ) : null}

            <Text style={[styles.text, props.textStyles, { fontSize: fontSizeParam }]}>
                {props.children || "Pulsar"}
            </Text>

            {props.iconParam && props.iconPosition === "right" ? (
                <Image
                    source={props.iconParam}
                    style={{
                        height: fontSizeParam,
                        width: fontSizeParam,
                        marginLeft: 5, // Espacio entre texto e ícono
                    }}
                />
            ) : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", // Asegura que el contenido esté en fila
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 12,
    },
    text: {
        color: "#000",
        fontWeight: "bold",
    },
});
