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

function LateralMenu({ showMenu, showMenuEvent }) {
  return (
    <>
      <div className={`LateralMenu ${showMenu ? "ShownMenu" : ""}`}>
        <section>
          <MenuItem event={showMenuEvent} icon={MenuIcon}></MenuItem>
          <MenuItem icon={ProfileIcon}>
            <p>Mi Perfil</p>
          </MenuItem>
          <MenuItem icon={HomeIcon}>
            <p>Inicio</p>
          </MenuItem>
          <MenuItem icon={RepairIcon}>
            <p>Reparaciones</p>
            <img src={ArrowIcon} alt="" />
          </MenuItem>
          <MenuItem icon={ReportActivityIcon}>
            <p>Registro de actividad</p>
          </MenuItem>
          <MenuItem icon={BarsDiagramIcon}>
            <p>Consultar estadísticas</p>
          </MenuItem>
          <MenuItem icon={UsersIcon}>
            <p>Cuentas de usuario</p>
            <img src={ArrowIcon} alt="" />
          </MenuItem>
          <MenuItem icon={QRCodeIcon}>
            <p>Generar códigos</p>
            <img src={ArrowIcon} alt="" />
          </MenuItem>
          <MenuItem icon={InventoryIcon}>
            <p>Inventario</p>
          </MenuItem>
          <MenuItem icon={ConfigIcon}>
            <p>Configuración</p>
          </MenuItem>
        </section>
        <section>
          <MenuItem icon={OffIcon}>
            <p>Cerrar sesion</p>
          </MenuItem>
        </section>
      </div>
    </>
  );
}

export default LateralMenu;
