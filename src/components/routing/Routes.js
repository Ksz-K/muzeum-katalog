import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../routing/PrivateRoute";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ManageAccount from "../auth/ManageAccount";
import ResetPassword from "../auth/ResetPassword";
import UpdatePassword from "../auth/UpdatePassword";
import RestorePassword from "../auth/RestorePassword";
import Museums from "../layout/Museums";
import MuseumProfile from "../layout/MuseumProfile";
import Reviews from "../layout/Reviews";
import AddReview from "../layout/AddReview";
import ManageReviews from "../layout/ManageReviews";
import AddMuseum from "../layout/AddMuseum";
import ManageMuseums from "../layout/ManageMuseums";
import ManageExpositions from "../layout/ManageExpositions";
import AddExposition from "../layout/AddExposition";
import Alert from "../layout/Alert";
import PageNotFound from "../layout/PageNotFound";
const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/resetpassword/:id" component={RestorePassword} />
        <Route exact path="/reviews" component={Reviews} />
        <Route exact path="/museums" component={Museums} />
        <Route exact path="/museums/:name" component={MuseumProfile} />
        <PrivateRoute exact path="/updatepassword" component={UpdatePassword} />
        <PrivateRoute exact path="/manageaccount" component={ManageAccount} />
        <PrivateRoute exact path="/managereviews" component={ManageReviews} />
        <PrivateRoute
          exact
          path="/manageexpositions"
          component={ManageExpositions}
        />
        <PrivateRoute exact path="/addreview" component={AddReview} />
        <PrivateRoute exact path="/managemuseums" component={ManageMuseums} />
        <PrivateRoute exact path="/addmuseum" component={AddMuseum} />
        <PrivateRoute exact path="/addexposition" component={AddExposition} />
        <Route component={PageNotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
