import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <section className="form" style={{ marginTop: "10vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-white p-4 mb-4">
              <div className="card-body">
                <h1>
                  <i className="fas fa-sign-in-alt"></i> Logowanie
                </h1>
                <p>
                  Zaloguj się aby móc dodać komentarz, ocenę <br></br>bądź dodać
                  Muzeum.
                </p>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      className="form-control"
                      required
                    />{" "}
                    <label style={email ? { display: "none" } : {}}>
                      Adres e-mail
                    </label>
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      className="form-control"
                      required
                    />{" "}
                    <label style={password ? { display: "none" } : {}}>
                      Hasło
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Logowanie"
                      className="btn btn-primary btn-block"
                    />
                  </div>
                </form>
                <p>
                  {" "}
                  Nie posiadasz konta?{" "}
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    Zarejestruj się
                  </Link>
                </p>
                <p>
                  {" "}
                  Zapomniałeś hasła?{" "}
                  <Link to="/resetpassword" style={{ textDecoration: "none" }}>
                    Przywróć hasło
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
