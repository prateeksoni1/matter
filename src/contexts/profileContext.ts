import { createContext, Dispatch } from "react";

export type ProfileType = {
  name: string;
  username: string;
  organization: string;
  setFields?: Dispatch<React.SetStateAction<ProfileType>>;
};

export default createContext<ProfileType>({
  name: "",
  username: "",
  organization: "",
  setFields: undefined,
});
