import { useState, useEffect } from "react";
import { useMenu } from "../hooks/UseMenu";

import LateralMenu from "../components/LateralMenu";
import MainHeader from "../components/MainHeader";

function BasePage({ children }) {
  const [menuOpenCount, setMenuOpenCount] = useState(0);
  const { menuAnimationFinished } = useMenu();

  useEffect(() => {
    if (menuOpenCount > 0) return;
    if (menuAnimationFinished) {
      setMenuOpenCount(1);
    }
  }, [menuAnimationFinished]);

  return (
    <>
      <div className="MainPage bg-[#f0f3f8] dark:bg-[#222222]">
        <LateralMenu />
        <MainHeader />
          <div className="flex justify-center w-full gap-4">
            {menuOpenCount == 0 && !menuAnimationFinished ? (
              spinner
            ) : menuOpenCount > 0 || menuAnimationFinished ? (
              children
            ) : (
              <></>
            )}
          </div>
      </div>
    </>
  );
}

export default BasePage;
