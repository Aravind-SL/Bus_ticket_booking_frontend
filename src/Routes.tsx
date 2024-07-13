import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import AuthPage from './auth/AuthPage';
import ProtectedRoute from './auth/ProtectedRoute';
import ErrorPage from './ErrorPage';
import Logout from './auth/Logout';
import UserPage from './user/UserPage';
import UserHistory, {loader as userHistoryLoader} from './user/UserHistory';
import Browse from './home/Browse';
import Booking from './booking/Booking'
import HomePage from './HomePage';
import AdminPage, {AdminHome, BookingDetailPage, BookingPage, BusDetailPage, BusPage, RoutesDetailPage, StationDetailPage, UsersPage} from './admin';

import { StationPage, RoutePage } from './admin';
import {BookRide} from './booking/BookRide';
import AuthProvider from './auth/AuthProvider';
import NavBar from './components/ui/navbar';
import { Footer } from './components/ui/footer';

const Routes = () => {

  const notProtectedRoutes = [
    {
      path: "/",
      element: <HomePage />,
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
      path: "book/:id",
      element: <BookRide />
    },
    {
      path: "/home",
      element: <UserPage />
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
          path: "",
          element: <AdminHome />
        },
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
          path: "bookings",
          element: <BookingPage />
        },
        {
          path: "bookings/:id",
          element: <BookingDetailPage />
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
      ]
    },
  ];

  const router = createBrowserRouter([
    {
      path: "",
      element: <>
        <AuthProvider>
            <NavBar />
              <div className='w-screen min-h-screen '>
                <Outlet />
              </div>
            <Footer />
        </AuthProvider>
      </>,
      children: [
        ...notProtectedRoutes,
        {
          path: "/",
          element: <ProtectedRoute />,
          errorElement: <ErrorPage />,
          children: protectedRoutes,
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};


export default Routes;
