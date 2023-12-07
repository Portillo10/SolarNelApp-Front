import { useEffect, useState } from "react";
// import { useMenu } from "../hooks/UseMenu";
import { useRepair } from "../hooks/UseRepair";
import { getAllDevices } from "../services/device.services";
import { AttachMoneyRounded } from "@mui/icons-material";
import CardRepair from "./CardRepair";
import RepairBoxSkeleton from "../skeletons/RepairBoxSkeleton";

function RepairBox() {
  const [receivedDevices, setReceivedDevices] = useState();
  const [repairedDevices, setRepairedDevices] = useState();
  const [deliveredDevices, setDeliveredDevices] = useState();
  // const [menuOpenCount, setMenuOpenCount] = useState(0);

  const { scroll, diagnosticToString, loadCards, updateStateControl, setScrollIndex } = useRepair();
  const [requestWaiting, setRequestWaiting] = useState(true);

  // const { menuAnimationFinished } = useMenu();

  const fetchDevices = async ()=>{
      try {
        const response = await getAllDevices();
        const {
          data: { received, repaired, delivered },
        } = response;
        setReceivedDevices(received);
        setRepairedDevices(repaired);
        setDeliveredDevices(delivered);
        setRequestWaiting(false);
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    fetchDevices()
  }, [updateStateControl]);


  useEffect(() => {
    setScrollIndex(0)
  }, [])


  // useEffect(() => {
  //   if (menuOpenCount > 0) return;
  //   if (menuAnimationFinished) {
  //     setMenuOpenCount(1);
  //   }
  // }, [menuAnimationFinished]);

  return (
    <>
      <section className="RepairBox overflow-hidden px-2 dark:text-white">
        <div className="Slider" onScroll={scroll}>
          <section className="CardRepairsBox">
            {!requestWaiting ? (
              loadCards(
                receivedDevices?.map((device, i) => (
                  <CardRepair key={i} device={device}>
                    {device.diagnostic?.length > 0 ? (
                      <p className="text-sm">
                        {diagnosticToString(diagnostic)}
                      </p>
                    ) : (
                      <p className="text-red-600 dark:text-red-300">Revisar</p>
                    )}
                  </CardRepair>
                ))
              )
            ) : (
              <RepairBoxSkeleton />
            )}
          </section>
          <section className="CardRepairsBox">
            {!requestWaiting ? (
              loadCards(
                repairedDevices?.map((device, i) => (
                  <CardRepair key={i} device={device}>
                    <div className="flex items-center text-green-700 dark:text-green-500 h-[24px]">
                      <AttachMoneyRounded />
                      <p className="text-md font-extrabold">
                        {device.lastRepairPrice}
                      </p>
                    </div>
                  </CardRepair>
                ))
              )
            ) : (
              <RepairBoxSkeleton />
            )}
          </section>
          <section className="CardRepairsBox">
            {!requestWaiting ? (
              loadCards(
                deliveredDevices?.map((device, i) => (
                  <CardRepair key={i} device={device}>
                    <p className="text-sm">Recibió: {device.customerName}</p>
                  </CardRepair>
                ))
              )
            ) : (
              <RepairBoxSkeleton />
            )}
          </section>
        </div>
      </section>
    </>
  );
}

export default RepairBox;
