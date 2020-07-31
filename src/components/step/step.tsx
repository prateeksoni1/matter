import React, { FunctionComponent } from "react";
import { Formik, Form } from "formik";
import classes from "./step.module.scss";
import Input from "./input/input";
import { StepProps } from "../../types";

const Step: FunctionComponent<StepProps> = ({
  handleClick,
  initialValues,
  validationSchema,
  bg,
  head,
  handleSubmit,
  formHead,
  inputs,
  children,
}) => {
  return (
    <div className={classes.step}>
      <div className={classes.wall} style={{ backgroundImage: `url(${bg})` }}>
        <div className={classes.darken}>
          <h1>{head}</h1>
        </div>
      </div>
      <div className={classes.container}>
        <h1>{formHead}</h1>
        {inputs.length > 0 ? (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit ? handleSubmit : (_) => null}
            validationSchema={validationSchema}
          >
            <Form>
              {React.Children.toArray(
                inputs.map((item) => (
                  <Input name={item.name} label={item.label} type={item.type} />
                ))
              )}
              {children}
              <button
                className={[classes.buttonPrimary, classes.btn].join(" ")}
                type="submit"
              >
                Continue
              </button>
            </Form>
          </Formik>
        ) : (
          <div className={classes.width}>
            {children}
            <button
              className={[classes.buttonPrimary, classes.btn].join(" ")}
              onClick={handleClick}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step;
