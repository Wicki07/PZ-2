import {
  createBrowserRouter,
} from "react-router-dom";
import Main from './pages/Main';
import Login from './pages/Authentication/Login';

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
  ]);

export default router