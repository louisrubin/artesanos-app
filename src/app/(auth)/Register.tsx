import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ButtonX from "../../components/ButtonX";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { VerdeAgricultura } from "../../constants/colors";
import InputX from "../../components/InputX";
import imagePath from "../../constants/imagePath";
import { useState } from "react";

function LabelStatusPassword(props){
    let status = props.status;
    let colorStatus = status ? 'green' : 'red';
    let message = status ? 'Las contraseñas coinciden ✅' : 'Las contraseñas no coinciden ❌';
    return(
        <Text style={[styles.labelInputMini, {color: colorStatus, fontWeight: 'bold'}]}>
            {message}
        </Text>
    )
}


export default function RegisterScreen() {    
  const router = useRouter(); // Cambiar a useRouter
  const [statusPass, setStatusPass] = useState(true); // Estado para la contraseña
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleRegister = () => {
    if (password !== password2) {
      setStatusPass(false);
    } else {
      setStatusPass(true);
    }
  };

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
                        <InputX placeholder="Ingrese Nombres" tipoTeclado="default" value={null} />
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.labelInput}>Apellidos</Text>
                        <InputX placeholder="Ingrese Apellidos" tipoTeclado="default" value={null} />
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.labelInput}>DNI</Text>
                        <InputX placeholder="Ingrese DNI" tipoTeclado='number-pad' maxLength={8} value={null} />
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.labelInput}>Correo Electrónico</Text>
                        <InputX placeholder="Ingrese Correo Electrónico" tipoTeclado='email-address' value={null} />
                        <Text style={styles.labelInputMini}>Este correo se usará para ingresar a su cuenta.</Text>
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.labelInput}>Contraseña</Text>
                        <InputX placeholder="Ingrese Contraseña" tipoTeclado='default' value={password} onChangeText={setPassword} secureTextEntry />
                        <LabelStatusPassword status={statusPass} />
                    </View>
                    
                    <View style={styles.viewInput}>
                        <Text style={styles.labelInput}>Repetir Contraseña</Text>
                        <InputX placeholder="Repetir Contraseña" tipoTeclado='default' value={password2} onChangeText={setPassword2} secureTextEntry />
                        <LabelStatusPassword status={statusPass} />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <ButtonX
                            buttonStyles={{ width: moderateScale(220), marginTop: 20, borderWidth: 1, borderColor: '#000', padding: 10 }}
                            textStyles={{ fontWeight: 'bold' }}
                            color="#E0F393"
                            bgColorPressed="#BCB850"
                            fontSize={moderateScale(22)}
                            onPress={handleRegister}>
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