import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import NewRecipe from "./containers/NewRecipe";
import Recipe from "./containers/Recipe";
import NotFound from "./containers/NotFound";

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Signin} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute
      path="/recipes/new"
      exact
      component={NewRecipe}
      props={childProps}
    />
    <AppliedRoute
      path="/recipes/:id"
      exact
      component={Recipe}
      props={childProps}
    />
    <Route component={NotFound} />
  </Switch>
);
