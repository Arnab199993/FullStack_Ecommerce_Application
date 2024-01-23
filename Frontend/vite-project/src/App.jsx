import { useState } from "react";
import "./App.css";
import Footer from "./Component/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateComponent from "./Component/PrivateComponent";
import Product from "./Component/Product";
// import LogOut from "./Auth/LogOut";
import SignUp from "./Auth/SignUp";
import Navbar from "./Component/Navbar";
import AddProducts from "./Pages/AddProducts";
import Profile from "./Pages/Profile";
import UpdateProducts from "./Pages/UpdateProducts";
import Login from "./Auth/Login";
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<Product />} />
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/products" element={<AddProducts />} />
              <Route path="/update/:id" element={<UpdateProducts />} />
              {/* <Route path="/logout" element={<LogOut />} /> */}
            </Route>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
