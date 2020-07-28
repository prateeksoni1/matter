import React, { FunctionComponent } from "react";
import { SignupValues } from "../../types";
import Step from "../../components/step/step";
import { InputProps } from "../../types";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import api from "../../api";

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
    await api.post("/api/auth/signup", { email, password });
    props.history.push("/create-profile");
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
