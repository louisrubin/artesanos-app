import { useRouter } from "expo-router";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import imagePath from "../../constants/imagePath";
import { z } from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../../../credenciales"; // Asegúrate de exportar `db` desde credenciales.js
import { useEffect, useState } from "react";

import ModalX from "../../components/Modal";
import InputX from "../../components/InputX";
import ButtonX from "../../components/ButtonX";


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
    const router = useRouter(); // Cambiar a useRouter
    const auth = getAuth();

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

    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoadingActivity, setIsLoadingActivity] = useState(true);
    const [iconButtonModal, setIconButtonModal] = useState(null);
        
    const onSubmit =  async (data: FormData) => {
        setModalMessage("Registrando");
        setIsLoadingActivity(true);
        setIsVisibleModal(true);
        setIconButtonModal(imagePath.arrowRightLogo);
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
              aprobado: false, // Cambia esto según tu lógica
            });
      
            Alert.alert("Registro exitoso", "El usuario ha sido registrado correctamente.");
            router.push("/(auth)/Login"); // Redirigir al login
          } catch (error) {
            console.error("Error al registrar el usuario:", error);
            Alert.alert("Error", "No se pudo registrar el usuario. Inténtalo de nuevo.");
          }
}
    return(
        <View style={styles.container}>

            <ModalX 
            isModalVisible={isVisibleModal}
            title={modalMessage}
            isLoading={isLoadingActivity}
            iconHeader={imagePath.checkCircleLogo}
            onBackdropPress={() => {setIsVisibleModal(!isVisibleModal)}}>
                <ButtonX
                    buttonStyles={{ width: moderateScale(150),
                    marginTop: moderateScale(20), paddingVertical: moderateScale(10),
                    }}
                    fontSize={moderateScale(20)}
                    iconParam={iconButtonModal}
                    iconPosition="left"
                    onPress={ () => {setIsVisibleModal(!isVisibleModal)}  }
                    >
                    Iniciar Sesión
                </ButtonX>
            </ModalX>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.titleHeader}>Formulario de Registro</Text>                
            </View>

            {/* BODY */}
            <View style={styles.body}>
                <ScrollView>
                    
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
                            <Text style={[styles.labelInputValidation, {color: 'red', marginTop: moderateScale(1)}]}>
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
                                    passwordInput // Campo de contraseña
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
                                    passwordInput // Campo de contraseña
                                />
                            )}
                        />
                        {   errors.password2 && 
                            <Text style={[styles.labelInputValidation, {color: 'red'}]}>
                                {errors.password2.message}
                            </Text>
                        }

                        
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <ButtonX
                            buttonStyles={{ width: moderateScale(220), marginTop: 20, borderWidth: 1, borderColor: '#000', padding: 10 }}
                            textStyles={{ fontWeight: 'bold' }}
                            bgColor="#E0F393"
                            bgColorPressed="#BCB850"
                            fontSize={moderateScale(22)}
                            onPress={handleSubmit(onSubmit)} // Cambiar a handleSubmit(onSubmit)
                            >
                                Confirmar Registro
                        </ButtonX>
                    </View>

                    {/* FOOTER */}
                    <View style={styles.footer}>
                        
                        <Image source={imagePath.logoICCH} style={styles.imageFooter} />
                        {/* <Text style={{fontSize: moderateScale(14)}}>UTN FRRe</Text>
                        <Text style={{fontSize: moderateScale(14)}}>Rubín-Zamora</Text> */}
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
    header:{
        marginTop: moderateVerticalScale(50),
        position: 'absolute',
        top: 0,
        alignItems: 'center',
    },
    body:{
        flexGrow: 1,
        marginTop: moderateVerticalScale(95),
        marginBottom: moderateVerticalScale(30),
        width: '100%',
    },
    footer:{
        alignItems: 'center', 
        marginBottom: moderateVerticalScale(20),
        marginTop: moderateVerticalScale(10),
        opacity: 0.7,
    },
    titleHeader:{ 
        fontSize: moderateScale(30),
        fontWeight: 'bold' 
    },
    labelInput: { 
        fontSize: moderateScale(25), 
        marginTop: moderateScale(15),
        marginBottom: 2,
    },
    labelInputMini:{
        fontSize: moderateScale(15), 
        paddingLeft: moderateScale(10),
        opacity: 0.7,
    },
    labelInputValidation:{
        fontSize: moderateScale(15), 
        paddingLeft: moderateScale(10),
        fontWeight: 'bold',
    },
    viewInput:{
        paddingHorizontal: moderateScale(40),
    },
    imageFooter: {
      height: moderateScale(100),
      width: moderateScale(100),
      marginBottom: moderateScale(-40),
      resizeMode: "contain",
    },

})
