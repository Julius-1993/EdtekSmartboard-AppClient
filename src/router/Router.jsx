import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Login";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import Payment from "../pages/shop/Payment";
import Order from "../pages/dashboard/Order";
import ManageBooking from "../pages/dashboard/admin/ManageBooking";
import AdminNotification from "../pages/dashboard/admin/AdminNotification";
import About from "../components/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order",
        element: <PrivateRouter><Order /></PrivateRouter>,
      },
      {
        path: "/cart-page",
        element: <CartPage/>,
      },
      {
        path: "/process-checkout",
        element: <Payment/>,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      
    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  

  //Admin Routes
  {
    path: "dashboard",
    element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
    children: [
      {
        path: '',
        element: <Dashboard/>
      },
      {
        path: 'users',
        element: <Users/>
      },
      {
        path: 'add-menu',
        element: <AddMenu/>
      }, 
      {
        path: "manage-items",
        element: <ManageItems/>
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu/>,
        loader: ({params}) => fetch(`https://edteksmartboard-appserver.onrender.com/menu/${params.id}`)
      },
      {
        path: 'manage-booking',
        element: <ManageBooking/>
      },
      {
        path: 'notification',
        element: <AdminNotification/>
      }
    ]
  },

]);

export default router;
