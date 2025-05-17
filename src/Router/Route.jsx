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
import PurChaseCoin from "../Pages/Dashboard/Buyer/PurChaseCoin/PurChaseCoin";
import Pay from "../Pages/Dashboard/Buyer/PurChaseCoin/Pay";
import TaskList from "../Pages/Dashboard/Worker/TaskList/TaskList";
import TaskDetails from "../Pages/Dashboard/Worker/TaskDetails/TaskDetails";
import MySubmission from "../Pages/Dashboard/Worker/MySubmission/MySubmission";
import WithDrawls from "../Pages/Dashboard/Worker/WithDrawls/WithDrawls";
import BuyerHome from "../Pages/Dashboard/Buyer/Home/BuyerHome";
import WorkerHome from "../Pages/Dashboard/Worker/WorkerHome/WorkerHome";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageTasks from "../Pages/Dashboard/Admin/ManageTasks/ManageTasks";
import PaymentHistory from "../Pages/Dashboard/Buyer/PaymentHistory/PaymentHistory";
import AvailableCoin from "../Pages/AvailableCoin/AvailableCoin";
import UpdateTask from "../Pages/Dashboard/Buyer/MyTasks/UpdateTask";
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
        },
        {
          path: '/availableCoin',
          element: <AvailableCoin></AvailableCoin>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
      children: [
        {
          path: 'buyerHome',
          element: <BuyerHome></BuyerHome>
        },
        {
          path: 'addNewTasks',
          element: <PrivateRouter><AddNewTasks></AddNewTasks></PrivateRouter>
        },
        {
          path: 'myTasks',
          element: <PrivateRouter><MyTasks></MyTasks></PrivateRouter>
        },
        {
            path: 'updateTask/:id',
            element: <UpdateTask></UpdateTask>
        },
        {
          path: 'purchaseCoin/:value',
          element: <PrivateRouter><PurChaseCoin></PurChaseCoin></PrivateRouter>,
          
        }
        ,{
          path: 'pay',
          element: <Pay></Pay>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        {
          path: 'workerHome',
          element: <WorkerHome></WorkerHome>
        }
        ,{
          path: 'taskList',
          element: <TaskList></TaskList>
        }
        ,{
          path : 'taskDetails/:id',
          element: <TaskDetails></TaskDetails>,
          // loader: ({params})=> fetch(`/taskDetails/${params.id}`)
        }
        ,{
          path: 'mySubmissions',
          element: <MySubmission></MySubmission>
        },
        {
          path: 'withDrawals',
          element: <WithDrawls></WithDrawls>
        },
        {
          path: 'adminHome',
          element: <AdminHome></AdminHome>
        },
        {
          path: 'manageUsers',
          element: <ManageUsers></ManageUsers>
        },
        {
          path: 'manageTasks',
          element: <ManageTasks></ManageTasks>
        }
      ]
    }
  ]);