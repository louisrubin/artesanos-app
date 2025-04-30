import { Pressable, StyleSheet, Text } from "react-native";

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
        </Pressable >
    );
};
    
const styles = StyleSheet.create({
    container: {
        padding: 15,
        alignItems: "center",
        borderRadius: 8,
        // width: "100%",
    },
    text: { 
        color: "black",
        fontSize: 16,
    },
});
    