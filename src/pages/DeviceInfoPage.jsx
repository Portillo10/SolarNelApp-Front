import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Person, Call, CloseRounded } from "@mui/icons-material";

import { useRepair } from "../hooks/UseRepair";
import { updateStateRequest } from "../services/device.services";

//components
import NormalContainer from "../components/NormalContainer";
import { statusEnum } from "../utils/request.utils";
import LoadingComponent from "../components/LoadingComponent";
import HistorialContainer from "../components/HistorialContainer";

const props = {
  range: "KM",
  input: "V",
  power: "W",
  output: "V",
};

const statesColors = {
  recibido: "#8B0000",
  entregado: "#006633",
  reparado: "#204C7C",
};

const statesButtonColors = {
  recibido: "#204C7C",
  entregado: "#8B0000",
  reparado: "#006633",
};

const statesButtonWords = {
  recibido: "Reparar",
  entregado: "Recibir",
  reparado: "Entregar",
};

const propsFormat = {
  power: "Potencia",
  input: "Alimentación",
  output: "Salida",
  range: "Alcance",
  volt: "Potencia",
};

function DeviceInfoPage() {
  const { currentDevice, setCurrentDevice, setUpdateControl } = useRepair();

  const [shownHistorial, setShownHistorial] = useState(false);
  const [history, setHistory] = useState(currentDevice?.history);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [editCustomerInfo, setEditCustomerInfo] = useState(false);
  const [editDeviceInfo, setEditDeviceInfo] = useState(false);

  const tooggleEditCustomerInfo = () => {
    setEditCustomerInfo(!editCustomerInfo);
  };

  const tooggleEditDeviceInfo = () => {
    setEditDeviceInfo(!editDeviceInfo);
  };

  const saveCustomerInfo = () => {
    
  }

  const navigate = useNavigate();

  const updateDeviceState = async () => {
    if (currentDevice?.state.toLowerCase() === "recibido")
      return navigate("/repair_form");
    setFetchLoading(true);
    try {
      const response = await updateStateRequest(currentDevice._id);
      if (response.status === statusEnum.OK) {
        setUpdateControl();
        setFetchLoading(false);
        setCurrentDevice(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`absolute transition-all translate-x-1/2 w-full right-1/2 max-w-[1020px] bg-[#F5F5F5] rounded-[20px] shadow-neutral-900 shadow-md dark:text-white dark:bg-dark-container ${
          currentDevice ? "scale-100" : "scale-0"
        } `}
      >
        <span className="absolute -right-2 -top-2 rounded-full text-white bg-gray-900 p-1 w-8 h-8 flex justify-center items-center">
          <CloseRounded
            onClick={(e) => {
              setCurrentDevice(null);
              const scrollTop = e.target?.nextSibling?.scrollTop;
              e.target?.nextSibling?.scrollBy(0, scrollTop * -1);
              setShownHistorial(false);
              setHistory(null);
            }}
          />
        </span>
        <div
          id="InfoContainer"
          className="p-3 flex flex-col gap-2 w-full h-[calc(100vh-120px)] rounded-[20px] overflow-y-auto"
        >
          <section className="w-11/12 flex gap-3 items-center dark:bg-dark-container ">
            <h1 className="text-xl font-extrabold">
              {`#${currentDevice?.numberCode} - ${currentDevice?.deviceType} ${currentDevice?.brand}`}
            </h1>
            <figure
              className={`rounded-full min-w-[20px] min-h-[20px] `}
              style={{
                backgroundColor:
                  statesColors[currentDevice?.state?.toLowerCase()],
              }}
            ></figure>
          </section>
          <NormalContainer
            editable={editDeviceInfo}
            tooggleEditable={tooggleEditDeviceInfo}
            title={"Características técnicas"}
          >
            <table className="w-full rounded-lg border-1 border-gray-500 mb-2">
              {currentDevice ? (
                <tbody>
                  {Object.keys(currentDevice?.deviceProps).map((prop, i) => (
                    <tr
                      key={i}
                      className={`border border-gray-500 w-full ${
                        i % 2 == 0 ? "bg-[#D9D9D9] dark:bg-[#3a3a3a]" : ""
                      }`}
                    >
                      <td
                        className={`w-[50%] text-center text-[15px] font-semibold border-r border-gray-500`}
                      >
                        {propsFormat[prop]}
                      </td>
                      <td
                        className={`w-[50%] text-center font-semibold text-[15px]`}
                      >
                        {`${currentDevice.deviceProps[prop]} ${props[prop]}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <></>
              )}
            </table>
          </NormalContainer>
          <NormalContainer
            editable={editCustomerInfo}
            tooggleEditable={tooggleEditCustomerInfo}
            title={"Información del cliente"}
          >
            <span
              className={`flex gap-1 px-2 mb-2 items-center w-max
            ${editCustomerInfo ? "bg-green-400 dark:bg-green-900" : ""}
            `}
            >
              <Person />
              <p
                onInput={(e) => console.log(e.target.innerHTML)}
                contentEditable={editCustomerInfo}
                className={`text-[15px] font-bold`}
              >
                {currentDevice ? currentDevice.customerName : ""}
              </p>
            </span>
            <span
              className={`flex gap-1 px-2 mb-2 items-center w-max
            ${editCustomerInfo ? "bg-green-400 dark:bg-green-900" : ""}
            `}
            >
              <Call />
              <p
                onInput={(e) => console.log(e.target.innerHTML)}
                contentEditable={editCustomerInfo}
                className="text-[15px] font-bold"
              >
                {currentDevice?.customerPhone
                  ? currentDevice.customerPhone
                  : "Sin número"}
              </p>
            </span>
          </NormalContainer>
          <HistorialContainer
            history={history}
            setHistory={setHistory}
            setShownHistorial={setShownHistorial}
            shownHistorial={shownHistorial}
          />
          <section className="m-auto w-4/5">
            <button
              onClick={updateDeviceState}
              style={{
                backgroundColor:
                  statesButtonColors[currentDevice?.state?.toLowerCase()],
              }}
              className="rounded-lg w-full py-1.5 text-xl text-white font-semibold m-auto mt-2"
            >
              {statesButtonWords[currentDevice?.state?.toLowerCase()]}
            </button>
          </section>
        </div>
        <LoadingComponent fetchLoading={fetchLoading} />
      </div>
    </>
  );
}

export default DeviceInfoPage;
