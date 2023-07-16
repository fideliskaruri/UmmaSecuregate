import React from "react";
import { Chart, DoughnutController, ArcElement, Tooltip } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
// import "./styles/chartStyles.css";

const BarChart = ({ data, title }) => {
  Chart.register(DoughnutController, ArcElement, Tooltip);
  return (
    <>
      <div className="doughnutchart">
        <Pie data={data} />
      </div>
    </>
  );
};

export default BarChart;
