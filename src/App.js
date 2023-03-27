import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./Components/Home";
import Edit from "./Components/Edit";
import Details from "./Components/Details";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import NewCustomer from "./Components/NewCustomer";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<NewCustomer />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        <Route exact path="/view/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
