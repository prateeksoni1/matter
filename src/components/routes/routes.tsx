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

const PublicRoute: FunctionComponent<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  return <Route {...rest} component={Component} />;
};

const PrivateRoute: FunctionComponent<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const profileData = useContext(userContext);

  if (profileData.user) {
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
  }, [userData]);

  if (loading) return null;

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/create-profile" component={CreateProfileScreen} />
        <PublicRoute path="/signup" component={SignupScreen} />
        <PublicRoute path="/" exact component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
