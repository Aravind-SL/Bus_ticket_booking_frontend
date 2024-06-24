import axios from "axios";
import {
    createContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
    useContext
} from "react";

type AuthContextValue = {
    token: string|null,
    setToken: (newToken:string) => void
};

const AuthContext = createContext<AuthContextValue>();

const TOKENKEY = 'token';

type Prop = {children: ReactNode};
const AuthProvider = ({children}: Prop) => {
    const [token, setTokenInner] = useState(localStorage.getItem(TOKENKEY));

    useEffect(() => {
        if (token) {
            // Parse the token
            let data = JSON.parse(atob(token.split('.')[1]));
            if (data.exp * 1000 > Date.now()) {

              axios.defaults.headers.common.Authorization = "Bearer " + token;
              localStorage.setItem(TOKENKEY, token);
            } else {
              setTokenInner(null);
            }

        } else {
            delete axios.defaults.headers.common.Authorization;
            localStorage.removeItem(TOKENKEY);
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
