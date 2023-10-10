import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import LateralMenu from "./components/LateralMenu";

import LogoIconTop from "/svg/Header/Logo_IconTop.svg";
import MenuIcon from "/svg/Header/Menu_Icon.svg";
import ScanQRIcon from "/svg/Header/ScanQR_icon.svg";
import RepairPage from "./pages/RepairPage";

// Chart.defaults.color = "#fff";

function App() {
  const [activeMenu, setActiveMenu] = useState(false);

  let menuIcons;
  let LateralMenuElement;
  let topMenuIcon;

  useEffect(() => {
    menuIcons = document.getElementsByClassName("LateralMenuIcon");
    LateralMenuElement = document.getElementsByClassName("LateralMenu")[0];
    topMenuIcon = document.getElementsByClassName("TopMenuIcon")[0];
  });

  const handleStyleMenuItem = () => {
    for (let i = 0; i < menuIcons.length; i++) {
      menuIcons[i].style.opacity = 0;
      setTimeout(() => {
        if (activeMenu) {
          menuIcons[i].classList.remove("ShownMenuIcon");
        } else {
          menuIcons[i].classList.add("ShownMenuIcon");
        }
        menuIcons[i].style.opacity = 1;
      }, 300);
    }
  };

  const showMenu = (e) => {
    menuIcons[0].style.pointerEvents = "none";
    topMenuIcon.style.pointerEvents = "none";
    setActiveMenu(!activeMenu);
    handleStyleMenuItem();
    setTimeout(() => {
      menuIcons[0].style.pointerEvents = "all";
      topMenuIcon.style.pointerEvents = "all";
    }, 400);
  };

  const hideMenu = () => {
    if (activeMenu) {
      setActiveMenu(false);
      menuIcons[0].style.pointerEvents = "none";
      topMenuIcon.style.pointerEvents = "none";

      for (let i = 0; i < menuIcons.length; i++) {
        menuIcons[i].style.opacity = 0;
        setTimeout(() => {
          menuIcons[i].classList.remove("ShownMenuIcon");
          menuIcons[i].style.opacity = 1;
        }, 400);
      }
    }
    setTimeout(() => {
      menuIcons[0].style.pointerEvents = "all";
      topMenuIcon.style.pointerEvents = "all";
    }, 400);
  };

  window.onclick = (e) => {
    if (!LateralMenuElement) return;
    if (e.clientX > LateralMenuElement.clientWidth) {
      hideMenu();
    }
  };

  return (
    <>
      <LateralMenu showMenu={activeMenu} showMenuEvent={showMenu} />
      <div className="MainPage">
        <header className="Head">
          <img
            className="TopMenuIcon"
            onClick={showMenu}
            src={MenuIcon}
            width="36px"
            alt=""
          />
          <img src={LogoIconTop} width="140px" alt="" />
          <img src={ScanQRIcon} className="TopMenuIcon" width="36px" alt="" />
        </header>
        {/* <HomePage /> */}
        <RepairPage></RepairPage>
      </div>
    </>
  );
}

export default App;
