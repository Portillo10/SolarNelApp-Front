import { useRepair } from "../hooks/UseRepair";

const propsFormat = {
  range: "KM",
  input: "V",
  watts: "W",
  output: "V",
};

const tagColors = {
  range: "#B0C9C9",
  input: "#F9EBB2",
  watts: "#D8BFD8",
  output: "#FFDAB9",
};

function CardRepair({ children, device }) {
  const { setCurrentDevice } = useRepair();

  const { customerName, deviceBrand, deviceID, deviceType, deviceProps } =
    device;

  const devicePropsList = Object.keys(deviceProps);

  const getTags = devicePropsList.map((prop, i) => {
    if (prop == "input" && devicePropsList.includes("output")) {
      return (
        <p
          key={i}
          className="PropTag"
          style={{ backgroundColor: tagColors["output"] }}
        >
          {`${deviceProps[prop]} ${propsFormat[prop]}/${deviceProps["output"]} ${propsFormat[prop]}`}
        </p>
      );
    } else if (prop != "output") {
      return (
        <p
          key={i}
          className="PropTag "
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
        className="CardRepair"
        onClick={() => {
          // setShowDeviceInfo(true);
          setCurrentDevice(device);
        }}
      >
        <section className="flex flex-col py-2 px-4 align-middle justify-center">
          <h3 className="text-center text-xl">#{deviceID}</h3>
          <p className="w-16 text-center">{customerName}</p>
        </section>
        <section
          className="px-3 flex flex-col gap-1"
          style={{ borderLeft: "2px solid gray" }}
        >
          <p>{deviceType + " " + deviceBrand}</p>
          <div className="flex gap-1 mb-2">{getTags}</div>
          {children ? children : <p className="text-red-600">Revisar</p>}
        </section>
      </div>
    </>
  );
}

export default CardRepair;
