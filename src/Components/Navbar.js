import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#6588db" }}
      >
        <div className="container-fluid">
          <NavLink
            className="navbar-brand"
            to="/"
            style={{ fontWeight: "700" }}
          >
            CMS
          </NavLink>
          {!localStorage.getItem("token") ? (
            <></>
          ) : (
            <button onClick={logout} className="logout-button">
              Log Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
