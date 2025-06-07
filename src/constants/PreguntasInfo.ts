
export const preguntas = [
    {
        titulo: "Información básica",
        campos: [
            { key: "nombres", label: "Nombres" },
            { key: "apellidos", label: "Apellidos" },
            { key: "dni", label: "DNI", keyboard: "number-pad" },
            { key: "cuil", label: "CUIT/CUIL", keyboard: "number-pad"  },
            { key: "genero", label: "Género", type: "select", options: ["Masculino", "Femenino", "Otro"] },
            { key: "fecha_nacimiento", label: "Fecha de nacimiento", type: "date" },
        ]
    },
    {
        titulo: "Información de contacto",
        campos: [
            { key: "telefono", label: "Teléfono", keyboard: "number-pad"  },
            { key: "email", label: "Correo Electrónico", keyboard: "email-address" },
            { key: "domicilio", label: "Domicilio" },
            { key: "localidad", label: "Localidad" },
        ]
    },
    {
        titulo: "Práctica artesanal",
        campos: [
            { key: "rama_productiva", label: "Rama productiva (Rubro)" },
            { key: "especialidad", label: "Oficio/Especialidad" },
            { key: "descripcion_decorativa", label: "Descripción decorativa/Utilitaria" },
        ]
    },
    {
        titulo: "Materiales y técnicas",
        campos: [
            { key: "materia_prima_prin", label: "Materia prima principal" },
            { key: "materia_prima_secun", label: "Materia prima secundaria" },
            { key: "tintes_que_usa", label: "Tintes que utiliza" },
            { key: "tecnicas_artesanal", label: "Técnicas artesanales que utiliza" },
            { key: "fusion_tecnicas", label: "Fusión de técnicas" },
        ]
    },
    {
        titulo: "Conocimientos y experiencias",
        campos: [
            { key: "transmision_saberes", label: "¿De quién aprendió la técnica?" },
            { key: "anios_trayectoria", label: "Años de trayectoria", keyboard: "number-pad"  },
            { key: "dicta_talleres", label: "¿Dicta talleres o enseña la técnica?", type: "select", options: ["Sí", "No"] },
            { key: "logros_trayectoria", label: "Logros en su trayectoria artesanal" },
        ]
    },
    {
        titulo: "Educación y obras sociales",
        campos: [
            { key: "posee_estudios", label: "¿Posee estudios académicos?", type: "select", options: ["Sí", "No"] },
            { key: "nivel_estudios", label: "Nivel de estudios alcanzados", type: "select", options: ["Primario", "Secundario", "Terciario", "Universitario", "Otro"] },
            { key: "posee_obra_soc_pencion", label: "¿Posee obra social, asignaciones y/o pensiones?", type: "select", options: ["Sí", "No"] },
            { key: "obra_social_pension", label: "Obra social, asignaciones y/o pensiones" },
        ]
    },
    {
        titulo: "Comercialización",
        campos: [
            { key: "posee_punto_venta_cerca", label: "¿Posee algún punto de venta cercano?", type: "select", options: ["Sí", "No"] },
            { key: "punto_venta_cercano", label: "Punto de venta cercano" },
            { key: "como_comercializa", label: "¿Cómo y dónde comercializa los productos?" },
            { key: "ferias_participadas", label: "Ferias o eventos donde ha participado" },
            { key: "hizo_venta_mayorista", label: "¿Ha realizado venta mayorista?", type: "select", options: ["Sí", "No"] },
        ]
    },
    {
        titulo: "Asociaciones y marcas",
        campos: [
            { key: "integra_asociac_artesan", label: "¿Integra alguna asociación o colectivo de personas artesanas?", type: "select", options: ["Sí", "No"] },
            { key: "asociac_artesan", label: "Asociación o colectivo" },
            { key: "tiene_marca", label: "¿Tiene marca o etiqueta individual o colectiva?", type: "select", options: ["Sí", "No"] },
            { key: "marca", label: "Marca o etiqueta" },
        ]
    },
    {
        titulo: "Materia prima y familia",
        campos: [
            { key: "lug_extrac_mat_prima", label: "¿Dónde realiza la extracción de la materia prima?" },
            { key: "cant_artesan_flia", label: "¿Cuántas personas artesanas hay en su familia?", keyboard: "number-pad"  },
        ]
    },
    {
        titulo: "Registro e identificación",
        campos: [
            { key: "pertenece_pueb_orig", label: "¿Pertenece a Pueblos Originarios?", type: "select", options: ["Sí", "No"] },
            { key: "pueblo_originario", label: "¿Pueblo originario?" },
            { key: "profesion_ocupac", label: "Profesión / Ocupación" },
        ]
    },
    {
        titulo: "Información adicional",
        campos: [
            { key: "red_social", label: "Redes Sociales" },
            { key: "posee_carnet_artesan", label: "¿Tiene carnet de artesano?", type: "select", options: ["Sí", "No"] },
            { key: "utilidad_carnet", label: "Utilidad del carnet" },
            { key: "inscripto_afip", label: "¿Está inscripto en AFIP?", type: "select", options: ["Sí", "No"] },
            { key: "es_proveedor_estado", label: "¿Es proveedor del estado?", type: "select", options: ["Sí", "No"] },
        ]
    },
    {
        titulo: "Carga de fotos",
        campos: [
            // necesario para mostrar la carga de fotos
        ]
    },
]