import MenuItem from "./MenuItem.jsx";
import {
  Menu,
  Home,
  AccountCircle,
  Handyman,
  Assignment,
  LeaderboardRounded,
  PeopleAlt,
  ArrowForwardIosRounded,
  QrCodeRounded,
  InventorySharp,
  Settings,
  PowerSettingsNewRounded,
} from "@mui/icons-material";

import { useContext } from "react";
import { MenuContext } from "../Contexts/MenuContext";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth.jsx";

function LateralMenu() {
  const { handleStyleMenuItem, activeMenu } = useContext(MenuContext);

  const {logout} = useAuth()

  const sxObj = {
    fontSize: 30,
  };

  return (
    <>
      <nav
        className={`LateralMenu bg-[#f0f3f8] ${
          activeMenu ? "desktop:w-[300px] w-[270px]" : "desktop:w-[50px] w-0"
        } dark:bg-dark-container dark:text-white dark:shadow-none`}
      >
        <ul >
          <MenuItem event={handleStyleMenuItem} route={undefined}>
            <Menu sx={sxObj} />
          </MenuItem>
          <MenuItem route="/">
            <Home sx={sxObj} />
            <p>Inicio</p>
          </MenuItem>
          <MenuItem 
          // route="/profile"
          >
            <AccountCircle sx={sxObj} />
            <p>Mi Perfil</p>
          </MenuItem>
          <MenuItem route="/repairs">
            <Handyman sx={sxObj} />
            <p>Reparaciones</p>
          </MenuItem>
          <MenuItem 
          // route="/reportactivity"
          >
            <Assignment sx={sxObj} />
            <p>Registro de actividad</p>
          </MenuItem>
          <MenuItem 
          // route="/stadistics"
          >
            <LeaderboardRounded sx={sxObj} />
            <p>Consultar estadísticas</p>
          </MenuItem>
          <MenuItem route="/users">
            <PeopleAlt sx={sxObj} />
            <p>Cuentas de usuario</p>
            <ArrowForwardIosRounded />
          </MenuItem>
          <MenuItem route="/generate_qr">
            <QrCodeRounded sx={sxObj} />
            <p>Generar códigos</p>
            <ArrowForwardIosRounded />
          </MenuItem>
          <MenuItem route="/replacements">
            <InventorySharp sx={sxObj} />
            <p>Repuestos</p>
          </MenuItem>
          <MenuItem 
          // route="/settings"
          >
            <Settings sx={sxObj} />
            <p>Configuración</p>
          </MenuItem>
        </ul>
        <ul onClick={() => logout()}>
          <MenuItem route="/login">
            <PowerSettingsNewRounded color="error" sx={sxObj} />
            <p>Cerrar sesion</p>
          </MenuItem>
        </ul>
      </nav>
    </>
  );
}

export default LateralMenu;
