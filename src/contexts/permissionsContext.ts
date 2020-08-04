import { createContext } from "react";

export type PermissionsType = {
  permissions: Array<string>;
  setPermissions?: any;
};

export default createContext<PermissionsType>({
  permissions: [],
  setPermissions: undefined,
});
