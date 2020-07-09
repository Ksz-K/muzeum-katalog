import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ManageAccount from "./components/auth/ManageAccount";
import ResetPassword from "./components/auth/ResetPassword";
import UpdatePassword from "./components/auth/UpdatePassword";
import Museums from "./components/layout/Museums";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import { whereVisitorIs } from "./actions/museum";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(whereVisitorIs());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar /> <Alert />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/resetpassword" component={ResetPassword} />
            <Route exact path="/museums" component={Museums} />
            <PrivateRoute
              exact
              path="/updatepassword"
              component={UpdatePassword}
            />
            <PrivateRoute
              exact
              path="/manageaccount"
              component={ManageAccount}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
