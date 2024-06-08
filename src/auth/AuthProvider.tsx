import axios from "axios";
import {
    createContext,
    useEffect,
    useMemo,
    useState,

    ReactNode,
    useContext
} from "react";

type ContextValueProp = {
    token: string|null,
    setToken: (newToken:string) => void
};

const AuthContext = createContext<ContextValueProp>();

const TOKENKEY = 'token';

type Prop = {children: ReactNode};
const AuthProvider = ({children}: Prop) => {

    const [token, setTokenInner] = useState(localStorage.getItem(TOKENKEY));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common.Authorization = token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common.Authorization;
            localStorage.removeItem('token');
        }
    }, [token]);

    const setToken = (newToken: string) => {
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
