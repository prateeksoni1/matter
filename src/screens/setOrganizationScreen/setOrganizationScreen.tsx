import React, { FunctionComponent, useContext, useState } from "react";
import Step from "../../components/step/step";
import { RouteComponentProps } from "react-router-dom";
import api from "../../api";
import profileContext from "../../contexts/createProfileContext";
import classes from "./setOrganizationScreen.module.scss";
import userContext, { userType } from "../../contexts/userContext";

const SetOrganizationScreen: FunctionComponent<RouteComponentProps> = (
  props
) => {
  const profileData = useContext(profileContext);
  const user = useContext(userContext);

  const [results, setResults] = useState<Array<any>>([]);
  const [organization, setOrganization] = useState<string>();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = await api.get("/api/organization", {
      params: { search: e.target.value },
    });
    setResults(res.data.organizations);
  };

  const handleSubmit = async () => {
    try {
      const profileRes = await api.post(
        "/api/profile",
        {
          name: profileData.name,
          username: profileData.username,
          isOwner: profileData.isOwner,
          organization: organization,
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
    } catch (err) {
      console.log(err);
    }
  };

  const renderResults = () => {
    return React.Children.toArray(
      results.map((org) => (
        <button
          className={classes.card}
          type="button"
          onClick={() => setOrganization(org._id)}
        >
          {org.name}
        </button>
      ))
    );
  };

  return (
    <Step
      bg={require("../../assets/images/create-project.jpg")}
      head="The only management app you'll ever need."
      formHead="Select your Organization"
      inputs={[]}
      handleClick={handleSubmit}
    >
      <div className={classes.container}>
        <i className={["material-icons", classes.icon].join(" ")}>search</i>
        <input
          placeholder="Search Organization"
          type="text"
          onChange={handleChange}
        />

        {renderResults()}
      </div>
    </Step>
  );
};

export default SetOrganizationScreen;
