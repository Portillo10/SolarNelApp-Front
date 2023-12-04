import { NavLink } from "react-router-dom";

import { useContext } from "react";
import { MenuContext } from "../Contexts/MenuContext";

function MenuItem({ children, event, route }) {
  const { hideMenu } =
    useContext(MenuContext);

  return (
    <>
      <li
        onClick={
          event
            ? event
            : hideMenu
        }
        className={`LateralMenuLi transition-all bg-[#f0f3f8] dark:bg-dark-container`}
      >
        <NavLink
          className={`LateralMenuIcon transition-all duration-300 hover:bg-[#b0bec5] dark:hover:bg-[#3498db] bg-[#f0f3f8] dark:bg-dark-container`}
          to={route}
        >
          {children}
        </NavLink>
      </li>
    </>
  );
}

export default MenuItem;
