import { useRoutes, BrowserRouter } from "react-router-dom";

//Pages
import RepairPage from "./pages/RepairPage";
import HomePage from "./pages/HomePage";
import BasePage from "./pages/BasePage";
import LoginPage from "./pages/LoginPage";
import QrScanPage from "./pages/QrScanPage";

import { MenuProvider } from "./Contexts/MenuContext";
import { RepairsProvider } from "./Contexts/RepairsContext.jsx";

const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: (
        <BasePage>
          <HomePage />
        </BasePage>
      ),
    },
    {
      path: "/repairs",
      element: (
        <BasePage>
          <RepairPage />
        </BasePage>
      ),
    },
    { path: "/login", element: <LoginPage /> },
    {
      path: "/qr_scanner",
      element: <QrScanPage />,
    },
    { path: "*", element: <></> },
  ]);

  return routes;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <MenuProvider>
          <RepairsProvider>
            <AppRoutes />
          </RepairsProvider>
        </MenuProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
