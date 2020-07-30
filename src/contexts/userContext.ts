import { createContext } from "react";

export type userType = {
  user?: any;
  setUser?: any;
  token?: string;
};

export default createContext<userType>({});
