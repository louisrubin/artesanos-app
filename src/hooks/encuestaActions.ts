import { saveEncuestaLocal, 
    sincronizarEncuestasLocal,
    setEncuestasLocalesReducer, 
    setSincronizandoReducer,
    clearEncuestasLocalesReducer,
} from "../redux/slices/encuestasSlice";
import { useAppDispatch, useAppSelector } from "./store";

// EXPORTAR LOS IMPORTS DISPATCH Y USE-APP-DISPATCH UNA SOLA VEZ
export const useEncuestaActions = () => {
    const dispatch = useAppDispatch();
    
        const saveEncuesta = (data : any) => {
            dispatch(saveEncuestaLocal(data));
        }
        const subirEncuestasFirebase = () => {
            dispatch(sincronizarEncuestasLocal());
        }
        const setEncuestasLocales = (data : any) => {
            dispatch(setEncuestasLocalesReducer(data));
        }
        const setSincronizando = (value : boolean) => {
            dispatch(setSincronizandoReducer(value));
        }
        const clearEncuestasLocales = () => {
            dispatch(clearEncuestasLocalesReducer());
        }
        return { saveEncuesta, setEncuestasLocales, 
            setSincronizando, clearEncuestasLocales,
            subirEncuestasFirebase, 
        };
}

// EXPORT LOS ESTADOS DE ENCUESTA-SLICE
export const useEncuestaVariables = () => {
    const encuestasLocal = useAppSelector((state) => state.encuesta.encuestasLocal);
    const sincronizando = useAppSelector((state) => state.encuesta.sincronizando);

    return { encuestasLocal, sincronizando, };
}