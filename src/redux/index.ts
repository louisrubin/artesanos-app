import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import encuestaReducer from './slices/encuestasSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        encuesta: encuestaReducer,
    },
})

// inferir los tipos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
