import { createContext, Dispatch } from "react";

export type CreateProfileType = {
  name: string;
  username: string;
  organization: string;
  isOwner: boolean;
  setFields?: Dispatch<React.SetStateAction<CreateProfileType>>;
};

export default createContext<CreateProfileType>({
  name: "",
  username: "",
  organization: "",
  isOwner: false,
  setFields: undefined,
});
