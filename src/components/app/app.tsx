import React, { FunctionComponent, useState } from "react";
import Routes from "../routes/routes";
import CreateProfileContext from "../../contexts/createProfileContext";
import UserContext from "../../contexts/userContext";
import createProjectContext from "../../contexts/createProjectContext";
import permissionsContext, {
  PermissionsType,
} from "../../contexts/permissionsContext";

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

  const [permissions, setPermissions] = useState<Array<string>>([]);

  return (
    <CreateProfileContext.Provider value={{ ...fields, setFields }}>
      <UserContext.Provider value={{ user, setUser }}>
        <createProjectContext.Provider
          value={{ ...projectFields, setFields: setProjectFields }}
        >
          <permissionsContext.Provider value={{ permissions, setPermissions }}>
            <Routes />
          </permissionsContext.Provider>
        </createProjectContext.Provider>
      </UserContext.Provider>
    </CreateProfileContext.Provider>
  );
};

export default App;
