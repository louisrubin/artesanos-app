import { Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../credenciales';
import { useState } from 'react';

import ModalX from '../../components/Modal';
import InputX from '../../components/InputX';
import ButtonX from '../../components/ButtonX';
import imagePath from '../../constants/imagePath';
import { getFirebaseErrorMessage, getUserInfoFirebase, saveLocalUserData } from '../../hooks/firebaseHooks';
import { useUser } from '../../hooks/UserContext';


// ESQUEMA DE ZOD PARA RESTRICCIONES DE LOS CAMPOS
const esquema = z.object({
    email: z.string().email('Correo no válido'),
    password: z.string().min(1, 'Requerido'),
});

type FormData = z.infer<typeof esquema>;    // Definición del tipo de datos del formulario

export default function LoginScreen() {
  const { setUserData } = useUser(); // Obtener el contexto del usuario
  const router = useRouter();
  const auth = getAuth(app);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('Autenticando...');
  const [isLoadingActivity, setIsLoadingActivity] = useState(true);
  const [iconButtonModal, setIconButtonModal] = useState(null);
  const [iconHeaderModal, setIconHeaderModal] = useState(null);  

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
    setModalTitle(message);
    setIsLoadingActivity(true); // SETEA EL ACTIVITY INDICATOR
    setIsVisibleModal(true);  // MUESTRA EL MODAL

  }

  // ENVIO DE FORMULARIO LOGIN
  async function onSubmitLogin(data: FormData){
    const { email, password } = data;

    setModalMessage("Autenticando..."); // mensaje de carga
    setLoadingParams("Iniciando...");   // setea todo para el loading

    signInWithEmailAndPassword(auth, email, password)
      .then( 
          async (userCredential) => {
            const user = userCredential.user;   // el propio usuario 
            setModalMessage("Cargando datos de Firebase..."); // mensaje de carga
            const userData = await getUserInfoFirebase(user.uid) // sus datos de firebase

            setModalMessage("Sincronizando datos..."); // mensaje de carga
            await saveLocalUserData(userData); // Guardar datos del usuario en AsyncStorage
            setUserData(userData); // Guardar datos del usuario en el contexto global           

            setIsVisibleModal(false); // QUITA EL MODAL
            router.replace('/(main)'); // Reemplaza con la pantalla principal (no puede volver atras)
        })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        setIsLoadingActivity(false);

        if(errorCode === "auth/invalid-credential"){
            setIconHeaderModal(imagePath.keyLogo);  
            setModalTitle("Credenciales incorrectas.");
            setModalMessage("Verifique su correo y contraseña.");
        } else {
            setIconHeaderModal(imagePath.iconXcircle);
            setModalTitle(getFirebaseErrorMessage(errorCode));
            setModalMessage("");
        }
        setIconButtonModal(imagePath.navigateBeforeLogo);
      });
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient 
      //   colors={["#c88", "#c87", "#cb8", "#cb4"]}
        colors={["#cb4", "#cb6", "#cb8", "#cb8", "#c86"]}
        style={styles.container}
        >

                  {/* MODAL DE INICIO DE SESIÓN */}
                  <ModalX
                  isModalVisible={isVisibleModal}
                  title={modalTitle}
                  iconHeader={iconHeaderModal}
                  isLoading={isLoadingActivity}
                  onBackdropPress={toggleVisibleModal}
                  messageLoading={modalMessage}
                  >
                     <ButtonX
                        buttonStyles={{ width: 150,
                        marginTop: 22, paddingVertical: 8,
                        }}
                        fontSize={20}
                        iconParam={iconButtonModal}
                        iconPosition="left"
                        bgColor='#E0F393'
                        bgColorPressed='#B1C464'
                        onPress={toggleVisibleModal}
                     >
                        Volver
                     </ButtonX>

                  </ModalX>      


        {/* HEADER */}
        <View style={styles.header}>
            <Image source={imagePath.logoGobChaco} style={styles.imageHeader} />
            <Text style={styles.labelTitulo}>Ingresar a su cuenta</Text>
        </View>

        {/* BODY  */}
        <View style={styles.body}>
            <View style={{marginTop: -60}}>
               <Text style={styles.label}>Correo Electrónico</Text>
               <Controller control={control} name="email"
                  render={ ({field: {onChange, value}}) => (
                     <InputX placeholder="Ingrese Correo Electrónico" 
                           tipoTeclado="email-address"
                           value={value}
                           onChangeText={onChange} />
                  )}
               />

               <Text style={styles.labelInputValidation}>
                  { errors.email ? errors.email.message : '' }
               </Text>

               <Text style={[styles.label, {marginTop: 15}]}>Contraseña</Text>
               <Controller control={control} name='password' 
                  render={({field: {onChange, value}}) => (
                     <InputX placeholder="Ingrese Contraseña" 
                           passwordInput
                           onChangeText={onChange} 
                           value={value} 
                     />
                  )}
               />

               <Text style={styles.labelInputValidation}>
                  { errors.password ? errors.password.message : '' }
               </Text>

            </View>

            {/* BOTONES INCIAR Y REGISTER */}
            <View style={{alignItems: 'center'}}>
               <ButtonX 
                  buttonStyles={{ width: 210, padding: 14, }}
                  textStyles={{ fontWeight: 'bold' }}
                  bgColor="#E0F393" //E0F393
                  bgColorPressed="#BCB85d"
                  fontSize={20}
                  iconParam={imagePath.iconLogin}
                  iconPosition="right"
                  onPress={ handleSubmit(onSubmitLogin) } // Cambiar a router.push('/main/pantallaPrincipal')
               >
                  Iniciar Sesión
               </ButtonX>

               <ButtonX      
                  buttonStyles={{ width: 150, 
                  marginTop: 20, paddingVertical: 7,
                  }}
                  bgColorPressed="#c86"
                  textStyles={null}
                  fontSize={15}
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
   </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: "center",
    gap: 40
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 17,
  },

  imageHeader: {
    marginTop: -70,
    marginBottom: -90,
    height: 285,
    width: 285,
    resizeMode: "contain",
  },
  imageFooter: {
    height: 150,
    width: 150,
    marginTop: -40,
    marginBottom: -45,
    resizeMode: "contain",
  },
  labelTitulo: {
    fontVariant: ['small-caps'],
    fontWeight: 'bold',
    fontSize: 24,
	 textAlign: "center",
  },
  label: {
    fontSize: 20, 
    marginBottom: 3,
    alignSelf: 'flex-start',
  },
  labelCreditos: {
    fontSize: 12,
    opacity: 0.5,
  },
  labelInputValidation:{
      fontSize: 17, 
      marginTop: 3,
      fontWeight: "600",
      color: 'red',
  },
});

