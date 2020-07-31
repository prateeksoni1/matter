import React, { useContext, FunctionComponent } from "react";
import Step from "../../components/step/step";
import { InputProps, CreateProjectValues } from "../../types";
import { Field, ErrorMessage } from "formik";
import createProjectContext from "../../contexts/createProjectContext";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";

const stepInputs: Array<InputProps> = [
  {
    label: "Name",
    name: "name",
  },
];
const CreateProjectScreen: FunctionComponent<RouteComponentProps> = (props) => {
  const projectData = useContext(createProjectContext);

  const handleSubmit = (values: CreateProjectValues) => {
    if (projectData.setFields) {
      projectData.setFields((state) => ({ ...state, ...values }));
      props.history.push(`/${values.name}/roles`);
    }
  };

  const validationSchema: Yup.ObjectSchema<CreateProjectValues> = Yup.object({
    name: Yup.string().required().min(4),
    description: Yup.string().required().min(4),
  }).defined();

  return (
    <Step
      bg={require("../../assets/images/create-project.jpg")}
      formHead="Create Project"
      head="Something awesome"
      inputs={stepInputs}
      handleSubmit={handleSubmit}
      initialValues={{ name: "", description: "" }}
      validationSchema={validationSchema}
    >
      <label htmlFor="description">Description</label>
      <Field component="textarea" name="description" />
      <ErrorMessage name="description" component="div" />
    </Step>
  );
};

export default CreateProjectScreen;
