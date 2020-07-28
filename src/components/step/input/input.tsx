import React, { FunctionComponent } from "react";
import classes from "./input.module.scss";
import { Field, ErrorMessage } from "formik";
import { InputProps } from "../../../types";

const Input: FunctionComponent<InputProps> = (props) => {
  if (props.type === "checkbox") {
    return (
      <div className={classes.input}>
        <label htmlFor={props.name} className={classes.checkLabel}>
          <Field
            name={props.name}
            type={props.type}
            style={{ width: "fit-content", marginRight: "1rem" }}
          />
          {props.label}
        </label>
      </div>
    );
  }

  return (
    <div className={classes.input}>
      <label htmlFor={props.name}>{props.label}</label>
      <Field name={props.name} type={props.type} />
      <ErrorMessage name={props.name} component="div" />
    </div>
  );
};

export default Input;
