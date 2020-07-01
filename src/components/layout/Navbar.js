import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
      <div className="container">
        <a className="logo navbar-brand" to="/">
          <img src="https://kszk.vot.pl/kszk.png" alt="" />
          <i className="fas fa-archway"></i>
          <span style={{ fontSize: "1.1em" }}>&nbsp;Muzeum Katalog </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="login.html">
                <i className="fas fa-sign-in-alt"></i> Logowanie
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="register.html">
                <i className="fas fa-user-plus"></i> Rejestracja
              </a>
            </li>
            <li className="nav-item d-none d-sm-block">
              <a className="nav-link" href="#">
                |
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="bootcamps.html">
                Nasze Muzea
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
