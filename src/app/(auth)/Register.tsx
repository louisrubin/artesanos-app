import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ButtonX from "../../components/ButtonX";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import InputX from "../../components/InputX";
import imagePath from "../../constants/imagePath";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

// function LabelStatusPassword(props){
//     let status = props.status;
//     let colorStatus = status ? 'green' : 'red';
//     let message = status ? 'Las contraseñas coinciden ✅' : 'Las contraseñas no coinciden ❌';
//     return(
//         <Text style={[styles.labelInputMini, {color: colorStatus, fontWeight: 'bold'}]}>
//             {message}
//         </Text>
//     )
// }

const minLengthPassword = 6; // Longitud máxima de la contraseña

const esquema = z.object({
    nombre: z.string().min(1, { message: "Campo requerido" }),
    apellido: z.string().min(1, { message: "Campo requerido" }),
    dni: z.string().length(8, { message: "El DNI debe tener 8 dígitos" }),
    email: z.string().email({ message: "Correo no válido" }),
    password: z.string().min(minLengthPassword, { message: `Mínimo ${minLengthPassword} caracteres` }),
    password2: z.string().min(minLengthPassword, { message: `Mínimo ${minLengthPassword} caracteres` })
});

type FormData = z.infer<typeof esquema>; // Inferir el tipo de datos del esquema

const RegisterScreen = () => {
    const router = useRouter(); // Cambiar a useRouter

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(esquema),
        defaultValues: {    // Valores por defecto para el formulario
            nombre: '',
            apellido: '',
            dni: '',
            email: '',
            password: '',
            password2: ''
        },
    });

    const onSubmit = (data: FormData) => {
        router.push('/(auth)/Login'); // Cambiar a router.push('/main/pantallaPrincipal')
    }

    return(
        <View style={styles.container}>

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
                            <Text style={styles.labelErrorInput}>
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
                            <Text style={styles.labelErrorInput}>
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
                                />
                            )}
                        />
                        {   errors.dni && 
                            <Text style={styles.labelErrorInput}>
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
                            <Text style={[styles.labelErrorInput, {marginTop: moderateScale(1)}]}>
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
                                    secureTextEntry={true} // Campo de contraseña
                                />
                            )}
                        />
                        {   errors.password && 
                            <Text style={styles.labelErrorInput}>
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
                                    secureTextEntry={true} // Campo de contraseña
                                />
                            )}
                        />
                        {   errors.password2 && 
                            <Text style={styles.labelErrorInput}>
                            {errors.password2.message}
                            </Text>
                        }
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <ButtonX
                            buttonStyles={{ width: moderateScale(220), marginTop: 20, borderWidth: 1, borderColor: '#000', padding: 10 }}
                            textStyles={{ fontWeight: 'bold' }}
                            color="#E0F393"
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

export default RegisterScreen;



// function RegisterScreennnnnnnnnnn() {   
//     const router = useRouter(); // Cambiar a useRouter
    
//     // const [form, setForm] = useState({
//     //     nombre: '',
//     //     apellido: '',
//     //     dni: '',
//     //     email: '',
//     //     password: '',
//     //     password2: ''
//     // }); // Estado para el formulario


//     return(
//         <View style={styles.container}>

//             {/* HEADER */}
//             <View style={styles.header}>
//                 <Text style={styles.titleHeader}>Formulario de Registro</Text>
                
//             </View>

//             {/* BODY */}
//             <View style={styles.body}>
//                 <ScrollView>
                    
//                     <View style={styles.viewInput}>
//                         <Text style={styles.labelInput}>Nombres</Text>
//                         <InputX placeholder="Ingrese Nombres" tipoTeclado="default" value={null} />
//                     </View>

//                     <View style={styles.viewInput}>
//                         <Text style={styles.labelInput}>Apellidos</Text>
//                         <InputX placeholder="Ingrese Apellidos" tipoTeclado="default" value={null} />
//                     </View>

//                     <View style={styles.viewInput}>
//                         <Text style={styles.labelInput}>DNI</Text>
//                         <InputX placeholder="Ingrese DNI" tipoTeclado='number-pad' maxLength={8} value={null} />
//                     </View>

//                     <View style={styles.viewInput}>
//                         <Text style={styles.labelInput}>Correo Electrónico</Text>
//                         <InputX placeholder="Ingrese Correo Electrónico" tipoTeclado='email-address' value={null} />
//                         <Text style={styles.labelInputMini}>Este correo se usará para ingresar a su cuenta.</Text>
//                     </View>

//                     <View style={styles.viewInput}>
//                         <Text style={styles.labelInput}>Contraseña</Text>
//                         <InputX placeholder="Ingrese Contraseña" tipoTeclado='default' value={password} onChangeText={setPassword} secureTextEntry />
//                         <LabelStatusPassword status={statusPass} />
//                     </View>
                    
//                     <View style={styles.viewInput}>
//                         <Text style={styles.labelInput}>Repetir Contraseña</Text>
//                         <InputX placeholder="Repetir Contraseña" tipoTeclado='default' value={password2} onChangeText={setPassword2} secureTextEntry />
//                         <LabelStatusPassword status={statusPass} />
//                     </View>

//                     <View style={{ alignItems: 'center' }}>
//                         <ButtonX
//                             buttonStyles={{ width: moderateScale(220), marginTop: 20, borderWidth: 1, borderColor: '#000', padding: 10 }}
//                             textStyles={{ fontWeight: 'bold' }}
//                             color="#E0F393"
//                             bgColorPressed="#BCB850"
//                             fontSize={moderateScale(22)}
//                             onPress={handleRegister}>
//                                 Confirmar Registro
//                         </ButtonX>
//                     </View>

//                     {/* FOOTER */}
//                     <View style={styles.footer}>
                        
//                         <Image source={imagePath.logoICCH} style={styles.imageFooter} />
//                         {/* <Text style={{fontSize: moderateScale(14)}}>UTN FRRe</Text>
//                         <Text style={{fontSize: moderateScale(14)}}>Rubín-Zamora</Text> */}
//                     </View>

//                 </ScrollView>

//             </View>

//         </View>
//     )
// }

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        // backgroundColor: VerdeAgricultura,
    },
    header:{
        marginTop: moderateVerticalScale(50),
        position: 'absolute',
        top: 0,
        alignItems: 'center',
    },
    body:{
        flexGrow: 1,
        // paddingRight: moderateScale(10),
        // paddingLeft: moderateScale(40),
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
        marginTop: moderateScale(-10),
        paddingLeft: moderateScale(10),
        opacity: 0.7,
    },
    labelErrorInput: {
        fontSize: moderateScale(15), 
        marginTop: moderateScale(-10),
        paddingLeft: moderateScale(10),
        fontWeight: 'bold',
        color: 'red',
    },
    imageFooter: {
      height: moderateScale(100),
      width: moderateScale(100),
      marginBottom: moderateScale(-40),
      resizeMode: "contain",
    },
    viewInput:{
        paddingHorizontal: moderateScale(40),
    },

})