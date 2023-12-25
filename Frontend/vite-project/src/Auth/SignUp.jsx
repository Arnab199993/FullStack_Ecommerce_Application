import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const SignUp = () => {
  const defaultState = {
    text: "",
    email: "",
    password: "",
  };
  const [state, setState] = useState(defaultState);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    console.log(state);
    setState(defaultState);
  };
  return (
    <>
      <div>
        <Navbar />
        <div className="register">
          <h1>Register</h1>
          <input
            name="text"
            value={state.text}
            className="inputBox"
            type="text"
            placeholder="Enter Name"
            onChange={handleChange}
          />
          <input
            name="email"
            value={state.email}
            className="inputBox"
            type="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />
          <input
            name="password"
            className="inputBox"
            type="password"
            placeholder="Enter Password"
            value={state.password}
            onChange={handleChange}
          />
          <button onClick={handleClick} className="appButton" type="button">
            Sign Up
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SignUp;
