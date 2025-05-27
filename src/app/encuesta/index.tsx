import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ButtonX from '../../components/ButtonX';
import InputX from '../../components/InputX';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { app } from "../../../credenciales";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import imagePath from "../../constants/imagePath";
import { format } from "date-fns";

const preguntas = [
    // Información básica
    { key: "nombres", label: "Nombres" },
    { key: "apellidos", label: "Apellidos" },
    { key: "dni", label: "DNI" },
    { key: "cuil", label: "CUIT/CUIL" },
    { key: "genero", label: "Género", type: "select", options: ["Masculino", "Femenino", "Otro"] },
    { key: "fecha_nacimiento", label: "Fecha de nacimiento", type: "date" },

    // Información de contacto
    { key: "telefono", label: "Teléfono" },
    { key: "email", label: "Correo Electrónico" },
    { key: "domicilio", label: "Domicilio" },
    { key: "localidad", label: "Localidad" },

    // Información socioeconómica
    { key: "estado_civil", label: "Estado civil", type: "select", options: ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a", "Otro"] },
    { key: "tiene_hijos", label: "¿Tiene hijos?", type: "select", options: ["Sí", "No"] },
    { key: "cantidad_hijos", label: "Número de hijos" },
    { key: "activ_artesan_ingreso_princ", label: "¿La actividad artesanal es el principal ingreso en su hogar?", type: "select", options: ["Sí", "No"] },
    { key: "otro_ingreso", label: "Otro ingreso" },

    // Práctica artesanal
    { key: "rama_productiva", label: "Rama productiva (Rubro)" },
    { key: "especialidad", label: "Oficio/Especialidad" },
    { key: "descripcion_decorativa", label: "Descripción decorativa/Utilitaria" },

    // Materiales y técnicas
    { key: "materia_prima_prin", label: "Materia prima principal" },
    { key: "materia_prima_secun", label: "Materia prima secundaria" },
    { key: "tintes_que_usa", label: "Tintes que utiliza" },
    { key: "tecnicas_artesanal", label: "Técnicas artesanales que utiliza" },
    { key: "fusion_tecnicas", label: "Fusión de técnicas" },

    // Conocimiento y experiencia
    { key: "transmision_saberes", label: "¿De quién aprendió la técnica?" },
    { key: "anios_trayectoria", label: "Años de trayectoria" },
    { key: "dicta_talleres", label: "¿Dicta talleres o enseña la técnica?", type: "select", options: ["Sí", "No"] },
    { key: "logros_trayectoria", label: "Logros en su trayectoria artesanal" },

    // Educación y obra social
    { key: "posee_estudios", label: "¿Posee estudios académicos?", type: "select", options: ["Sí", "No"] },
    { key: "nivel_estudios", label: "Nivel de estudios alcanzados", type: "select", options: ["Primario", "Secundario", "Terciario", "Universitario", "Otro"] },
    { key: "posee_obra_soc_pencion", label: "¿Posee obra social, asignaciones y/o pensiones?", type: "select", options: ["Sí", "No"] },
    { key: "obra_social_pension", label: "Obra social, asignaciones y/o pensiones" },

    // Comercialización
    { key: "posee_punto_venta_cerca", label: "¿Posee algún punto de venta cercano?", type: "select", options: ["Sí", "No"] },
    { key: "punto_venta_cercano", label: "Punto de venta cercano" },
    { key: "como_comercializa", label: "¿Cómo y dónde comercializa los productos?" },
    { key: "ferias_participadas", label: "Ferias o eventos donde ha participado" },
    { key: "hizo_venta_mayorista", label: "¿Ha realizado venta mayorista?", type: "select", options: ["Sí", "No"] },

    // Asociaciones y marcas
    { key: "integra_asociac_artesan", label: "¿Integra alguna asociación o colectivo de personas artesanas?", type: "select", options: ["Sí", "No"] },
    { key: "asociac_artesan", label: "Asociación o colectivo" },
    { key: "tiene_marca", label: "¿Tiene marca o etiqueta individual o colectiva?", type: "select", options: ["Sí", "No"] },
    { key: "marca", label: "Marca o etiqueta" },

    // Materia prima y familia
    { key: "lug_extrac_mat_prima", label: "¿Dónde realiza la extracción de la materia prima?" },
    { key: "cant_artesan_flia", label: "¿Cuántas personas artesanas hay en su familia?" },

    // Registro e identificación
    { key: "pertenece_pueb_orig", label: "¿Pertenece a Pueblos Originarios?", type: "select", options: ["Sí", "No"] },
    { key: "pueblo_originario", label: "¿Pueblo originario?" },
    { key: "profesion_ocupac", label: "Profesión/Ocupación" },

    // Información adicional
    { key: "red_social", label: "Redes Sociales" },
    { key: "posee_carnet_artesan", label: "¿Tiene carnet de artesano?", type: "select", options: ["Sí", "No"] },
    { key: "utilidad_carnet", label: "Utilidad del carnet" },
    { key: "inscripto_afip", label: "¿Está inscripto en AFIP?", type: "select", options: ["Sí", "No"] },
    { key: "es_proveedor_estado", label: "¿Es proveedor del estado?", type: "select", options: ["Sí", "No"] },
];
const preguntasPorPagina = [6, 4, 3, 5, 4, 5, 3, 4, 4, 2, 3, 4]; // suma 50
const titulosPorPagina = [
    "Informacion Básica",//6
    "Información de contacto", //4
    "Práctica Artesanal",//3
    "Materiales y técnicas",//5
    "Conocimientos y experiencia",//4
    "Información Socio-económica",//3
    "Educación y obras sociales",//4
    "Comercialización",//4
    "Asociaciones y marcas",//4
    "Materia prima y familia",//2
    "Registro e identificación",//3
    "Información adicional",//4

  // ...agrega tantos títulos como páginas tengas
];

export default function Encuestas() {
    const db = getFirestore(app);
    const [showDatePicker, setShowDatePicker] = useState<string | null>(null);
    const [pagina, setPagina] = useState(0);
    // un objeto con claves tipo string y valores que pueden ser string o Date
    const [respuestas, setRespuestas] = useState<{ [key: string]: string | Date }>(
        Object.fromEntries(preguntas.map(p => [p.key, ""]))
    );

    // Función para enviar a Firestore
    const guardarEncuesta = async () => {
        try {
            await addDoc(collection(db, "encuestas"), {
                fecha_registro: Timestamp.fromDate(new Date()),
                ...respuestas,
                fecha_nacimiento: Timestamp.fromDate(respuestas.fecha_nacimiento as Date), // Asegurarse de que la fecha sea un Timestamp
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

    const BotonesNavegacion = (
        <View style={{ alignItems: "center", marginBottom: moderateVerticalScale(30),}}>
            <ButtonX
                onPress={
                    pagina === preguntasPorPagina.length - 1
                        ? guardarEncuesta
                        : () => setPagina(pagina + 1)
                    }
                fontSize={moderateScale(25)}
                iconParam={imagePath.arrowRightLogo}
                iconPosition="right"
                bgColor="#E0F393"
                bgColorPressed="#BBCE70"
                buttonStyles={{ 
                    width: moderateScale(175), 
                    paddingVertical: moderateVerticalScale(5),
                    marginBottom: moderateVerticalScale(20),
                    borderRadius: 30,
                }}
                disabled={pagina === preguntasPorPagina.length - 1}
            >
                {pagina === preguntasPorPagina.length - 1 ? "Enviar" : "Siguiente"}
            </ButtonX>

            <ButtonX
                onPress={() => setPagina(pagina - 1)}
                disabled={pagina === 0}
                fontSize={moderateScale(18)}
                iconParam={imagePath.arrowLeftLogo}
                iconPosition="left"
                bgColorPressed="#BBCE70"
                buttonStyles={{ 
                    width: moderateScale(120),
                    paddingVertical: moderateVerticalScale(5),
                    borderRadius: 30,
                }}
            >
                Anterior
            </ButtonX>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    {titulosPorPagina[pagina] || "Encuesta"}
                </Text>
                
                <Text style={styles.paginador}>
                    Página {pagina + 1} / {preguntasPorPagina.length}
                </Text>
            </View>

            {/* BODY */}
            {/* <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            > */}
                <LinearGradient colors={["#fff", "#ddc", ]} style={styles.container}>
                    <ScrollView contentContainerStyle={styles.body}>
                        <View style={styles.card}>
                        
                            {getPreguntasPagina().map((pregunta) => (
                                <View key={pregunta.key} style={{ marginBottom: moderateScale(20)}}>
                                    <Text style={styles.label}>{pregunta.label}</Text>

                                    {/* Renderizar el tipo de input según la pregunta */}
                                    {pregunta.type === "select" ? (
                                        <View style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 8, overflow: "hidden" }}>
                                            <Picker
                                                selectedValue={respuestas[pregunta.key]}
                                                onValueChange={value => setRespuestas({ ...respuestas, [pregunta.key]: value })}
                                                style={{ backgroundColor: "#fff"}}
                                            >
                                            <Picker.Item label="Seleccione..." value="" />
                                                {pregunta.options.map(opt => (
                                                    <Picker.Item key={opt} label={opt} value={opt} />
                                                ))}
                                            </Picker>
                                        </View>
                                    ) : pregunta.type === "date" ? (
                                        <>
                                        <ButtonX
                                            onPress={() => setShowDatePicker(pregunta.key)}
                                            buttonStyles={{ paddingVertical: moderateVerticalScale(6), borderRadius: 30, }}
                                            fontSize={moderateScale(18)}
                                            bgColor="#ddd"
                                            bgColorPressed="#BFBFBF"
                                        >
                                            {
                                            respuestas[pregunta.key] instanceof Date
                                                ? format(respuestas[pregunta.key] as Date, "dd / MM / yyyy")
                                                : "Seleccionar fecha"}
                                        </ButtonX>

                                        {/* Mostrar el DateTimePicker si showDatePicker coincide con la pregunta actual  */}
                                        {showDatePicker === pregunta.key && (
                                            <DateTimePicker
                                                value={
                                                    respuestas[pregunta.key]
                                                    ? respuestas[pregunta.key] as Date
                                                    : new Date()
                                                }
                                                mode="date"
                                                display="default"
                                                maximumDate={new Date()}
                                                onChange={(event, selectedDate) => {
                                                    setShowDatePicker(null); // Cerrar el picker

                                                    if (event.type === "set" && selectedDate) {
                                                        setRespuestas({
                                                            ...respuestas,
                                                            [pregunta.key]: selectedDate,   // Guardar la fecha seleccionada
                                                        });
                                                    }
                                                    // Si se cancela, no hacer nada y dejar el valor como está
                                                }}
                                            />
                                        )}
                                        </>
                                    ) : (
                                        <InputX
                                            value={respuestas[pregunta.key] as string}
                                            onChangeText={text => setRespuestas({ ...respuestas, [pregunta.key]: text })}
                                            placeholder="Respuesta"
                                        />
                                    )}
                                </View>
                            ))}
                        
                        </View>
                        
                        { BotonesNavegacion }

                    </ScrollView>

                </LinearGradient>
            {/* </KeyboardAvoidingView> */}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flexGrow: 1,
    },
    header: {
        paddingTop: moderateVerticalScale(40),
        paddingBottom: moderateVerticalScale(15),
        alignItems: "center",
        
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    body: {
        flexGrow: 1, // Permite que el contenido crezca
        alignItems: "center", 
        justifyContent: "space-between",
        gap: moderateVerticalScale(30),
    },

    card: {
        paddingHorizontal: moderateScale(25),
        paddingTop: moderateVerticalScale(25),
        width: "100%",
    },
    title: { 
        fontSize: moderateScale(26), 
        fontWeight: "bold",
    },
    label: { 
        fontSize: moderateScale(22), 
        marginBottom: 6 
    },

    paginador: { 
        fontSize: moderateScale(16), 
        color: "#888" 
    },
});