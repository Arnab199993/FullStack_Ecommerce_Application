import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const defaultState = {
    text: "",
    email: "",
    password: "",
  };
  const [state, setState] = useState(defaultState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleClick = async () => {
    console.log("state", state);
    setState(defaultState);
    if (state.email !== "" && state.text !== "" && state.password !== "") {
      const result = await fetch("http://localhost:5000/sign-up", {
        method: "POST",
        body: JSON.stringify({
          name: state.text,
          email: state.email,
          password: state.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      if (response) {
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/");
      } else {
        console.log("Registration Failed");
      }
    }
  };
  const authValidation = () => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      navigate("/");
    }
  };
  useEffect(() => {
    authValidation();
  }, []);

  return (
    <>
      <div>
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
      </div>
    </>
  );
};

export default SignUp;
