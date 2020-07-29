import React, { FunctionComponent, useState } from "react";
import Routes from "../routes/routes";
import CreateProfileContext from "../../contexts/createUserContext";
import ProfileContext from "../../contexts/userContext";

const App: FunctionComponent = () => {
  const [fields, setFields] = useState({
    name: "",
    username: "",
    organization: "",
  });

  const [user, setUser] = useState();

  return (
    <CreateProfileContext.Provider value={{ ...fields, setFields }}>
      <ProfileContext.Provider value={{ user, setUser }}>
        <Routes />
      </ProfileContext.Provider>
    </CreateProfileContext.Provider>
  );
};

export default App;
