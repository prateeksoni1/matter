import * as Yup from "yup";

export type InputProps = {
  label: string;
  name: string;
  type?: string;
};

export type ProfileValues = {
  name: string;
  username: string;
  isOwner?: boolean;
};

export type SignupValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type StepProps = {
  initialValues: any;
  validationSchema: Yup.ObjectSchema<SignupValues | ProfileValues>;
  head: string;
  bg: ImageBitmap;
  handleSubmit(values: SignupValues): void;
  formHead: string;
  inputs: Array<InputProps>;
};
