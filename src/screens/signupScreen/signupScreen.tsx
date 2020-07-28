import React, { FunctionComponent, useState } from "react";
import { FormikValues } from "formik";
import Step from "../../components/step/step";
import { InputProps } from "../../types";
import { RouteComponentProps } from "react-router-dom";

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
  const handleSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return (
    <Step
      bg={require("../../assets/images/create-project.jpg")}
      head="The only management app you'll ever need."
      formHead="Sign up to Matter"
      handleSubmit={handleSubmit}
      inputs={stepInputs}
    />
  );
};

export default SignupScreen;
