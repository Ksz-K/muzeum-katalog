import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { updatePassword, actionPending } from "../../actions/auth";
import PropTypes from "prop-types";

const UpdatePassword = ({
  setAlert,
  updatePassword,
  passwordChanged,
  actionPending,
}) => {
  useEffect(() => {
    actionPending();
  }, []);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newPassword2: "",
  });

  const { currentPassword, newPassword, newPassword2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      console.log("Password do not match");
      setAlert("Hasła nie zgadzają się", "danger");
    } else {
      updatePassword({ currentPassword, newPassword });
    }
  };

  //Redirect if logged in
  if (passwordChanged === true) {
    return <Redirect to="/" />;
  }

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Zmień hasło</h1>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-control"
                    onChange={(e) => onChange(e)}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Hasło musi zawierać minimum 1 cyfrę, jedną małą literę, jedną wielką literę i być nie krótsze niż 8 znaków."
                    required
                  />{" "}
                  <label style={currentPassword ? { display: "none" } : {}}>
                    Aktualne hasło
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    onChange={(e) => onChange(e)}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Hasło musi zawierać minimum 1 cyfrę, jedną małą literę, jedną wielką literę i być nie krótsze niż 8 znaków."
                    required
                  />{" "}
                  <label style={newPassword ? { display: "none" } : {}}>
                    Nowe hasło
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="newPassword2"
                    className="form-control"
                    onChange={(e) => onChange(e)}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Hasło musi zawierać minimum 1 cyfrę, jedną małą literę, jedną wielką literę i być nie krótsze niż 8 znaków."
                    required
                  />{" "}
                  <label style={newPassword2 ? { display: "none" } : {}}>
                    Potwierdź nowe hasło
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Zapisz Nowe Hasło"
                    className="btn btn-info btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

UpdatePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  actionPending: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  passwordChanged: state.auth.passwordChanged,
});

export default connect(mapStateToProps, {
  setAlert,
  updatePassword,
  actionPending,
})(UpdatePassword);
