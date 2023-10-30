import { createContext, useEffect, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [menuAnimationFinished, setMenuAnimationFinished] = useState(true);
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme:dark)").matches
  );

  const handleTheme = () => {
    setDarkMode(!darkMode);
  };

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

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [darkMode]);

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
        darkMode,
        handleTheme,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
