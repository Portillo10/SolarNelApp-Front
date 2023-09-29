import Card from "../components/Card.jsx";
import CardContainer from "../components/CardContainer.jsx";
import GroupButtons from "../components/GroupButtons.jsx";
import Head from "../components/Head.jsx";
import MenuButton from "../components/MenuButton.jsx";
import ChartCard from "../components/ChartCard.jsx";

import AddIcon from "/svg/MenuButtons/add_icon.svg";
import BarsDiagramIcon from "/svg/MenuButtons/Bars_diagram_icon.svg";
import EmployeeIcon from "/svg/MenuButtons/Employee_icon.svg";
import RepairIcon from "/svg/MenuButtons/Repair_icon.svg";
import ReportIcon from "/svg/MenuButtons/report_icon.svg";

import LogoIconTop from "/svg/Header/Logo_IconTop.svg";
import MenuIcon from "/svg/Header/Menu_Icon.svg";
import ScanQRIcon from "/svg/Header/ScanQR_icon.svg";

import DollarIcon from "/svg/CardIcons/Dollar_Icon.svg";
import DangerIcon from "/svg/CardIcons/Danger_Icon.svg";
import ReadyIcon from "/svg/CardIcons/Ready_Icon.svg";
import ToolBoxIcon from "/svg/CardIcons/ToolBox_Icon.svg";
import LateralMenu from "../components/LateralMenu.jsx";
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
        // This more specific font property overrides the global property
        font: {
          size: 16,
          family: '"Arial", "Helvetica", "sans-serif"',
        },
        fontColor: "black",
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
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            // fontSize: 24,
            fontColor: "green",
          },
        },
      ],
    },
  },
};

function HomePage() {
  const [windowWidth, setWindowWidth] = useState();
  const [activeMenu, setActiveMenu] = useState(false);

  const handleStyleMenuItem = () => {
    const menuIcons = document.getElementsByClassName("LateralMenuIcon");
    menuIcons[0].disabled = true;
    console.log(menuIcons[0].disabled);
    for (let i = 0; i < menuIcons.length; i++) {
      menuIcons[i].style.opacity = 0;
      setTimeout(() => {
        menuIcons[i].style.opacity = 1;
        if (menuIcons[i].classList.contains("ShownMenuIcon")) {
          menuIcons[i].classList.remove("ShownMenuIcon");
        } else {
          menuIcons[i].classList.add("ShownMenuIcon");
        }
      }, 800);
    }
    setTimeout(() => {
      menuIcons[0].disabled = false;
    }, 1000);
  };

  const showMenu = (e) => {
    setActiveMenu(!activeMenu);
    handleStyleMenuItem();
  };

  window.onresize = (e) => {
    setWindowWidth(window.screen.width);
    console.log(windowWidth);
  };

  useEffect(() => {
    setWindowWidth(window.screen.width);
  }, []);

  return (
    <>
      <div className="Page">
        <LateralMenu showMenu={activeMenu} showMenuEvent={showMenu} />
        <div className="Home">
          <Head>
            {windowWidth < 680 ? (
              <img onClick={showMenu} src={MenuIcon} width="36px" alt="" />
            ) : (
              <img />
            )}
            <img src={LogoIconTop} width="140px" alt="" />
            {windowWidth < 680 ? (
              <img src={ScanQRIcon} width="36px" alt="" />
            ) : (
              <img />
            )}
          </Head>
          <CardContainer>
            <Card
              color="#FFD699"
              icon={DangerIcon}
              title="Reparaciones pendientes"
              info="25"
            />
            <Card
              color="#AEDFF7"
              icon={ReadyIcon}
              title="Equipos listos para entregar"
              info="15"
            />
            <Card
              color="#B4B4D8"
              icon={ToolBoxIcon}
              title="Equipos reparados hoy"
              info="17"
            />
            <Card
              color="#8FBC8B"
              icon={DollarIcon}
              title="Total de ingresos hoy"
              info="$150k"
            />
            {windowWidth > 680 ? (
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
            ) : (
              <></>
            )}
          </CardContainer>

          <GroupButtons>
            <MenuButton icon={ReportIcon} />
            <MenuButton icon={EmployeeIcon} />
            <MenuButton icon={AddIcon} addButton={true} />
            <MenuButton icon={RepairIcon} />
            <MenuButton icon={BarsDiagramIcon} />
          </GroupButtons>
        </div>
      </div>
    </>
  );
}

export default HomePage;
