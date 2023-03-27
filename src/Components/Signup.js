import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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

  const signup = async (formData) => {
    const request = {
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    if (validateInput(formData)) {
      setIsSubmit(true);
      const res = await axios.post(
        "https://cms-backend-pnlo.onrender.com/signup",
        request,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);

      if (res.status === 422) {
        enqueueSnackbar(res.data.message, {
          variant: `error`,
        });
        console.log("error");
      } else if (res.status === 201) {
        enqueueSnackbar("Registered Successfully", { variant: `success` });
        history("/login");
      }
    }
  };

  const validateInput = (data) => {
    if (data.username.length === 0) {
      enqueueSnackbar("Username is a required field", {
        variant: `warning`,
      });
    } else if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: `warning`,
      });
    } else if (data.password.length === 0) {
      enqueueSnackbar("Password is a required field", {
        variant: `warning`,
      });
    } else if (data.password.length < 6) {
      enqueueSnackbar("Paasword must be at least 6 characters", {
        variant: `warning`,
      });
    } else if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: `warning`,
      });
    } else {
      return true;
    }
    return false;
  };

  return (
    <div className="card">
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <h2 className="header">Signup</h2>
          <form>
            <div className="form-group">
              <input
                type="text"
                name="username"
                className="form-control signup-inputField"
                id="username"
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
                className="form-control signup-inputField"
                id="password"
                placeholder="Password"
              />
              <small id="emailHelp" className="form-text text-muted">
                Password must be atleast 6 characters length
              </small>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                className="form-control signup-inputField"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {isSubmit ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress disableShrink />
              </Box>
            ) : (
              <button
                type="submit"
                onClick={() => signup(formData)}
                className="signup-button"
              >
                Signup Now
              </button>
            )}
            <p className="secondary-action">
              Already have an account?{" "}
              <a className="link" href="/login">
                Login here
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
