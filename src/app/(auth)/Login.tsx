import { Image, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router'; // Cambiar a useRouter
import { LinearGradient } from 'expo-linear-gradient';
import InputX from '../../components/InputX';
import ButtonX from '../../components/ButtonX';
import imagePath from '../../constants/imagePath';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../../credenciales';
import { useState } from 'react';
import ModalX from '../../components/Modal';

// ESQUEMA DE ZOD PARA RESTRICCIONES DE LOS CAMPOS
const esquema = z.object({
    email: z.string().email('Correo no válido'),
    password: z.string().min(1, 'Requerido'),
});

type FormData = z.infer<typeof esquema>;    // Definición del tipo de datos del formulario

export default function LoginScreen() {
  const router = useRouter(); // Cambiar a useRouter
  const auth = getAuth(app);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoadingActivity, setIsLoadingActivity] = useState(true);
  const [iconButtonModal, setIconButtonModal] = useState(null)

  // desestructurar metodos del hook useForm 
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(esquema),
    defaultValues: {
        email: '',
        password: '',
    },

  });

  const toggleVisibleModal = () => {
    setIsVisibleModal(!isVisibleModal)
  }

  const setLoadingParams = (message) => {
    // metodo para reutilizar cuando algo está cargando
    setModalMessage(message);
    setIsLoadingActivity(true); // SETEA EL ACTIVITY INDICATOR
    setIsVisibleModal(true);  // MUESTRA EL MODAL

  }

  // ENVIO DE FORMULARIO LOGIN
  function onSubmitLogin(data: FormData){
    const { email, password } = data;

    // verificar conexion internet antes de enviar el formulario

    setLoadingParams("Iniciando");   // setea todo para el loading

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsVisibleModal(false); // QUITA EL MODAL
        router.replace('/(main)'); // Reemplaza con la pantalla principal (no puede volver atras)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoadingActivity(false);

        if(errorCode === "auth/invalid-credential"){
          setModalMessage("Credenciales incorrectas.");
          setIconButtonModal(imagePath.navigateBeforeLogo);
        }
      });
    }

    return (
        <LinearGradient 
        colors={["#C8D29C", "#8A9A46", "#8A9A46"]}
        style={styles.container}
        >

            {/* MODAL DE INICIO DE SESIÓN */}
            <ModalX
            isModalVisible={isVisibleModal}
            title={modalMessage}
            iconHeader={imagePath.keyLogo}
            isLoading={isLoadingActivity}
            onBackdropPress={toggleVisibleModal}
            >
                <ButtonX
                buttonStyles={{ width: moderateScale(150),
                marginTop: moderateScale(20), paddingVertical: moderateScale(10),
                }}
                fontSize={moderateScale(20)}
                iconParam={iconButtonModal}
                iconPosition="left"
                onPress={toggleVisibleModal}
                >
                    Volver
                </ButtonX>

        </ModalX>      


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

            <Controller control={control} name="email"
                render={ ({field: {onChange, value}}) => (
                    <InputX placeholder="Ingrese Correo Electrónico" 
                        tipoTeclado="email-address"
                        value={value}
                        onChangeText={onChange} />
                )}
            />
            { /*
                errors.email &&
                <Text style={[styles.labelInputValidation, {color: 'red'}]}>
                    {errors.email.message}
                </Text>
                */
            }

            <Text style={[styles.label, {marginTop: moderateScale(16)}]}>Contraseña</Text>

            <Controller control={control} name='password' 
                render={({field: {onChange, value}}) => (
                    <InputX placeholder="Ingrese Contraseña" 
                        passwordInput
                        onChangeText={onChange} 
                        value={value} />
                )}
            />

            { /*
                errors.password && 
                <Text style={[styles.labelInputValidation, {color: 'red'}]}>
                    {errors.password.message}
                </Text>
                */
            }            

            {/* BOTONES INCIAR Y REGISTER */}
            <View style={{alignItems: 'center'}}>
                <ButtonX 
                    buttonStyles={{ width: moderateScale(200), 
                    marginTop: moderateScale(30), padding: moderateScale(12),
                    }}
                    textStyles={{ fontWeight: 'bold' }}
                    bgColor="#E0F393"
                    bgColorPressed="#BCB850"
                    fontSize={moderateScale(20)}
                    iconParam={imagePath.iconLogin}
                    iconPosition="right"
                    onPress={ handleSubmit(onSubmitLogin) } // Cambiar a router.push('/main/pantallaPrincipal')
                >
                    Iniciar Sesión
                </ButtonX>

                <ButtonX      
                    buttonStyles={{ width: moderateScale(120), 
                    marginTop: moderateScale(18), paddingVertical: moderateScale(6)
                    }}           
                    bgColor="#A0AE6A"
                    bgColorPressed="#BCB850"
                    textStyles={null}
                    fontSize={moderateScale(15)}
                    iconParam={imagePath.iconRegister}
                    iconPosition="right"
                    onPress={() => router.push('/(auth)/Register')} 
                >
                    o Registrarse
                </ButtonX>
            </View>
            
          </View>


        {/* FOOTER */}
        <View style={styles.footer}>
            <Image source={imagePath.logoICCH} style={styles.imageFooter} />
            <Text style={styles.labelCreditos}>UTN FRRe</Text>
            <Text style={styles.labelCreditos}>Rubín-Zamora</Text>
        </View>

    </LinearGradient>    
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
    // alignItems: 'center',
    width: '100%',
    paddingTop: moderateVerticalScale(40),
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
    marginBottom: moderateVerticalScale(-20),
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
        fontSize: moderateScale(25), 
        marginTop: moderateScale(15),
        marginBottom: 2,
        alignSelf: 'flex-start',
  },
  labelCreditos: {
    fontSize: moderateScale(14),
    opacity: 0.7,
  },
  labelInputValidation:{
      fontSize: moderateScale(15), 
      marginTop: moderateScale(-10),
      paddingLeft: moderateScale(10),
      fontWeight: 'bold',
  },
});



