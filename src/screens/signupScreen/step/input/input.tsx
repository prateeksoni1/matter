import React, { FunctionComponent } from "react";
import classes from "./input.module.scss";
import { Field } from "formik";
import { InputProps } from "../../../../types";

const Input: FunctionComponent<InputProps> = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.name}>{props.label}</label>
      <Field name={props.name} type={props.type} />
    </div>
  );
};

export default Input;
