import React, { FunctionComponent, useState } from "react";
import Routes from "../routes/routes";
import CreateProfileContext from "../../contexts/createProfileContext";
import UserContext from "../../contexts/userContext";
import createProjectContext from "../../contexts/createProjectContext";

const App: FunctionComponent = () => {
  const [fields, setFields] = useState({
    name: "",
    username: "",
    organization: "",
    isOwner: false,
  });

  const [user, setUser] = useState();

  const [projectFields, setProjectFields] = useState({
    name: "",
    description: "",
  });

  return (
    <CreateProfileContext.Provider value={{ ...fields, setFields }}>
      <UserContext.Provider value={{ user, setUser }}>
        <createProjectContext.Provider
          value={{ ...projectFields, setFields: setProjectFields }}
        >
          <Routes />
        </createProjectContext.Provider>
      </UserContext.Provider>
    </CreateProfileContext.Provider>
  );
};

export default App;
