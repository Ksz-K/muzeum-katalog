import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link to="/login">Powrót do strony logowania</Link>
              <h1 className="mb-2">Zresetuj hasło</h1>
              <p>
                {" "}
                Wpisz adres email, który został użyty podczas rejestracji do
                serwisu.
              </p>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                  />{" "}
                  <label style={email ? { display: "none" } : {}}>
                    Adres e-mail
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Reset hasła"
                    className="btn btn-dark btn-block"
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

export default ResetPassword;
