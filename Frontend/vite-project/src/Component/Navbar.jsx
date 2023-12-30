import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/register");
  };

  return (
    <>
      <div>
        <ul className="nav-ul">
          <li>
            <Link to={"/"}>Products</Link>
            <Link to={"/products"}>Add Products</Link>
            <Link to={"/update"}>Update Products</Link>
            <Link to={"/profile"}>Profile </Link>
            {auth ? (
              <Link onClick={logOut} to={"/register"}>
                Logout
              </Link>
            ) : (
              <Link to={"/register"}>SignUp</Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
