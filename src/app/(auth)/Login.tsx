import { StatusBar } from 'expo-status-bar';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import InputX from '../../components/InputX';
import ButtonX from '../../components/ButtonX';
import imagePath from '../../constants/imagePath';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function LoginScreen() {
    return (
      <SafeAreaProvider>
        <LinearGradient 
          colors={["#C8D29C", "#8A9A46", "#8A9A46"]}
          style={styles.container}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Image source={imagePath.logoGobChaco} style={styles.imageHeader} />
          </View>
  
          {/* BODY que se adapta al teclado */}
          <KeyboardAvoidingView
            style={styles.flexBody}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.body}>
              <Text style={styles.labelTitulo}>Ingresar a su cuenta</Text>
              <Text style={styles.label}>Correo Electrónico</Text>
              <InputX placeholder="Ingrese Correo Electrónico" tipoTeclado='email-address' />
  
              <Text style={styles.label}>Contraseña</Text>
              <InputX placeholder="Ingrese Contraseña" secureTextEntry={true} />
  
              <ButtonX 
                buttonStyles={{ width: moderateScale(200), 
                    marginTop: moderateScale(30), borderWidth: 1,
                    borderColor: '#000', padding: moderateScale(12),}}
                textStyles={{ fontWeight: 'bold' }}
                color="#E0F393"
                bgColorPressed="#BCB850"
                fontSize={moderateScale(20)}
                iconParam={imagePath.iconLogin}
              >
                Iniciar Sesión
              </ButtonX>
  
              {/* <Text style={styles.labelRegistrarse}>o Registrarse</Text> */}
              <ButtonX      
                buttonStyles={{ width: moderateScale(120), 
                  marginTop: moderateScale(18), paddingVertical: moderateScale(6)}}           
                color="#A0AE6A"
                bgColorPressed="#BCB850"
                textStyles={styles.btnRegistrarse}
                fontSize={moderateScale(15)}
                iconParam={imagePath.iconRegister}
                >
                  o Registrarse
              </ButtonX>
            </View>
          </KeyboardAvoidingView>
  
          {/* FOOTER */}
          <View style={styles.footer}>
            <Image source={imagePath.logoICCH} style={styles.imageFooter} />
            <Text>UTN FRRe</Text>
            <Text>Rubin-Zamora</Text>
          </View>
  
          <StatusBar style="auto" />
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
        marginTop: -170,
        alignItems: 'center',
    },
    footer: {
      alignItems: 'center',
      marginTop: 10,
    },
    imageHeader: {
        marginTop: moderateVerticalScale(-110),
        height: moderateScale(350),
        width: moderateScale(350),
        resizeMode: "contain",
    },
    imageFooter: {
      height: moderateScale(150),
      width: moderateScale(150),
      // width: 170,
      resizeMode: "contain",
    },
    labelTitulo:{
      // width: '100%',
      fontVariant: ['small-caps'],
      fontSize: moderateScale(25),
      fontWeight: 'bold',
      marginBottom: moderateVerticalScale(20),
      marginTop: 5,
    },
    label: {
      width: '100%',
      fontSize: moderateScale(18),
      // fontWeight: 'bold',
      marginBottom: 8,
      marginTop: moderateScale(14),
    },
    labelRegistrarse: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      fontSize: 20, 
      marginTop: 26, 
      textDecorationLine: 'underline',
      backgroundColor: '#B7C484',
    },
    btnRegistrarse: {
      // padding: 0,
    },

  });

  

