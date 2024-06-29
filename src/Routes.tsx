import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import AuthPage from './auth/AuthPage';
import ProtectedRoute from './auth/ProtectedRoute';
import ErrorPage from './ErrorPage';
import Logout from './auth/Logout';
import UserPage, {loader as userLoader} from './user/UserPage';
import UserHistory, {loader as userHistoryLoader} from './user/UserHistory';
import Browse from './home/Browse';
import Booking from './booking/Booking'
import AdminPage, {BusDetailPage, BusPage, RoutesDetailPage, StationDetailPage, UsersPage} from './admin';

import { StationPage, RoutePage } from './admin';
import {BookRide} from './booking/BookRide';

const Routes = () => {

  const notProtectedRoutes = [
    {
      path: "/",
      element: <div>Home</div>,
      errorElement: <ErrorPage />
    },
    {
      path: "book",
      element: <Booking />,
    },
    {
      path: "browse",
      element: <Browse />
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
      path: "book/:id",
      element: <BookRide />
    },
    {
      path: "/protected",
      element: <div>Protected Route</div>
    },
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/admin",
      element: <AdminPage />,
      children: [
        {
          path: "stations",
          element: <StationPage />
        },
        {
          path: "stations/:id",
          element: <StationDetailPage />
        },
        {
          path: "routes",
          element: <RoutePage />
        },
        {
          path: "routes/:id",
          element: <RoutesDetailPage />
        },
        {
          path: "buses",
          element: <BusPage />
        },
        {
          path: "buses/:id",
          element: <BusDetailPage />
        },
        {
          path: "users",
          element: <UsersPage />
        },

      ]
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
