import { useEffect, useState } from "react";
import CardRepair from "../components/CardRepair.jsx";
import HeaderRepairPage from "../components/HeaderRepairPage.jsx";
import SearchBar from "../components/SearchBar.jsx";

import dollarIcon from "../assets/svg/Dollar_Icon.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "reactstrap";

const STATES_ENUM = {
  Delivered: "entregado",
  Received: "recibido",
  Repaired: "reparado",
};

const deviceListTest = [
  {
    customerName: "Álvaro Alvarado",
    deviceID: 17,
    deviceBrand: "Ganadero",
    deviceType: "Impulsor",
    deviceProps: { range: 200, input: 110 },
    state: "Entregado",
    price: 150000,
  },
  {
    customerName: "Enrique Enrique",
    deviceID: 32,
    deviceBrand: "Cobra",
    deviceType: "Inversor",
    deviceProps: { watts: 800, input: 12, output: 110 },
    state: "Recibido",
    diagnostic: ["Triac", "Diodos", "Transformador"],
  },
  {
    customerName: "Elon Mosca",
    deviceID: 183,
    deviceBrand: "Pulso",
    deviceType: "Impulsor",
    deviceProps: { range: 120, input: 12 },
    state: "Reparado",
    price: 100000,
  },
  {
    customerName: "Elon Mosca",
    deviceID: 183,
    deviceBrand: "Pulso",
    deviceType: "Impulsor",
    deviceProps: { range: 120, input: 12 },
    state: "Reparado",
    price: 50000,
  },
  {
    customerName: "Enrique Enrique",
    deviceID: 47,
    deviceBrand: "TNT",
    deviceType: "Impulsor",
    deviceProps: { range: 500, input: 110 },
    state: "Entregado",
  },
  {
    customerName: "Álvaro Alvarado",
    deviceID: 52,
    deviceBrand: "Cobra",
    deviceType: "Inversor",
    deviceProps: { watts: 2500, input: 24, output: 220 },
    state: "Entregado",
  },
  {
    customerName: "Álvaro Alvarado",
    deviceID: 17,
    deviceBrand: "Ganadero",
    deviceType: "Impulsor",
    deviceProps: { range: 200, input: 110 },
    state: "Reparado",
    price: 80000,
  },
  {
    customerName: "Álvaro Alvarado",
    deviceID: 17,
    deviceBrand: "Ganadero",
    deviceType: "Impulsor",
    deviceProps: { range: 200, input: 110 },
    state: "Reparado",
    price: 150000,
  },
  {
    customerName: "Álvaro Alvarado",
    deviceID: 17,
    deviceBrand: "Ganadero",
    deviceType: "Impulsor",
    deviceProps: { range: 200, input: 110 },
    state: "Reparado",
    price: 250000,
  },
  {
    customerName: "Álvaro Alvarado",
    deviceID: 17,
    deviceBrand: "Ganadero",
    deviceType: "Impulsor",
    deviceProps: { range: 200, input: 110 },
    state: "Recibido",
  },
  {
    customerName: "Álvaro Alvarado",
    deviceID: 17,
    deviceBrand: "Ganadero",
    deviceType: "Impulsor",
    deviceProps: { range: 200, input: 110 },
    state: "Recibido",
    diagnostic: ["Condensador", "Transformador", "Resistencia", "Triac"],
  },
  {
    customerName: "Canelo Alvarez",
    deviceID: 12,
    deviceBrand: "TNT",
    deviceType: "Impulsor",
    deviceProps: { range: 300, input: 110 },
    state: "Recibido",
    diagnostic: ["Transformador"],
  },
  {
    customerName: "Rocky Balboa",
    deviceID: 6,
    deviceBrand: "Speedrite",
    deviceType: "Impulsor",
    deviceProps: { range: 300, input: 110 },
    state: "Recibido",
    diagnostic: ["Condensador"],
  },
];

function RepairPage() {
  const [currentScrollIndex, setScrollIndex] = useState(0);
  const [search, setSearch] = useState("");

  const scroll = (e) => {
    const slider = e.target;
    if (slider.scrollLeft / (slider.clientWidth + 10) >= 1.5) {
      setScrollIndex(2);
    } else if (slider.scrollLeft / (slider.clientWidth + 10) >= 0.5) {
      setScrollIndex(1);
    } else {
      setScrollIndex(0);
    }
  };

  const clickScroll = (e) => {
    const startClick = e.clientX;
    const slider = document.getElementsByClassName("Slider")[0];

    const mouseMove = (e) => {
      const deltaX = startClick - e.clientX;
      slider.scrollBy({ left: deltaX, behavior: "smooth" });
    };

    const mouseUp = (e) => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const spinner = (
    <div
      className="flex justify-center align-middle"
      style={{ width: "100%", height: 60 }}
    >
      <Spinner color="primary"></Spinner>
    </div>
  );

  const diagnosticToString = (diagnostic) => {
    let diagnosticStr = "";
    diagnostic.forEach((element, i) => {
      if (i == 3) {
        diagnosticStr += "...";
      } else if (i < 3) {
        diagnosticStr += `${element}`;
      }
      if (diagnostic.length <= 3) {
        diagnosticStr += `${i < diagnostic.length - 1 ? ", " : ""}`;
      } else {
        diagnosticStr += `${i < 2 ? ", " : ""}`;
      }
    });
    return diagnosticStr;
  };

  const deviceReceivedFormat = (diagnostic) => {
    if (diagnostic) {
      return <p className="text-sm">{diagnosticToString(diagnostic)}</p>;
    } else {
      return <p className="text-red-600">Revisar</p>;
    }
  };

  let deliveredDevices = deviceListTest
    .filter(
      (device) => device.state.toLocaleLowerCase() === STATES_ENUM.Delivered
    )
    .map((device, i) => (
      <CardRepair key={i} device={device}>
        <p className="text-sm">Recibió: {device.customerName}</p>
      </CardRepair>
    ));

  let repairedDevices = deviceListTest
    .filter(
      (device) => device.state.toLocaleLowerCase() === STATES_ENUM.Repaired
    )
    .map((device, i) => (
      <CardRepair key={i} device={device}>
        <div className="flex text-green-700 ">
          <img src={dollarIcon} width={20} alt="" />
          <p className="text-lg">{device.price}</p>
        </div>
      </CardRepair>
    ));

  let receivedDevices = deviceListTest
    .filter(
      (device) => device.state.toLocaleLowerCase() === STATES_ENUM.Received
    )
    .map((device, i) => (
      <CardRepair key={i} device={device}>
        {deviceReceivedFormat(device.diagnostic)}
      </CardRepair>
    ));

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const loadCards = (cardList = []) => {
    if (cardList.length == 0) return spinner;
    if (search == "") return cardList;
    return cardList.filter(({ props: { device } }) => {
      if (
        removeAccents(device.customerName)
          .toLowerCase()
          .includes(removeAccents(search.toLowerCase())) ||
        (
          removeAccents(device.deviceType) +
          " " +
          removeAccents(device.deviceBrand)
        )
          .toLowerCase()
          .includes(removeAccents(search.toLowerCase()))
      ) {
        return true;
      }
    });
  };

  return (
    <>
      <div className="RepairPage">
        <section>
          <HeaderRepairPage
            setScrollIndex={setScrollIndex}
            currentScrollIndex={currentScrollIndex}
          />
          <SearchBar search={search} setSearch={setSearch} />
        </section>
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
      </div>
    </>
  );
}

export default RepairPage;
