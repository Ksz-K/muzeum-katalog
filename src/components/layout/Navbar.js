import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <span
          className="badge badge-primary"
          style={{ pointerEvents: "none", padding: 8, margin: 8 }}
        >
          {!loading && user.name}
        </span>
      </li>
      <li className="nav-item">
        <span
          className="badge badge-success"
          style={{ pointerEvents: "none", padding: 8, margin: 8 }}
        >
          {!loading && user.role}
        </span>
      </li>
      <li className="nav-item">
        <a onClick={logout} className="nav-link" href="#!">
          <i className="fas fa-sign-out-alt"></i>
          &nbsp; Wyloguj
        </a>
      </li>
    </ul>
  );

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
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
