import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div>
        <ul className="nav-ul">
          <li>
            <Link to={"/"}>Products</Link>
            <Link to={"/products"}>Add Products</Link>
            <Link to={"/update"}>Update Products</Link>
            <Link to={"/logout"}>Logout </Link>
            <Link to={"/profile"}>Profile </Link>
            <Link to={"/register"}>SignUp</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
