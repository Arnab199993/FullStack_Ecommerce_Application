import App from "./App";
import LogOut from "./Auth/LogOut";
import SignUp from "./Auth/SignUp";
import Navbar from "./Component/Navbar";
import AddProducts from "./Pages/AddProducts";
import Profile from "./Pages/Profile";
import UpdateProducts from "./Pages/UpdateProducts";

const Routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/navbar",
    element: <Navbar />,
  },
  {
    path: "/products",
    element: <AddProducts />,
  },
  {
    path: "/update",
    element: <UpdateProducts />,
  },
  {
    path: "/logout",
    element: <LogOut />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
];
export default Routes;
