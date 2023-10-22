import { useContext } from "react";
import { RepairsContext } from "../Contexts/RepairsContext";

function RepairBox({ children }) {
  const {
    loadCards,
    receivedDevices,
    repairedDevices,
    deliveredDevices,
    clickScroll,
    scroll,
  } = useContext(RepairsContext);

  return (
    <>
      <section className="RepairBox">
        <div className="Slider" onMouseDown={clickScroll} onScroll={scroll}>
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

export default RepairBox;
