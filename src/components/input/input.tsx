import React, { FunctionComponent } from "react";
import classes from "./input.module.scss";
import { Field } from "formik";

type InputProps = {
  label: string;
  name: string;
};

const Input: FunctionComponent<InputProps> = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.name}>{props.label}</label>
      <Field name={props.name} />
    </div>
  );
};

export default Input;
