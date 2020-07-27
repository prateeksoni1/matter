import React, { FunctionComponent } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import classes from "./signupScreen.module.scss";
import Input from "../../components/input/input";

const SignupScreen: FunctionComponent = () => {
  const handleSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return (
    <div className={classes.signup}>
      <div className={classes.wall}>
        <div className={classes.darken}>
          <h1>The only management app you'll ever need.</h1>
        </div>
      </div>
      <div className={classes.container}>
        <h1>Sign up to Matter</h1>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Input name="email" label="Email" />
            <Input name="password" label="Password" />
            <Input name="confirmPassword" label="Confirm Password" />
            <button
              className={[classes.buttonPrimary, classes.btn].join(" ")}
              type="submit"
            >
              Continue
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignupScreen;
