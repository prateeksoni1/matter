import React, { FunctionComponent } from "react";
import classes from "./homeScreen.module.scss";
import Navbar from "../../components/navbar/navbar";

const HomeScreen: FunctionComponent = () => {
  return (
    <div className={classes.home}>
      <Navbar />
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

export default HomeScreen;
