import React, { FunctionComponent } from "react";
import classes from "./app.module.scss";

const App: FunctionComponent = () => {
  return (
    <div className={classes.app}>
      <nav>
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
      <div className={classes.hero}>
        <div className={classes.darken}>
          <div className={classes.heroText}>
            <h1>Matter</h1>
            <p className={classes.lead}>A Project Manager</p>
          </div>
          <div className={classes.buttonContainer}>
            <button className={classes.buttonPrimary}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
