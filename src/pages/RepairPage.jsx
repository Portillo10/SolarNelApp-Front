import HeaderRepairPage from "../components/HeaderRepairPage.jsx";
import SearchBar from "../components/SearchBar.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import { RepairsProvider } from "../Contexts/RepairsContext.jsx";
import RepairBox from "../components/RepairBox.jsx";
import DeviceInfoPage from "./DeviceInfoPage.jsx";

function RepairPage() {
  return (
    <>
      <RepairsProvider>
        <div className="RepairPage">
          <section>
            <HeaderRepairPage />
            <SearchBar />
          </section>
          <RepairBox />
        </div>
        {/* <DeviceInfoPage></DeviceInfoPage> */}
      </RepairsProvider>
    </>
  );
}

export default RepairPage;
