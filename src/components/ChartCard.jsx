import { useEffect } from "react";
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

function ChartCard(props) {
  return (
    <>
      <div className="ChartContainer" style={{ backgroundColor: props.color }}>
        <h4>{props.title}</h4>
        {(() => {
          if (props.type == "bar")
            return (
              <Bar
                data={props.data}
                options={props.options}
                height={140}
                width={400}
              ></Bar>
            );
          if (props.type == "pie")
            return (
              <Pie
                options={props.options}
                data={props.data}
                // height={140}
                width={400}
              ></Pie>
            );
        })()}
        <p>{props.info}</p>
      </div>
    </>
  );
}

export default ChartCard;
