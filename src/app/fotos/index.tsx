import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

const labels = [
  "DNI Frente",
  "DNI Dorso",
  "Persona",
  "Artesanía"
];

const getFileSize = (fileSize: number): string => {
   // retornar string del tamaño del archivo
   if (fileSize <= 1024 * 1024 ){
      const sizeKB = (fileSize / 1024).toFixed(2);
      return `${sizeKB} KB`;
   }
   return `${(fileSize / (1024*1024)).toFixed(2)} MB`;
}

export default function CargaFotos({ fotosState, setFotosState }) {
//   const [imagenes, setImagenes] = useState<(ImagePicker.ImagePickerAsset | null)[]>([null, null, null, null]);

   const pickImage = async (idx: number) => {
      let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 0.3,
      });

      if (!result.canceled && result.assets ) { //&& result.assets[0]?.uri
         // const asset = result.assets[0];
         const updatedFotos = [...fotosState];    // Copia del estado
         updatedFotos[idx] = result.assets[0].uri;  // Actualiza en la posición adecuada
         setFotosState(updatedFotos);   // Actualiza el estado en el padre
      }
   };

//   const handleUploadAll = async () => {
//     try {
//       const urls: (string | null)[] = [];
//       for (let i = 0; i < imagenes.length; i++) {
//         if (imagenes[i]) {
//           try {
//             const url = await uploadImageAsync(imagenes[i].uri!, `foto_${i}_${Date.now()}.jpg`);
//             urls[i] = url;
//           } catch (err) {
//             alert(`Error subiendo la foto ${labels[i]}`);
//             urls[i] = null;
//           }
//         } else {
//           urls[i] = null;
//         }
//       }
//       if (setUrlFotos) setUrlFotos(urls);
//       alert("¡Fotos subidas correctamente!");
//     } catch (err) {
//       alert("Ocurrió un error al subir las fotos.");
//       console.error(err);
//     }
//   };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {labels.map((label, idx) => (
        <View key={idx} style={styles.fotoContainer}>
          <Text style={styles.label}>{label}</Text>
          { fotosState[idx] && (
            <View style={{ position: "relative", marginBottom: 8 }}>

              <Image source={{ uri: fotosState[idx]! }} style={styles.image} />
              {/* <Text style={{textAlign: "center",}}>{
               `${fotosState[idx]?.fileName.slice(0,20)}... (${getFileSize(fotosState[idx]!.fileSize!)})`}
               </Text> */}

               <TouchableOpacity
                  style={{
                     position: "absolute",
                     top: 5,
                     right: 5,
                     backgroundColor: "rgba(255,255,255,0.7)",
                     borderRadius: 16,
                     padding: 2,
                  }}
                  onPress={() => {
                     const nuevas = [...fotosState];
                     nuevas[idx] = null;
                     setFotosState(nuevas);
                  }}
               >
                  <Feather name="x-circle" size={28} color="#d00" />
               </TouchableOpacity>
            </View>
          )}

          { // SIN SELECCIONAR IMAGEN
            !fotosState[idx] && (
               <View style={{ flexDirection: "row", gap: 16, marginTop: 8 }}>
                  <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => pickImage(idx)}
                  >
                     <Feather name="image" size={32} color="#555" />
                     <Text style={{ fontSize: 20 }}>Galería</Text>
                  </TouchableOpacity>
               </View>
            )
          }
          
        </View>
      ))}
        {/* <ButtonX onPress={handleUploadAll} buttonStyles={{ marginTop: 20 }}>
          Subir fotos a Firebase
        </ButtonX> */}
    </View>
  );
}

// Sube una imagen a Firebase Storage y retorna la URL de descarga
// async function uploadImageAsync(uri: string, filename: string): Promise<string> {
//   const response = await fetch(uri);
//   const blob = await response.blob();
//   const storageRef = ref(storage, filename);
//   await uploadBytes(storageRef, blob);
//   const downloadURL = await getDownloadURL(storageRef);
//   return downloadURL;
// }

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
    width: 250,
    height: 190,
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
      width: 200,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 10,
      backgroundColor: "#ddd",
      marginHorizontal: 8,

      borderWidth: 1,
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