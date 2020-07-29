import { createContext } from "react";

export type userType = {
  user?: any;
  setUser?: any;
};

export default createContext<userType>({});
