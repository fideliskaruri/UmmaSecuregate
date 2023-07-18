import React from "react";
import { Chart, Tooltip, PointElement, LineController, LineElement } from "chart.js";
import { Bar, Line } from "react-chartjs-2";

const LineChart = ({ data,width }) => {
  Chart.register(PointElement, LineElement, Tooltip);
  return (
    <div className="linechart">
      <Line data={data} height={"240px"} width={width} />
    </div>
  );
};

export default LineChart;
