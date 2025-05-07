import React from "react";
import { Pressable, StyleSheet, Text, Image } from "react-native";
import { VerdeNaturaleza } from "../constants/colors";

// https://dev.to/9bytes/crafting-a-custom-button-component-in-react-native-2inj

type PropsType = {
    // definicion de los tipos para cada Param y si es opcional '?'
    iconParam?: any;
    iconPosition?: 'right' | 'left'
    fontSize?: number;
    disabled?: boolean;
    bgColorPressed?: string;
    color?: string;
    buttonStyles?: any;
    onPress?: () => void;
    textStyles?: any;
    children?: React.ReactNode;
}

export default function ButtonX(props: PropsType) {
    const {bgColorPressed = VerdeNaturaleza} = props;   // por defecto o sino agarra de props

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: props.disabled
                        ? "#ccc"
                        : pressed
                        ? bgColorPressed
                        : props.color || "#BCB850",
                },
                styles.container,
                props.buttonStyles,
            ]}
            disabled={props.disabled}
            onPress={props.onPress}
        >
            {/* Renderizar ícono antes o después del texto según iconPosition */}
            { props.iconParam && props.iconPosition === 'left' ? (
                <Image
                    source={props.iconParam}
                    style={{
                        height: props.fontSize,
                        width: props.fontSize,
                        marginRight: 5, // Espacio entre ícono y texto
                    }}
                />
            ) : null}

            <Text style={[styles.text, props.textStyles, { fontSize: props.fontSize }]}>
                {props.children || "Pulsar"}
            </Text>

            { props.iconParam && props.iconPosition === 'right' ? (
                <Image
                    source={props.iconParam}
                    style={{
                        height: props.fontSize,
                        width: props.fontSize,
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
        borderRadius: 16,
        
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
