import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { restorePassword } from "../../actions/auth";
import PropTypes from "prop-types";

const RestorePassword = ({
  setAlert,
  restorePassword,
  isAuthenticated,
  match,
}) => {
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });

  const { password, password2 } = formData;
  const token = match.params.id;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Password do not match");
      setAlert("Hasła nie zgadzają się", "danger");
    } else {
      restorePassword(password, token);
    }
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
                  <i className="fas fa-key"></i> Przywrócenie hasła
                </h1>
                <p className="font-italic">Link jest ważny 10 minut</p>
                <form onSubmit={(e) => onSubmit(e)}>
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

                  <div className="form-group">
                    <input
                      type="submit"
                      value="Ustaw nowe hasło"
                      className="btn btn-primary btn-block"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

RestorePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  restorePassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, restorePassword })(
  RestorePassword
);
