import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const storedUser = auth?.name;
  const navigate = useNavigate();
  const logOut = () => {
    if (window.confirm("Do you really want to logout?")) {
      localStorage.removeItem("user");
      navigate("/register");
    }
  };

  return (
    <>
      <div>
        {auth ? (
          <ul className="nav-ul">
            <img
              className="logo"
              src="https://imgs.search.brave.com/yDzrfOyLNYvv5oC73I5-RWGgSAsDz84QNwNrno1cAPA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/djIvMSo1RDlvWUJk/NThweWpNa1ZfNS16/WFhRLmpwZWc"
              alt="image"
            />
            <li>
              <Link to={"/"}>Products</Link>
            </li>
            <li>
              <Link to={"/products"}>Add Products</Link>
            </li>
            <li>
              <Link to={"/update"}>Update Products</Link>
            </li>
            <li>
              <Link to={"/profile"}>Profile </Link>
            </li>
            <li>
              <Link onClick={logOut} to={"/register"}>
                Logout ({storedUser})
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-ul ">
            <li className="text-right">
              <Link className="text-right" to={"/register"}>
                SignUp
              </Link>
              <Link className="text-right" to={"/login"}>
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Navbar;
