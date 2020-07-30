import React, { FunctionComponent, useState } from "react";
import Routes from "../routes/routes";
import CreateProfileContext from "../../contexts/createProfileContext";
import UserContext from "../../contexts/userContext";

const App: FunctionComponent = () => {
  const [fields, setFields] = useState({
    name: "",
    username: "",
    organization: "",
    isOwner: false,
  });

  const [user, setUser] = useState();

  return (
    <CreateProfileContext.Provider value={{ ...fields, setFields }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes />
      </UserContext.Provider>
    </CreateProfileContext.Provider>
  );
};

export default App;
