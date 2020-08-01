import React, { FunctionComponent, useEffect, useState } from "react";
import classes from "./projectScreen.module.scss";
import DashNav from "../../components/dashnav/dashnav";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { locationState } from "../../types";
import api from "../../api";

const ProjectScreen: FunctionComponent<RouteComponentProps<
  {},
  StaticContext,
  locationState
>> = (props) => {
  const { project } = props.location.state;

  const [features, setFeatures] = useState([]);
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await api.get("/api/project/tasks", {
        params: { projectId: project._id, type: "FEATURE" },
      });
      setFeatures(res.data.features);
      res = await api.get("/api/project/tasks", {
        params: { projectId: project._id, type: "BUG" },
      });
      setBugs(res.data.bugs);
    };
    fetchData();
  }, [project._id]);

  return (
    <div className={classes.screen}>
      <DashNav />
      <div className={classes.column}>
        <div>
          <h1>Features</h1>
          <button
            className={classes.newFeatureBtn}
            onClick={() => props.history.push("/create-feature", { project })}
          >
            Create Feature
          </button>
        </div>
        <div>
          <h1>Bugs</h1>
          <button
            className={classes.newFeatureBtn}
            onClick={() => props.history.push("/create-bug", { project })}
          >
            Create Bug
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectScreen;
