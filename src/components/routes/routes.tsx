import React, { FunctionComponent } from "react";
import { BrowserRouter, Route, RouteProps } from "react-router-dom";
import HomeScreen from "../../screens/homeScreen/homeScreen";
import Navbar from "../navbar/navbar";

interface myRouteProps extends Omit<RouteProps, "component"> {
  component: React.FunctionComponent;
}

const PublicRoute: FunctionComponent<myRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => (
        <>
          <Navbar />
          <Component />
        </>
      )}
    />
  );
};

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <PublicRoute path="/" exact component={HomeScreen} />
    </BrowserRouter>
  );
};

export default Routes;
