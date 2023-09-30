import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import LateralMenu from "./components/LateralMenu";

function App() {
  const [activeMenu, setActiveMenu] = useState(false);

  const handleStyleMenuItem = () => {
    const menuIcons = document.getElementsByClassName("LateralMenuIcon");
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

  return (
    <>
      <div className="Page">
        <LateralMenu showMenu={activeMenu} showMenuEvent={showMenu} />
        <HomePage />
      </div>
    </>
  );
}

export default App;
