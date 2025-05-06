// import { Image, Text, View, StyleSheet } from "react-native";
// // import Constants from 'expo-constants';     // acceder a constantes del dispositivo
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { USUARIO_VALIDO } from '../constants/bd'; // importás el usuario válido

// import logoGogChaco from "../assets/logo-gobierno-chaco.png";
// import logoICCH from "../assets/logo-icch.png";
// import ButtonX from "./ButtonX";
// import InputX from "./InputX";
// import { useState } from "react";

// import * as SplashScreen from 'expo-splash-screen';

// // Keep the splash screen visible while we fetch resources
// // SplashScreen.preventAutoHideAsync();


// export default function Main() {
//     const insets = useSafeAreaInsets(); // brinda la separacion top/bottom dispositivo (no chocar con barra notif)
//     const [correo, setCorreo] = useState("");
//     const [passw, setPassw] = useState("");

//     const handleLogin = () => {
//         if (correo === USUARIO_VALIDO.correo && passw === USUARIO_VALIDO.contrasena) {
//           alert('Inicio de sesión exitoso', 'Inicio de sesión exitoso');
//           // Aquí podrías redirigir a otra pantalla
//         } else {
//           alert('Correo o contraseña incorrectos', 'Correo o contraseña incorrectos');
//         }
//       };

//     return (
//         <>
//             <View style={{ alignItems: "center", backgroundColor: "#C8D29C", paddingTop: insets.top, paddingBottom: insets.bottom }}>
//                 <Image source={logoICCH} style={styles.image} />

//                 <View style={{width: 350 ,alignItems: "center"}}>
//                     {/* <Text>desarrollando app desde plantilla vacía</Text> */}
//                     {/* <Button title="Agregar" onPress={() => alert("Hola mundo")} /> */}
                    
//                     <View>
//                         <Text style={styles.textLabel}>Correo Electrónico</Text>
//                         <InputX value={correo} placeholder={"Correo"} 
//                             tipoTeclado={"email-address"} onChangeText={setCorreo} />
                        
//                         <Text style={styles.textLabel}>Contraseña</Text>
//                         <InputX value={passw} placeholder={"Contraseña"} 
//                             secureTextEntry={true} onChangeText={setPassw}/>
//                     </View>

//                     <View style={{marginTop: 30}}>
//                         <ButtonX 
//                             onPress={handleLogin}
//                             buttonStyles={styles.buttonStyles}
//                             textStyles={styles.textStyles}
//                             bgColorPressed={"#8A9A46"}
//                             >Iniciar Sesión 
//                         </ButtonX>
//                     </View>
//                 </View>
                
//                 <View style={{ marginTop: 200}}>
//                     <Image source={logoGogChaco} style={styles.image} />
//                 </View>
//             </View>

            
//         </>
//     );
// }

// const styles = StyleSheet.create({
//     mainContainer: { 
//     },
//     image: {
//         height: 230,
//         width: 230,
//         resizeMode: "contain",
//     },
//     buttonStyles: {
//         borderWidth: 1,
//         borderColor: "#000",
//         borderRadius: 30,
        
//     },
//     textStyles: {
//         fontSize: 23,
//         color: "black",
//     },
//     textLabel: {
//         fontSize: 22,
//         color: "white",
//         marginBottom: 2,
//     }
// });
