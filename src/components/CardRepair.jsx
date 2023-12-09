import { useRepair } from "../hooks/UseRepair";

const propsFormat = {
  range: "KM",
  input: "V",
  power: "W",
  output: "V",
};

const tagColors = {
  range: "#B0C9C9",
  input: "#F9EBB2",
  power: "#D8BFD8",
  output: "#FFDAB9",
};

function CardRepair({ children, device }) {
  const { setCurrentDevice } = useRepair();

  const { customerName, brand, numberCode, deviceType, deviceProps } = device;

  const devicePropsList = Object.keys(deviceProps);

  const getTags = devicePropsList.map((prop, i) => {
    if (prop == "input" && Object.keys(deviceProps).includes("output")) {
      return (
        <p
          key={i}
          className="PropTag text-black dark:shadow-none"
          style={{ backgroundColor: tagColors["output"] }}
        >
          {`${deviceProps[prop]} ${propsFormat[prop]}/${deviceProps["output"]} ${propsFormat[prop]}`}
        </p>
      );
    } else if (prop != "output") {
      return (
        <p
          key={i}
          className="PropTag text-black dark:shadow-none"
          style={{ backgroundColor: tagColors[prop] }}
        >
          {`${deviceProps[prop]} ${propsFormat[prop]}`}
        </p>
      );
    }
  });

  return (
    <>
      <div
        className="CardRepair dark:bg-[#222222] dark:shadow-none"
        onClick={() => setCurrentDevice(device)}
      >
        <section className="flex max-w-min min-w-[100px] flex-col p-2 items-center justify-center min-h-[92px]">
          <h3 className="text-center text-xl">#{numberCode}</h3>
          <p className="flex-none text-center overflow-hidden">{customerName}</p>
        </section>
        <section className="px-3 flex flex-col gap-1 border-l-2 border-gray-600">
          <p>{deviceType + " " + brand}</p>
          <div className="flex flex-wrap gap-1 mb-1">{getTags}</div>
          {children}
        </section>
      </div>
    </>
  );
}

export default CardRepair;
