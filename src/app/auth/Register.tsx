import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import imagePath from "../../constants/imagePath";
import { z } from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "../../../credenciales"; // Asegúrate de exportar `db` desde credenciales.js
import { useEffect, useState } from "react";

import ModalX from "../../components/Modal";
import InputX from "../../components/InputX";
import ButtonX from "../../components/ButtonX";
import { getFirebaseErrorMessage } from "../../hooks/firebaseHooks";


const minLengthPassword = 6; // Longitud máxima de la contraseña
const esquema = z.object({
    nombre: z.string().min(1, { message: "Campo requerido" }),
    apellido: z.string().min(1, { message: "Campo requerido" }),
    dni: z.string().length(8, { message: "El DNI debe tener 8 dígitos" }),
    email: z.string().email({ message: "Correo no válido" }),
    password: z.string().min(minLengthPassword, { message: `Mínimo ${minLengthPassword} carácteres` }),
    password2: z.string().min(minLengthPassword, { message: `Mínimo ${minLengthPassword} carácteres` }),
}).superRefine((data, ctx) => {
    if (data.password !== data.password2 ) {
        // Si las contraseñas no coinciden, agregar un error a ambos campos
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Las contraseñas NO coinciden ❌",
            path: ["password"],
        });
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Las contraseñas NO coinciden ❌",
            path: ["password2"],
        });
    }
});

type FormData = z.infer<typeof esquema>; // Inferir el tipo de datos del esquema

export default function RegisterScreen(){
    // const auth = getAuth();

    const { control, handleSubmit, trigger, formState: { errors, touchedFields } } = useForm<FormData>({
        resolver: zodResolver(esquema),
        defaultValues: {    // Valores por defecto para el formulario
            nombre: '',
            apellido: '',
            dni: '',
            email: '',
            password: '',
            password2: '',
        },
        // mode: "onBlur", // Modo de validación: al perder el foco
    });

    const password = useWatch({ control, name: "password" }); // Obtenemos el valor del campo password
    const password2 = useWatch({ control, name: "password2" }); // Obtenemos el valor del campo password2

    // Este efecto se dispara cada vez que cambian las contraseñas
    useEffect(() => {
        if(touchedFields.password || touchedFields.password2) {
            trigger(["password", "password2"]); // fuerza la validación en tiempo real
        }
    }, [password, password2]);

    const [operationCode, setOperationCode] = useState(null); // Código de operación para el modal
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoadingActivity, setIsLoadingActivity] = useState(true);
    const [iconButtonModal, setIconButtonModal] = useState(null);
    const [iconHeaderModal, setIconHeaderModal] = useState(null);
    const [messageBtnModal, setMessageBtnModal] = useState('Iniciar Sesión');
        
    const onSubmit =  async (data: FormData) => {
        setOperationCode(null); // Reiniciar el código de operación
        setModalMessage("Registrando");
        setIsLoadingActivity(true);
        setIconButtonModal(imagePath.arrowLeftLogo);
        setIsVisibleModal(true);
        try {
            // Registrar al usuario en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
      
            // Guardar datos adicionales en Firestore
            await setDoc(doc(database, "registros", user.uid), {
              nombre: data.nombre,
              apellido: data.apellido,
              dni: data.dni,
              email: data.email,
              fechaRegistro: new Date().toISOString(),
              aprobado: false,
            });
      
            setIconHeaderModal(imagePath.checkCircleLogo);
            setModalMessage("Registro exitoso");
            setOperationCode(200); // Código de operación para el modal
            setMessageBtnModal("Ingresar");

        } catch (error) {
            setOperationCode(404);
            setIconHeaderModal(
                error.code === "auth/network-request-failed" 
                ? imagePath.wifiOffLogo 
                : imagePath.iconXcircle
            )
            setModalMessage(getFirebaseErrorMessage(error.code));   // Obtener el mensaje de error desde objeto
            setMessageBtnModal("Volver");
        } finally {
            setIsLoadingActivity(false); // Ocultar el indicador de carga
        }
    }


    return(
        <View style={styles.container}>

            <ModalX 
            isModalVisible={isVisibleModal}
            title={modalMessage}
            isLoading={isLoadingActivity}
            iconHeader={iconHeaderModal}
            >
                <ButtonX
                buttonStyles={{ width: 160,
                marginTop: 20, paddingVertical: 10,
                }}
                fontSize={18}
                iconParam={iconButtonModal}
                iconPosition="left"
                bgColor="#E0F393"
                bgColorPressed='#B1C464'
                onPress={ () => { 
                    setIsVisibleModal(false); // Ocultar el modal
                    if(operationCode === 200) {
                        router.replace("/main"); // Redirigir a la pantalla principal
                    }
                }}
                >
                    { messageBtnModal }
            </ButtonX>
                
            </ModalX>

            <View>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.innerContainer}>
                        
                        {/* BODY */}
                        <View style={styles.body}>
                        
                            <View style={styles.viewInput}>
                                <Text style={styles.labelInput}>Nombres</Text>

                                <Controller 
                                    control={control}
                                    name="nombre"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputX 
                                            placeholder="Ingrese Nombres" 
                                            tipoTeclado="default" 
                                            value={value} 
                                            onChangeText={onChange} // Actualiza el valor del campo
                                            onBlur={onBlur} // Marca el campo como "tocado"
                                        />
                                    )}
                                />
                                {   errors.nombre && 
                                    <Text style={[styles.labelInputValidation, {color: 'red'}]}>
                                        {errors.nombre.message}
                                    </Text>
                                }
                            </View>

                            <View style={styles.viewInput}>
                                <Text style={styles.labelInput}>Apellidos</Text>
                                <Controller 
                                    control={control}
                                    name="apellido"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputX 
                                            placeholder="Ingrese Apellidos" 
                                            tipoTeclado="default" 
                                            value={value} 
                                            onChangeText={onChange} // Actualiza el valor del campo
                                            onBlur={onBlur} // Marca el campo como "tocado"
                                        />
                                    )}
                                />
                                {   errors.apellido && 
                                    <Text style={[styles.labelInputValidation, {color: 'red'}]}>
                                        {errors.apellido.message}
                                    </Text>
                                }
                            </View>

                            <View style={styles.viewInput}>
                                <Text style={styles.labelInput}>DNI</Text>
                                <Controller 
                                    control={control}
                                    name="dni"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputX 
                                            placeholder="Ingrese DNI" 
                                            tipoTeclado="number-pad" 
                                            value={value} 
                                            onChangeText={onChange} // Actualiza el valor del campo
                                            onBlur={onBlur} // Marca el campo como "tocado"
                                            maxLength={8}
                                        />
                                    )}
                                />
                                {   errors.dni && 
                                    <Text style={[styles.labelInputValidation, {color: 'red'}]}>
                                        {errors.dni.message}
                                    </Text>
                                }
                            </View>

                            <View style={styles.viewInput}>
                                <Text style={styles.labelInput}>Correo Electrónico</Text>
                                <Controller 
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputX 
                                            placeholder="Ingrese Correo Electrónico" 
                                            tipoTeclado="email-address"
                                            value={value} 
                                            onChangeText={onChange} // Actualiza el valor del campo
                                            onBlur={onBlur} // Marca el campo como "tocado"
                                        />
                                    )}
                                />
                                <Text style={styles.labelInputMini}>Este correo se usará para ingresar a su cuenta.</Text>
                                {   errors.email && 
                                    <Text style={[styles.labelInputValidation, {color: 'red', marginTop: 1}]}>
                                        {errors.email.message}
                                    </Text>
                                }
                            </View>

                            <View style={styles.viewInput}>
                                <Text style={styles.labelInput}>Contraseña</Text>
                                <Controller 
                                    control={control}
                                    name="password"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputX 
                                            placeholder="Ingrese Contraseña" 
                                            tipoTeclado="default" 
                                            value={value} 
                                            onChangeText={onChange} // Actualiza el valor del campo
                                            onBlur={onBlur} // Marca el campo como "tocado"
                                            passInp // Campo de contraseña
                                        />
                                    )}
                                />
                                {   errors.password && 
                                    <Text style={[styles.labelInputValidation, {color: 'red'}]}>
                                        {errors.password.message}
                                    </Text>
                                }


                            </View>
                            
                            <View style={styles.viewInput}>
                                <Text style={styles.labelInput}>Repetir Contraseña</Text>
                                <Controller 
                                    control={control}
                                    name="password2"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <InputX 
                                            placeholder="Repetir Contraseña" 
                                            tipoTeclado="default" 
                                            value={value} 
                                            onChangeText={onChange} // Actualiza el valor del campo
                                            onBlur={onBlur} // Marca el campo como "tocado"
                                            passInp // Campo de contraseña
                                        />
                                    )}
                                />
                                {   errors.password2 && 
                                    <Text style={[styles.labelInputValidation, {color: 'red'}]}>
                                        {errors.password2.message}
                                    </Text>
                                }

                                
                            </View>

                            <View style={{ alignItems: 'center', marginTop: 30, }}>
                                <ButtonX
                                    buttonStyles={{ width: 220, borderWidth: 1, borderColor: '#000', padding: 10 }}
                                    textStyles={{ fontWeight: 'bold' }}
                                    bgColor="#E0F393"
                                    bgColorPressed="#BCB850"
                                    fontSize={18}
                                    onPress={handleSubmit(onSubmit)} // Cambiar a handleSubmit(onSubmit)
                                    >
                                        Confirmar Registro
                                </ButtonX>

                                {/* <ButtonX
                                    buttonStyles={{ width: 140, marginTop: 20, borderWidth: 1, borderColor: '#000', padding: 5 }}
                                    // textStyles={{ fontWeight: 'bold' }}
                                    // bgColor="#E0F393"
                                    bgColorPressed="#B1C464"
                                    fontSize={16}
                                    onPress={ () => { router.back() } } // Cambiar a router.back()
                                    >
                                        Volver atrás
                                </ButtonX> */}
                            </View>
                        </View>

                        {/* FOOTER */}
                        <View style={styles.footer}>
                            
                            <Image source={imagePath.logoICCH} style={styles.imageFooter} />
                        </View>

                    </View>                    
                </ScrollView>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    body:{
        flexGrow: 1,
        marginTop: 4
    },
    footer:{
        alignItems: 'center',
        marginTop: 10,
        opacity: 0.7,
    },
    
    innerContainer: {
        flex: 1, 
        justifyContent: "space-between", 
        // gap: 30
    },
    titleHeader:{ 
        fontSize: 22,
        fontWeight: 'bold' 
    },
    labelInput: { 
        fontSize: 18, 
        marginTop: 15,
        marginBottom: 2,
    },
    labelInputMini:{
        fontSize: 15, 
        paddingLeft: 10,
        opacity: 0.7,
    },
    labelInputValidation:{
        fontSize: 14, 
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    viewInput:{
        paddingHorizontal: 40,
    },
    imageFooter: {
      height: 110,
      width: 110,
      marginTop: -20,
      resizeMode: "contain",
    },

})
