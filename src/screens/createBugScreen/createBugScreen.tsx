import React, { FunctionComponent, useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Field, ErrorMessage } from "formik";
import classes from "./createBugScreen.module.scss";
import * as Yup from "yup";
import { StaticContext } from "react-router";
import { locationState, InputProps, FeatureValues } from "../../types";
import Select from "react-select";
import Step from "../../components/step/step";
import api from "../../api";
import userContext from "../../contexts/userContext";

const CreateFeatureScreen: FunctionComponent<RouteComponentProps<
  {},
  StaticContext,
  locationState
>> = (props) => {
  const user = useContext(userContext);

  const [assignedTo, setAssignedTo] = useState([]);

  const { project } = props.location.state;

  const contributors = project.contributors.map((ct: any) => ({
    label: ct.profile.username,
    value: ct._id,
  }));

  const handleSubmit = async (values: FeatureValues) => {
    const assignedBy = project.contributors.find(
      (ct: any) => ct.profile.username === user.user.profile.username
    )._id;

    const res = await api.post("/api/project/task", {
      type: "BUG",
      permission: "create-task",
      assignedTo,
      assignedBy,
      ...values,
      projectId: project._id,
    });
    console.log(res);
  };

  const validationSchema = Yup.object()
    .shape({
      title: Yup.string().defined(),
      description: Yup.string().defined(),
      priority: Yup.number().defined(),
    })
    .defined();

  const handleSelectChange = (value: any) => {
    const ids = value.map((obj: { label: string; value: string }) => obj.value);

    setAssignedTo(ids);
  };

  const inputs: Array<InputProps> = [{ label: "Title", name: "title" }];

  return (
    <div className={classes.screen}>
      <Step
        bg={require("../../assets/images/create-task.jpg")}
        head="Tasksssss"
        formHead="Create A Feature"
        inputs={inputs}
        initialValues={{
          title: "",
          description: "",
          priority: 1,
        }}
        handleSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <>
          <div className={classes.input}>
            <label htmlFor="description">Description</label>
            <Field component="textarea" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>
          <div className={classes.input}>
            <label htmlFor="priority">Priority</label>
            <Field component="select" name="priority">
              <option value={0}>Not Important</option>
              <option value={1}>Important</option>
              <option value={2}>High Priority</option>
              <option value={3}>Urgent</option>
            </Field>
          </div>

          <div className={classes.input}>
            <label htmlFor="assignedTo">Assigned to</label>
            <Select
              options={contributors}
              isMulti
              name="assignedTo"
              onChange={handleSelectChange}
            />
          </div>
        </>
      </Step>
    </div>
  );
};

export default CreateFeatureScreen;
