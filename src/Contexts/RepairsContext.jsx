import { createContext, useState } from "react";
import { AttachMoneyRounded } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

import CardRepair from "../components/CardRepair.jsx";

export const RepairsContext = createContext();

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

  const deviceListTest = [
    {
      customerName: "Álvaro Alvarado",
      deviceID: "17",
      deviceBrand: "Ganadero",
      deviceType: "Impulsor",
      deviceProps: { range: 200, input: 110 },
      state: "Entregado",
      price: 150000,
    },
    {
      customerName: "Enrique Enrique",
      deviceID: "32",
      deviceBrand: "Cobra",
      deviceType: "Inversor",
      deviceProps: { watts: 800, input: 12, output: 110 },
      state: "Recibido",
      diagnostic: ["Triac", "Diodos", "Transformador"],
    },
    {
      customerName: "Elon Mosca",
      deviceID: "183",
      deviceBrand: "Pulso",
      deviceType: "Impulsor",
      deviceProps: { range: 120, input: 12 },
      state: "Reparado",
      price: 100000,
    },
    {
      customerName: "Elon Mosca",
      deviceID: "182",
      deviceBrand: "Pulso",
      deviceType: "Impulsor",
      deviceProps: { range: 120, input: 12 },
      state: "Reparado",
      price: 50000,
    },
    {
      customerName: "Enrique Enrique",
      deviceID: "47",
      deviceBrand: "TNT",
      deviceType: "Impulsor",
      deviceProps: { range: 500, input: 110 },
      state: "Entregado",
    },
    {
      customerName: "Álvaro Alvarado",
      deviceID: "52",
      deviceBrand: "Cobra",
      deviceType: "Inversor",
      deviceProps: { watts: 2500, input: 24, output: 220 },
      state: "Entregado",
    },
    {
      customerName: "Álvaro Alvarado",
      deviceID: "18",
      deviceBrand: "Ganadero",
      deviceType: "Impulsor",
      deviceProps: { range: 200, input: 110 },
      state: "Reparado",
      price: 80000,
    },
    {
      customerName: "Álvaro Alvarado",
      deviceID: "12",
      deviceBrand: "Ganadero",
      deviceType: "Impulsor",
      deviceProps: { range: 200, input: 110 },
      state: "Reparado",
      price: 150000,
    },
    {
      customerName: "Álvaro Alvarado",
      deviceID: "14",
      deviceBrand: "Ganadero",
      deviceType: "Impulsor",
      deviceProps: { range: 200, input: 110 },
      state: "Reparado",
      price: 250000,
    },
    {
      customerName: "Álvaro Alvarado",
      deviceID: "27",
      deviceBrand: "Ganadero",
      deviceType: "Impulsor",
      deviceProps: { range: 200, input: 110 },
      state: "Recibido",
    },
    {
      customerName: "Álvaro Alvarado",
      deviceID: "23",
      deviceBrand: "Ganadero",
      deviceType: "Impulsor",
      deviceProps: { range: 200, input: 110 },
      state: "Recibido",
      diagnostic: ["Condensador", "Transformador", "Resistencia", "Triac"],
    },
    {
      customerName: "Canelo Alvarez",
      deviceID: "1",
      deviceBrand: "TNT",
      deviceType: "Impulsor",
      deviceProps: { range: 300, input: 110 },
      state: "Recibido",
      diagnostic: ["Transformador"],
    },
    {
      customerName: "Rocky Balboa",
      deviceID: "6",
      deviceBrand: "Speedrite",
      deviceType: "Impulsor",
      deviceProps: { range: 300, input: 110 },
      state: "Recibido",
      diagnostic: ["Condensador"],
    },
  ];

  const spinner = (
    <div
      className="flex justify-center align-middle dark:text-white"
      style={{ width: "100%", height: 60 }}
    >
      <CircularProgress className="mt-2" />
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

  const diagnosticFormat = (diagnostic) => {
    if (diagnostic?.length > 0) {
      return <p className="text-sm">{diagnosticToString(diagnostic)}</p>;
    } else {
      return <p className="text-red-600 dark:text-red-300">Revisar</p>;
    }
  };

  const createCard = (device, key, children) => (
    <CardRepair key={i} device={device}>
      {children}
    </CardRepair>
  );

  const deliveredDevices = (devices) =>
    devices.map((device, i) =>
      createCard(
        device,
        i,
        <p className="text-sm">Recibió: {device.customerName}</p>
      )
    );

  const repairedDevices = (devices) =>
    devices.map((device, i) =>
      createCard(
        device,
        i,
        <div className="flex items-center text-green-700 dark:text-green-500">
          <AttachMoneyRounded />
          <p className="text-lg font-extrabold">{device.price}</p>
        </div>
      )
    );

  const receivedDevices = (devices) => devices
    .map((device, i) => (
      createCard(device, i, diagnosticFormat(device.diagnostic))
    ));

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const loadCards = (cardList = []) => {
    if (cardList.length == 0)
      return <p className="text-center">No se encontraron coincidencias</p>;
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

  const findDevice = (id) => {
    const device = deviceListTest.find((device) => device.deviceID === id);
    if (device) {
      setCurrentDevice(device);
      return true;
    } else {
      return false;
    }
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
        findDevice,
      }}
    >
      {children}
    </RepairsContext.Provider>
  );
};
