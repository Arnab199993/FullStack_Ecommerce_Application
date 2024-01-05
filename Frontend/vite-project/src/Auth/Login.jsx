import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const Login = () => {
  const defaultState = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(defaultState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    try {
      if (userData.email !== "" && userData.password !== "") {
        const response = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log("result", result);

          if (result.auth) {
            localStorage.setItem("token", result.auth);
            localStorage.setItem("user", JSON.stringify(result.data));
            navigate("/");
          } else {
            alert("Please enter correct details");
          }
        } else {
          // Handle non-2xx status codes (e.g., display an error message)
          console.log("Error:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="login">
        <h1>Login Page</h1>
        <input
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="inputBox"
          type="email"
          placeholder="Enter Email"
        />
        <input
          name="password"
          value={userData.password}
          onChange={handleChange}
          className="inputBox"
          type="password"
          placeholder="Enter Password"
        />
        <div>
          <p>
            Don't have an account? Create One{" "}
            <Link to={"/register"}>Sign Up</Link>
          </p>
        </div>
        <button onClick={handleLogin} className="appButton">
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
