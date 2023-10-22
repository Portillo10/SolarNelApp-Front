import { useContext } from "react";
import { MenuContext } from "../Contexts/MenuContext";

import LogoIconTop from "/svg/Header/Logo_IconTop.svg";
import MenuIcon from "/svg/Header/Menu_Icon.svg";
import ScanQRIcon from "/svg/Header/ScanQR_icon.svg";

function MainHeader() {
  const { handleStyleMenuItem } = useContext(MenuContext);

  return (
    <>
      <header className="Head">
        <img
          className="TopMenuIcon"
          onClick={handleStyleMenuItem}
          src={MenuIcon}
          width="36px"
          alt=""
        />
        <img src={LogoIconTop} width="120px" alt="" />
        <img src={ScanQRIcon} className="TopMenuIcon" width="36px" alt="" />
      </header>
    </>
  );
}

export default MainHeader;