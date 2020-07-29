import { createContext, Dispatch } from "react";

export type CreateProfileType = {
  name: string;
  username: string;
  organization: string;
  setFields?: Dispatch<React.SetStateAction<CreateProfileType>>;
};

export default createContext<CreateProfileType>({
  name: "",
  username: "",
  organization: "",
  setFields: undefined,
});
