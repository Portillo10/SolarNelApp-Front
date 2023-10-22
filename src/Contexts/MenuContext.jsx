import { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [menuAnimationFinished, setMenuAnimationFinished] = useState(true);

  const handleStyleMenuItem = () => {
    setActiveMenu(!activeMenu);
    setMenuAnimationFinished(false);

    setTimeout(() => {
      setMenuAnimationFinished(true);
    }, 300);
  };

  const hideMenu = () => {
    if (activeMenu) {
      handleStyleMenuItem();
    }
  };

  window.onclick = (e) => {
    const LateralMenuElement =
      document.getElementsByClassName("LateralMenu")[0];
    if (!LateralMenuElement) return;
    if (e.clientX > LateralMenuElement.clientWidth) {
      hideMenu();
    }
  };

  return (
    <MenuContext.Provider
      value={{
        handleStyleMenuItem,
        activeMenu,
        hideMenu,
        menuAnimationFinished,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
