import React, { FunctionComponent } from "react";
import {
  BrowserRouter,
  Route,
  RouteProps,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import HomeScreen from "../../screens/homeScreen/homeScreen";
import SignupScreen from "../../screens/signupScreen/signupScreen";

interface myRouteProps extends Omit<RouteProps, "component"> {
  component: React.FunctionComponent<RouteComponentProps>;
}

const PublicRoute: FunctionComponent<myRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return <Route {...rest} render={Component} />;
};

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/signup" component={SignupScreen} />
        <PublicRoute path="/" exact component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
