import { createContext, Dispatch } from "react";

export type CreateProjectType = {
  name: string;
  description: string;
  setFields?: Dispatch<React.SetStateAction<CreateProjectType>>;
};

export default createContext<CreateProjectType>({
  name: "",
  description: "",
  setFields: undefined,
});
