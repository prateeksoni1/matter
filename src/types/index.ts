import * as Yup from "yup";

export type InputProps = {
  label: string;
  name: string;
  type?: string;
};

export type ProfileValues = {
  name: string;
  username: string;
  isOwner: boolean;
};

export type SignupValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type CreateProjectValues = {
  name: string;
  description: string;
};

export type StepProps = {
  initialValues?: any;
  validationSchema?: Yup.ObjectSchema<
    | SignupValues
    | ProfileValues
    | CreateOrganizationValues
    | LoginValues
    | CreateProjectValues
    | FeatureValues
  >;
  head: string;
  bg: ImageBitmap;
  handleSubmit?(
    values:
      | SignupValues
      | ProfileValues
      | CreateOrganizationValues
      | LoginValues
      | CreateProjectValues
      | FeatureValues
  ): void;
  handleClick?(): void;
  formHead: string;
  inputs: Array<InputProps>;
};

export type CreateOrganizationValues = {
  name: string;
};

export type locationState = {
  project: any;
  setRefresh?: any;
};

export type FeatureValues = {
  title: string;
  description: string;
  priority: number;
};
