import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData((formData) => {
      return {
        ...formData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const history = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const login = async (formData) => {
    const request = {
      username: formData.username,
      password: formData.password,
    };
    if (validateInput(formData)) {
      setIsSubmit(true);

      const res = await axios.post(
        "https://cms-backend-pnlo.onrender.com/login",
        request,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);

      if (res.status === 422) {
        enqueueSnackbar(res.data.message, { variant: `error` });
      }

      persistLogin(res.data.username, res.data.token);
      enqueueSnackbar("Logged in Successfully", {
        variant: `success`,
      });
      setIsSubmit(false);
      history("/");
    }
  };

  const validateInput = (data) => {
    if (data.username.length === 0) {
      enqueueSnackbar("Username is a required field", {
        variant: `error`,
      });
    } else if (data.password.length === 0) {
      enqueueSnackbar("Password is a required field", {
        variant: `error`,
      });
    } else {
      return true;
    }
    return false;
  };

  const persistLogin = (username, token) => {
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("token", token);
  };

  return (
    <div className="card">
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <h2 className="header">Login</h2>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control login-inputField"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                aria-describedby="emailHelp"
                placeholder="Enter Username"
              />
              <small id="emailHelp" className="form-text text-muted">
                Username must be atleast 6 characters length
              </small>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control login-inputField"
                id="password"
                placeholder="Password"
              />
            </div>
            {isSubmit ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress disableShrink />
              </Box>
            ) : (
              <button
                type="submit"
                onClick={() => login(formData)}
                className="login-button"
              >
                Login
              </button>
            )}
            <p>
              Don’t have an account?{" "}
              <Link to="/signup" className="link">
                Signup now
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
