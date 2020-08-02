import React, {
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from "react";
import classes from "./projectScreen.module.scss";
import DashNav from "../../components/dashnav/dashnav";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";
import { locationState } from "../../types";
import api from "../../api";
import { useQuery } from "react-query";
import permissionsContext from "../../contexts/permissionsContext";

const ProjectScreen: FunctionComponent<RouteComponentProps<
  {},
  StaticContext,
  locationState
>> = (props) => {
  const { project } = props.location.state;

  const permissionData = useContext(permissionsContext);
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

  const {
    isLoading: isLoadingPermissions,
    error: errorPermissions,
    data: permissions,
  } = useQuery("permissions", async () => {
    const res = await api.get(`/api/permissions`, {
      params: { projectId: project._id },
    });
    return res.data.permissions;
  });

  if (isLoadingPermissions) return <div>Loading...</div>;
  if (errorPermissions) {
    props.history.goBack();
  }

  permissionData.setPermissions(permissions);

  const renderFeatures = (tasks: Array<any>) => {
    return React.Children.toArray(
      tasks.map((task: any) => (
        <div
          className={classes.task}
          onClick={() => props.history.push(`/task/${task._id}`)}
        >
          {task.title}
        </div>
      ))
    );
  };

  return (
    <div className={classes.screen}>
      <DashNav />
      <div className={classes.column}>
        <div>
          <h1>Features</h1>
          <div className={classes.grid}>
            {permissionData.permissions.find(
              (perm) => perm === "create-task"
            ) && (
              <button
                className={classes.newFeatureBtn}
                onClick={() =>
                  props.history.push("/create-feature", { project })
                }
              >
                Create Feature
              </button>
            )}
            {renderFeatures(features)}
          </div>
        </div>
        <div>
          <h1>Bugs</h1>
          <div className={classes.grid}>
            {permissionData.permissions.find(
              (perm) => perm === "create-task"
            ) && (
              <button
                className={classes.newFeatureBtn}
                onClick={() => props.history.push("/create-bug", { project })}
              >
                Create Bug
              </button>
            )}
            {renderFeatures(bugs)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectScreen;
