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
import RestorePassword from "./components/auth/RestorePassword";
import Museums from "./components/layout/Museums";
import MuseumProfile from "./components/layout/MuseumProfile";
import Reviews from "./components/layout/Reviews";
import AddReview from "./components/layout/AddReview";
import ManageReviews from "./components/layout/ManageReviews";
import AddMuseum from "./components/layout/AddMuseum";
import ManageMuseums from "./components/layout/ManageMuseums";
import ManageExpositions from "./components/layout/ManageExpositions";
import AddExposition from "./components/layout/AddExposition";
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
          <Navbar />
          <Alert />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/resetpassword" component={ResetPassword} />
            <Route
              exact
              path="/resetpassword/:id"
              component={RestorePassword}
            />
            <Route exact path="/reviews" component={Reviews} />
            <Route exact path="/museums" component={Museums} />
            <Route exact path="/museums/:name" component={MuseumProfile} />
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
            <PrivateRoute
              exact
              path="/managereviews"
              component={ManageReviews}
            />
            <PrivateRoute
              exact
              path="/manageexpositions"
              component={ManageExpositions}
            />
            <PrivateRoute exact path="/addreview" component={AddReview} />
            <PrivateRoute
              exact
              path="/managemuseums"
              component={ManageMuseums}
            />
            <PrivateRoute exact path="/addmuseum" component={AddMuseum} />
            <PrivateRoute
              exact
              path="/addexposition"
              component={AddExposition}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
