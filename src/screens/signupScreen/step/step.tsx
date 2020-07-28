import React, { FunctionComponent } from "react";
import { Formik, Form } from "formik";
import classes from "./step.module.scss";
import Input from "./input/input";
import { StepProps } from "../../../types";

const Step: FunctionComponent<StepProps> = ({
  head,
  handleSubmit,
  formHead,
  inputs,
}) => {
  return (
    <div className={classes.step}>
      <div className={classes.wall}>
        <div className={classes.darken}>
          <h1>{head}</h1>
        </div>
      </div>
      <div className={classes.container}>
        <h1>{formHead}</h1>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            {React.Children.toArray(
              inputs.map((item) => (
                <Input name={item.name} label={item.label} />
              ))
            )}

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

export default Step;
