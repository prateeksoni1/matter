import React, { FunctionComponent, useContext } from "react";
import { LoginValues } from "../../types";
import Step from "../../components/step/step";
import { InputProps } from "../../types";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import api from "../../api";
import profileContext from "../../contexts/userContext";

const stepInputs: Array<InputProps> = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

const LoginScreen: FunctionComponent<RouteComponentProps> = (props) => {
  const profileData = useContext(profileContext);

  const validationSchema: Yup.ObjectSchema<LoginValues> = Yup.object({
    email: Yup.string().email().defined(),
    password: Yup.string().min(6).defined(),
  }).defined();

  const handleSubmit = async (values: LoginValues) => {
    const { email, password } = values;
    try {
      const res = await api.post("/api/auth/login", { email, password });
      profileData.setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      if (!res.data.user.profile) props.history.push("/create-profile");
      else props.history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Step
      bg={require("../../assets/images/create-project.jpg")}
      head="The only management app you'll ever need."
      formHead="Login to Matter"
      handleSubmit={handleSubmit}
      inputs={stepInputs}
      validationSchema={validationSchema}
      initialValues={{ email: "", password: "" }}
    />
  );
};

export default LoginScreen;
