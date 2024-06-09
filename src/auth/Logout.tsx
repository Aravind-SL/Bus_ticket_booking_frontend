import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

export const Logout = () => {

    const {setToken} = useAuth();

    useEffect(() => {
        setToken(null);
    }, []);

    return (
        <>So</>
    );
}


export default Logout;
