import React, { FunctionComponent, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import { useQuery, QueryResult, queryCache } from "react-query";
import api from "../../api";
import classes from "./taskScreen.module.scss";
import DashNav from "../../components/dashnav/dashnav";
import { PRIORITY } from "../../utils/constants";

const TaskScreen: FunctionComponent<RouteComponentProps<{
  id: string;
  projectId: string;
}>> = (props) => {
  const { projectId, id } = props.match.params;
  const [editPriority, setEditPriority] = useState(false);
  const [markMode, setMarkMode] = useState(false);
  const [mark, setMark] = useState<string>();
  const [priority, setPriority] = useState<string>();

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

  const taskPriority = task.priority.toString();

  const handleMarkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMark(e.target.value);
  };

  const handleEditPriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const handleMarkSubmit = async () => {
    let permission;

    switch (mark) {
      case "INCOMPLETE":
        permission = "mark-task-incomplete";
        break;
      case "COMPLETE":
        permission = "mark-task-complete";
        break;
      case "DEPLOYED":
        permission = "mark-task-deployed";
        break;
      case "TESTING":
        permission = "mark-task-testing";
        break;
      default:
        return;
    }

    api.patch(`/api/project/task/${task._id}`, {
      projectId,
      permission,
      status: mark,
    });
    queryCache.invalidateQueries("task");

    setMarkMode(false);
  };

  const handleEditPrioritySubmit = async () => {
    const permission = "edit-task";

    api.patch(`/api/project/task/${task._id}`, {
      projectId,
      permission,
      priority,
    });
    queryCache.invalidateQueries("task");

    setEditPriority(false);
  };

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
              {!editPriority ? (
                <>
                  <div
                    className={classes.tag}
                    style={{
                      backgroundColor: PRIORITY[taskPriority].color,
                      color: "#000",
                    }}
                  >
                    {PRIORITY[taskPriority].name}
                  </div>

                  <i
                    className="material-icons"
                    onClick={() => setEditPriority(!editPriority)}
                  >
                    create
                  </i>
                </>
              ) : (
                <>
                  <select
                    name="priority"
                    onChange={handleEditPriority}
                    defaultValue={-1}
                  >
                    <option value={-1} defaultChecked disabled>
                      Select
                    </option>

                    <option value={0}>Not Important</option>
                    <option value={1}>Important</option>
                    <option value={2}>High Priority</option>
                    <option value={3}>Urgent</option>
                  </select>
                  <i
                    className="material-icons"
                    onClick={handleEditPrioritySubmit}
                  >
                    check
                  </i>
                </>
              )}
            </div>
            <div className={classes.tags}>
              <h2>Status</h2>
              {!markMode ? (
                <>
                  <div className={classes.tag}>{task.status}</div>
                  <i
                    className="material-icons"
                    onClick={() => setMarkMode(!markMode)}
                  >
                    create
                  </i>
                </>
              ) : (
                <>
                  <select
                    name="status"
                    onChange={handleMarkChange}
                    defaultValue={-1}
                  >
                    <option value={-1} defaultChecked disabled>
                      Select
                    </option>
                    <option value="INCOMPLETE">Incomplete</option>
                    <option value="COMPLETE">Complete</option>
                    <option value="TESTING">Testing</option>
                    <option value="DEPLOYED">Deployed</option>
                  </select>
                  <i className="material-icons" onClick={handleMarkSubmit}>
                    check
                  </i>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskScreen;
