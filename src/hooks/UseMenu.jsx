import { useContext } from "react";
import { MenuContext } from "../Contexts/MenuContext.jsx";

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useRepair must be within a RepairProvider");
  return context;
};
