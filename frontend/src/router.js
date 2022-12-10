import {
  createBrowserRouter,
} from "react-router-dom";
import Main from './pages/Main';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateActivity from './pages/Activities/CreateActivity';
import WeekCalendar from './components/Calendar/WeekCalendar';
import MonthCalendar from './components/Calendar/MonthCalendar';
import DayCalendar from './components/Calendar/DayCalendar';

const router = 
  createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "createactivity",
          element: <CreateActivity />,
        },
        {
          path: "weekCalendar",
          element: <WeekCalendar />,
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/createactivity",
      element: <CreateActivity />,
    },
    {
      path: "/weekCalendar",
      element: <WeekCalendar />,
    },
    {
      path: "/monthCalendar",
      element: <MonthCalendar />,
    },
    {
      path: "/dayCalendar",
      element: <DayCalendar />,
    },
  ]);

export default router