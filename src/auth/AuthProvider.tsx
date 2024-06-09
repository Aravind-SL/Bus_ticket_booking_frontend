import axios from "axios";
import {
    createContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
    useContext
} from "react";


import { useAppDispatch } from "@/hooks";
import { setUser, unSetUser } from "./authSlice";

type ContextValueProp = {
    token: string|null,
    setToken: (newToken:string) => void
};

const AuthContext = createContext<ContextValueProp>();

const TOKENKEY = 'token';

type Prop = {children: ReactNode};
const AuthProvider = ({children}: Prop) => {


    const dispatch = useAppDispatch();

    const [token, setTokenInner] = useState(localStorage.getItem(TOKENKEY));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common.Authorization = token;
            localStorage.setItem(TOKENKEY, token);
            // Parse the token

            dispatch(setUser(token));
        } else {
            delete axios.defaults.headers.common.Authorization;
            localStorage.removeItem(TOKENKEY);
            dispatch(unSetUser());
        }
    }, [token]);

    const setToken = (newToken: string|null) => {
        setTokenInner(newToken);
    };
    const contextValue = useMemo(() => ({
        token,
        setToken
    }), [token]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
