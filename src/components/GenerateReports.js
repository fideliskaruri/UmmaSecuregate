import React from "react";
import InfoCard from "./InfoCard";
import BarChart from "./Charts/BarChart";
const GenerateReports = () => {
  return (
    <div className="generateReportsPage">
      <InfoCard
        children={
          <BarChart
            width={"1500px"}
            data={{
              labels: ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A"],
              datasets: [
                {
                  data: [40, 50, 23, 53, 89, 19, 95, 223, 53, 328],
                  backgroundColor: ["rgb(198, 219, 226)", "#BAA1E4"],
                },
              ],
            }}
          />
        }
      />
      <div className="miniContainer">
        <InfoCard />
        <InfoCard />
      </div>
      <div className="miniContainer2">
        <InfoCard />
        <InfoCard />
      </div>
    </div>
  );
};

export default GenerateReports;
