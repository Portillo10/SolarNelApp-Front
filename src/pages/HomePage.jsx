import Card from "../components/Card.jsx";
import MenuButton from "../components/MenuButton.jsx";
import ChartCard from "../components/ChartCard.jsx";

import {
  AddIcon,
  BarsDiagramIcon,
  EmployeeIcon,
  RepairIconButton,
  ReportIcon,
  MoneyIcon,
  DarkMoneyIcon,
  DangerIcon,
  DarkDangerIcon,
  ReadyIcon,
  DarkReadyIcon,
  ToolBoxIcon,
  DarkToolBoxIcon,
} from "../hooks/Icons.jsx";

import { useMenu } from "../hooks/UseMenu.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { getStadisticsRequest } from "../services/device.services.js";
import { statusEnum } from "../utils/request.utils.js";
import { toShortQuantity } from "../utils/others.utils.js";

const labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const quantities = [12, 14, 15, 6, 9];
const labelsPie = [
  "Sami el Heladero",
  "Nicolas Maduro",
  "Nelson Mandela",
  "Gustavo Petro",
];
const quantitiesPie = [12, 16, 17, 11];

let options = {
  responsive: false,
  animation: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const darkBgColors = ["#d2d0ff", "#f7d356", "#a4a6ff", "#4caf81", "#f8a877"];
const backColorColors = ["#babbff", "#f4c111", "#7879ff", "#25a65b", "#f48b53"];

const darkPieBgColors = ["#a0a2ff", "#6ed5da", "#dcdcff", "#f9dd6a"];
const lightPieBgColors = ["#7779ff", "#2ec7cc", "#babbff", "#f4c211"];



function HomePage() {
  const { darkMode, menuAnimationFinished } = useMenu();

  const [data, setData] = useState(null);

  let pieData = {
    labels: labelsPie,
    datasets: [
      {
        label: "Equipos reparados",
        data: quantitiesPie,
        backgroundColor: darkMode ? darkPieBgColors : lightPieBgColors,
        borderColor: ["#7779ff", "#2ec7cc", "#babbff", "#f4c211"],
      },
    ],
  };

  let pieOptions = {
    responsive: false,
    animation: true,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          font: {
            size: 16,
            family: ["quicksand", "Arial"],
            weight: "bold",
          },
          color: darkMode ? "white" : "black",
        },
      },
      title: {
        display: false,
      },
    },
  };

  let chartData = {
    labels,
    datasets: [
      {
        data: quantities,
        backgroundColor: darkMode ? darkBgColors : backColorColors,
      },
    ],
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getStadisticsRequest()
        if (response.status === statusEnum.OK){
          setData(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, []);

  return (
    <>
      <div className="dark:text-white">
        <section
          className={`CardContainer bg-[#f5f5f5] shadow-container dark:shadow-none dark:bg-dark-container ${
            menuAnimationFinished ? "overflow-auto" : "overflow-hidden"
          }`}
        >
          <Card
            backColor="bg-danger dark:bg-dark-danger"
            lightColors={["#ffd699", "#fdeac0"]}
            darkColors={["#b38f66", "#e0b189"]}
            icon={darkMode ? DarkDangerIcon : DangerIcon}
            title="Reparaciones pendientes"
            info={data?.pending}
          />
          <Card
            backColor="bg-ready dark:bg-dark-ready"
            icon={darkMode ? DarkReadyIcon : ReadyIcon}
            title="Equipos listos para entregar"
            info={data?.ready}
          />
          <Card
            backColor="bg-repair dark:bg-dark-repair"
            icon={darkMode ? DarkToolBoxIcon : ToolBoxIcon}
            title="Equipos reparados hoy"
            info={data?.repairedToday}
          />
          <Card
            backColor="bg-money dark:bg-dark-money"
            icon={darkMode ? DarkMoneyIcon : MoneyIcon}
            title="Total de ingresos hoy"
            info={data?"$"+toShortQuantity(data?.earningsToday):undefined}
          />
          <div className="ChartsContainer">
            <ChartCard
              title="Equipos reparados esta semana"
              data={chartData}
              options={options}
              type="bar"
              color="bg-[#f7e8d9] dark:bg-[#263238]"
              info={(() => {
                let total = 0;
                quantities.forEach((quantitie) => {
                  total += quantitie;
                });
                return `Total reparados esta semana ${total}`;
              })()}
            />
            <ChartCard
              title="Desempeño de los trabajadores esta semana"
              data={pieData}
              type="pie"
              options={pieOptions}
              color="bg-[#E6E6FA] dark:bg-[#37474f]"
            />
          </div>
        </section>

        <div className="GroupButtons">
          <MenuButton icon={ReportIcon} />
          <MenuButton icon={EmployeeIcon} />
          <MenuButton icon={AddIcon} to={"/add_device"} addButton="AddButton" />
          <MenuButton icon={RepairIconButton} to="/repairs" />
          <MenuButton icon={BarsDiagramIcon} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
