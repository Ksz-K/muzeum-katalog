import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
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
    } else {
      const newUser = {
        name,
        email,
        password,
        role,
      };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify(newUser);

        const res = await axios.post("/api/v1/auth/register", body, config);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };
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
                  Zarejestruj się aby dodać muzeum (Muzealnik) badź opinię
                  (Zwiedzający)
                </p>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group">
                    <label htmlFor="name">Imię</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => onChange(e)}
                      className="form-control"
                      placeholder="Proszę podać imię"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Adres e-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      className="form-control"
                      placeholder="Twój e-mail"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Hasło</label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      className="form-control"
                      placeholder="Wpisz hasło"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Hasło musi zawierać minimum 1 cyfrę, jedną małą literę, jedną wielką literę i być nie krótsze niż 8 znaków."
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password2">Powtórz hasło</label>
                    <input
                      type="password"
                      name="password2"
                      value={password2}
                      onChange={(e) => onChange(e)}
                      className="form-control"
                      placeholder="Potwierdź hasło"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Hasło musi zawierać minimum 1 cyfrę, jedną małą literę, jedną wielką literę i być nie krótsze niż 8 znaków."
                      required
                    />
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
                      <label className="form-check-label">
                        Zwiedzający (aby dodawać opinie)
                      </label>
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
                      <label className="form-check-label">
                        Muzealnik (aby dodać Muzeum)
                      </label>
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

export default Register;
