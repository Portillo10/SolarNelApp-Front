import { useEffect } from "react";
import {
  Chart as ChartJS,
  // TooltipLabelStyle,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Bar, Line, Pie } from "react-chartjs-2";
import Chart from "./Chart.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

function ChartCard({ color, title, type, data, options, info }) {
  return (
    <>
      <div className="ChartContainer" style={{ backgroundColor: color }}>
        <h4>{title}</h4>
        {(() => {
          if (type == "pie")
            return (
              <Pie
                options={options}
                data={data}
                // height={140}
                width={420}
              ></Pie>
            );
          else
            return (
              <Chart
                type={type}
                data={data.datasets[0].data}
                colors={data.datasets[0].backgroundColor}
                labels={data.labels}
              ></Chart>
            );
        })()}

        <p>{info}</p>
      </div>
    </>
  );
}

export default ChartCard;
