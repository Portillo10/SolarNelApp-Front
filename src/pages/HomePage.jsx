import Card from "../components/Card.jsx";
import MenuButton from "../components/MenuButton.jsx";
import ChartCard from "../components/ChartCard.jsx";

import AddIcon from "/svg/MenuButtons/add_icon.svg";
import BarsDiagramIcon from "/svg/MenuButtons/Bars_diagram_icon.svg";
import EmployeeIcon from "/svg/MenuButtons/Employee_icon.svg";
import RepairIcon from "/svg/MenuButtons/Repair_icon.svg";
import ReportIcon from "/svg/MenuButtons/report_icon.svg";

import DollarIcon from "/svg/CardIcons/Dollar_Icon.svg";
import DangerIcon from "/svg/CardIcons/Danger_Icon.svg";
import ReadyIcon from "/svg/CardIcons/Ready_Icon.svg";
import ToolBoxIcon from "/svg/CardIcons/ToolBox_Icon.svg";
import { useEffect, useState } from "react";

const labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const quantities = [12, 14, 15, 6, 9];
const labelsPie = [
  "Sami el Heladero",
  "Nicolas Maduro",
  "Nelson Mandela",
  "Gustavo Petro",
];
const quantitiesPie = [12, 16, 17, 11];

let pieData = {
  labels: labelsPie,
  datasets: [
    {
      label: "Equipos reparados",
      data: quantitiesPie,
      backgroundColor: ["#7779ff", "#2ec7cc", "#babbff", "#f4c211"],
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
        color: "black",
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
      backgroundColor: ["#babbff", "#f4c111", "#7879ff", "#25a65b", "#f48b53"],
    },
  ],
};

let options = {
  responsive: false,
  animation: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

function HomePage() {
  return (
    <>
      <div className="Home">
        <section className="CardContainer">
          <Card
            type="Danger"
            icon={DangerIcon}
            title="Reparaciones pendientes"
            info="25"
          />
          <Card
            type="Ready"
            icon={ReadyIcon}
            title="Equipos listos para entregar"
            info="15"
          />
          <Card
            type="Repair"
            icon={ToolBoxIcon}
            title="Equipos reparados hoy"
            info="17"
          />
          <Card
            type="Money"
            icon={DollarIcon}
            title="Total de ingresos hoy"
            info="$150k"
          />

          <div className="ChartsContainer">
            <ChartCard
              title="Equipos reparados esta semana"
              data={chartData}
              options={options}
              type="bar"
              color="#f7e8d9"
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
              color="#E6E6FA"
            />
          </div>
        </section>

        <div className="GroupButtons">
          <MenuButton icon={ReportIcon} />
          <MenuButton icon={EmployeeIcon} />
          <MenuButton icon={AddIcon} addButton={true} />
          <MenuButton icon={RepairIcon} />
          <MenuButton icon={BarsDiagramIcon} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
