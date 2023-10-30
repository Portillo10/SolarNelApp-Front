import { CheckIcon, DollarIcon } from "../hooks/Icons";
import { useRepair } from "../hooks/UseRepair";

function RepairInfoCard({ repair }) {
  const { setCurrentRepair } = useRepair();

  const renderReplacements = () => {
    if (repair.replacements.length > 2) {
      return (
        <>
          <span className="flex justify-between gap-[1px]">
            <p className="text-[12px] font-bold">{`${
              repair.replacements[0].name
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
          <p className="text-[12px] font-bold">{`${replacement.name} ${
            replacement.quantity > 1 ? "(" + replacement.quantity + ")" : ""
          }`}</p>
          <img src={CheckIcon} width="10px" alt="" />
        </span>
      );
    });
  };

  return (
    <>
      <div className="flex flex-col bg-[#FFE4B5] rounded-xl shadow-md shadow-slate-600 px-2 py-1 w-[135px]  h-[162px]">
        <div className="flex flex-row justify-around py-2 px-1">
          <figure className="w-[12px] h-[12px] rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5]"></figure>
          <figure className="w-[12px] h-[12px] rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5]"></figure>
          <figure className="w-[12px] h-[12px] rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5]"></figure>
          <figure className="w-[12px] h-[12px] rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5]"></figure>
          <figure className="w-[12px] h-[12px] rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5]"></figure>
        </div>
        <h1 className="text-center border-b-2 font-extrabold text-lg border-black mx-1">
          {repair.date}
        </h1>

        <section className="py-1 h-[64px] justify-between flex flex-col">
          <div className="flex flex-col justify-center h-full">
            {renderReplacements()}
          </div>

          <span className="flex">
            <img src={DollarIcon} width="16px" alt="" />{" "}
            <p className="text-green-700 text-sm font-extrabold">120.000</p>
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
