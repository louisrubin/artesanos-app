import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "../../storages/storage";
import { RootState } from "../index";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../../credenciales";

export const encuestaSlice = createSlice({
    name: "encuestaSlice",
    initialState: {
        encuestasLocal: [],
        sincronizando: false,
    },
    reducers: {
        setEncuestasLocalesReducer: (state, action) => {
            // al iniciar la app rehidrata los datos al estado
            state.encuestasLocal = action.payload;
        },
        setSincronizandoReducer: (state, action: PayloadAction<boolean>) => {
            state.sincronizando = action.payload;
        },
        clearEncuestasLocalesReducer: (state) => {
            state.encuestasLocal = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveEncuestaLocal.fulfilled, (state, action) => {
            // al terminar la funcion de saveEncuesta se ejecuta esto
            state.encuestasLocal = action.payload;
        })
        // al finalizar (fulfilled)
        .addCase(sincronizarEncuestasLocal.fulfilled, (state) => {
            state.encuestasLocal = [];  // limpia el estado al sincronizar
            state.sincronizando = false;
        })
        // en ejecución
        .addCase(sincronizarEncuestasLocal.pending, (state) => {
            state.sincronizando = true;
        })
        // hubo un error
        .addCase(sincronizarEncuestasLocal.rejected, (state) => {
            state.sincronizando = false;
        });
    }
    
});

export const saveEncuestaLocal = createAsyncThunk(
    "encuesta/saveLocal", 
    async (nuevaEncuesta, thunkAPI) => {
        // ACA SOLO PARA GUARDAR LAS ENCUESTAS EN LOCAL --> SIN CONEXION
        try{
            const clave = "encuestas_pendientes";
            // Obtener lista del AsyncStorage (si hay)
            const respuesta = await storage.get(clave); // retorna lista perseada Json o null
            const encuestas = respuesta ?? [];  // si no es null 'respuesta' sino []

            // Agregar nueva encuesta
            encuestas.push(nuevaEncuesta);

            await storage.set(clave, encuestas);    // save AsyncStorage
            console.log('Encuesta guardada offline');
            return encuestas;

        } catch (error) {
            console.error('Error al guardar encuesta offline:', error);
            // return null;
        }
    }
);

export const sincronizarEncuestasLocal = createAsyncThunk<
    any,    // Tipo del valor que retorna fulfilled
    void,   // Tipo del argumento (no le paso nada, así que `void`)
    {state: RootState}  // tipo de estado
    >
    ("encuesta/syncLocal",
    async (_, thunkAPI) => {
        // MANDA TODAS LAS ENCUESTAS LOCAL A FIREBASE Y LUEGO LIMPIA TODO
        const state = thunkAPI.getState();
        const encuestasLocal = state.encuesta.encuestasLocal;

        for (const encuesta of encuestasLocal) {
            try {
                // subir a firebase
                await addDoc(collection(database, "encuestas"), encuesta);
            } catch (error) {
                console.error("Error al subir encuesta:", error);
                return thunkAPI.rejectWithValue("Error subiendo encuestas");
            }
        }
    }
)


export const { 
    setEncuestasLocalesReducer, 
    setSincronizandoReducer, 
    clearEncuestasLocalesReducer 
} = encuestaSlice.actions;

export default encuestaSlice.reducer;
