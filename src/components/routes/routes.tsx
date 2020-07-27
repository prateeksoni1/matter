import React, { FunctionComponent } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "../../screens/homeScreen/homeScreen";

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={HomeScreen} />
    </BrowserRouter>
  );
};

export default Routes;
