import React from "react";
import { Chart, DoughnutController, ArcElement, Tooltip } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
// import "./styles/chartStyles.css";

const PieChart = ({ data, title }) => {
  Chart.register( ArcElement,Tooltip);
  return (
    <>
      <div className="doughnutchart">
        <Pie data={data} />
      </div>
    </>
  );
};

export default PieChart;
