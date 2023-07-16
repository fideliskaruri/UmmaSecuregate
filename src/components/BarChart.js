import React from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data, title }) => {
  Chart.register(
    DoughnutController,
    BarController,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    Tooltip
  );
  return (
    <div className="barchart">  
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
