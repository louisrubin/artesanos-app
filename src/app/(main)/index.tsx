import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, StatusBar, Pressable } from 'react-native';
import ButtonX from '../../components/ButtonX';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import { VerdeAgricultura } from '../../constants/colors';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PantallaPrincipal() {
    const router = useRouter(); // Cambiar a useRouter
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("userEmail").then(email => {
            if (email === "admin@tudominio.com") { // Cambia por el email real del admin
                setIsAdmin(true);
            }
        });
    }, []);

    return (
        <LinearGradient
        colors={["#fda", "#fda", "#ffc"]}
        style={styles.container}
        >
            {/* HEADER */}
            <View style={styles.header}>
                    <Pressable style={ ({pressed}) => [
                        styles.userIconContainer,
                        {
                            backgroundColor: pressed ? VerdeAgricultura : "#ffb",
                        }
                    ]} 
                        onPress={() => router.push('/UserSettings')}>
                        <Image source={imagePath.settingsCircleLogo} style={styles.settingsIcon} />
                    </Pressable>

                <Image source={imagePath.logoICCH} style={styles.imageHeader} />
            </View>

            {/* BODY */}
            <View style={styles.body}>


                <ButtonX
                    buttonStyles={{ width: moderateScale(300), 
                        marginTop: moderateScale(30), 
                        padding: moderateScale(12),}}
                    textStyles={{ fontWeight: 'bold',marginLeft: moderateScale(10) }}
                    bgColor="#E0F393"
                    bgColorPressed="#BCB850"
                    fontSize={moderateScale(20)}
                    iconParam={imagePath.iconStadistics}
                    iconPosition="left"
                    disabled={!isAdmin}
                    onPress={() => router.push('/admin')} >Panel de administración
                </ButtonX>

                <ButtonX
                buttonStyles={{ width: moderateScale(300), 
                        marginTop: moderateScale(30),
                        padding: moderateScale(12),}}
                textStyles={{ fontWeight: 'bold',marginLeft: moderateScale(10) }}
                bgColor="#E0F393"
                bgColorPressed="#BBCE70"
                fontSize={moderateScale(20)}
                iconParam={imagePath.iconUser}
                iconPosition="left"
                onPress={() => router.push('/encuesta')} >Registrar Artesanos 
                </ButtonX>

                <ButtonX
                    buttonStyles={{ width: moderateScale(300), 
                        marginTop: moderateScale(30),
                        padding: moderateScale(12),}}
                    textStyles={{ fontWeight: 'bold',marginLeft: moderateScale(10) }}
                    bgColor="#E0F393"
                    bgColorPressed="#BCB850"
                    fontSize={moderateScale(20)}
                    iconParam={imagePath.iconRegistros}
                    iconPosition="left"
                    disabled
                    onPress={() => router.push('/encuesta')} >Registros 
                </ButtonX>

                <ButtonX
                    buttonStyles={{ width: moderateScale(300), 
                        marginTop: moderateScale(30), 
                        padding: moderateScale(12),}}
                    textStyles={{ fontWeight: 'bold',marginLeft: moderateScale(10) }}
                    bgColor="#E0F393"
                    bgColorPressed="#BCB850"
                    fontSize={moderateScale(20)}
                    iconParam={imagePath.iconStadistics}
                    iconPosition="left"
                    disabled
                    onPress={() => router.push('/encuesta')} >Estadísticas
                </ButtonX>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <Text>UTN FRRe</Text>
                <Text>Rubin-Zamora</Text>
            </View>
        </LinearGradient>        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: moderateVerticalScale(20),
        alignItems: 'center',
    },    
    header: {
        marginTop: moderateScale(20),
        marginBottom: moderateScale(12),
        width: "100%",
        alignItems: "center",
    },
    body:{
        flexGrow: 1,
    },
    footer: {
        alignItems: 'center',
        marginTop: 10,
        position: 'absolute', // Fija el contenedor en una posición específica
        bottom: 30, // Ubica el contenedor a 10px del borde inferior
        width: '100%', // Asegura que el contenedor ocupe todo el ancho
        opacity: 0.7,
    },
    imageHeader: {
        height: moderateScale(150),
        width: moderateScale(150),
        resizeMode: "contain",
        marginTop: moderateVerticalScale(-40),
    },
    userIconContainer: {
        // width: "100%",
        alignSelf: "flex-end",
        padding: 8,
        marginRight: moderateScale(20),
        borderWidth: 1,
        borderRadius: 60,
        // backgroundColor: "#ffb"
    },
    settingsIcon: {
        resizeMode: "contain",
        width: 24,
        height: 24,
    },
    // title: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    // },
});