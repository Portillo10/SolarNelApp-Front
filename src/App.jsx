import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import LateralMenu from "./components/LateralMenu";
import Head from "./components/Head";

import LogoIconTop from "/svg/Header/Logo_IconTop.svg";
import MenuIcon from "/svg/Header/Menu_Icon.svg";
import ScanQRIcon from "/svg/Header/ScanQR_icon.svg";

// Chart.defaults.color = "#fff";

function App() {
  const [activeMenu, setActiveMenu] = useState(false);

  const menuIcons = document.getElementsByClassName("LateralMenuIcon");
  const LateralMenuElement = document.getElementsByClassName("LateralMenu")[0];

  const handleStyleMenuItem = () => {
    menuIcons[0].disabled = true;
    for (let i = 0; i < menuIcons.length; i++) {
      menuIcons[i].style.opacity = 0;
      setTimeout(() => {
        menuIcons[i].style.opacity = 1;
        if (menuIcons[i].classList.contains("ShownMenuIcon")) {
          menuIcons[i].classList.remove("ShownMenuIcon");
        } else {
          menuIcons[i].classList.add("ShownMenuIcon");
        }
      }, 800);
    }
    setTimeout(() => {
      menuIcons[0].disabled = false;
    }, 1000);
  };

  const showMenu = (e) => {
    setActiveMenu(!activeMenu);
    handleStyleMenuItem();
  };

  const hideMenu = () => {
    if (activeMenu) {
      setActiveMenu(false);

      for (let i = 0; i < menuIcons.length; i++) {
        menuIcons[i].style.opacity = 0;
        setTimeout(() => {
          menuIcons[i].style.opacity = 1;
          menuIcons[i].classList.remove("ShownMenuIcon");
        }, 800);
      }
    }
  };

  window.onclick = (e) => {
    if (!LateralMenuElement) return;
    if (e.clientX > LateralMenuElement.clientWidth) {
      hideMenu();
    }
  };

  return (
    <>
      <div className="Page">
        <LateralMenu showMenu={activeMenu} showMenuEvent={showMenu} />
        <div className="MainPage">
          <Head>
            <img
              className="TopMenuIcon"
              onClick={showMenu}
              src={MenuIcon}
              width="36px"
              alt=""
            />
            <img src={LogoIconTop} width="140px" alt="" />
            <img src={ScanQRIcon} className="TopMenuIcon" width="36px" alt="" />
          </Head>
          <HomePage />
        </div>
      </div>
    </>
  );
}

export default App;
