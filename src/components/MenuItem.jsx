import { NavLink } from "react-router-dom";

import { useContext } from "react";
import { MenuContext } from "../Contexts/MenuContext";

function MenuItem({ icon, children, event, route }) {
  const { hideMenu, activeMenu, menuAnimationFinished } =
    useContext(MenuContext);

  return (
    <>
      <li onClick={event ? event : hideMenu} className="LateralMenuLi">
        <NavLink
          className={`LateralMenuIcon ${activeMenu ? "ShownMenuIcon" : ""} ${
            menuAnimationFinished ? "opacity-100" : "opacity-0"
          }`}
          to={route}
        >
          <img src={icon} alt="" /> <div>{children}</div>
        </NavLink>
      </li>
    </>
  );
}

export default MenuItem;
