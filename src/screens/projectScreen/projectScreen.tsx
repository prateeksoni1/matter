import React, { FunctionComponent } from "react";
import classes from "./projectScreen.module.scss";
import DashNav from "../../components/dashnav/dashnav";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { locationState } from "../../types";

const ProjectScreen: FunctionComponent<RouteComponentProps<
  {},
  StaticContext,
  locationState
>> = (props) => {
  const { project } = props.location.state;

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
            onClick={() => props.history.push("/create-bug")}
          >
            Create Bug
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectScreen;
