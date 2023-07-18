import React from "react";
import {
  Chart,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data, width }) => {
  Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip
  );
  return (
    <div className="barchart">
      <Bar data={data} height={"350px"} width={width} />
    </div>
  );
};

export default BarChart;
