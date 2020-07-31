import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Step from "../../components/step/step";
import api from "../../api";
import classes from "./setRolesScreen.module.scss";
import { OptionTypeBase } from "react-select";
import AsyncSelect from "react-select/async";
import DashNav from "../../components/dashnav/dashnav";

const SetRolesScreen: FunctionComponent<RouteComponentProps> = (props) => {
  const [contributors, setContributors] = useState<
    Array<{ role: string; name: string; id: string }>
  >([]);

  const [roles, setRoles] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/api/organization/roles", {
        headers: { token: localStorage.getItem("token") },
      });
      setRoles(res.data.roles);
    };
    fetchData();
  }, []);

  const handleInput = (value: any) => {
    console.log({ value });

    if (contributors.find((ct) => ct.id === value.value)) {
      return;
    }

    setContributors((state) => [
      ...state,
      { role: "user", name: value.label, id: value.value },
    ]);
  };

  const handleChange = async (value: string) => {
    const res = await api.get("/api/profile/profiles", {
      params: {
        search: value,
      },
      headers: { token: localStorage.getItem("token") },
    });
    const { profiles } = res.data;

    return profiles.map((prof: OptionTypeBase) => ({
      value: prof._id,
      label: prof.name,
    }));
  };

  const loadOptions = async (inputValue: string, callback: Function) => {
    callback(await handleChange(inputValue));
  };

  return (
    <>
      <DashNav />
      <Step
        inputs={[]}
        bg={require("../../assets/images/hero-bg.jpg")}
        formHead="Add Project Contributors and Roles"
        head="Almost there"
      >
        <div className={classes.search}>
          {/* <input
          name="contributor"
          placeholder="Search Contributor"
          type="text"
          onChange={handleChange}
          />
        <i className={["material-icons", classes.icon].join(" ")}>search</i> */}
          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            onChange={handleInput}
          />
        </div>
        {React.Children.toArray(
          contributors.map((ct) => (
            <div className={classes.contributor}>
              <select name="role">
                {roles.map((role) => (
                  <option value={role}>{role}</option>
                ))}
              </select>
              <label>{ct.name}</label>
            </div>
          ))
        )}
      </Step>
    </>
  );
};

export default SetRolesScreen;
