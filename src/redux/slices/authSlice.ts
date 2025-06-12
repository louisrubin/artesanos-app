import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { auth, database } from '../../../credenciales';
import { storage } from '../../storages/storage';
import { doc, getDoc } from 'firebase/firestore';

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => { // rejectWithValue: "forzar" un error controlado y pasar un mensaje personalizado
    try {      
      const user = auth.currentUser;
      console.log("user:", user);
      

      if (!user) {
        await storage.remove("userData");
        return null; // Esto lo maneja el reducer fulfilled
      }

      // sin conexión a Internet 
      // if( !isInternetReachable ) {
      //    const storedUserData = await storage.get("userData");
      //    if(storedUserData){
      //       return storedUserData;
      //    } else return null;
      // }

      // obteniendo desde firebase
      const docRef = doc(database, "registros", user.uid);
      const snapshot = await getDoc(docRef);

      // document no existe
      if (!snapshot.exists()) {
        await auth.signOut();
        await storage.remove("userData");
        return rejectWithValue("No existe el documento del usuario.");
      }

      const userDataSnap = snapshot.data();
      await storage.set("userData", userDataSnap);  // almacena en asyncStorage
      return userDataSnap;  // guarda en el estado "initialState"

    } catch (error) {
      console.error("Error al verificar auth:", error);
      return rejectWithValue("Error inesperado");
    }
   }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    isLoggedIn: false,
    loading: true,
    error: null,
    messageStatus: "",
  },
  reducers: {
    // las func que cambian el Estado
      logoutReducer(state) {
         // cerrar sesión y limpiar datos
         state.userData = null;
         state.isLoggedIn = false;
         storage.remove("userData");
         auth.signOut();
      },
      setUserDataReducer: (state, action: PayloadAction<any>) => {
         state.userData = action.payload;
      },    
      setMessageStatusReducer: (state, action: PayloadAction<string>) => {
         state.messageStatus = action.payload;
      },
      setLoadingReducer: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      setIsLoggedInReducer: (state, action: PayloadAction<boolean>) => {
        state.isLoggedIn = action.payload;
      },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
         state.messageStatus = "Obteniendo datos...";
         state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
         state.messageStatus = "Sincronizando...";
         state.userData = action.payload;
         state.isLoggedIn = !!action.payload;    // convierte a boolean si existe datos --> true
         state.loading = false;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
         state.messageStatus = "Redireccionando...";
         state.userData = null;
         // auth.signOut();
         state.isLoggedIn = false;
         state.loading = false;
         state.error = action.payload || "Fallo al obtener datos";
      });
  }
});

export const { 
   logoutReducer, setUserDataReducer, 
   setMessageStatusReducer, setLoadingReducer, setIsLoggedInReducer,
} = authSlice.actions;

export default authSlice.reducer;
