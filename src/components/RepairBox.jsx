import { useEffect, useState } from "react";
import { useMenu } from "../hooks/UseMenu";
import { useRepair } from "../hooks/UseRepair";
import { getAllDevices } from "../services/device.services";

function RepairBox() {
  const {
    loadCards,
    scroll,
    spinner,
  } = useRepair();

  let receivedDevices
  let repairedDevices
  let deliveredDevices

  const [menuOpenCount, setMenuOpenCount] = useState(0)
  const [requestWaiting, setRequestWaiting] = useState(true)
  // const [devices, setDevices] = useState({});

  const { menuAnimationFinished } = useMenu();

  useEffect(()=> {
    (async () => {
      const {data:{received, repaired, delivered}} = await getAllDevices()
      receivedDevices = received
      repairedDevices = repaired
      deliveredDevices = delivered
      console.log(received)
      setRequestWaiting(false)
    })()
  }, [])


  useEffect(()=>{
    if(menuOpenCount > 0) return
    if(menuAnimationFinished){
      setMenuOpenCount(1)
    }
  },[menuAnimationFinished])

  if (!requestWaiting){
    return (
      <>
        <section className="RepairBox overflow-auto dark:text-white">
          <div className="Slider" onScroll={scroll}>
            <section className="CardRepairsBox">
              {loadCards(receivedDevices)}
            </section>
            <section className="CardRepairsBox">
              {loadCards(repairedDevices)}
            </section>
            <section className="CardRepairsBox">
              {loadCards(deliveredDevices)}
            </section>
          </div>
        </section>
      </>
    );
  }
}

export default RepairBox;
