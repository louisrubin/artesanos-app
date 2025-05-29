import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import imagePath from "../constants/imagePath";
import { useRouter } from "expo-router";
import { useUser } from "../hooks/UserContext";

export default function Index() {
    const { userData, isLoggedIn, loading, messageStatus } = useUser(); // Obtener el contexto del usuario
    const router = useRouter(); // Cambiar a useRouter

    useEffect( () => {
        if( !loading && isLoggedIn && userData){
            // verifica login desde el Context
            router.replace('/(main)');  // Usuario logueado, redirige al home o main
        } else if (!loading && !isLoggedIn){
            // No hay sesión activa
            router.replace('/Login');
        }        
    }, [loading, userData, isLoggedIn]); 

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
                <Text style={styles.labelIniciando}>{ messageStatus }</Text>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <Image source={ imagePath.logoUTN } style={styles.imageFooter} />
                <Text style={{ fontSize: 12 }}>Facultad Regional</Text>
                <Text style={{ fontSize: 12 }}>Resistencia</Text>
            </View>

        </LinearGradient>
    )
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: moderateVerticalScale(20),
  },
  header: {
    alignItems: 'center',
    marginBottom: -110,
  },

  body: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  footer: {
    alignItems: 'center',
    opacity: 0.5,
  },
  
  imageHeader: {
    marginTop: moderateScale(-100),
    height: moderateScale(280),
    width: moderateScale(280),
    resizeMode: "contain",
  },
  imageFooter: {
    height: moderateScale(50),
    width: moderateScale(50),
    resizeMode: "contain",
    marginBottom: moderateScale(5),
  },
  labelIniciando: {
    fontSize: 15,
    marginTop: 10,
  },
});



