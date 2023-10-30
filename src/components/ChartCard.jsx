import {
  Chart as ChartJS,
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
      <div className={`ChartContainer ${color} shadow-card dark:shadow-none`}>
        <h4>{title}</h4>
        {(() => {
          if (type == "pie")
            return <Pie options={options} data={data} width={400}></Pie>;
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
