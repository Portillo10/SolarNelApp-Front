import { useRepair } from "../hooks/UseRepair";

function HeaderRepairPage() {
  const { currentScrollIndex } = useRepair();
  const scroll = (index) => {
    const slider = document.getElementsByClassName("Slider")[0];

    if (currentScrollIndex == index) return;

    let optionsIndex;

    if (currentScrollIndex < index) {
      optionsIndex = {
        0: 0,
        1: 1,
        2: 2,
      };
    } else {
      optionsIndex = {
        0: currentScrollIndex == 1 ? -1 : -2,
        1: -1,
        2: 0,
      };
    }

    slider.scrollBy({
      left: (slider.clientWidth + 10) * optionsIndex[index],
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="RepairHeader " style={{ backgroundColor: "#B7ADAD" }}>
        <p
          onClick={() => scroll(0)}
          className={`cursor-pointer ${
            currentScrollIndex == 0 ? "ActiveRepairFilter" : ""
          }`}
        >
          Recibidos
        </p>
        <p
          onClick={() => scroll(1)}
          className={`cursor-pointer ${
            currentScrollIndex == 1 ? "ActiveRepairFilter" : ""
          }`}
        >
          Reparados
        </p>
        <p
          onClick={() => scroll(2)}
          className={`cursor-pointer ${
            currentScrollIndex == 2 ? "ActiveRepairFilter" : ""
          }`}
        >
          Entregados
        </p>
      </div>
    </>
  );
}

export default HeaderRepairPage;
