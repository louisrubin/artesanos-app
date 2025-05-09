import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ButtonX from '../../components/ButtonX'
import { useRouter } from 'expo-router';
import imagePath from '../../constants/imagePath';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import InputAndLabelX from '../../components/InputAndLabel';

export default function UserSettings() {
    const router = useRouter();

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.header}>
                <Image source={imagePath.userLogo} style={styles.userHeaderIcon} />
                <Text style={{fontSize: 28}}>
                    Detalles de la cuenta
                </Text>
            </View>

            <View style={styles.body}>
                <InputAndLabelX titleLabel='Nombre' editable={false}
                styleLabel={{opacity: 0.4}} value='Luisssss'
                bgColorInput={"#D9D9D9"}
                colorTexto='#757575'
                />

                <InputAndLabelX titleLabel='Apellido' editable={false}
                styleLabel={{opacity: 0.4}} value='Rubinstein'
                bgColorInput={"#D9D9D9"}
                colorTexto='#757575'
                />
                
                <InputAndLabelX titleLabel='DNI' editable={false}
                styleLabel={{opacity: 0.4}} value='79461316'
                bgColorInput={"#D9D9D9"}
                colorTexto='#757575'
                />
                
                <InputAndLabelX titleLabel='Correo Electrónico' editable={false}
                styleLabel={{opacity: 0.4}} value='correo@inexistente.com'
                bgColorInput={"#D9D9D9"}
                colorTexto='#757575'
                />
                
                <InputAndLabelX titleLabel='Fax' editable={false}
                styleLabel={{opacity: 0.4}} value='080025582841082'
                bgColorInput={"#D9D9D9"}
                colorTexto='#757575'
                />
                
                <InputAndLabelX titleLabel='IP' editable={false}
                styleLabel={{opacity: 0.4}} value='192.239.256.256'
                bgColorInput={"#D9D9D9"}
                colorTexto='#757575'
                />


                <ButtonX iconParam={imagePath.arrowLeftLogo} iconPosition="left" 
                onPress={() => router.back()}
                fontSize={moderateScale(20)}
                buttonStyles={styles.button}
                bgColor='#ee8'
                bgColorPressed='#C8D29C'
                >
                    Volver
                </ButtonX>

                <ButtonX iconParam={imagePath.iconLogout} iconPosition="left" 
                fontSize={moderateScale(20)}
                buttonStyles={[styles.button, {backgroundColor: "#FEE9E7",}]}
                >
                    Cerrar Sesión
                </ButtonX>

            </View>

        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#feb",
        paddingVertical: moderateVerticalScale(30),
    },
    header:{
        alignItems: "center",
        marginTop: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(15)
    },
    body: {
        flexGrow: 1,
        marginHorizontal: moderateScale(25),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(5),
        backgroundColor: "#fed",
        borderWidth: 1,
        borderRadius: 16,
        width: "85%",
        
        borderColor: '#d7d7d7',
    },
    userHeaderIcon:{
        resizeMode: "contain",
        width: moderateScale(25),
        height: moderateScale(25),
    },
    button: {
        padding: 10,
        marginTop: moderateVerticalScale(25),
        // width: "80%",
    }
})