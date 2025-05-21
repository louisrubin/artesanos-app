import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import ButtonX from '../../components/ButtonX';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import { VerdeAgricultura } from '../../constants/colors';
import { useUser } from '../../hooks/UserContext';

const redNotifColor = "#D04A4A";

const styles2= StyleSheet.create({
    barraSuperior: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    notificacionRed: {
        fontSize: moderateScale(16),
        backgroundColor: redNotifColor,
        color: "white",
        padding: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        marginRight: moderateScale(5),
        borderRadius: 16,
    },

})

export default function PantallaPrincipal() {
    const router = useRouter(); // Cambiar a useRouter
    const { userData } = useUser(); // Obtener el contexto del usuario
    
    return (
        <LinearGradient
        colors={["#fda", "#fda", "#ffc"]}
        style={styles.container}
        >
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles2.barraSuperior}>

                    { userData?.aprobado 
                        ? null 
                        : <Text style={styles2.notificacionRed}>Cuenta pendiende de aprobación</Text>
                    }
                    
                    <Pressable style={ ({pressed}) => [
                        styles.userIconContainer,
                        {
                            backgroundColor: pressed ? VerdeAgricultura : "#ffb",
                        }
                    ]} 
                        onPress={() => router.push('/UserSettings')}>
                        <Image source={imagePath.settingsCircleLogo} style={styles.settingsIcon} />
                    </Pressable>
                </View>
                    

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
                    bgColorPressed="#BBCE70"
                    fontSize={moderateScale(20)}
                    iconParam={imagePath.iconUser}
                    iconPosition="left"
                    disabled={!userData?.aprobado}
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
                    disabled={true}
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
                    disabled={true}
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
        padding: 8,
        marginRight: moderateScale(20),
        borderWidth: 1,
        borderRadius: 60,
    },
    settingsIcon: {
        resizeMode: "contain",
        width: 24,
        height: 24,
    },
});