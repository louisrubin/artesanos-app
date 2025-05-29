import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';
import ButtonX from '../../components/ButtonX';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import { useEffect, useState } from "react";
import { useUser } from '../../hooks/UserContext';
import ButtonSettings from '../../components/ButtonSettings';

const redNotifColor = "#D04A4A";

const styles2= StyleSheet.create({
    barraSuperior: {
        position: 'relative', // clave para el centrado absoluto
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: moderateScale(20),
    },
    notificacionRed: {
        fontSize: moderateScale(16),
        backgroundColor: redNotifColor,
        color: "white",
        padding: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        borderRadius: 16,
    },
    centroNotificacion: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default function PantallaPrincipal() {
    const router = useRouter(); // Cambiar a useRouter
    const { userData, isInternetReachable } = useUser(); // Obtener el contexto del usuario
    const [funcionesON, setFuncionesON] = useState(false); // Estado para habilitar/deshabilitar botones

    // useEffect(() => {
    //     if (userData?.isAdmin || userData?.aprobado) setFuncionesON(true); // Habilita los botones si es admin o aprobado
    //     else setFuncionesON(false);
        
    // }, [userData, isInternetReachable]); // , funcionesON
    
    return (
        <LinearGradient
        colors={["#fda", "#fda", "#ffc"]}
        style={styles.container}
        >
            {/* HEADER */}
            <View style={styles.header}>
                
                {/* BARRA SUPERIOR NOTIFICACIONES */}
                <View style={styles2.barraSuperior}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        { !isInternetReachable && (
                                <ButtonSettings 
                                    imgPath={imagePath.wifiOffLogo} 
                                    bgColor='#C9C9C9'
                                />
                            )
                        }
                    </View>

                    <View style={ styles2.centroNotificacion }>
                        { !funcionesON && (
                            // <Text style={styles2.notificacionRed}>Cuenta pendiente de aprobación</Text>
                            <Text style={styles2.notificacionRed}>Rama REDMI (offline)</Text>
                        )}
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <ButtonSettings 
                            addStyle={{ alignSelf: "flex-end", }}
                            onPress={() => router.push('/UserSettings')}
                            imgPath={imagePath.settingsCircleLogo} 
                            pressable
                        />
                    </View>                    
                </View>
                    

                <Image source={imagePath.logoICCH} style={styles.imageHeader} />
            </View>

            {/* BODY */}
            <View style={styles.body}>


            { true && (
            //!userData?.isAdmin && (
                <ButtonX
                    buttonStyles={{ width: moderateScale(300), marginTop: moderateScale(30), padding: moderateScale(12) }}
                    textStyles={{ fontWeight: 'bold', marginLeft: moderateScale(10) }}
                    bgColor="#808090"
                    bgColorPressed="#9696A2"
                    fontSize={moderateScale(20)}
                    iconParam={imagePath.iconAdmin}
                    iconPosition="left"
                    onPress={() => router.push('/admin')}
                >
                    Panel de administración
                </ButtonX>
            )}

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
                    disabled={ false }
                    onPress={() => router.push('/encuesta')} >Registrar Artesanos 
                </ButtonX>

                <Text style={{ width: moderateScale(285), textAlign: "right", opacity: 0.6, marginTop: 3}}
                    >Registros en espera de conexión: <Text style={{fontWeight: "600"}}>4</Text>
                </Text>

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
                    disabled={ true }
                    onPress={() => router.push('/encuesta')} >Registros 
                </ButtonX>
                
                <Text style={{alignSelf: "flex-end", opacity: 0.6, marginTop: 3}}
                    >
                </Text>

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
                    disabled={ true }
                    onPress={() => router.push('/encuesta')} >Estadísticas
                </ButtonX>
                
                <Text style={{alignSelf: "flex-end", opacity: 0.6, marginTop: 3}}
                    >
                </Text>
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
        marginTop: 10,
        paddingTop: 5,
        alignItems: "center",
    },
    body:{
        flexGrow: 1,
        width: "100%",
        paddingTop: 20,
        alignItems: "center",
    },
    footer: {
        alignItems: 'center',
        marginTop: 5,
        width: '100%',
        opacity: 0.4,
    },
    imageHeader: {
        height: moderateScale(150),
        width: moderateScale(150),
        resizeMode: "contain",
        marginTop: moderateVerticalScale(-40),
        marginBottom: -55,
    },
});