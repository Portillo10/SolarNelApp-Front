import { useRepair } from "../hooks/UseRepair";

function RepairBox() {
  const {
    loadCards,
    receivedDevices,
    repairedDevices,
    deliveredDevices,
    scroll,
  } = useRepair();

  return (
    <>
      <section className="RepairBox">
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

export default RepairBox;
