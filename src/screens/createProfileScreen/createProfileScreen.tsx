import React, { FunctionComponent, useContext } from "react";
import { ProfileValues } from "../../types";
import Step from "../../components/step/step";
import { InputProps } from "../../types";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import api from "../../api";
import CreateProfileContext from "../../contexts/createProfileContext";

const stepInputs: Array<InputProps> = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "username",
    label: "Username",
  },
  {
    name: "isOwner",
    label: "Are you the owner of an organization?",
    type: "checkbox",
  },
];

const CreateProfileScreen: FunctionComponent<RouteComponentProps> = (props) => {
  const profileData = useContext(CreateProfileContext);

  const validationSchema: Yup.ObjectSchema<ProfileValues> = Yup.object({
    name: Yup.string().required().min(4),
    username: Yup.string()
      .required()
      .test("username-test", "Username is already taken", async function (
        value
      ) {
        try {
          const res = await api.get(`/api/profile/${value}`);
          if (res.data.success) return false;
          return true;
        } catch (err) {
          return false;
        }
      }),
    isOwner: Yup.boolean().defined(),
  }).defined();

  const handleSubmit = async (values: ProfileValues) => {
    if (profileData.setFields) {
      profileData.setFields((state) => ({
        ...state,
        name: values.name,
        username: values.username,
        isOwner: values.isOwner,
      }));
    }

    if (values.isOwner) props.history.push("/create-organization");
    else props.history.push("/set-organization");
  };

  return (
    <Step
      bg={require("../../assets/images/create-task.jpg")}
      head="Keep track of every feature and bug"
      formHead="Create Profile"
      handleSubmit={handleSubmit}
      inputs={stepInputs}
      validationSchema={validationSchema}
      initialValues={{ name: "", username: "", isOwner: false }}
    />
  );
};

export default CreateProfileScreen;
