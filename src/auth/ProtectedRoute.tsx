import {useAuth} from './AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
    const {token} = useAuth();

    if (!token) {
        return <Navigate to="/auth"/>
    }

    return <Outlet />

}

export default ProtectedRoute;
