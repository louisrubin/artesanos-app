import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ButtonX from '../../components/ButtonX'
import { useRouter } from 'expo-router';
import imagePath from '../../constants/imagePath';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import InputAndLabelX from '../../components/InputAndLabel';
import { auth } from '../../../credenciales';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../hooks/UserContext';

export default function UserSettings() {
    const router = useRouter();
    const { userData, setUserData } = useUser(); // Obtener el contexto del usuario

    const handleLogOut = async () => {
        // lógica para cerrar sesión
        try{
            await AsyncStorage.removeItem('userData'); // Elimina los datos del usuario de AsyncStorage
            await auth.signOut();
            setUserData(null); // Limpia el contexto del usuario
            router.replace('/(auth)/Login');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };
    
    return (
        <SafeAreaProvider style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Image source={imagePath.userLogo} style={styles.userHeaderIcon} />
                    <Text style={{fontSize: 22}}>
                        Detalles de la cuenta
                    </Text>
                </View>

                <View style={styles.body}>
                    {/* INPUTS-LABELS */}
                    <View>
                        <InputAndLabelX titleLabel='Nombre' editable={false}
                        styleLabel={{fontSize: 20, opacity: 0.4}} value={userData?.nombre}
                        bgColorInput={"#D9D9D9"}
                        colorTexto='#757575'
                        />

                        <InputAndLabelX titleLabel='Apellido' editable={false}
                        styleLabel={{fontSize: 20, opacity: 0.4}} value={userData?.apellido}
                        bgColorInput={"#D9D9D9"}
                        colorTexto='#757575'
                        />
                        
                        <InputAndLabelX titleLabel='DNI' editable={false}
                        styleLabel={{fontSize: 20, opacity: 0.4}} value={userData?.dni}
                        bgColorInput={"#D9D9D9"}
                        colorTexto='#757575'
                        />
                        
                        <InputAndLabelX titleLabel='Correo Electrónico' editable={false}
                        styleLabel={{fontSize: 20, opacity: 0.4}} value={userData?.email}
                        bgColorInput={"#D9D9D9"}
                        colorTexto='#757575'
                        />
                        
                        <InputAndLabelX titleLabel='Fecha de Registro' editable={false}
                        styleLabel={{fontSize: 20, opacity: 0.4}} value={userData?.fechaRegistro}
                        bgColorInput={"#D9D9D9"}
                        colorTexto='#757575'
                        />

                        <InputAndLabelX titleLabel='Estado' editable={false}
                        styleLabel={{fontSize: 20, opacity: 0.4}} 
                        value={ userData?.isAdmin ? "Administrador" :
                                userData?.aprobado ? "Verificado" : "No verificado"
                        }
                        bgColorInput={"#D9D9D9"}
                        colorTexto='#757575'
                        />
                        
                        <Text style={{fontSize: 18, color: "#D04A4A",
                                marginTop: moderateVerticalScale(10), opacity: 0.8}}
                            >
                            { userData?.aprobado || userData?.isAdmin
                                ? null
                                : "Su cuenta está pendiente de verificación por un administrador."
                            }
                        </Text>
                    </View>


                    {/* BOTONES */}
                    <View>
                        <ButtonX 
                        iconParam={imagePath.arrowLeftLogo} 
                        iconPosition="left" 
                        onPress={ () => router.back() }
                        fontSize={20}
                        buttonStyles={styles.button}
                        bgColor='#ECF692'
                        bgColorPressed='#CAD561'
                        >
                            Volver
                        </ButtonX>

                        <ButtonX 
                            iconParam={imagePath.iconLogout} 
                            iconPosition="left" 
                            fontSize={20}
                            buttonStyles={styles.button}
                            bgColor='#F9B9B2'
                            bgColorPressed='#F69C92'
                            onPress={ handleLogOut }
                        >
                            Cerrar Sesión
                        </ButtonX>
                    </View>                    

                </View>

            </ScrollView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#feb", // #feb
        paddingTop: moderateVerticalScale(25),
    },
    header:{
        alignItems: "center",
        marginTop: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(15)
    },
    body: {
        flexGrow: 1,
        justifyContent: "space-evenly",
        marginHorizontal: moderateScale(25),
        marginBottom: moderateScale(40),
        gap: 30,

        paddingHorizontal: moderateScale(20),
        paddingBottom: moderateVerticalScale(25),
        
        backgroundColor: "#fed",
        borderWidth: 1,
        borderRadius: 16,
        
        borderColor: '#d7d7d7',
    },
    userHeaderIcon:{
        resizeMode: "contain",
        width: moderateScale(25),
        height: moderateScale(25),
    },
    button: {
        padding: 8,
        marginTop: moderateVerticalScale(25),
    }
})