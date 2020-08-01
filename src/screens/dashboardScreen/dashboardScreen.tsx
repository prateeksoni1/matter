import React, { FunctionComponent, useEffect, useState } from "react";
import DashNav from "../../components/dashnav/dashnav";
import classes from "./dashboardScreen.module.scss";
import api from "../../api";
import { RouteComponentProps } from "react-router-dom";

const DashboardScreen: FunctionComponent<RouteComponentProps> = (props) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/api/project", {
        headers: { token: localStorage.getItem("token") },
      });
      setProjects(res.data.projects);
    };

    fetchData();
  }, []);

  const renderProjects = () => {
    return React.Children.toArray(
      projects.map((proj: any) => (
        <div
          className={classes.project}
          onClick={() =>
            props.history.push(`/project/${proj.projectName}`, {
              project: proj,
            })
          }
        >
          {proj.projectName}
        </div>
      ))
    );
  };

  return (
    <div className={classes.screen}>
      <DashNav />
      <div className={classes.column}>
        <h1>Your Projects</h1>
        <div className={classes.projectsContainer}>
          <button
            className={classes.newProjectBtn}
            onClick={() => props.history.push("/create-project")}
          >
            Create New
          </button>
          {renderProjects()}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
