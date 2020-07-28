import React, { FunctionComponent, useState } from "react";
import { FormikValues } from "formik";
import Step from "./step/step";
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
  const [step, setStep] = useState(1);

  const handleSubmit = (values: FormikValues) => {
    console.log(values);
  };

  if (step === 1)
    return (
      <Step
        head="The only management app you'll ever need."
        formHead="Sign up to Matter"
        handleSubmit={handleSubmit}
        inputs={stepInputs}
      />
    );

  return null;
};

export default SignupScreen;
