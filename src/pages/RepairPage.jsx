import HeaderRepairPage from "../components/HeaderRepairPage.jsx";
import SearchBar from "../components/SearchBar.jsx";
import RepairBox from "../components/RepairBox.jsx";

import DeviceInfoPage from "./DeviceInfoPage.jsx";
import RepairDetailPage from "./RepairDetailPage.jsx";
import { useRepair } from "../hooks/UseRepair.jsx";
import { useEffect } from "react";

function RepairPage() {
  
  const {setScrollIndex} = useRepair()

  useEffect(()=> {
    setScrollIndex(0)
  },[])

  return (
    <>
      <div className="RepairPage bg-[#f5f5f5] dark:bg-dark-container dark:shadow-none dark:border border-[#5e5a5f]">
        <section className="h-full w-full overflow-hidden rounded-[20px]">
          <HeaderRepairPage />
          <SearchBar />
          <RepairBox />
        </section>
        <DeviceInfoPage />
        <RepairDetailPage />
      </div>
    </>
  );
}

export default RepairPage;
