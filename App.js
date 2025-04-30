// import { StatusBar } from 'expo-status-bar';
// import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
// import ButtonX from './src/components/ButtonX';
// import InputX from './src/components/InputX';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import imagePath from './src/constants/imagePath';

// export default function App() {
//     return (
//       <SafeAreaProvider>
//         <LinearGradient 
//           colors={["#C8D29C", "#8A9A46", "#8A9A46"]}
//           style={styles.container}
//         >
//           {/* HEADER */}
//           <View style={styles.header}>
//             <Image source={imagePath.logoGobChaco} style={styles.imageHeader} />
//           </View>
  
//           {/* BODY que se adapta al teclado */}
//           <KeyboardAvoidingView
//             style={styles.flexBody}
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           >
//             <View style={styles.body}>
//               <Text style={styles.label}>Correo Electrónico</Text>
//               <InputX placeholder="Ingrese Correo Electrónico" tipoTeclado='email-address' />
  
//               <Text style={styles.label}>Contraseña</Text>
//               <InputX placeholder="Ingrese Contraseña" secureTextEntry={true} />
  
//               <ButtonX 
//                 buttonStyles={{ width: '80%', marginTop: 40, borderWidth: 1,
//                     borderColor: '#000', }}
//                 textStyles={{ color: 'fff', fontSize: 22 }}
//                 bgColorPressed="#0a7ea4"
//                 iconParam={imagePath.iconLogin}
//               >
//                 Iniciar Sesión
//               </ButtonX>
  
//               <Text style={styles.labelRegistrarse}>o Registrarse</Text>
//             </View>
//           </KeyboardAvoidingView>
  
//           {/* FOOTER */}
//           <View style={styles.footer}>
//             <Image source={imagePath.logoICCH} style={styles.imageFooter} />
//             <Text>TUP-2025</Text>
//             <Text>@Rubin-Zamora</Text>
//           </View>
  
//           <StatusBar style="auto" />
//         </LinearGradient>
//       </SafeAreaProvider>
//     );
//   }
  

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       paddingTop: 40,
//       paddingBottom: 20,
//     },
//     header: {
//       alignItems: 'center',
//       marginBottom: 10,
//     },
//     flexBody: {
//       flex: 1,
//       justifyContent: 'center',
//       paddingHorizontal: 40,
//     },
//     body: {
//         marginTop: -170,
//         alignItems: 'center',
//     },
//     footer: {
//       alignItems: 'center',
//       marginTop: 10,
//     },
//     imageHeader: {
//         marginTop: -120,
//         height: 400,
//         width: 400,
//         resizeMode: "contain",
//     },
//     imageFooter: {
//       height: 170,
//       width: 170,
//       resizeMode: "contain",
//     },
//     label: {
//       textAlign: 'left',
//       width: '100%',
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 8,
//       marginTop: 20,
//     },
//     labelRegistrarse: {
//       fontSize: 20, 
//       marginTop: 26, 
//       textDecorationLine: 'underline',
//     }
//   });

  

