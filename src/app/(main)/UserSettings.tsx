import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ButtonX from '../../components/ButtonX'
import { useRouter } from 'expo-router';
import imagePath from '../../constants/imagePath';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import InputAndLabelX from '../../components/InputAndLabel';
import { auth } from '../../../credenciales';
import { getStoredUserData } from '../../hooks/firebaseHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserSettings() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if(auth.currentUser){
                const storedData = await getStoredUserData();   // obtiene los datos del usuario
                setUserData(storedData);
            }
        }
        fetchUserData();
    }, []);

    const handleLogOut = () => {
        // lógica para cerrar sesión
        AsyncStorage.removeItem('userData'); // Elimina los datos del usuario de AsyncStorage
        auth.signOut();
        router.replace('/(auth)/Login');
    }
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
                styleLabel={{opacity: 0.4}} value={userData?.nombre}
                bgColorInput={"#D9D9D9"}
                colorTexto='#757575'
                />

                <InputAndLabelX titleLabel='Apellido' editable={false}
                styleLabel={{opacity: 0.4}} value={userData?.apellido}
                bgColorInput={"#D9D9D9"}
                colorTexto='#757575'
                />
                
                <InputAndLabelX titleLabel='DNI' editable={false}
                styleLabel={{opacity: 0.4}} value={userData?.dni}
                bgColorInput={"#D9D9D9"}
                colorTexto='#757575'
                />
                
                <InputAndLabelX titleLabel='Correo Electrónico' editable={false}
                styleLabel={{opacity: 0.4}} value={userData?.email}
                bgColorInput={"#D9D9D9"}
                colorTexto='#757575'
                />
                
                <InputAndLabelX titleLabel='Fecha de Registro' editable={false}
                styleLabel={{opacity: 0.4}} value={userData?.fechaRegistro}
                bgColorInput={"#D9D9D9"}
                colorTexto='#757575'
                />


                <ButtonX 
                    iconParam={imagePath.arrowLeftLogo} 
                    iconPosition="left" 
                    onPress={ () => router.back() }
                    fontSize={moderateScale(20)}
                    buttonStyles={styles.button}
                    bgColor='#ECF692'
                    bgColorPressed='#CAD561'
                >
                    Volver
                </ButtonX>

                <ButtonX 
                    iconParam={imagePath.iconLogout} 
                    iconPosition="left" 
                    fontSize={moderateScale(20)}
                    buttonStyles={styles.button}
                    bgColor='#F9B9B2'
                    bgColorPressed='#F69C92'
                    onPress={ handleLogOut }
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
        backgroundColor: "#feb", // #feb
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