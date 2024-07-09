import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu Psge/Menu/Menu";
import Order from "../Pages/Order Food/Order/Order";
import Contact from "../Pages/Contact US/Contact/Contact";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/My-Cart/MyCart";
import AllUsers from "../Pages/Dashboard/All Users/AllUsers";
import { AdminRoute } from "./AdminRoute";
import Additem from "../Pages/Dashboard/Add Item/Additem";
import ManageItems from "../Pages/Dashboard/Manage Items/ManageItems";
import Updateitems from "../Pages/Dashboard/Manage Items/Updateitems";
import DashBoardHome from "../Pages/Dashboard/Home Page/DashBoardHome";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment History/PaymentHistory";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
          path: "/menu",
          element: <Menu />,
        },
        {
          path: "/order",
          element: <Order />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register/>,
        },
    ],
  },
  {
     path: 'dashboard',
     element : <PrivateRoute><Dashboard/></PrivateRoute> ,
     children : [
      {
        path:'home',
        element: <DashBoardHome/> 
      },
      {
        path:'mycart',
        element: <MyCart/> 
      },
      {
        path:'allusers',
        element: <AdminRoute><AllUsers/> </AdminRoute>
      },
      {
        path:'additem',
        element: <AdminRoute><Additem/> </AdminRoute>
      },
      {
        path:'manageitems',
        element: <AdminRoute><ManageItems/> </AdminRoute>
      },
      {
        path:'updateitems/:id',
        element: <AdminRoute><Updateitems/> </AdminRoute>,
        loader : ({params}) => fetch(`https://bistro-boss-roan.vercel.app/menu/${params.id}`)
      },
      {
        path : 'payment',
        element : <Payment />
      },
      {
        path : 'history',
        element : <PaymentHistory/>
      },
     ]
  }
]);
