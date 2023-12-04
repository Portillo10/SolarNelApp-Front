import { CheckIcon } from "../hooks/Icons";
import { useRepair } from "../hooks/UseRepair";
import {AttachMoneyRounded} from '@mui/icons-material'
import CardHoles from "./CardHoles";

function RepairInfoCard({ repair }) {
  const { setCurrentRepair } = useRepair();

  const renderReplacements = () => {
    if (repair.replacements.length > 2) {
      return (
        <>
          <span className="flex justify-between gap-[1px]">
            <p className="text-[12px] font-bold">{`${
              repair.replacements[0].replacement.replacementType || ""
            } ${
              repair.replacements[0].quantity > 1
                ? "(" + repair.replacements[0].quantity + ")"
                : ""
            }`}</p>
            <img src={CheckIcon} width="10px" alt="" />
          </span>
          <span className="flex justify-between gap-[1px]">
            <p className="text-[12px] font-bold">
              Y {repair.replacements.length - 1} más
            </p>
            <img src={CheckIcon} width="10px" alt="" />
          </span>
        </>
      );
    }
    return repair.replacements.map((replacement, i) => {
      return (
        <span className="flex justify-between gap-[1px]" key={i}>
          <p className="text-[12px] font-bold">{`${replacement.replacement.replacementType} ${
            replacement.quantity > 1 ? "(" + replacement.quantity + ")" : ""
          }`}</p>
          <img src={CheckIcon} width="10px" alt="" />
        </span>
      );
    });
  };

  return (
    <>
      <div className="flex flex-col bg-[#FFE4B5] dark:bg-[#333333] dark:shadow-none rounded-xl shadow-md shadow-slate-600 px-2 py-1 w-[135px] h-[162px]">
        <CardHoles px={1} py={2} size={12}/>
        <h1 className="text-center border-b-2 font-extrabold text-lg border-black mx-1 dark:border-[#898788]">
          {new Date(repair.repairDate).toLocaleDateString()}
        </h1>

        <section className="py-1 h-[64px] justify-between flex flex-col">
          <div className="flex flex-col justify-center h-full">
            {renderReplacements()}
          </div>

          <span className="flex text-green-700 dark:text-green-500 items-center">
            <AttachMoneyRounded sx={{fontSize:18}}/>
            <p className=" text-sm font-extrabold">{repair.repairPrice}</p>
          </span>
        </section>
        <section className="flex justify-center">
          <button
            onClick={() => setCurrentRepair(repair)}
            className="w-11/12 text-sm py-1 mb-1 bg-[#D95300] text-white font-bold rounded-lg"
          >
            Ver detalles
          </button>
        </section>
      </div>
    </>
  );
}

export default RepairInfoCard;
