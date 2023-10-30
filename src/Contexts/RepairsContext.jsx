import { createContext, useState } from "react";
import { Spinner } from "reactstrap";

import dollarIcon from "../assets/svg/Dollar_Icon.svg";

import CardRepair from "../components/CardRepair.jsx";

export const RepairsContext = createContext();

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

const STATES_ENUM = {
  Delivered: "entregado",
  Received: "recibido",
  Repaired: "reparado",
};

export const RepairsProvider = ({ children }) => {
  const [currentScrollIndex, setScrollIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [currentRepair, setCurrentRepair] = useState(null);
  const [currentDevice, setCurrentDevice] = useState(null);

  const spinner = (
    <div
      className="flex justify-center align-middle"
      style={{ width: "100%", height: 60 }}
    >
      <Spinner color="primary"></Spinner>
    </div>
  );

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
    if (diagnostic?.length > 0) {
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
          <p className="text-lg font-extrabold">{device.price}</p>
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
    const cards = cardList.filter(({ props: { device } }) => {
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
          .includes(removeAccents(search.toLowerCase())) ||
        device.deviceID.toString().includes(search)
      ) {
        return true;
      }
    });

    if (cards.length == 0)
      return (
        <p className="text-xl text-center font-bold py-4">
          No se encontraron resultados
        </p>
      );
    return cards;
  };

  return (
    <RepairsContext.Provider
      value={{
        currentScrollIndex,
        setScrollIndex,
        search,
        setSearch,
        loadCards,
        receivedDevices,
        repairedDevices,
        deliveredDevices,
        scroll,
        currentDevice,
        setCurrentDevice,
        currentRepair,
        setCurrentRepair,
        spinner,
      }}
    >
      {children}
    </RepairsContext.Provider>
  );
};
