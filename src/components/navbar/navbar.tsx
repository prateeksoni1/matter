import React, { FunctionComponent } from "react";
import classes from "./navbar.module.scss";

const Navbar: FunctionComponent = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.column}>
        <div className={classes.navContainer}>
          <div className={classes.logo}>matter</div>
          <div className={classes.menu}>
            <div className={classes.menuItem}>login</div>
            <div className={classes.menuItem}>register</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
