// import { StatusBar } from 'expo-status-bar';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router'; // Cambiar a useRouter
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import InputX from '../../components/InputX';
import ButtonX from '../../components/ButtonX';
import imagePath from '../../constants/imagePath';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function LoginScreen() {
  const router = useRouter(); // Cambiar a useRouter

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

        <View style={{ marginTop: moderateVerticalScale(-65), alignItems: 'center' }}>
          <Text style={styles.labelTitulo}>Ingresar a su cuenta</Text>
        </View>

        {/* BODY  */}
        <View style={styles.body}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <InputX placeholder="Ingrese Correo Electrónico" tipoTeclado="email-address" />

          <Text style={[styles.label, {marginTop: moderateScale(16)}]}>Contraseña</Text>
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
              iconPosition="right"
              onPress={() => router.push('/(main)')} // Cambiar a router.push('/main/pantallaPrincipal')
            >
              Iniciar Sesión
            </ButtonX>

            <ButtonX      
              buttonStyles={{ width: moderateScale(120), 
                marginTop: moderateScale(18), paddingVertical: moderateScale(6)}}           
              color="#A0AE6A"
              bgColorPressed="#BCB850"
              textStyles={styles.btnRegistrarse}
              fontSize={moderateScale(15)}
              iconParam={imagePath.iconRegister}
              iconPosition="right"
              onPress={() => router.push('/(auth)/Register')} 
            >
              o Registrarse
            </ButtonX>
          </View>
        </KeyboardAvoidingView>


        {/* FOOTER */}
        <View style={styles.footer}>
          <Image source={imagePath.logoICCH} style={styles.imageFooter} />
          <Text style={styles.labelCreditos}>UTN FRRe</Text>
          <Text style={styles.labelCreditos}>Rubín-Zamora</Text>
        </View>

        {/* <StatusBar style="auto" /> */}
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: moderateVerticalScale(20),
    paddingHorizontal: moderateScale(40),
  },
  header: {
    alignItems: 'center',
  },
  body: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: moderateVerticalScale(50),
  },
  footer: {
    alignItems: 'center',
  },
  imageHeader: {
    marginTop: moderateVerticalScale(-90),
    height: moderateScale(300),
    width: moderateScale(300),
    resizeMode: "contain",
  },
  imageFooter: {
    height: moderateScale(150),
    width: moderateScale(150),
    resizeMode: "contain",
  },
  labelTitulo: {
    fontVariant: ['small-caps'],
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    marginBottom: moderateVerticalScale(20),
    // marginTop: 5,
  },
  label: {
    width: '100%',
    fontSize: moderateScale(18),
    marginBottom: 4,
    // marginTop: moderateScale(14),
  },
  labelCreditos: {
    fontSize: moderateScale(14),
    // opacity: 0.75,
  },
});



