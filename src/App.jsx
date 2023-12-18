import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import RepairPage from "./pages/RepairPage";
import HomePage from "./pages/HomePage";
import BasePage from "./pages/BasePage";
import LoginPage from "./pages/LoginPage";
import QrScanPage from "./pages/QrScanPage";
import AddDevicePage from "./pages/AddDevicePage.jsx";
import RepairFormPage from "./pages/RepairFormPage.jsx";
import ReplacementListPage from "./pages/ReplacementListPage.jsx";

//Providers
import { MenuProvider } from "./Contexts/MenuContext";
import { RepairsProvider } from "./Contexts/RepairsContext.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import RegisterForm from "./pages/RegisterUserPage.jsx";
import GenerateQRPage from "./pages/GenerateQRPage.jsx";
import AddReplacementForm from "./pages/AddReplacementForm.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <MenuProvider>
            <RepairsProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/"
                    element={
                      <BasePage>
                        <HomePage />
                      </BasePage>
                    }
                  />
                  <Route
                    path="/repairs"
                    element={
                      <BasePage>
                        <RepairPage />
                      </BasePage>
                    }
                  />
                  <Route path="/qr_scanner" element={<QrScanPage />} />
                  <Route path="/add_device" element={<AddDevicePage />} />
                  <Route path="/users" element={<RegisterForm />} />
                  <Route path="/generate_qr" element={<GenerateQRPage />} />
                  <Route
                    path="/replacements"
                    element={<ReplacementListPage />}
                  />
                  <Route path="/repair_form" element={<RepairFormPage />} />
                  <Route
                    path="/addreplacements"
                    element={<AddReplacementForm />}
                  />
                </Route>
              </Routes>
            </RepairsProvider>
          </MenuProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
