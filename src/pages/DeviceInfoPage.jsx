import { useContext, useEffect, useRef, useState } from "react";

//icons
import CloseIcon from "../assets/svg/close_icon.svg";
import EditIcon from "../assets/svg/Edit_Icon.svg";
import CustomerIcon from "../assets/svg/Customer_Icon.svg";
import PhoneIcon from "../assets/svg/Phone_Icon.svg";
import ArrowIcon from "../assets/svg/arrow_icon.svg";
import FilterIcon from "../assets/svg/Filter_icon.svg";

//components
import RepairInfoCard from "../components/RepairInfoCard";

const props = {
  range: "KM",
  input: "V",
  watts: "W",
  output: "V",
};

const historialTest = [
  {
    date: new Date().toLocaleDateString(),
    components: [
      { quantity: 1, name: "Transformador" },
      { quantity: 4, name: "Diodo" },
    ],
  },
  {
    date: new Date("12/9/23").toLocaleDateString(),
    components: [
      { quantity: 1, name: "Transformador" },
      { quantity: 4, name: "Condensador" },
    ],
  },
  {
    date: new Date("10/23/22").toLocaleDateString(),
    components: [
      { quantity: 1, name: "Transformador" },
      { quantity: 4, name: "Transitor" },
      { quantity: 4, name: "Condensador" },
      { quantity: 4, name: "Diodo" },
    ],
  },
  {
    date: new Date("10/23/22").toLocaleDateString(),
    components: [
      { quantity: 1, name: "Transformador" },
      { quantity: 4, name: "Transitor" },
      { quantity: 4, name: "Condensador" },
      { quantity: 4, name: "Diodo" },
    ],
  },
  {
    date: new Date("10/23/22").toLocaleDateString(),
    components: [
      { quantity: 1, name: "Transformador" },
      { quantity: 4, name: "Transitor" },
      { quantity: 4, name: "Condensador" },
      { quantity: 4, name: "Diodo" },
    ],
  },
];

const deviceTest = {
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
  const [heightOut, setHeightOut] = useState();
  const [shownHistorial, setShownHistorial] = useState(false);
  const [heightLimit, setHeightLimit] = useState();

  const historialContainer = useRef(null);
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
      <div className="relative bg-[#F5F5F5] rounded-[20px] shadow-neutral-900 shadow-md p-3 flex flex-col gap-2 w-full ">
        <img
          src={CloseIcon}
          className="absolute -right-2 -top-2"
          width={26}
          alt=""
        />
        <section className="w-full flex gap-3 items-center ">
          <h1 className="text-xl font-extrabold">
            {`#${deviceTest.deviceID} - ${deviceTest.deviceType} ${deviceTest.deviceBrand}`}
          </h1>
          <figure
            className={`rounded-full w-[20px] h-[20px] `}
            style={{ backgroundColor: statesColors[deviceTest.state] }}
          ></figure>
        </section>
        <section className=" bg-[#F5F5F5] rounded-[20px] shadow-neutral-600 shadow-md px-2 pt-2 pb-1 border-[#C1B7B7] border-2">
          <span className="flex items-center justify-between h-[26px]">
            <h3 className="mb-3 text-[16px] font-bold">
              Características técnicas
            </h3>
            <img
              className="-mt-2 -mr-[2px] p-[1px] border-[#8D8989] border-[1px] rounded-lg"
              src={EditIcon}
              width={26}
              alt=""
            />
          </span>

          <table className="w-full rounded-lg border-1 border-gray-500 mb-2">
            <tbody>
              {Object.keys(deviceTest.deviceProps).map((prop, i) => (
                <tr
                  key={i}
                  className={`border-b border-gray-500 w-full ${
                    i % 2 == 0 ? "bg-[#D9D9D9]" : ""
                  }`}
                >
                  <td
                    className={`w-[50%] text-center text-[15px] border-r border-gray-500`}
                  >
                    {propsFormat[prop]}
                  </td>
                  <td className={`w-[50%] text-center text-[15px]`}>
                    {`${deviceTest.deviceProps[prop]} ${props[prop]}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className=" bg-[#F5F5F5] rounded-[20px] shadow-neutral-600 shadow-md px-2 pt-2 border-[#C1B7B7] border-2">
          <span className="flex items-center justify-between h-[26px]">
            <h3 className="mb-3 text-[16px] font-bold">
              Información del cliente
            </h3>
            <img
              className="-mt-2 -mr-[2px] p-[1px] border-[#8D8989] border-[1px] rounded-lg"
              src={EditIcon}
              width={26}
              alt=""
            />
          </span>
          <span className="flex gap-1 px-2 mb-2">
            <img src={CustomerIcon} width={20} alt="" />
            <p className="text-[15px] font-bold">{deviceTest.customerName}</p>
          </span>
          <span className="flex gap-1 px-2 mb-2">
            <img src={PhoneIcon} width={20} alt="" />
            <p className="text-[15px] font-bold">{deviceTest.customerPhone}</p>
          </span>
        </section>
        <section
          ref={historialContainer}
          className={`transition-all bg-[#F5F5F5] rounded-[20px] shadow-neutral-600 shadow-md py-2 px-2 border-[#C1B7B7] border-2`}
        >
          <span className="flex items-center justify-between h-[26px]">
            <h3 className="mb-2 text-[16px] font-bold">
              Historial de reparaciones
            </h3>
            <span className="flex gap-1 -mt-1">
              <p className="text-sm font-bold">Filtros</p>{" "}
              <img src={FilterIcon} width={16} alt="" />
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
              <img
                className={`transition-all ${
                  shownHistorial ? "-rotate-90" : "rotate-90"
                } hover:cursor-pointer`}
                width="32px"
                src={ArrowIcon}
                alt=""
              />
            </span>
          ) : (
            <></>
          )}
        </section>
        <button
          style={{ backgroundColor: statesButtonColors[deviceTest.state] }}
          className="rounded-lg w-4/5 py-1.5 bg-[#204C7C] text-xl text-white font-semibold m-auto mt-2"
        >
          {statesButtonWords[deviceTest.state]}
        </button>
      </div>
    </>
  );
}

export default DeviceInfoPage;
