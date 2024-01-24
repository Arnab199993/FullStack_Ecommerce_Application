import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:5000";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const defaultState = {
    text: "",
    email: "",
    password: "",
  };
  const [state, setState] = useState(defaultState);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const signUpData = localStorage.getItem("token");
  console.log("signUpDataaaaa", signUpData);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleClick = async () => {
    console.log("state", state);
    setState(defaultState);
    if (state.email !== "" && state.text !== "" && state.password !== "") {
      const result = await fetch(`${BASE_URL}/sign-up`, {
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
      console.log("responseee", response);
      if (!response.ok) {
        setMessage(response?.result);
      }
      if (result.ok && response.auth) {
        // localStorage.setItem("user", JSON.stringify(response.result));
        // localStorage.setItem("token", JSON.stringify(response.auth));
        navigate("/login");
      } else {
        console.log("Registration Failed");
      }
    }
  };
  const authValidation = () => {
    const auth = JSON.parse(localStorage.getItem("user"));
    console.log("authhh", auth);
    if (auth) {
      navigate("/");
    }
  };
  useEffect(() => {
    authValidation();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography>{message}</Typography>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                label="Name"
                autoComplete="text"
                autoFocus
                type="text"
                name="text"
                value={state.text}
                placeholder="Enter Name"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                autoFocus
                type="email"
                placeholder="Enter Your Email"
                onChange={handleChange}
                name="email"
                value={state.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                autoComplete="password"
                autoFocus
                type="password"
                name="password"
                value={state.password}
                placeholder="Enter Password"
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleClick}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {"Already have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
