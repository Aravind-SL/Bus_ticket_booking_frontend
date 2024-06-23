import  {RouterProvider, createBrowserRouter} from 'react-router-dom';
import AuthPage from './auth/AuthPage';
import ProtectedRoute from './auth/ProtectedRoute';
import ErrorPage from './ErrorPage';
import Logout from './auth/Logout';
import UserPage, { loader as userLoader} from './user/UserPage';
import UserHistory, {loader as userHistoryLoader} from './user/UserHistory';

const Routes = () => {

    const notProtectedRoutes = [
        {
            path: "/",
            element: <div>Home</div>,
            errorElement: <ErrorPage />
        },
        {
            path: "/auth",
            element: <AuthPage />
        },
    ];

    const protectedRoutes = [
        {
            path: "/home",
            element: <div>Protected Home</div>
        },
        {
            path: "/protected",
            element: <div>Protected Route</div>
        },
        {
            path:"/logout",
            element: <Logout />
        },
        {
            path: "/user",
            element: <UserPage />,
            loader: userLoader,
            children: [
                {
                    path: "history",
                    loader: userHistoryLoader,
                    element: <UserHistory />
                },
            ],
        }
    ];

    const router = createBrowserRouter([
       ...notProtectedRoutes,
       {
           path: "/",
           element: <ProtectedRoute />,
           errorElement: <ErrorPage />,
           children: protectedRoutes,
       }
    ]);

    return <RouterProvider router={router} />;
};


export default Routes;
