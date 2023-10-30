import { useRoutes, BrowserRouter } from "react-router-dom";

//Pages
import RepairPage from "./pages/RepairPage";
import HomePage from "./pages/HomePage";
import BasePage from "./pages/BasePage";
import LoginPage from "./pages/LoginPage";

import { MenuProvider } from "./Contexts/MenuContext";

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
    { path: "*", element: <></> },
  ]);

  return routes;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <MenuProvider>
          <AppRoutes />
        </MenuProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
