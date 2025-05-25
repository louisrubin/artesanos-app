import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Instala si no lo tienes
import ButtonX from '../../components/ButtonX';
import InputX from '../../components/InputX';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../../credenciales"; // Ajusta la ruta a tu archivo de credenciales

const preguntas = [
    //Información básica
  { key: "pregunta1", label: "Nombres" },
  { key: "pregunta2", label: "Apellidos"},
  { key: "pregunta3", label: "DNI"},
  { key: "pregunta4", label: "CUIT/CUIL"},
  { key: "pregunta5", label: "Genero", type: "select", options: ["Masculino", "Femenino", "Otro"] },
  { key: "pregunta6", label: "Fecha de nacimiento", type: "date" },
  // Información de contacto
  { key: "pregunta7", label: "Teléfono" },
  { key: "pregunta8", label: "Correo Electrónico" },
  { key: "pregunta9", label: "Domicilio" },
  { key: "pregunta10", label: "Localidad" },
  // Práctica artesanal
  { key: "pregunta11", label: "Rama productiva (Rubro)" },
  { key: "pregunta12", label: "Oficio/Especialidad" },
  { key: "pregunta13", label: "Descripción decorativa/Utilitaria" },
  // Materiales y técnicas
  { key: "pregunta14", label: "Materia prima principal" },
  { key: "pregunta15", label: "Materia prima secundaria" },
  { key: "pregunta16", label: "Tintes que utiliza" },
  { key: "pregunta17", label: "Tecnicas artesanales que utiliza" },
  { key: "pregunta18", label: "Fusion de tecnicas" },
  // Conocimiento y experiencia
  { key: "pregunta19", label: "¿De quién aprendió la técnica?" },
  { key: "pregunta20", label: "Años de trayectoria" },
  { key: "pregunta21", label: "¿Dicta talleres o enseña la técnica?", type: "select", options: ["Sí", "No"] },
  { key: "pregunta22", label: "Logros en su trayectoria artesanal" },
  // Estado civil y familia
  { key: "pregunta23", label: "Estado civil", type: "select", options: ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a", "Otro"] },
  { key: "pregunta24", label: "¿Tiene hijos?", type: "select", options: ["Sí", "No"] },
  { key: "pregunta25", label: "Número de hijos" },
  { key: "pregunta26", label: "¿La actividad artesanal es el principal ingreso en su hogar?", type: "select", options: ["Sí", "No"] },
  { key: "pregunta27", label: "Otro ingreso" },
  // Educación y obra social
  { key: "pregunta28", label: "¿Posee estudios académicos?", type: "select", options: ["Sí", "No"] },
  { key: "pregunta29", label: "Nivel de estudios alcanzados", type: "select", options: ["Primario", "Secundario", "Terciario", "Universitario", "Otro"] },
  { key: "pregunta30", label: "¿Posee obra social, asignaciones y/o pensiones?", type: "select", options: ["Sí", "No"] },
  // Comercialización
  { key: "pregunta31", label: "¿Posee algún punto de venta cercano?", type: "select", options: ["Sí", "No"] },
  { key: "pregunta32", label: "¿Cómo y dónde comercializa los productos?" },
  { key: "pregunta33", label: "Ferias o eventos donde ha participado" },
  { key: "pregunta34", label: "¿Ha realizado venta mayorista?", type: "select", options: ["Sí", "No"] },
  // Asociaciones y marcas
  { key: "pregunta35", label: "¿Integra alguna asociación o colectivo de personas artesanas?", type: "select", options: ["Sí", "No"] },
  { key: "pregunta36", label: "¿Asociación o colectivo?" },
  { key: "pregunta37", label: "¿Tiene marca o etiqueta individual o colectiva?", type: "select", options: ["Sí", "No"] },
  { key: "pregunta38", label: "¿Marca o etiqueta?" },
  // Materia prima y familia
  { key: "pregunta39", label: "¿Dónde realiza la extracción de la materia prima?" },
  { key: "pregunta40", label: "¿Cuántas personas artesanas hay en su familia?" },
  // Registro e identificación
  { key: "pregunta41", label: "¿Pertenece a Pueblos Originarios?", type: "select", options: ["Sí", "No"] },
  { key: "pregunta42", label: "¿Pueblo originario?" },
  { key: "pregunta43", label: "Profesión/Ocupación" },
  // Información adicional
  { key: "pregunta44", label: "Redes Sociales" },
  { key: "pregunta45", label: "¿Tiene carnet de artesano?", type: "select", options: ["Sí", "No"] },
  { key: "pregunta46", label: "¿Está inscripto en AFIP?", type: "select", options: ["Sí", "No"] },
  { key: "pregunta47", label: "¿Es proveedor del estado?", type: "select", options: ["Sí", "No"] },
];
const preguntasPorPagina = [6, 4, 3, 5, 4, 5, 3, 4, 4, 2, 3, 4]; // suma 50
const titulosPorPagina = [
  "Informacion Básica",//6
  "Información de contacto", //4
  "Practica Artesanal",//3
  "Materiales y tecnicas",//5
  "Conocimiento y experiencia",//4
  "Información socio-económica",//3
  "Educación y obras sociales",//4
  "Comercialización",//4
  "Asociaciones y marcas",//4
  "Materia prima y familia",//2
  "Registro e identificación",//3
  "información adicional",//4

  // ...agrega tantos títulos como páginas tengas
];

export default function Encuestas() {
  const [pagina, setPagina] = useState(0);
  const [respuestas, setRespuestas] = useState(
    Object.fromEntries(preguntas.map(p => [p.key, ""]))
  );
  const [showDatePicker, setShowDatePicker] = useState<string | null>(null);
  const db = getFirestore(app);

  // Función para guardar en Firestore
  const guardarEncuesta = async () => {
    try {
      await addDoc(collection(db, "encuestas"), {
        respuestas,
        fecha: new Date().toISOString(),
      });
      alert("¡Encuesta guardada correctamente!");
      // Opcional: limpiar respuestas o navegar a otra pantalla
    } catch (error) {
      alert("Error al guardar la encuesta");
      console.error(error);
    }
  };

  const getPreguntasPagina = () => {
    let start = 0;
    for (let i = 0; i < pagina; i++) {
      start += preguntasPorPagina[i];
    }
    const end = start + preguntasPorPagina[pagina];
    return preguntas.slice(start, end);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <LinearGradient colors={["#fff", "#fdf6e3", "#ffe"]} style={styles.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={styles.card}>
              <Text style={styles.title}>
                {titulosPorPagina[pagina] || "Encuesta"}
              </Text>
              {getPreguntasPagina().map((pregunta) => (
                <View key={pregunta.key} style={{ marginBottom: 12 }}>
                  <Text style={styles.label}>{pregunta.label}</Text>
                  {pregunta.type === "select" ? (
                    <Picker
                      selectedValue={respuestas[pregunta.key]}
                      onValueChange={value => setRespuestas({ ...respuestas, [pregunta.key]: value })}
                      style={{ backgroundColor: "#fff" }}
                    >
                      <Picker.Item label="Seleccione..." value="" />
                      {pregunta.options.map(opt => (
                        <Picker.Item key={opt} label={opt} value={opt} />
                      ))}
                    </Picker>
                  ) : pregunta.type === "date" ? (
                    <>
                      <ButtonX
                        onPress={() => setShowDatePicker(pregunta.key)}
                        buttonStyles={{ marginBottom: 8 }}
                      >
                        {respuestas[pregunta.key]
                          ? respuestas[pregunta.key]
                          : "Seleccionar fecha"}
                      </ButtonX>
                      {showDatePicker === pregunta.key && (
                        <DateTimePicker
                          value={
                            respuestas[pregunta.key]
                              ? new Date(
                                  respuestas[pregunta.key].split("/").reverse().join("-")
                              )
                              : new Date(2000, 0, 1)
                          }
                          mode="date"
                          display="default"
                          maximumDate={new Date()}
                          onChange={(event, date) => {
                            setShowDatePicker(null);
                            if (date) {
                              const day = String(date.getDate()).padStart(2, "0");
                              const month = String(date.getMonth() + 1).padStart(2, "0");
                              const year = date.getFullYear();
                              setRespuestas({
                                ...respuestas,
                                [pregunta.key]: `${day} / ${month} / ${year}`,
                              });
                            }
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <InputX
                      value={respuestas[pregunta.key]}
                      onChangeText={text => setRespuestas({ ...respuestas, [pregunta.key]: text })}
                      placeholder="Respuesta"
                    />
                  )}
                </View>
              ))}
              <View style={styles.buttonRow}>
                <ButtonX
                  onPress={() => setPagina(pagina - 1)}
                  disabled={pagina === 0}
                  fontSize={18}
                  buttonStyles={{ marginRight: 10, width: 120 }}
                >
                  Atrás
                </ButtonX>
                {pagina === preguntasPorPagina.length - 1 ? (
                  <ButtonX
                    onPress={guardarEncuesta}
                    fontSize={18}
                    buttonStyles={{ width: 120 }}
                  >
                    Finalizar
                  </ButtonX>
                ) : (
                  <ButtonX
                    onPress={() => setPagina(pagina + 1)}
                    disabled={pagina === preguntasPorPagina.length - 1}
                    fontSize={18}
                    buttonStyles={{ width: 120 }}
                  >
                    Avanzar
                  </ButtonX>
                )}
              </View>
              <Text style={styles.paginador}>
                Página {pagina + 1} / {preguntasPorPagina.length}
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { backgroundColor: "#fff8", padding: 24, borderRadius: 16, width: "90%" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, marginTop: 16 },
  label: { fontSize: 18, marginBottom: 6 },
  buttonRow: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  paginador: { marginTop: 16, fontSize: 16, color: "#888" },
});