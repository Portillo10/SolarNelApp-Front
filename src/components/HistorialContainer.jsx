import { useEffect, useRef, useState } from "react";
import { useRepair } from "../hooks/UseRepair";
import { ExpandMore, Tune } from "@mui/icons-material";
import RepairInfoCard from "./RepairInfoCard";
import { CircularProgress } from "@mui/material";
import { getDevice } from "../services/device.services";

export default function HistorialContainer({history, setHistory, shownHistorial, setShownHistorial}) {

  const { currentDevice } = useRepair();

  const [heightOut, setHeightOut] = useState();
  const historialCardsContainer = useRef(null);
  const [heightLimit, setHeightLimit] = useState();

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
  }, [history]);

  useEffect(() => {
    if (currentDevice?.history) {
      setHistory(currentDevice.history);
    } else if (currentDevice) {
      (async () => {
        try {
          const {
            data: { device },
          } = await getDevice(currentDevice._id);
          setHistory(device.history);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [currentDevice]);

  return (
    <section className="dark:bg-dark-container dark:border dark:border-gray-600 bg-[#F5F5F5] rounded-[20px] shadow-neutral-600 shadow-md pb-2 pt-3 px-2 border-[#C1B7B7] border-2 dark:shadow-none">
      <span className="flex items-center justify-between h-[26px] gap-4">
        <h3 className="mb-2 text-[16px] font-bold">
          Historial de reparaciones
        </h3>
        <span className="flex gap-1 -mt-1 items-center">
          <p className="text-sm font-bold">Filtros</p>
          <Tune fontSize="small" />
        </span>
      </span>
      <div
        style={{
          height: shownHistorial ? `${heightLimit}px` : "170px",
        }}
        className="transition-all w-full overflow-hidden flex justify-center"
      >
        <span
          ref={historialCardsContainer}
          className="flex flex-wrap justify-center h-min items-center gap-1.5 gap-y-2 pb-2"
        >
          {history?.length > 0 ? (
            history?.map((repair, i) => {
              return <RepairInfoCard key={i} repair={repair} />;
            })
          ) : !history ? (
            <span className="pt-12">
              <CircularProgress color="inherit" />
            </span>
          ) : (
            <p className="pt-12 text-center">
              No hay reparaciones para mostrar
            </p>
          )}
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
          <ExpandMore
            className={`${shownHistorial ? "rotate-180" : ""}`}
            sx={{ fontSize: 32, cursor: "pointer" }}
          />
        </span>
      ) : (
        <></>
      )}
    </section>
  );
}
