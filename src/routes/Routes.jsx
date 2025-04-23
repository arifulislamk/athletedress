import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import ContactUs from "../components/ContactUs";
import Login from "../pages/Login";
import NewArrival from "../pages/NewArrival";

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
          path: "newArrival",
          element: <NewArrival />
        }
      ]
    },
  ])

  export default router ;
  