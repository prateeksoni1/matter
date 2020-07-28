import React, { FunctionComponent, useState } from "react";
import Routes from "../routes/routes";
import ProfileContext from "../../contexts/profileContext";

const App: FunctionComponent = () => {
  const [fields, setFields] = useState({
    name: "",
    username: "",
    organization: "",
  });

  return (
    <ProfileContext.Provider value={{ ...fields, setFields }}>
      <Routes />
    </ProfileContext.Provider>
  );
};

export default App;
