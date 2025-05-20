import { LinearGradient } from "expo-linear-gradient";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import imagePath from "../constants/imagePath";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../credenciales";
import { getUserInfo } from "../hooks/firebaseHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export default function Index() {
    const [checkingAuth, setCheckingAuth] = useState(true);
    const router = useRouter(); // Cambiar a useRouter

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Usuario logueado
                const dataStoraged = await AsyncStorage.getItem('userData');
                if(dataStoraged === null){
                    // Si no hay datos del usuario en AsyncStorage, los obtiene de Firebase
                    try{
                        const userData = await getUserInfo(user.uid); // hook personalizado
                        if (userData) {
                        
                            const fechaFormateada = format(userData.fechaRegistro, 'dd-MM-yyyy HH:mm'); // Convierte la fecha a formato dd/MM/yyyy
                            userData.fechaRegistro = fechaFormateada; // asigna la fecha a la data
                            
                            await AsyncStorage.setItem('userData', JSON.stringify(userData)); // Guardar datos del usuario en AsyncStorage
                        }
                    }catch (error) {
                        console.error('Error al obtener los datos del usuario:', error);
                    }
                }

                router.replace('/(main)');  // Usuario logueado, redirige al home o main
            } 
            
            else {
                // No hay sesión activa
                await AsyncStorage.removeItem('userData');
                router.replace('/Login');
            }
            setCheckingAuth(false);     // setea el estado de verificación si terminó
        });

        return unsubscribe; // limpieza al desmontar
    }, [])

    // VERIFICANDO EL ESTADO DE AUTENTICACION
    if (checkingAuth) {
        // Si está verificando el estado de autenticación, muestra un ActivityIndicator
        return (
            <LinearGradient 
                colors={["#c85",  "#da7"]}
                style={styles.container}
            >
                {/* HEADER */}
                <View style={styles.header}>
                    <Image source={imagePath.logoGobChaco} style={styles.imageHeader} />
                </View>

                {/* BODY  */}
                <View style={styles.body}>
                    <ActivityIndicator size="large" color="#000" />
                    {/* <Text style={styles.labelIniciando}>Ingresando</Text> */}
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                    <Image source={imagePath.logoUTN} style={styles.imageFooter} />
                    <Text style={styles.labelUTN}>Facultad Regional</Text>
                    <Text style={styles.labelUTN}>Resistencia</Text>
                </View>

            </LinearGradient>
        )
    }
    
    return null; // O retorna null si no está verificando el estado de autenticación
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: moderateVerticalScale(20),
  },
  header: {
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  flexBody: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  body: {
    // marginTop: -170,
    alignItems: 'center',
    flexGrow: 1,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
    opacity: 0.5,
  },
  imageHeader: {
    marginTop: moderateScale(-50),
    height: moderateScale(350),
    width: moderateScale(350),
    resizeMode: "contain",
  },
  imageFooter: {
    height: moderateScale(65),
    width: moderateScale(65),
    resizeMode: "contain",
    marginBottom: moderateScale(5),
  },
  labelIniciando: {
    fontVariant: ['small-caps'],
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    // marginBottom: moderateVerticalScale(20),
    marginTop: 5,
  },
  labelUTN: {
    // width: '100%',
    fontSize: moderateScale(14),
    
  },
});



