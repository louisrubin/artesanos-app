import { LinearGradient } from "expo-linear-gradient";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import imagePath from "../constants/imagePath";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {

    const router = useRouter(); // Cambiar a useRouter

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(auth)/Login'); // Cambiar a ('/auth/Login')
        }, 2000); // 2 segundos de espera

        return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
    }
    , [])

    return (
        // <LoginScreen />

        <>
        <LinearGradient 
            colors={["#C8D29C", "#8A9A46", "#8A9A46"]}
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
        </>
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
    // marginTop: moderateScale(-110),
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



