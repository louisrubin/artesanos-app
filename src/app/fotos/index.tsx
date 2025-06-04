import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ButtonX from "../../components/ButtonX";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../../credenciales"; 
import { Feather } from "@expo/vector-icons";

const storage = getStorage(app);
const db = getFirestore(app);

const labels = [
  "DNI Frente",
  "DNI Dorso",
  "Persona",
  "Artesania"
];

export default function FotosDNI({ onFotosSubidas }) {
  const [imagenes, setImagenes] = useState<(string | null)[]>([null, null, null, null]);

  const pickImage = async (idx: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // Solo imágenes
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      const nuevas = [...imagenes];
      nuevas[idx] = result.assets[0].uri;
      setImagenes(nuevas);
    }
  };

  const handleUploadAll = async () => {
    try {
      const urls: (string | null)[] = [];
      for (let i = 0; i < imagenes.length; i++) {
        if (imagenes[i]) {
          try {
            const url = await uploadImageAsync(imagenes[i]!, `foto_${i}_${Date.now()}.jpg`);
            urls[i] = url;
          } catch (err) {
            alert(`Error subiendo la foto ${labels[i]}`);
            urls[i] = null;
          }
        } else {
          urls[i] = null;
        }
      }
      if (onFotosSubidas) onFotosSubidas(urls);
      alert("¡Fotos subidas correctamente!");
    } catch (err) {
      alert("Ocurrió un error al subir las fotos.");
      console.error(err);
    }
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {labels.map((label, idx) => (
        <View key={idx} style={styles.fotoContainer}>
          <Text style={styles.label}>{label}</Text>
          {imagenes[idx] && (
            <View style={{ position: "relative", marginBottom: 8 }}>
              <Image source={{ uri: imagenes[idx]! }} style={styles.image} />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderRadius: 16,
                  padding: 2,
                }}
                onPress={() => {
                  const nuevas = [...imagenes];
                  nuevas[idx] = null;
                  setImagenes(nuevas);
                }}
              >
                <Feather name="x-circle" size={28} color="#d00" />
              </TouchableOpacity>
            </View>
          )}
          <View style={{ flexDirection: "row", gap: 16, marginTop: 8 }}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => pickImage(idx)}
            >
              <Feather name="image" size={28} color="#555" />
              <Text style={{ fontSize: 12 }}>Galería</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
        {/* <ButtonX onPress={handleUploadAll} buttonStyles={{ marginTop: 20 }}>
          Subir fotos a Firebase
        </ButtonX> */}
    </View>
  );
}

// Sube una imagen a Firebase Storage y retorna la URL de descarga
async function uploadImageAsync(uri: string, filename: string): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fotoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  buttonLarge: {
    width: 220,
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 140,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f3f3f3",
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});