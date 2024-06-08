import  {RouterProvider, createBrowserRouter} from 'react-router-dom';
import AuthPage from './auth/AuthPage';
import ProtectedRoute from './auth/ProtectedRoute';
import { useAuth } from './auth/AuthProvider';
import ErrorPage from './ErrorPage';

const Routes = () => {

    const {token} = useAuth();

    const publicRoutes = [
        {
            path: "/",
            element: <div>Home</div>,
            errorElement: <ErrorPage />
        }
    ];

    const protectedRoutes = [
        {
            path: "/",
            element: <div>Protected Home</div>
        },
        {
            path: "/protected",
            element: <div>Protected Route</div>
        },
    ];

    const notAuthenticatedOnlyRoutes = [
        {
            path: "/auth",
            element: <AuthPage />
        },
    ];

    const router = createBrowserRouter([
       ...publicRoutes,
       ...(!token ? notAuthenticatedOnlyRoutes : []),
       {
           path: "/",
           element: <ProtectedRoute />,
           children: protectedRoutes,
       }
    ]);

    return <RouterProvider router={router} />;
};


export default Routes;
