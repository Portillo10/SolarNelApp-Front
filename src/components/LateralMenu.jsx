import MenuItem from "./MenuItem.jsx";

import ArrowIcon from "/svg/LateralMenuIcons/arrow_icon.svg";
import BarsDiagramIcon from "/svg/LateralMenuIcons/Bars_diagram_icon.svg";
import ConfigIcon from "/svg/LateralMenuIcons/Config_icon.svg";
import HomeIcon from "/svg/LateralMenuIcons/Home_Icon.svg";
import InventoryIcon from "/svg/LateralMenuIcons/inventory_icon.svg";
import MenuIcon from "/svg/LateralMenuIcons/Menu_Icon.svg";
import OffIcon from "/svg/LateralMenuIcons/off_icon.svg";
import ProfileIcon from "/svg/LateralMenuIcons/Profile_Icon.svg";
import RepairIcon from "/svg/LateralMenuIcons/Repair_icon2.svg";
import ReportActivityIcon from "/svg/LateralMenuIcons/ReportActivity_icon.svg";
import UsersIcon from "/svg/LateralMenuIcons/users_icon.svg";
import QRCodeIcon from "/svg/LateralMenuIcons/QRCode_Icon.svg";
import { useEffect } from "react";

import { useContext } from "react";
import { MenuContext } from "../Contexts/MenuContext";

function LateralMenu() {
  const { handleStyleMenuItem, activeMenu } = useContext(MenuContext);

  return (
    <>
      <nav className={`LateralMenu ${activeMenu ? "ShownMenu" : ""}`}>
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
            {/* <img src={ArrowIcon} alt="" /> */}
          </MenuItem>
          <MenuItem icon={ReportActivityIcon} route="/reportactivity">
            <p>Registro de actividad</p>
          </MenuItem>
          <MenuItem icon={BarsDiagramIcon} route="/stadistics">
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
          <MenuItem icon={OffIcon} route="/exit">
            <p>Cerrar sesion</p>
          </MenuItem>
        </ul>
      </nav>
    </>
  );
}

export default LateralMenu;
