import HeaderRepairPage from "../components/HeaderRepairPage.jsx";
import SearchBar from "../components/SearchBar.jsx";

import { RepairsProvider } from "../Contexts/RepairsContext.jsx";
import RepairBox from "../components/RepairBox.jsx";
import DeviceInfoPage from "./DeviceInfoPage.jsx";
import RepairDetailPage from "./RepairDetailPage.jsx";

function RepairPage() {
  return (
    <>
      <RepairsProvider>
        <div className="RepairPage">
          <section className="h-full overflow-hidden rounded-[20px]">
            <HeaderRepairPage />
            <SearchBar />
            <RepairBox />
          </section>
          <DeviceInfoPage />
          <RepairDetailPage />
        </div>
      </RepairsProvider>
    </>
  );
}

export default RepairPage;
