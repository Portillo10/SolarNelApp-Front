import { createContext, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import CardRepair from "../components/CardRepair.jsx";
import { getDevice } from "../services/device.services.js";
import { statusEnum } from "../utils/request.utils.js";
import { useEffect } from "react";

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
  const [newDeviceId, setNewDeviceId] = useState(null)
  const [updateStateControl, setUpdateStateControl] = useState(false)

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

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const setUpdateControl = ()=> {
    setUpdateStateControl(!updateStateControl)
  }

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

  const findDevice = async (id) => {
    const response = await getDevice(id)
    if (response.status === statusEnum.OK) {
      return response.data.device;
    } else if (response.status === statusEnum.NO_CONTENT){
      return false;
    } else if (response.status === statusEnum.SERVER_ERROR){
      throw new Error("find device error")
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
        scroll,
        currentDevice,
        setCurrentDevice,
        currentRepair,
        setCurrentRepair,
        spinner,
        findDevice,
        diagnosticToString,
        newDeviceId,
        setNewDeviceId,
        updateStateControl,
        setUpdateControl
      }}
    >
      {children}
    </RepairsContext.Provider>
  );
};
