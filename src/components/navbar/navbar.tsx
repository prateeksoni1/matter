import React, { FunctionComponent } from "react";
import classes from "./navbar.module.scss";
import { useHistory } from "react-router-dom";

const Navbar: FunctionComponent = () => {
  const history = useHistory();

  return (
    <nav className={classes.nav}>
      <div className={classes.column}>
        <div className={classes.navContainer}>
          <div className={classes.logo}>matter</div>
          <div className={classes.menu}>
            <div
              className={classes.menuItem}
              onClick={() => history.push("/login")}
            >
              login
            </div>
            <div
              className={classes.menuItem}
              onClick={() => history.push("/register")}
            >
              register
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
