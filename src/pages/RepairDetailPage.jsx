import { useEffect, useState } from "react";

import { useRepair } from "../hooks/UseRepair";
import { getTypes } from "../services/replacement.services";
import { cashFormat } from "../utils/others.utils";

import { AttachMoneyRounded, CloseRounded } from "@mui/icons-material";

import CardHoles from "../components/CardHoles";

const vocals = ["a", "e", "i", "o", "u"];

function RepairDetailPage() {
  const { currentRepair, setCurrentRepair } = useRepair();

  const [replacementTypes, setReplacementTypes] = useState([]);

  const singleToPlural = (word) => {
    if (vocals.includes(word[word.length - 1])) {
      return `${word}s`;
    } else {
      return `${word}es`;
    }
  };

  const getSymbol = (property) => {
    let symbol;
    replacementTypes.forEach((repType) => {
      const prop = repType.replacementProps.find((prop) => {
        return prop.prop.trim() === property;
      });
      if (prop) {
        symbol = prop.symbol;
      }
    });
    return symbol;
  };

  const getReplacementProp = (replacement) => {
    const str =
      "(" +
      replacement.props[Object.keys(replacement.props)[0]] +
      getSymbol(Object.keys(replacement.props)[0]) +
      ")";

    return str;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getTypes();
        setReplacementTypes(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div
        style={{
          transform: currentRepair
            ? "translate(50%, 0)"
            : "translate(50%, calc(100% + 50px))",
        }}
        className="transition-all ease-out absolute max-w-[500px] w-full bg-[#FFE4B5] right-1/2 rounded-[20px] h-[calc(100vh-120px)] border-2 border-[#b29f7e] dark:text-white dark:bg-[#333333] dark:border dark:border-[#444444]"
      >
        <span className="absolute -right-2 -top-2 rounded-full text-white bg-gray-900 p-1">
          <CloseRounded onClick={() => setCurrentRepair(null)} />
        </span>
        <CardHoles px={8} py={5} size={30} />
        <div
          id="RepairDetail"
          className="overflow-y-auto h-[calc(100vh-200px)] px-4"
        >
          <div>
            <h1 className="text-center text-3xl font-bold border-b-[3px] pb-2 border-black dark:border-[#898788]">
              {new Date(currentRepair?.repairDate).toLocaleDateString()}
            </h1>
          </div>
          <h3 className="font-bold text-xl py-2 border-b-[2px] border-[#747474]">
            Detalles de la reparación
          </h3>
          <section className="flex flex-col">
            {currentRepair?.replacements.map((replacement, i) => (
              <span
                key={i}
                className="flex justify-between py-1 border-b-[2px] border-[#747474] gap-1"
              >
                <p className="text-base font-bold max-w-[60%] ">
                  {`${replacement.quantity} ${
                    replacement.quantity > 1
                      ? singleToPlural(replacement.replacement.replacementType)
                      : replacement.replacement.replacementType
                  } `}
                  {currentRepair && getReplacementProp(replacement.replacement)}
                </p>
                <span className="flex text-[#006400] items-center dark:text-green-500">
                  <AttachMoneyRounded fontSize="small" />
                  <p className="text-lg font-bold">
                    {cashFormat(replacement.replacement.price * replacement.quantity)}
                  </p>
                </span>
              </span>
            ))}
            <span className="flex justify-between py-1">
              <p className="text-lg font-bold">Total</p>
              <span className="flex text-[#006400] items-center dark:text-green-500">
                {currentRepair?.repairPrice > 0 ? (
                  <>
                    <AttachMoneyRounded sx={{ fontSize: 18 }} />
                    <p className="text-lg font-extrabold">
                      {cashFormat(currentRepair?.repairPrice)}
                    </p>
                  </>
                ) : (
                  <p className="text-lg font-extrabold dark:text-[#00D1A1] text-[#006C5B]">
                    Garantía
                  </p>
                )}
              </span>
            </span>
          </section>
          <section className="flex py-3">
            <span className="bg-[#e8f5e9] w-full rounded-lg p-2 border-[#8B8787] border-2 dark:bg-[#222222] dark:border-[#898788]">
              <p className="font-bold">Observaciones:</p>
              <p className="ml-2">{`${
                currentRepair?.observations
                  ? currentRepair?.observations
                  : "No hay observaciones."
              }`}</p>
            </span>
          </section>
          <section className="mb-3">
            <p>Reparado por:</p>
            <p className="text-xl py-1 border-b-2 border-black dark:border-gray-500 inline-block px-2 font-['Lobster'] font-extralight ml-2">
              {currentRepair?.author}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default RepairDetailPage;
