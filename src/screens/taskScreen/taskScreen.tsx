import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";

import { useQuery, QueryResult } from "react-query";
import api from "../../api";
import classes from "./taskScreen.module.scss";
import DashNav from "../../components/dashnav/dashnav";
import { PRIORITY } from "../../utils/constants";

const TaskScreen: FunctionComponent<RouteComponentProps<{ id: string }>> = (
  props
) => {
  const { id } = props.match.params;

  const { isLoading, error, data: task }: QueryResult<any> = useQuery(
    "task",
    async () => {
      const res = await api.get(`/api/project/task/${id}`);
      return res.data.task;
    }
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    props.history.goBack();
  }

  const priority = task.priority.toString();

  return (
    <div className={classes.screen}>
      <DashNav />
      <div className={classes.column}>
        <div className={classes.card}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div className={classes.container}>
            <div className={classes.tags}>
              <h2>Assigned To</h2>
              {React.Children.toArray(
                task.assignedTo.map((ct: any) => (
                  <div className={classes.tag}>{ct.profile.username}</div>
                ))
              )}
            </div>
            <div className={classes.tags}>
              <h2>Assigned By</h2>
              <div className={classes.tag}>
                {task.assignedBy.profile.username}
              </div>
            </div>
            <div className={classes.tags}>
              <h2>Priority</h2>
              <div
                className={classes.tag}
                style={{
                  backgroundColor: PRIORITY[priority].color,
                  color: "#000",
                }}
              >
                {PRIORITY[priority].name}
              </div>
            </div>
            <div className={classes.tags}>
              <h2>Status</h2>
              <div className={classes.tag}>{task.status}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskScreen;
