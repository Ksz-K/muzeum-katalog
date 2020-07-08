import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { countMuseums } from "../../actions/museum";

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  museum: { counter },
  countMuseums,
}) => {
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <span
          className="badge badge-primary"
          style={{ pointerEvents: "none", padding: 8, margin: 8 }}
        >
          {user.name}
        </span>
      </li>
      <li className="nav-item">
        <span
          className="badge badge-success"
          style={{ pointerEvents: "none", padding: 8, margin: 8 }}
        >
          {user.role === "user" ? "Zwiedzający" : "Muzealnik"}
        </span>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#!"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
        >
          <i className="fas fa-user"></i> Konto
        </a>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/managemuseums">
            Twoje Muzea
          </Link>
          <Link className="dropdown-item" to="/managereviews">
            Twoje Opinie
          </Link>
          <Link className="dropdown-item" to="/manageaccount">
            Twoje Konto
          </Link>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt"></i> Wyloguj
          </a>
        </div>
      </li>
    </ul>
  );

  useEffect(() => {
    countMuseums();
  }, []);

  const guestLinks = (
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
      <li className="nav-item">
        <Link className="nav-link" to="/museums">
          Nasze Muzea
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="logo navbar-brand" to="/">
          <img
            src="https://kszk.vot.pl/kszk.png"
            alt="logo"
            onClick={() => {
              window.open("https://kszk.pl", "_blank");
            }}
          />
          <span style={{ fontSize: "1.1em" }}>
            &nbsp;<i className="fas fa-archway"></i>&nbsp;Muzeum Katalog{" "}
          </span>

          <span
            className="badge badge-success"
            style={{ pointerEvents: "none", padding: 8, margin: 8 }}
          >
            Obiektów w bazie: <span style={{ color: "#306" }}> {counter}</span>
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
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </div>{" "}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  countMuseums: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  museum: state.museum,
});
export default connect(mapStateToProps, { logout, countMuseums })(Navbar);
