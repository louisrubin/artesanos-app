import { LinearGradient } from "expo-linear-gradient";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import imagePath from "../constants/imagePath";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useUser } from "../hooks/UserContext";

export default function Index() {
    const { isLoggedIn, loading } = useUser(); // Obtener el contexto del usuario
    const router = useRouter(); // Cambiar a useRouter

    useEffect( () => {
        if(!loading){
            // verifica login desde el Context
            if (isLoggedIn) {
                    // Usuario logueado
                    router.replace('/(main)');  // Usuario logueado, redirige al home o main
            }else {
                // No hay sesión activa
                router.replace('/Login');
            }
        }        
    }, [loading]);  // isLoggedIn

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



