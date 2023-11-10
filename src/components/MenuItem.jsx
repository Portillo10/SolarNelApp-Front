import { NavLink } from "react-router-dom";

import { useContext } from "react";
import { MenuContext } from "../Contexts/MenuContext";

function MenuItem({ children, event, route }) {
  const { hideMenu, menuAnimationFinished } =
    useContext(MenuContext);

  return (
    <>
      <li onClick={event ? event : hideMenu} className={`LateralMenuLi transition-all`}>
        <NavLink
          className={`LateralMenuIcon transition-all duration-300 hover:bg-[#b0bec5] dark:hover:bg-[#3498db]`}
          to={route}
        >
          {children}
        </NavLink>
      </li>
    </>
  );
}

export default MenuItem;
