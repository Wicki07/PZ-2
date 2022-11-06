import {
  createBrowserRouter,
} from "react-router-dom";
import Main from './pages/Main';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';

const router = 
  createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

export default router