import LateralMenuIcon from "./LateralMenuItem";

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
import { useState } from "react";

function LateralMenu(props) {
  return (
    <>
      <div className={`LateralMenu ${props.showMenu ? "ShownMenu" : ""}`}>
        <section>
          <LateralMenuIcon
            activeMenu={props.showMenu}
            event={props.showMenuEvent}
            icon={MenuIcon}
          ></LateralMenuIcon>
          <LateralMenuIcon activeMenu={props.showMenu} icon={ProfileIcon}>
            <p>Mi Perfil</p>
          </LateralMenuIcon>
          <LateralMenuIcon activeMenu={props.showMenu} icon={HomeIcon}>
            <p>Inicio</p>
          </LateralMenuIcon>
          <LateralMenuIcon activeMenu={props.showMenu} icon={RepairIcon}>
            <p>Reparaciones</p>
          </LateralMenuIcon>
          <LateralMenuIcon
            activeMenu={props.showMenu}
            icon={ReportActivityIcon}
          >
            <p>Reporte de actividad</p>
          </LateralMenuIcon>
          <LateralMenuIcon activeMenu={props.showMenu} icon={BarsDiagramIcon}>
            <p>Consultar estadísticas</p>
          </LateralMenuIcon>
          <LateralMenuIcon activeMenu={props.showMenu} icon={UsersIcon}>
            <p>Cuentas de usuario</p>
          </LateralMenuIcon>
          <LateralMenuIcon activeMenu={props.showMenu} icon={QRCodeIcon}>
            <p>Generar códigos</p>
          </LateralMenuIcon>
          <LateralMenuIcon activeMenu={props.showMenu} icon={InventoryIcon}>
            <p>Inventario</p>
          </LateralMenuIcon>
          <LateralMenuIcon activeMenu={props.showMenu} icon={ConfigIcon}>
            <p>Configuración</p>
          </LateralMenuIcon>
        </section>
        <section>
          <LateralMenuIcon activeMenu={props.showMenu} icon={OffIcon}>
            <p>Cerrar sesion</p>
          </LateralMenuIcon>
        </section>
      </div>
    </>
  );
}

export default LateralMenu;
