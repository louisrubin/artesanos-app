import { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { collection, getDocs, updateDoc, doc, } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { auth, database } from "../../../credenciales";
import { format } from "date-fns";

export default function AdminPanel() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
      try{
         setLoading(true);
         const fetchUsuarios = async () => {
            const querySnapshot = await getDocs(collection(database, "registros"));
            setUsuarios(
               querySnapshot.docs
                  .filter( (doc) => doc.id !== auth.currentUser.uid)  // Excluir al usuario actual
                  .map( (doc) => ({ id: doc.id, ...doc.data() }))
            );
         };
         fetchUsuarios();
         setLoading(false);
      } catch(err) {
         console.log(err);
         setLoading(false);
      }        
   }, []);
    
    
    const cambiarAprobacion = async (id, aprobadoActual) => {
         await updateDoc(doc(database, "registros", id), { aprobado: !aprobadoActual });
         Alert.alert(
         !aprobadoActual ? "Usuario aprobado" : "Autorización retirada",
         !aprobadoActual
               ? "El usuario ahora está autorizado."
               : "El usuario ya no está autorizado."
         );
         setUsuarios((usuarios) =>
            usuarios.map((user) =>
                  user.id === id ? { ...user, aprobado: !aprobadoActual } : user
            )
         );
    };

    return (
        <LinearGradient
        colors={["#fda", "#fda", "#ffc"]}
        style={{ flex: 1 }}
        >
        <View style={styles.container}>

         { loading ? (
            <View style={{marginTop: 100}}>
               <ActivityIndicator size={42} color={"#000"} />
            </View>
         ) : (
            <FlatList
            data={usuarios}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
               <View style={[styles.card, index === usuarios.length -1 && {marginBottom: 60} ]}>
                  <Text style={{fontWeight: "bold"}}>
                     {item.nombre} {item.apellido}
                  </Text>
                  <Text>{item.email}</Text>
                  <Text>DNI: {item.dni}</Text>
                  <Text>{item.fechaRegistro ? format(item.fechaRegistro, "dd/MM/yyyy - hh:mm") : null }</Text>
                  <Text style={{ marginBottom: 5 }}>
                     Estado:{" "}
                     <Text style={{ color: item.aprobado ? "green" : "red" }}>
                        {item.aprobado ? "Autorizado" : "Pendiente"}
                     </Text>
                  </Text>

                  <Button
                     title={item.aprobado ? "Quitar autorización" : "Aprobar"}
                     color={item.aprobado ? "#d9534f" : "#5cb85c"}
                     onPress={() => cambiarAprobacion(item.id, item.aprobado)}
                  />
               </View>
            )}
            />
         )}
            
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    title: { 
        fontSize: 22, 
        fontWeight: "bold",
        marginLeft: 12 
    },
    card: {
        marginVertical: 10,
        marginHorizontal: 12,
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#fff8",
    },
});
