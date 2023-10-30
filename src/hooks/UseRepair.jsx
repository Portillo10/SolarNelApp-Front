import { useContext } from "react";
import { RepairsContext } from "../Contexts/RepairsContext.jsx";

export const useRepair = () => {
  const context = useContext(RepairsContext);
  if (!context) throw new Error("useRepair must be within a RepairProvider");
  return context;
};
