import { useContext } from "react";
import { RepairsContext } from "../Contexts/RepairsContext.jsx";

function HeaderRepairPage() {
  const { currentScrollIndex } = useContext(RepairsContext);
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
        <a
          onClick={() => scroll(0)}
          className={`cursor-pointer ${
            currentScrollIndex == 0 ? "ActiveRepairFilter" : ""
          }`}
        >
          Recibidos
        </a>
        <a
          onClick={() => scroll(1)}
          className={`cursor-pointer ${
            currentScrollIndex == 1 ? "ActiveRepairFilter" : ""
          }`}
        >
          Reparados
        </a>
        <a
          onClick={() => scroll(2)}
          className={`cursor-pointer ${
            currentScrollIndex == 2 ? "ActiveRepairFilter" : ""
          }`}
        >
          Entregados
        </a>
      </div>
    </>
  );
}

export default HeaderRepairPage;
