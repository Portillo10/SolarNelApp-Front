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
      <div className="RepairHeader bg-[#B7ADAD] dark:bg-[#5e5a5f] dark:text-[#d8d1d1]">
        <p
          onClick={() => scroll(0)}
          className={`cursor-pointer ${
            currentScrollIndex == 0 ? "text-[#004080] border-b-4 border-[#004080] pb-[39px] dark:text-[#3ca4ff] dark:border-[#3ca4ff]" : ""
          }`}
        >
          Recibidos
        </p>
        <p
          onClick={() => scroll(1)}
          className={`cursor-pointer ${
            currentScrollIndex == 1 ? "text-[#004080] border-b-4 border-[#004080] pb-[39px] dark:text-[#3ca4ff] dark:border-[#3ca4ff]" : ""
          }`}
        >
          Reparados
        </p>
        <p
          onClick={() => scroll(2)}
          className={`cursor-pointer ${
            currentScrollIndex == 2 ? "text-[#004080] border-b-4 border-[#004080] pb-[39px] dark:text-[#3ca4ff] dark:border-[#3ca4ff]" : ""
          }`}
        >
          Entregados
        </p>
      </div>
    </>
  );
}

export default HeaderRepairPage;
