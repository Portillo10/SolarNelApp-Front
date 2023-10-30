import LateralMenu from "../components/LateralMenu";
import MainHeader from "../components/MainHeader";
import { useMenu } from "../hooks/UseMenu";

function BasePage({ children }) {
  const { darkMode } = useMenu();
  return (
    <>
      <LateralMenu />
      <div className={`MainPage ${darkMode ? "bg-[#0f0f0f]" : ""}`}>
        <MainHeader />
        <div className="flex justify-center w-full gap-4">{children}</div>
      </div>
    </>
  );
}

export default BasePage;
