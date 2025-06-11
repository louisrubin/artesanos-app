import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ButtonX from '../../components/ButtonX';
import InputX from '../../components/InputX';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc } from "firebase/firestore";
import { auth, database } from "../../../credenciales";
import { moderateVerticalScale } from "react-native-size-matters";
import imagePath from "../../constants/imagePath";
import { format } from "date-fns";
import { router } from "expo-router";
import ModalX from "../../components/Modal";
import { useUser } from "../../hooks/AppInitializer";
import { preguntas } from "../../constants/PreguntasInfo";
import { getArrayUrlFotosSubidas, getFirebaseErrorMessage } from "../../hooks/firebaseFunctions";
import CargaFotos from "../fotos";

export default function Encuestas() {
    const { isInternetReachable, saveEncuestaLocal } = useUser();
    const [showDatePicker, setShowDatePicker] = useState<string | null>(null);
    const [pagina, setPagina] = useState(0);   

    const [respuestas, setRespuestas] = useState<{ [key: string]: string | Date }>( // un objeto con claves string y valores string o Date
      () => Object.fromEntries(
         preguntas
         .flatMap(seccion => seccion.campos)
         .map(p => [p.key, ""])
      )
    );
    const [fotosState, setFotosState] = useState<(string | null)[]>([null, null, null, null]);

   //  useEffect( ()=> {
   //    console.log(urlsFotos);
      
   //  }, [urlsFotos])

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
        // setDescripcionModal("Guardando en la base de datos...");
        try {
            setDescripcionModal("Subiendo fotos...");
            // lista de url de todas las fotos
            const lista_URL_Fotos = await getArrayUrlFotosSubidas(fotosState);

            // todos los datos del formulario
            const dataSubmit = {
                fecha_registro: (new Date().toISOString()), // Fecha de registro actual
                ...respuestas,
                fecha_nacimiento: respuestas["fecha_nacimiento"] 
                    ? (respuestas["fecha_nacimiento"] as Date).toISOString()
                    : null, // Si no hay fecha, se guarda como null
                fotos: lista_URL_Fotos,
                registrado_por: "**********************************",
                // registrado_por: auth.currentUser.uid,
            };

            if( !isInternetReachable ){
                // sin internet --> guardar cuestionario en local
                saveEncuestaLocal(dataSubmit);

                setTitleModal("Artesano guardado correctamente");
                setDescripcionModal("Guardado en dispositivo local hasta volver la conexión.");
                setIconModal(imagePath.userCheckLogo);
                setLoading(false);                
                return;
            }

            await addDoc(collection(database, "encuestas"), dataSubmit);

            setTitleModal("Registrado con éxito");
            setDescripcionModal("Datos guardados correctamente.");
            setIconModal(imagePath.userCheckLogo);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
                 
            setErrorSubmit(true);
            setTitleModal(getFirebaseErrorMessage(error.code));     // obtiene el mensaje acorde al error
            setDescripcionModal("No se pudo realizar la acción.");
            setIconModal(imagePath.iconXcircle);
            setLoading(false);
        }
    };

    const BotonesNavegacion = (
        <View style={styles.footer}>
            <ButtonX
                onPress={
                    pagina === preguntas.length - 1
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
                {pagina === preguntas.length - 1 ? "Enviar" : "Siguiente"}
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
                    {preguntas[pagina].titulo || "Encuesta"}
                </Text>
                
                <Text style={styles.paginador}>
                    Página {pagina + 1} / {preguntas.length}
                </Text>
            </View>

            <LinearGradient colors={["#fff", "#ddc", ]} style={{flex: 1}}>
                <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>

                    <View style={styles.innerContainer}>
                        <View style={styles.card}>
                            {pagina < preguntas.length -1 ? (
                                preguntas[pagina].campos.map((campo) => (

                                    <View key={campo.key} style={{ marginBottom: 20 }}>
                                        <Text style={styles.label}>{campo.label}</Text>
                                       {
                                       campo.type === "date" ? (
                                          <>
                                          <ButtonX
                                                onPress={() => setShowDatePicker(campo.key)}
                                                buttonStyles={{ paddingVertical: 8, borderRadius: 30, }}
                                                fontSize={18}
                                                bgColor="#ddd"
                                                bgColorPressed="#BFBFBF"
                                          >
                                                {
                                                respuestas[campo.key] instanceof Date
                                                   ? format(respuestas[campo.key] as Date, "dd / MM / yyyy")
                                                   : "Seleccionar fecha"}
                                          </ButtonX>

                                          {/* Mostrar el DateTimePicker si showDatePicker coincide con la pregunta actual  */}
                                          {showDatePicker === campo.key && (
                                                <DateTimePicker
                                                   value={
                                                      respuestas[campo.key] instanceof Date
                                                      ? respuestas[campo.key] as Date
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
                                                               [campo.key]: selectedDate,   // Guardar la fecha seleccionada
                                                            });
                                                      }
                                                      // Si se cancela, no hacer nada y dejar el valor como está
                                                   }}
                                                />
                                          )}
                                          </>
                                       )
                                       : campo.type === "select" ? (
                                          <View style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 8, overflow: "hidden" }}>
                                             <Picker
                                                   selectedValue={respuestas[campo.key]}
                                                   onValueChange={value => setRespuestas({ ...respuestas, [campo.key]: value })}
                                                   style={{ backgroundColor: "#fff"}}
                                             >
                                             <Picker.Item label="Seleccione..." value="" />
                                                   {campo.options.map(opt => (
                                                      <Picker.Item key={opt} label={opt} value={opt} />
                                                   ))}
                                             </Picker>
                                          </View>
                                       )
                                       : (
                                          <InputX
                                             value={respuestas[campo.key] as string}
                                             onChangeText={text => setRespuestas({ ...respuestas, [campo.key]: text })}
                                             placeholder="Respuesta"
                                             tipoTeclado={(campo.keyboard || "default") as "default" | "email-address" | "number-pad"}
                                          />
                                    )}

                                    </View>
                                ))
                            ) : (
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <CargaFotos fotosState={fotosState} setFotosState={setFotosState} />
                                </View>
                            )}
                        </View>
                        
                        { BotonesNavegacion }

                    </View>                        

                </ScrollView>
                </View>

            </LinearGradient>
        </SafeAreaView>
       
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 10,
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