import { useRoutes, BrowserRouter } from "react-router-dom";

//components
import LateralMenu from "./components/LateralMenu";

//Icons

//Pages
import RepairPage from "./pages/RepairPage";
import HomePage from "./pages/HomePage";
import MainHeader from "./components/MainHeader";
import { MenuProvider } from "./Contexts/MenuContext";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/repairs", element: <RepairPage /> },
    { path: "*", element: <></> },
  ]);

  return routes;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <MenuProvider>
          <LateralMenu />
          <div className="MainPage">
            <MainHeader />
            <div className="flex w-full gap-5">
              <AppRoutes />
            </div>
          </div>
        </MenuProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
