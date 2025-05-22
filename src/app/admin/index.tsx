import { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert, StyleSheet } from "react-native";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';
import app from "../../../credenciales";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";

const db = getFirestore(app);

export default function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const querySnapshot = await getDocs(collection(db, "registros"));
      setUsuarios(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsuarios();
  }, []);

  const cambiarAprobacion = async (id, aprobadoActual) => {
    await updateDoc(doc(db, "registros", id), { aprobado: !aprobadoActual });
    Alert.alert(
      !aprobadoActual ? "Usuario aprobado" : "Autorización retirada",
      !aprobadoActual
        ? "El usuario ahora está autorizado."
        : "El usuario ya no está autorizado."
    );
    setUsuarios(usuarios =>
      usuarios.map(u =>
        u.id === id ? { ...u, aprobado: !aprobadoActual } : u
      )
    );
  };

  return (
    <LinearGradient
      colors={["#fda", "#fda", "#ffc"]}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Solicitudes de usuarios</Text>
        <FlatList
          data={usuarios}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.nombre} {item.apellido}</Text>
              <Text>{item.email}</Text>
              <Text>DNI: {item.dni}</Text>
              <Text>
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
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: { flex: 1, },
  container: { flex: 1, paddingVertical:moderateVerticalScale(20),marginTop:moderateScale(20), paddingHorizontal:moderateScale(10), backgroundColor: "transparent" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { marginVertical: 10, padding: 10, borderWidth: 1, borderRadius: 8, backgroundColor: "#fff8" },
  name: { fontWeight: "bold" },
});