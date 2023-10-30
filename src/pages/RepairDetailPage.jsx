import { useRepair } from "../hooks/UseRepair";
import { CloseIcon, DollarIcon } from "../hooks/Icons";

const vocals = ["a", "e", "i", "o", "u"];

const props = {
  range: "KM",
  amperage: "A",
  capacity: "uf",
  ref: "",
};

function RepairDetailPage() {
  const { currentRepair, setCurrentRepair } = useRepair();

  const prices = currentRepair
    ? currentRepair.replacements.map(({ price, quantity }) => {
        return { price, quantity };
      })
    : [];

  const singleToPlural = (word) => {
    if (vocals.includes(word[word.length - 1])) {
      return `${word}s`;
    } else {
      return `${word}es`;
    }
  };

  const calcTotalPrice = () => {
    if (!currentRepair) return;
    let sum = 0;
    for (let price of prices) {
      sum += price.price * price.quantity;
    }
    return sum;
  };

  // if (!currentRepair) return <></>;
  return (
    <>
      <div
        style={{
          transform: currentRepair
            ? "translate(50%, 0)"
            : "translate(50%, calc(100% + 50px))",
        }}
        className="transition-all ease-out absolute max-w-[500px] w-full bg-[#FFE4B5] right-1/2  rounded-[20px] h-[calc(100vh-120px)] border-2 border-[#b29f7e]"
      >
        <img
          onClick={() => setCurrentRepair(null)}
          src={CloseIcon}
          className="absolute -right-2.5 -top-2.5"
          width={26}
          alt=""
        />
        <div className="flex flex-row justify-around py-5 px-8]">
          <figure className="w-[30px] h-[30px] rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5]"></figure>
          <figure className="w-[30px] h-[30px] rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5]"></figure>
          <figure className="w-[30px] h-[30px] rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5]"></figure>
          <figure className="w-[30px] h-[30px] rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5]"></figure>
          <figure className="w-[30px] h-[30px] rounded-full shadow-inner shadow-slate-500 bg-[#F5F5F5]"></figure>
        </div>
        <div
          id="RepairDetail"
          className="overflow-y-auto h-[calc(100vh-200px)] px-4"
        >
          <div>
            <h1 className="text-center text-3xl font-bold border-b-[3px] pb-2 border-black">
              {currentRepair?.date}
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
                      ? singleToPlural(replacement.name)
                      : replacement.name
                  }`}
                  {` ${
                    replacement.reference
                      ? "(" +
                        replacement.reference[
                          Object.keys(replacement?.reference)[0]
                        ] +
                        props[Object.keys(replacement?.reference)[0]] +
                        ")"
                      : ""
                  }`}
                </p>
                <span className="flex items-center">
                  <img src={DollarIcon} width={18} alt="" />{" "}
                  <p className="text-lg font-bold text-[#006400] ">
                    {replacement.price * replacement.quantity}
                  </p>
                </span>
              </span>
            ))}
            <span className="flex justify-between py-1">
              <p className="text-lg font-bold">Total</p>
              <span className="flex">
                <img src={DollarIcon} width={18} alt="" />{" "}
                <p className="text-lg font-bold text-[#006400]">
                  {calcTotalPrice()}
                </p>
              </span>
            </span>
          </section>
          <section className="flex py-3">
            <span className="bg-[#e8f5e9] w-full rounded-lg p-2 border-[#8B8787] border-2">
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
            <p className="text-xl py-1 border-b-2 border-black inline-block px-2 font-['Lobster'] ml-2">
              {currentRepair?.author}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default RepairDetailPage;
