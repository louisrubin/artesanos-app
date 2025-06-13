import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../../../credenciales';
import { storage } from '../../storages/storage';

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
   // CERRAR SESIÓN Y LIMPIAR ESTADOS
   try {
      await storage.remove("userData");
      await auth.signOut();
      return true;
   } catch (err) {
      console.error("Error al cerrar sesión:", err);
      return thunkAPI.rejectWithValue("Error al cerrar sesión");
   }
});

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
    builder.addCase(logout.fulfilled, (state) => {
         state.userData = null;
         state.isLoggedIn = false;
      });
  }
});

export const { 
   setUserDataReducer, setMessageStatusReducer, 
   setLoadingReducer, setIsLoggedInReducer,
} = authSlice.actions;

export default authSlice.reducer;
