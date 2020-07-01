import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="logo navbar-brand" to="/">
          <img src="https://kszk.vot.pl/kszk.png" alt="" />

          <span style={{ fontSize: "1.1em" }}>
            &nbsp;<i className="fas fa-archway"></i>&nbsp;Muzeum Katalog{" "}
          </span>
        </Link>

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
              <Link className="nav-link" to="/login">
                <i className="fas fa-sign-in-alt"></i> Logowanie
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <i className="fas fa-user-plus"></i> Rejestracja
              </Link>
            </li>
            <li className="nav-item d-none d-sm-block">
              <Link className="nav-link" to="#">
                |
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/museums">
                Nasze Muzea
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
