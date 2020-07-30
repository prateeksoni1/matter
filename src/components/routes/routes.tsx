import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BrowserRouter,
  Route,
  RouteProps,
  Switch,
  Redirect,
} from "react-router-dom";
import HomeScreen from "../../screens/homeScreen/homeScreen";
import SignupScreen from "../../screens/signupScreen/signupScreen";
import CreateProfileScreen from "../../screens/createProfileScreen/createProfileScreen";
import api from "../../api";
import userContext from "../../contexts/userContext";
import CreateOrganizationScreen from "../../screens/createOrganizationScreen/createOrganizationScreen";
import SetOrganizationScreen from "../../screens/setOrganizationScreen/setOrganizationScreen";
import DashboardScreen from "../../screens/dashboardScreen/dashboardScreen";

const PublicRoute: FunctionComponent<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const userData = useContext(userContext);

  if (userData.user) {
    if (userData.user.profile) return <Redirect to="/dashboard" />;

    return <Redirect to="/create-profile" />;
  }
  return <Route {...rest} component={Component} />;
};

const PrivateRoute: FunctionComponent<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const userData = useContext(userContext);

  if (userData.user) {
    return <Route {...rest} component={Component} />;
  } else {
    return <Redirect to="/" />;
  }
};

const Routes: FunctionComponent = () => {
  const userData = useContext(userContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth", {
          headers: { token: localStorage.getItem("token") },
        });
        if (res.data.success) {
          userData.setUser(res.data.user);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return null;

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/dashboard" component={DashboardScreen} />
        <PrivateRoute path="/create-profile" component={CreateProfileScreen} />
        <PrivateRoute
          path="/create-organization"
          component={CreateOrganizationScreen}
        />
        <PrivateRoute
          path="/set-organization"
          component={SetOrganizationScreen}
        />
        <PublicRoute path="/signup" component={SignupScreen} />
        <PublicRoute path="/" exact component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
