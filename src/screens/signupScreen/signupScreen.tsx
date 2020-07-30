import React, { FunctionComponent, useContext } from "react";
import { SignupValues } from "../../types";
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
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
];

const SignupScreen: FunctionComponent<RouteComponentProps> = (props) => {
  const profileData = useContext(profileContext);

  const validationSchema: Yup.ObjectSchema<SignupValues> = Yup.object({
    email: Yup.string().email().defined(),
    password: Yup.string().min(6).defined(),
    confirmPassword: Yup.string()
      .min(6, "Passwords do not match")
      .defined()
      .test("password-match", "Passwords do not match", function (value) {
        return this.parent.password === value;
      }),
  }).defined();

  const handleSubmit = async (values: SignupValues) => {
    const { email, password } = values;
    try {
      await api.post("/api/auth/signup", { email, password });
      const res = await api.post("/api/auth/login", { email, password });
      console.log(res.data);
      profileData.setUser(res.data.user);
      localStorage.setItem("token", res.data.token);

      props.history.push("/create-profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Step
      bg={require("../../assets/images/create-project.jpg")}
      head="The only management app you'll ever need."
      formHead="Sign up to Matter"
      handleSubmit={handleSubmit}
      inputs={stepInputs}
      validationSchema={validationSchema}
      initialValues={{ email: "", password: "", confirmPassword: "" }}
    />
  );
};

export default SignupScreen;
