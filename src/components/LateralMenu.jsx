import MenuItem from "./MenuItem.jsx";

import {
  ArrowIcon,
  BarsDiagramIcon,
  BarsDiagramIconBlack,
  ConfigIcon,
  HomeIcon,
  InventoryIcon,
  MenuIcon,
  OffIcon,
  ProfileIcon,
  RepairIcon,
  ReportActivityIcon,
  UsersIcon,
  QRCodeIcon,
} from "../hooks/Icons.jsx";

import { useContext } from "react";
import { MenuContext } from "../Contexts/MenuContext";

function LateralMenu() {
  const { handleStyleMenuItem, activeMenu, darkMode } = useContext(MenuContext);

  return (
    <>
      <nav
        className={`LateralMenu ${
          activeMenu ? "ShownMenu" : ""
        } dark:bg-[#0f0f0f]`}
      >
        <ul>
          <MenuItem
            event={handleStyleMenuItem}
            route={undefined}
            icon={MenuIcon}
          ></MenuItem>
          <MenuItem icon={HomeIcon} route="/">
            <p>Inicio</p>
          </MenuItem>
          <MenuItem icon={ProfileIcon} route="/profile">
            <p>Mi Perfil</p>
          </MenuItem>
          <MenuItem icon={RepairIcon} route="/repairs">
            <p>Reparaciones</p>
          </MenuItem>
          <MenuItem icon={ReportActivityIcon} route="/reportactivity">
            <p>Registro de actividad</p>
          </MenuItem>
          <MenuItem
            icon={darkMode ? BarsDiagramIcon : BarsDiagramIconBlack}
            route="/stadistics"
          >
            <p>Consultar estadísticas</p>
          </MenuItem>
          <MenuItem icon={UsersIcon} route="/users">
            <p>Cuentas de usuario</p>
            <img src={ArrowIcon} alt="" />
          </MenuItem>
          <MenuItem icon={QRCodeIcon} route="/qrcodes">
            <p>Generar códigos</p>
            <img src={ArrowIcon} alt="" />
          </MenuItem>
          <MenuItem icon={InventoryIcon} route="/replacements">
            <p>Repuestos</p>
          </MenuItem>
          <MenuItem icon={ConfigIcon} route="/settings">
            <p>Configuración</p>
          </MenuItem>
        </ul>
        <ul>
          <MenuItem icon={OffIcon} route="/login">
            <p>Cerrar sesion</p>
          </MenuItem>
        </ul>
      </nav>
    </>
  );
}

export default LateralMenu;
