import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Component/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AddNewTasks from "../Pages/Dashboard/Buyer/AddNewTasks/AddNewTasks";
import MyTasks from "../Pages/Dashboard/Buyer/MyTasks/MyTasks";
import PrivateRouter from "./PrivateRouter";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
      children: [
        {
          path: 'addNewTasks',
          element: <PrivateRouter><AddNewTasks></AddNewTasks></PrivateRouter>
        },
        {
          path: 'myTasks',
          element: <PrivateRouter><MyTasks></MyTasks></PrivateRouter>
        }
      ]
    }
  ]);