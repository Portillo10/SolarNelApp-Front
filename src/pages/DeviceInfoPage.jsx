import { useEffect, useRef, useState } from "react";

import {ExpandMore, Person, Call, Tune, ModeRounded} from '@mui/icons-material'

//icons
import {
  CloseIcon,
} from "../hooks/Icons";

//components
import RepairInfoCard from "../components/RepairInfoCard";
import { useRepair } from "../hooks/UseRepair";

const props = {
  range: "KM",
  input: "V",
  watts: "W",
  output: "V",
};

const historialTest = [
  {
    date: new Date().toLocaleDateString(),
    replacements: [
      {
        quantity: 1,
        price: 100000,
        name: "Transformador",
        reference: {
          range: 200,
        },
      },
      {
        quantity: 4,
        price: 2000,
        name: "Diodo",
        reference: {
          amperage: 6,
        },
      },
    ],
    author: "Luis Carlos Portillo",
  },
  {
    date: new Date("12/9/23").toLocaleDateString(),
    replacements: [
      {
        quantity: 1,
        price: 80000,
        name: "Transformador",
        reference: {
          range: 80,
        },
      },
    ],
    author: "Marlon Andres Portillo",
  },
  {
    date: new Date("10/23/22").toLocaleDateString(),
    replacements: [
      {
        quantity: 1,
        price: 120000,
        name: "Transformador",
        reference: {
          range: 100,
        },
      },
      {
        quantity: 4,
        price: 30000,
        name: "Transistor",
        reference: {
          ref: "Q4015",
        },
      },
    ],
    author: "Luis Carlos Portillo",
  },
  {
    date: new Date("10/23/22").toLocaleDateString(),
    replacements: [
      {
        quantity: 1,
        price: 120000,
        name: "Transformador",
        reference: {
          range: 300,
        },
      },
      {
        quantity: 4,
        price: 30000,
        name: "Transitor",
        reference: {
          ref: "TYN1025",
        },
      },
      {
        quantity: 4,
        price: 20000,
        name: "Condensador",
        reference: {
          capacity: 30,
        },
      },
      {
        quantity: 4,
        price: 2000,
        name: "Diodo",
        reference: {
          amperage: 3,
        },
      },
    ],
    author: "Mohammed bin Salman",
  },
  {
    date: new Date("10/23/22").toLocaleDateString(),
    replacements: [
      {
        quantity: 1,
        price: 120000,
        name: "Transformador",
        reference: {
          range: 80,
        },
      },
      {
        quantity: 4,
        price: 30000,
        name: "Transitor",
        reference: {
          ref: "Q8040",
        },
      },
      {
        quantity: 4,
        price: 20000,
        name: "Condensador",
        reference: {
          capacity: 20,
        },
      },
      {
        quantity: 4,
        price: 2000,
        name: "Diodo",
        reference: {
          amperage: 3,
        },
      },
    ],
    author: "Donald Trump",
  },
  {
    date: new Date("10/23/22").toLocaleDateString(),
    replacements: [
      { quantity: 1, price: 2000, name: "Transformador" },
      { quantity: 4, price: 2000, name: "Transitor" },
      { quantity: 4, price: 2000, name: "Condensador" },
      { quantity: 4, price: 2000, name: "Diodo" },
    ],
    author: "Lionel Messi",
  },
  {
    date: new Date("10/23/22").toLocaleDateString(),
    replacements: [
      { quantity: 1, price: 2000, name: "Transformador" },
      { quantity: 4, price: 2000, name: "Transitor" },
      { quantity: 4, price: 2000, name: "Condensador" },
      { quantity: 4, price: 2000, name: "Diodo" },
    ],
    author: "Mordecail",
  },
  {
    date: new Date("10/23/22").toLocaleDateString(),
    replacements: [
      { quantity: 1, price: 2000, name: "Transformador" },
      { quantity: 4, price: 2000, name: "Transitor" },
      { quantity: 4, price: 2000, name: "Condensador" },
      { quantity: 4, price: 2000, name: "Diodo" },
    ],
    author: "Pedro Perez",
  },
];

const deviceTest = {
  price: 2000,
  customerName: "Enrique Enrique",
  customerPhone: 3213100058,
  deviceID: 32,
  deviceBrand: "Cobra",
  deviceType: "Inversor",
  deviceProps: { watts: 800, input: 12, output: 110 },
  state: "Entregado",
  diagnostic: ["Triac", "Diodos", "Transformador"],
};

const statesColors = {
  Recibido: "#8B0000",
  Entregado: "#006633",
  Reparado: "#204C7C",
};

const statesButtonColors = {
  Recibido: "#204C7C",
  Entregado: "#8B0000",
  Reparado: "#006633",
};

const statesButtonWords = {
  Recibido: "Reparar",
  Entregado: "Recibir",
  Reparado: "Entregar",
};

const propsFormat = {
  watts: "Potencia",
  input: "Alimentación",
  output: "Salida",
  range: "Alcance",
  volt: "Potencia",
};

function DeviceInfoPage() {
  const { currentDevice, setCurrentDevice } = useRepair();

  const [heightOut, setHeightOut] = useState();
  const [shownHistorial, setShownHistorial] = useState(false);
  const [heightLimit, setHeightLimit] = useState();

  const historialCardsContainer = useRef(null);

  const handleHistorialHeight = () => {
    setShownHistorial(!shownHistorial);
  };

  const compareHistorialHeight = () => {
    if (historialCardsContainer.current?.clientHeight > 170) {
      setHeightLimit(historialCardsContainer.current.clientHeight);
      if (!heightOut) {
        setHeightOut(true);
        setShownHistorial(false);
      }
    } else {
      setHeightOut(false);
      setShownHistorial(false);
    }
  };

  window.onresize = () => {
    compareHistorialHeight();
  };

  useEffect(() => {
    compareHistorialHeight();
  }, []);

  return (
    <>
      <div
        className={`absolute transition-all translate-x-1/2 w-full right-1/2 max-w-[1020px] bg-[#F5F5F5] rounded-[20px] shadow-neutral-900 shadow-md ${
          currentDevice ? "scale-100" : "scale-0"
        } `}
      >
        <img
          onClick={(e) => {
            setCurrentDevice(null);
            const scrollTop = e.target.nextSibling.scrollTop;
            e.target.nextSibling.scrollBy(0, scrollTop * -1);
            setShownHistorial(false);
          }}
          src={CloseIcon}
          className="absolute -right-2 -top-2"
          width={26}
          alt=""
        />
        <div
          id="InfoContainer"
          className="p-3 flex flex-col gap-2 w-full h-[calc(100vh-120px)] rounded-[20px] overflow-y-auto"
        >
          <section className="w-full flex gap-3 items-center ">
            <h1 className="text-xl font-extrabold">
              {`#${currentDevice ? currentDevice.deviceID : ""} - ${
                currentDevice ? currentDevice.deviceType : ""
              } ${currentDevice ? currentDevice.deviceBrand : ""}`}
            </h1>
            <figure
              className={`rounded-full w-[20px] h-[20px] `}
              style={{
                backgroundColor: statesColors[currentDevice?.state],
              }}
            ></figure>
          </section>
          <section className=" bg-[#F5F5F5] rounded-[20px] shadow-neutral-600 shadow-md px-2 pt-3 pb-1 border-[#C1B7B7] border-2">
            <span className="flex items-center justify-between h-[26px]">
              <h3 className="mb-3 text-[16px] font-bold">
                Características técnicas
              </h3>
              <ModeRounded className="p-[1px] border-[#8D8989] border-[1px] rounded-lg -mt-2" fontSize="small"/>
            </span>

            <table className="w-full rounded-lg border-1 border-gray-500 mb-2">
              {currentDevice ? (
                <tbody>
                  {Object.keys(currentDevice.deviceProps).map((prop, i) => (
                    <tr
                      key={i}
                      className={`border border-gray-500 w-full ${
                        i % 2 == 0 ? "bg-[#D9D9D9]" : ""
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
          </section>
          <section className=" bg-[#F5F5F5] rounded-[20px] shadow-neutral-600 shadow-md px-2 pt-3 border-[#C1B7B7] border-2">
            <span className="flex items-center justify-between h-[26px]">
              <h3 className="mb-3 text-[16px] font-bold">
                Información del cliente
              </h3>
              <ModeRounded className="p-[1px] border-[#8D8989] border-[1px] rounded-lg border-gray-600 -mt-2" fontSize="small"/>
            </span>
            <span className="flex gap-1 px-2 mb-2 items-center">
              <Person/>
              <p className="text-[15px] font-bold">
                {currentDevice ? currentDevice.customerName : ""}
              </p>
            </span>
            <span className="flex gap-1 px-2 mb-2 items-center">
              <Call/>
              <p className="text-[15px] font-bold">
                {currentDevice ? currentDevice.customerPhone : ""}
              </p>
            </span>
          </section>
          <section
            className={`bg-[#F5F5F5] rounded-[20px] shadow-neutral-600 shadow-md pb-2 pt-3 px-2 border-[#C1B7B7] border-2`}
          >
            <span className="flex items-center justify-between h-[26px]">
              <h3 className="mb-2 text-[16px] font-bold">
                Historial de reparaciones
              </h3>
              <span className="flex gap-1 -mt-1 items-center">
                <p className="text-sm font-bold">Filtros</p>
                <Tune fontSize="small"/>
              </span>
            </span>
            <div
              style={{
                height: shownHistorial ? `${heightLimit}px` : "170px",
              }}
              className={`transition-all w-full overflow-hidden`}
            >
              <span
                ref={historialCardsContainer}
                className={`flex flex-wrap justify-center items-center gap-1.5 gap-y-2 pb-2`}
              >
                {historialTest.map((historial, i) => (
                  <RepairInfoCard
                    key={i}
                    device={deviceTest}
                    repair={historial}
                  />
                ))}
              </span>
            </div>
            {heightOut ? (
              <span
                onClick={handleHistorialHeight}
                className="flex flex-col items-center justify-center pt-2 "
              >
                <p className="text-center text-lg font-bold hover:cursor-pointer">
                  {` ${shownHistorial ? "Ocultar" : "Ver historial completo"}`}
                </p>
                <ExpandMore className={`${shownHistorial?"rotate-180":""}`} sx={{fontSize:32, cursor:"pointer"}}/>
              </span>
            ) : (
              <></>
            )}
          </section>
          <button
            style={{
              backgroundColor: statesButtonColors[currentDevice?.state],
            }}
            className="rounded-lg w-4/5 py-1.5 text-xl text-white font-semibold m-auto mt-2"
          >
            {statesButtonWords[currentDevice?.state]}
          </button>
        </div>
      </div>
    </>
  );
}

export default DeviceInfoPage;
