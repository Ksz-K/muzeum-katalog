import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { manageAccount, actionPending } from "../../actions/auth";

const ManageAccount = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionPending("accountChanged"));
  }, []);

  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const [formData, setFormData] = useState({
    email: auth.user.email || "",
    name: auth.user.name || "",
  });

  const { email, name } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(manageAccount({ name, email }));
  };

  //Redirect if logged in
  if (auth.accountChanged === true) {
    return <Redirect to="/" />;
  }
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Dane użytkownika</h1>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => onChange(e)}
                    required
                  />{" "}
                  <label style={name.length > 0 ? { display: "none" } : {}}>
                    Imię
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                  />{" "}
                  <label style={email.length > 0 ? { display: "none" } : {}}>
                    Adres e-mail
                  </label>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="submit"
                        value="Zapisz w bazie"
                        className="btn btn-success btn-block"
                      />
                    </div>
                    <div className="col-md-6">
                      <Link
                        to="/updatepassword"
                        className="btn btn-secondary btn-block"
                      >
                        Zmień hasło
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageAccount;
