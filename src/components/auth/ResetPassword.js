import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { requestRestore } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const ResetPassword = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      setAlert(
        "Po zweryfikowaniu adresu e-mail, link do resetu hasła zostanie wysłany",
        "primary"
      )
    );
    dispatch(requestRestore(email));

    history.push("/");
  };
  return (
    <section className="container" style={{ marginTop: "10vh" }}>
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
              <p> Na ten adres przyjdzie e-mail z linkiem do resetu hasła.</p>
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
                    value="Wyślij e-mail z linkiem"
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
