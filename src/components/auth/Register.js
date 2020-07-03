import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "user",
  });

  const { name, email, password, password2, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Password do not match");
      setAlert("Hasła nie zgadzają się", "danger");
    } else {
      register({ name, email, password, role });
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <section className="form mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-white p-4 mb-4">
              <div className="card-body">
                <h1>
                  <i className="fas fa-user-plus"></i> Rejestracja
                </h1>
                <p>
                  Zarejestruj się aby dodać muzeum (Muzealnik) <br></br> badź
                  opinię (Zwiedzający)
                </p>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group anim">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => onChange(e)}
                      className="form-control"
                      required
                    />
                    <label style={name ? { display: "none" } : {}}>Imię</label>
                  </div>
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
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      className="form-control"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Hasło musi zawierać minimum 1 cyfrę, jedną małą literę, jedną wielką literę i być nie krótsze niż 8 znaków."
                      required
                    />{" "}
                    <label style={password ? { display: "none" } : {}}>
                      Hasło
                    </label>
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      name="password2"
                      value={password2}
                      onChange={(e) => onChange(e)}
                      className="form-control"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Hasło musi zawierać minimum 1 cyfrę, jedną małą literę, jedną wielką literę i być nie krótsze niż 8 znaków."
                      required
                    />{" "}
                    <label style={password2 ? { display: "none" } : {}}>
                      Powtórz hasło
                    </label>
                  </div>

                  <div className="card card-body mb-3">
                    <h5>Rola w serwisie</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="user"
                        checked={formData.role === "user"}
                        onChange={(e) => onChange(e)}
                      />
                      <div className="form-check-label">
                        Zwiedzający (aby dodawać opinie)
                      </div>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="publisher"
                        checked={formData.role === "publisher"}
                        onChange={(e) => onChange(e)}
                      />
                      <div className="form-check-label">
                        Muzealnik (aby dodać Muzeum)
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Zarejestruj"
                      className="btn btn-primary btn-block"
                    />
                  </div>
                </form>
                <p>
                  {" "}
                  Masz już konto ?{" "}
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    &nbsp;
                    <i className="fas fa-sign-in-alt"></i> &nbsp;Zaloguj się
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
