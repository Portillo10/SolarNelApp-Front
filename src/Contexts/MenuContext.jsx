import { createContext, useEffect, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const startTheme = () => {
    const theme = JSON.parse(localStorage.getItem("theme"));
    if (theme == null) {
      return window.matchMedia("(prefers-color-scheme:dark)").matches;
    } else {
      return theme;
    }
  };

  const [activeMenu, setActiveMenu] = useState(false);
  const [menuAnimationFinished, setMenuAnimationFinished] = useState(true);
  const [darkMode, setDarkMode] = useState(startTheme());

  const handleTheme = () => {
    setDarkMode(prev => {
      localStorage.setItem("theme", JSON.stringify(!prev));
      return !prev
    });
  };

  const handleStyleMenuItem = () => {
    setActiveMenu(!activeMenu);
    setMenuAnimationFinished(false);
    setTimeout(() => {
      setMenuAnimationFinished(true)
    }, 150);
  };

  const hideMenu = () => {
    if (activeMenu && menuAnimationFinished) {
      handleStyleMenuItem();
    }
  };

  useEffect(() => {
    if (darkMode == false) {
      document.querySelector("html").classList.remove("dark");
    } else if (darkMode == true) {
      document.querySelector("html").classList.add("dark");
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
        darkMode,
        handleTheme,
        menuAnimationFinished
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
