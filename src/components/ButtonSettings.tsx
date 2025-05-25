
import { Pressable, Image, StyleSheet } from 'react-native'
import React from 'react';
import { VerdeAgricultura } from '../constants/colors';

type PropsType = {
    imgPath: any;
    onPress?: () => void;
    bgColor?: string;
    bgPressed?: string;
    styleContainer?: any;
    styleImage?: any;
    addStyle?: any;
    pressable?: boolean; // Si se quiere que sea presionable
}

export default function ButtonSettings(props : PropsType) {
    const { bgColor = "#ffb", bgPressed = VerdeAgricultura, pressable = false } = props;    // default values

    return (
        <Pressable style={ ({pressed}) => [
            props.styleContainer ?? styles.container,
            props.addStyle,

            pressable 
            ? {
                backgroundColor: pressed ? bgPressed : bgColor
            } 
            : { backgroundColor: bgColor }
        ]} 
            onPress={ props.onPress}
            disabled={!props.pressable} // Deshabilitar si no es presionable
            >
            <Image source={ props.imgPath } style={ props.styleImage ?? styles.image } />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderWidth: 1,
        borderRadius: 60,
    },
    image: {
        resizeMode: "contain",
        width: 24,
        height: 24,
    },
})