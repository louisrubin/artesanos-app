import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import Modal from 'react-native-modal';

type PropsParam = {
    title?: string;
    children?: any;
    isModalVisible: boolean;
    isLoading?: boolean;
    iconHeader?: any;
    onBackdropPress?: () => void;
}

export default function ModalX(props: PropsParam) {
    let onBackButtonPress = props.isLoading ? null : props.onBackdropPress;     // si está cargando no puede cerrar el modal

    return(
        <Modal isVisible={props.isModalVisible} onBackdropPress={onBackButtonPress} 
            onBackButtonPress={onBackButtonPress}
            animationIn={"fadeIn"}
            >
            <View style={styles.modalView}>
                {
                    props.isLoading ?
                    <ActivityIndicator size={"large"} />
                    : 
                    <Image source={props.iconHeader} style={{ width:40, resizeMode:"contain"}} />
                    
                }
                <Text style={styles.label}>
                    { props.title }
                </Text>

                { /* botones o lo que se quiera agregar por children */}
                {  !props.isLoading && (
                        props.children
                    ) 
                }

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginVertical: "auto",
        alignItems: "center",
        maxHeight: moderateVerticalScale(250),
        fontSize: 30,
    },
    modalView: {
        alignItems: 'center',
        margin: 20,
        padding: 35,
        backgroundColor: 'white',

        borderRadius: 20,
        shadowColor: '#000',

        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },  
    label: {
        fontSize: moderateScale(25), 
        marginTop: moderateScale(15),
        marginBottom: moderateVerticalScale(10),
        alignSelf: "center",
        // fontWeight: "bold",
    },
})