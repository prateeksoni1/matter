import { FormikValues } from "formik";

export type InputProps = {
  label: string;
  name: string;
  type?: string;
};

export type StepProps = {
  head: string;
  handleSubmit(values: FormikValues): void;
  formHead: string;
  inputs: Array<InputProps>;
};
