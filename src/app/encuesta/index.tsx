import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ButtonX from '../../components/ButtonX';
import InputX from '../../components/InputX';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { app } from "../../../credenciales";
import { moderateVerticalScale } from "react-native-size-matters";
import imagePath from "../../constants/imagePath";
import { format } from "date-fns";
import { router } from "expo-router";
import ModalX from "../../components/Modal";

const preguntas = [
    // Información básica
    { key: "nombres", label: "Nombres" },
    { key: "apellidos", label: "Apellidos" },
    { key: "dni", label: "DNI", keyboard: "number-pad" },
    { key: "cuil", label: "CUIT/CUIL", keyboard: "number-pad"  },
    { key: "genero", label: "Género", type: "select", options: ["Masculino", "Femenino", "Otro"] },
    { key: "fecha_nacimiento", label: "Fecha de nacimiento", type: "date" },

    // Información de contacto
    { key: "telefono", label: "Teléfono", keyboard: "number-pad"  },
    { key: "email", label: "Correo Electrónico", keyboard: "email-address" },
    { key: "domicilio", label: "Domicilio" },
    { key: "localidad", label: "Localidad" },

    // Información socioeconómica
    { key: "estado_civil", label: "Estado civil", type: "select", options: ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a", "Otro"] },
    { key: "tiene_hijos", label: "¿Tiene hijos?", type: "select", options: ["Sí", "No"] },
    { key: "cantidad_hijos", label: "Número de hijos", keyboard: "number-pad"  },
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
    { key: "anios_trayectoria", label: "Años de trayectoria", keyboard: "number-pad"  },
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
    { key: "cant_artesan_flia", label: "¿Cuántas personas artesanas hay en su familia?", keyboard: "number-pad"  },

    // Registro e identificación
    { key: "pertenece_pueb_orig", label: "¿Pertenece a Pueblos Originarios?", type: "select", options: ["Sí", "No"] },
    { key: "pueblo_originario", label: "¿Pueblo originario?" },
    { key: "profesion_ocupac", label: "Profesión / Ocupación" },

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

    // MODAL CONFIGURACION
    const [showModal, setModal] = useState(false); // Para manejar los modales
    const [modalMode, setModalMode] = useState<"confirm" | "submit">("confirm");
    const [isLoading, setLoading] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [descripcionModal, setDescripcionModal] = useState("");
    const [iconHeaderModal, setIconModal] = useState(imagePath.databaseLogo);
    const [errorSubmit, setErrorSubmit] = useState(false);

    const handleModalButtonSubmit = () => {
        // el botton del modal cuando se envió el formulario verifica si hubo error
        setModal(false);
        if (!errorSubmit) router.back();    // sin error redirige al main
    }

    const abrirConfimSubmitModal = () => {
        setModal(true);
        setModalMode("confirm");
        setDescripcionModal("");
    }

    // Función para enviar a Firestore
    const submitEncuesta = async () => {
        setModalMode("submit");
        setLoading(true);
        setErrorSubmit(false);  // limpia el estado
        setTitleModal("Registrando");
        setDescripcionModal("Guardando en la base de datos...");
        try {
            await addDoc(collection(db, "encuestas"), {
                fecha_registro: (new Date().toISOString()), // Fecha de registro actual
                ...respuestas,
                fecha_nacimiento: Timestamp.fromDate(respuestas.fecha_nacimiento as Date)
               //  fecha_nacimiento: respuestas["fecha_nacimiento"] 
               //      ? (respuestas["fecha_nacimiento"] as Date).toISOString()
               //      : null, // Si no hay fecha, se guarda como null
            });
            setTitleModal("Registrado con éxito");
            setDescripcionModal("Artesano guardado correctamente.");
            setIconModal(imagePath.userCheckLogo);
            setLoading(false);
        }
        catch (error) {
            setErrorSubmit(true);
            setTitleModal("Algo salió mal");
            setDescripcionModal("No se pudo registrar al artesano.");
            setIconModal(imagePath.iconXcircle);
            setLoading(false);
            // console.error(error);
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
        <View style={styles.footer}>
            <ButtonX
                onPress={
                    pagina === preguntasPorPagina.length - 1
                        ? () => { abrirConfimSubmitModal()
                         }
                        : () => setPagina(pagina + 1)
                    }
                fontSize={20}
                iconParam={imagePath.arrowRightLogo}
                iconPosition="right"
                bgColor="#E0F393"
                bgColorPressed="#BBCE70"
                buttonStyles={{
                    width: 175, 
                    paddingVertical: moderateVerticalScale(5),
                    paddingLeft: 6,
                    marginBottom: 25,
                    borderRadius: 30,
                }}
                disabled={false}
            >
                {pagina === preguntasPorPagina.length - 1 ? "Enviar" : "Siguiente"}
            </ButtonX>

            <ButtonX
                onPress={() => setPagina(pagina - 1)}
                disabled={pagina === 0}
                fontSize={16}
                iconParam={imagePath.arrowLeftLogo}
                iconPosition="left"
                bgColorPressed="#BBCE70"
                buttonStyles={{
                    width: 130,
                    paddingVertical: moderateVerticalScale(5),
                    borderRadius: 30,
                }}
            >
                Anterior
            </ButtonX>
        </View>
    )

    return (
        <>
        <ModalX isModalVisible={showModal} 
            isLoading={isLoading} 
            iconHeader={modalMode === "confirm" ? imagePath.iconFileText : iconHeaderModal}
            title={modalMode === "confirm" ? "¿Confirmar envío del formulario?" : titleModal}
            messageLoading={descripcionModal}
        >
            {/* CONFIRMAR ENVIO */}
            { modalMode === "confirm" && (
                <>
                    <ButtonX 
                    buttonStyles={{ width: 190,
                    marginTop: 20, paddingVertical: 10,
                    }}
                    fontSize={18}
                    bgColor="#E0F393"
                    bgColorPressed='#B1C464'
                    onPress={ submitEncuesta }
                    >
                        Confirmar y enviar
                    </ButtonX>

                    <ButtonX 
                    buttonStyles={{ width: 150,
                    marginTop: 25, paddingVertical: 6,
                    }}
                    fontSize={18}
                    bgColor="#FF9984"
                    bgColorPressed='#FD7C62'
                    onPress={ ()=>{setModal(false)} }
                    >
                        Volver
                    </ButtonX>
                </>
            )}

            {/* ENVIANDO FORMULARIO */}
            { modalMode === "submit" && !isLoading && (
                <ButtonX 
                buttonStyles={{ width: 190,
                marginTop: 20, paddingVertical: 10,
                }}
                fontSize={18}
                bgColor="#E0F393"
                bgColorPressed='#B1C464'
                onPress={ handleModalButtonSubmit }
                >
                    { errorSubmit ? "Volver" : "Inicio"} 
                </ButtonX>
            )}
        </ModalX>



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
                <LinearGradient colors={["#fff", "#ddc", ]} style={{flex: 1}}>
                    <View style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        <View style={styles.innerContainer}>
                            <View style={styles.card}>
                     
                                {getPreguntasPagina().map((pregunta) => (
                                    <View key={pregunta.key} style={{ marginBottom: 20}}>
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
                                                buttonStyles={{ paddingVertical: 8, borderRadius: 30, }}
                                                fontSize={18}
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
                                                        respuestas[pregunta.key] instanceof Date
                                                        ? respuestas[pregunta.key] as Date
                                                        : new Date()
                                                    }
                                                    mode="date"
                                                    display="default"
                                                    minimumDate={new Date(1900, 0, 1)} // Fecha mínima
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
                                                tipoTeclado={ (pregunta.keyboard || "default") as "default" | "email-address" | "number-pad" }
                                            />
                                        )}
                                    </View>
                                ))}
                            
                            </View>
                            
                            { BotonesNavegacion }

                        </View>                        

                    </ScrollView>
                    </View>

                </LinearGradient>
            {/* </KeyboardAvoidingView> */}

        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        paddingBottom: 15,
        alignItems: "center",
        
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    // dentro de scrollView
    innerContainer: {
        flex: 1, 
        justifyContent: "space-between", 
        gap: 30
    },
    footer: {
        alignItems: "center", 
        marginBottom: 40,
    },

    card: {
        paddingHorizontal: 35,
        paddingTop: 20,
        width: "100%",
    },
    title: {  
        fontSize: 20,
        fontWeight: "bold",
    },
    label: { 
        fontSize: 18,
        marginBottom: 5, 
    },

    paginador: { 
        fontSize: 14,
        color: "#888" 
    },
});