import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import ButtonX from '../../components/ButtonX';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';

export default function PantallaPrincipal() {
      const router = useRouter(); // Cambiar a useRouter
    
    return (
        <SafeAreaProvider>
            <LinearGradient
            colors={["#FFFFFF", "#8A9A46"]}
            style={styles.container}
            >
            <View style={styles.footer}>
                        <Image source={imagePath.logoICCH} style={styles.imageFooter} />
                        </View>
            <View style={styles.header}>
            <ButtonX
            buttonStyles={{ width: moderateScale(300), 
                    marginTop: moderateScale(30), borderWidth: 1,
                    borderColor: '#000', padding: moderateScale(12),}}
             textStyles={{ fontWeight: 'bold',marginLeft: moderateScale(10) }}
             color="#E0F393"
             bgColorPressed="#BCB850"
             fontSize={moderateScale(20)}
             iconParam={imagePath.iconUser}
             iconPosition="left"
             onPress={() => router.push('/encuesta')} > Registrar Artesanos 
             </ButtonX>
             <ButtonX
             buttonStyles={{ width: moderateScale(300), 
                    marginTop: moderateScale(30), borderWidth: 1,
                    borderColor: '#000', padding: moderateScale(12),}}
             textStyles={{ fontWeight: 'bold',marginLeft: moderateScale(10) }}
                color="#E0F393"
                bgColorPressed="#BCB850"
                fontSize={moderateScale(20)}
                iconParam={imagePath.iconRegistros}
                iconPosition="left"
             onPress={() => router.push('/encuesta')} > Registros 
             </ButtonX>
             <ButtonX
             buttonStyles={{ width: moderateScale(300), 
                    marginTop: moderateScale(30), borderWidth: 1,
                    borderColor: '#000', padding: moderateScale(12),}}
                textStyles={{ fontWeight: 'bold',marginLeft: moderateScale(10) }}
                color="#E0F393"
                bgColorPressed="#BCB850"
                fontSize={moderateScale(20)}
                iconParam={imagePath.iconStadistics}
                iconPosition="left"
             onPress={() => router.push('/encuesta')} > Estadísticas
             </ButtonX>
            
             

        </View>
        <View style={styles.footer1}>
               <Text>UTN FRRe</Text>
               <Text>Rubin-Zamora</Text>
        </View>
        </LinearGradient>
        </SafeAreaProvider>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: moderateVerticalScale(20),
        paddingBottom: moderateVerticalScale(20),
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    footer: {
        alignItems: 'center',
        marginTop: 10,
      },
    footer1: {
        position: 'absolute', // Fija el contenedor en una posición específica
        bottom: 30, // Ubica el contenedor a 10px del borde inferior
        alignItems: 'center', // Centra horizontalmente el contenido
        width: '100%', // Asegura que el contenedor ocupe todo el ancho
    },
    imageFooter: {
        height: moderateScale(150),
        width: moderateScale(150),
        resizeMode: "contain",
        },
    header: {
        alignItems: 'center',
        marginBottom: moderateScale(12),
      },
});