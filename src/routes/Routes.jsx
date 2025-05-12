import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import ContactUs from "../components/ContactUs";
import Login from "../pages/Login";
import NewArrival from "../pages/NewArrival";
import SignUp from "../pages/SignUp";
import AddJersey from "../pages/AddJersey";
import AllStock from "../pages/AllStock";
import DashBoard from "../pages/DashBoard";
import JerseyDetails from "../pages/JerseyDetails";
import HiddenRoutes from "./HiddenRoutes";
import Cart from "../pages/Cart";

const router = createBrowserRouter([
    {
      path: "/", 
      element: <Main />,
      children: [
        {
            path: "/",
            element: <Home />
        },
        {
          path: '/contactUs',
          element: <ContactUs />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/signup",
          element: <SignUp />
        },
        {
          path: "newArrival",
          element: <NewArrival />
        },
        {
          path: "addJersey",
          element: <HiddenRoutes><AddJersey /></HiddenRoutes>
        },
        {
          path: "/jerseyDetails/:id",
          element: <JerseyDetails />,
          loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/jerseyDetails/${params.id}`)
        },
        {
          path: "/allStock",
          element: <HiddenRoutes><AllStock /></HiddenRoutes>
        },
        {
          path: "/dashboard",
          element: <HiddenRoutes><DashBoard /></HiddenRoutes>
        },
        {
          path: "/cart",
          element: <Cart />
        }
      ]
    },
  ])

  export default router ;
  