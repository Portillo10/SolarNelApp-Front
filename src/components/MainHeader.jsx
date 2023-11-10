import { useContext } from "react";
import { MenuContext } from "../Contexts/MenuContext";
import { Link } from "react-router-dom";

import LogoIconTop from "/svg/Header/Logo_IconTop.svg";
import DarkLogoIconTop from "/svg/Header/Dark_Logo_IconTop.svg";
import { Menu, QrCodeScannerRounded } from "@mui/icons-material";

function MainHeader() {
  const { handleStyleMenuItem, handleTheme, darkMode } =
    useContext(MenuContext);

  return (
    <>
      <header className="Head dark:text-white">
        <span onClick={handleStyleMenuItem} className="hover:cursor-pointer TopMenuIcon">
          <Menu  sx={{ fontSize: 32 }} />
        </span>
        <img
          src={darkMode ? DarkLogoIconTop : LogoIconTop}
          onClick={handleTheme}
          width="120px"
        />
        <span className="TopMenuIcon">
          <Link to="/qr_scanner">
            <QrCodeScannerRounded sx={{ fontSize: 32 }} />
          </Link>
        </span>
      </header>
    </>
  );
}

export default MainHeader;
