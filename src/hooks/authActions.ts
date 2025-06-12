import { checkAuthStatus, setUserDataReducer, setLoadingReducer, 
    setIsLoggedInReducer, setMessageStatusReducer, logoutReducer 
} from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "./store";

// EXPORTAR LOS IMPORTS DISPATCH Y USE-APP-DISPATCH UNA SOLA VEZ
export const useAuthActions = () => {
    const dispatch = useAppDispatch();

    const checkAuth = () => {
        // funct ejecutada con el dispatch
        dispatch(checkAuthStatus());
    }
    const setUserData = (data : any) => {
        dispatch(setUserDataReducer(data));
    }
    const setLoading = (value : boolean) => {
        dispatch(setLoadingReducer(value));
    }
    const setIsLoggedIn = (value : boolean) => {
        dispatch(setIsLoggedInReducer(value));
    }
    const setMessageStatus = (value : string) => {
        dispatch(setMessageStatusReducer(value));
    }
    const logOut = () => {
        dispatch(logoutReducer());
    }

    

    return { checkAuth, setUserData, setLoading, setIsLoggedIn, setMessageStatus, logOut };
}

// EXPORT LOS ESTADOS DE AUTH-SLICE
export const useAuthVariables = () => {
    const userData = useAppSelector((state) => state.auth.userData);
    const loading = useAppSelector((state) => state.auth.loading);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const messageStatus = useAppSelector((state) => state.auth.messageStatus);
    const error = useAppSelector((state) => state.auth.error);

    return { userData, loading, isLoggedIn, messageStatus, error };
}
