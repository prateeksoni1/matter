import React, { FunctionComponent, useContext, useState } from "react";
import { CreateOrganizationValues } from "../../types";
import Step from "../../components/step/step";
import { InputProps } from "../../types";
import { RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import api from "../../api";
import CreateProfileContext from "../../contexts/createProfileContext";
import classes from "./createOrganizationScreen.module.scss";
import userContext, { userType } from "../../contexts/userContext";

const stepInputs: Array<InputProps> = [
  {
    name: "name",
    label: "Name",
  },
];

const CreateOrganizationScreen: FunctionComponent<RouteComponentProps> = (
  props
) => {
  const profileData = useContext(CreateProfileContext);
  const user = useContext(userContext);

  const [rows, setRows] = useState<
    Array<{
      role: string;
      permissions: Array<string>;
    }>
  >([]);

  const handleSubmit = async (values: CreateOrganizationValues) => {
    const { name } = values;
    try {
      const data = {
        name,
        permissionMatrix: rows,
      };
      const res = await api.post("/api/organization", data, {
        headers: { token: localStorage.getItem("token") },
      });

      if (profileData.setFields) {
        profileData.setFields((user) => ({
          ...user,
          organization: res.data.organization._id,
        }));
        const profileRes = await api.post(
          "/api/profile",
          {
            name: profileData.name,
            username: profileData.username,
            isOwner: profileData.isOwner,
            organization: res.data.organization._id,
          },
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        user.setUser((data: userType) => ({
          ...data,
          profile: profileRes.data.profile,
        }));
        props.history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema: Yup.ObjectSchema<CreateOrganizationValues> = Yup.object(
    {
      name: Yup.string().required().min(4),
    }
  ).defined();

  const handleAddRole = () => {
    setRows([
      ...rows,
      {
        role: "",
        permissions: [],
      },
    ]);
  };

  const handleChangeRole = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newRows = [...rows];
    newRows[index].role = e.target.value;
    setRows(newRows);
  };

  const handleChangePermission = (
    e: React.ChangeEvent<HTMLInputElement>,
    permission: string,
    index: number
  ) => {
    const newRows = [...rows];
    const { checked } = e.target;
    if (checked) newRows[index].permissions.push(permission);
    else {
      newRows[index].permissions = newRows[index].permissions.filter(
        (item) => item !== permission
      );
    }
    setRows(newRows);
  };

  const renderRows = () => {
    return React.Children.toArray(
      rows.map((row, index) => (
        <tr>
          <td>
            <input
              placeholder="Role"
              onChange={(e) => handleChangeRole(e, index)}
            />
          </td>
          <td>
            <input
              type="checkbox"
              onChange={(e) =>
                handleChangePermission(e, "create-project", index)
              }
            />
          </td>
          <td>
            <input
              type="checkbox"
              onChange={(e) => handleChangePermission(e, "edit-project", index)}
            />
          </td>
          <td>
            <input
              type="checkbox"
              onChange={(e) =>
                handleChangePermission(e, "edit-permissions", index)
              }
            />
          </td>
          <td>
            <input
              type="checkbox"
              onChange={(e) =>
                handleChangePermission(e, "delete-project", index)
              }
            />
          </td>
          <td>
            <input
              type="checkbox"
              onChange={(e) => handleChangePermission(e, "create-task", index)}
            />
          </td>
          <td>
            <input
              type="checkbox"
              onChange={(e) => handleChangePermission(e, "edit-task", index)}
            />
          </td>
          <td>
            <input
              type="checkbox"
              onChange={(e) => handleChangePermission(e, "delete-task", index)}
            />
          </td>
          <td>
            <input
              type="checkbox"
              onChange={(e) =>
                handleChangePermission(e, "mark-task-complete", index)
              }
            />
          </td>
          <td>
            <input
              type="checkbox"
              onChange={(e) =>
                handleChangePermission(e, "mark-task-testing", index)
              }
            />
          </td>
          <td>
            <input
              type="checkbox"
              onChange={(e) =>
                handleChangePermission(e, "mark-task-deployed", index)
              }
            />
          </td>
          <td>
            <input
              type="checkbox"
              onChange={(e) =>
                handleChangePermission(e, "mark-task-incomplete", index)
              }
            />
          </td>
        </tr>
      ))
    );
  };

  return (
    <div className={classes.screen}>
      <Step
        bg={require("../../assets/images/create-project.jpg")}
        head="Keep track of every feature and bug"
        formHead="Create Organization"
        handleSubmit={handleSubmit}
        inputs={stepInputs}
        validationSchema={validationSchema}
        initialValues={{ name: "" }}
      >
        <div className={classes.table}>
          <table>
            <thead>
              <tr>
                <td>Role\Permissions</td>
                <td>Create Project</td>
                <td>Edit Project</td>
                <td>Edit Permissions</td>
                <td>Delete Project</td>
                <td>Create Task</td>
                <td>Edit Task</td>
                <td>Delete Task</td>
                <td>Mark Task Complete</td>
                <td>Mark Task Testing</td>
                <td>Mark Task Deployed</td>
                <td>Mark Task Incomplete</td>
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
            <button type="button" onClick={handleAddRole}>
              Add Role
            </button>
          </table>
        </div>
      </Step>
    </div>
  );
};

export default CreateOrganizationScreen;
