import React, { FunctionComponent } from "react";
import { BrowserRouter, Route, RouteProps, Switch } from "react-router-dom";
import HomeScreen from "../../screens/homeScreen/homeScreen";
import SignupScreen from "../../screens/signupScreen/signupScreen";
import CreateProfileScreen from "../../screens/createProfileScreen/createProfileScreen";

const PublicRoute: FunctionComponent<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  return <Route {...rest} component={Component} />;
};

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/create-profile" component={CreateProfileScreen} />
        <PublicRoute path="/signup" component={SignupScreen} />
        <PublicRoute path="/" exact component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
