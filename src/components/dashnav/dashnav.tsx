import React, { FunctionComponent, useContext } from "react";
import classes from "./dashnav.module.scss";
import userContext from "../../contexts/userContext";

const DashNav: FunctionComponent = () => {
  const user = useContext(userContext);

  const handleLogout = () => {
    user.setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <nav className={classes.nav}>
      <div className={classes.navContainer}>
        <div className={classes.logo}>matter</div>
        <div className={classes.user}>{user.user.profile.username}</div>

        <div
          className={[classes.menu, classes.btn].join(" ")}
          onClick={handleLogout}
        >
          Logout
          <i className={["material-icons", classes.icon].join(" ")}>logout</i>
        </div>
      </div>
    </nav>
  );
};

export default DashNav;
