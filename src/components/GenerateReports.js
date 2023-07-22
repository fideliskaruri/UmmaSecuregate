import React, { useState, useEffect } from "react";
import InfoCard from "./InfoCard";
import BarChart from "./Charts/BarChart";
import { fetchData, getIncidentStats } from "../data/Data"; // import the getIncidentStats function
import LoadingScreen from "./LoadingScreen";
import { isMobile } from "mobile-device-detect";

const GenerateReports = () => {
  const [incidentData, setIncidentData] = useState(null);
  const [solvedIncidentsByType, setSolvedIncidentsByType] = useState(null);
  const [unsolvedIncidentsByType, setUnsolvedIncidentsByType] = useState(null);
  const [averageTimeData, setAverageTimeData] = useState(null);
  const [totalTimeData, setTotalTimeData] = useState(null);

  const colors = [
    "rgba(255, 99, 132)",
    "rgba(54, 162, 235)",
    "rgba(255, 206, 86)",
    "rgba(75, 192, 192)",
    "rgba(153, 102, 255)",
    "rgba(255, 159, 64)",
  ];

  const fetchIncidentTypeData = async () => {
    const data = await fetchData();

    const chartData = {
      labels: isMobile
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        : data.map((item) => item.category),
      datasets: [
        {
          label: "Incidents",
          data: data.map((item) => item.count),
          backgroundColor: colors,
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    };
    setIncidentData(chartData);
  };

  const fetchUnsolvedAndSolvedBasedOnType = async () => {
    const data = await getIncidentStats();

    const unsolvedChartData = {
      labels: data.unsolved.map((i) => i.incidentType),
      datasets: [
        {
          label: "Incidents",
          data: data.unsolved.map((i) => i.count),
          backgroundColor: colors,
          borderColor: "#fff",
          borderWidth: 1,
          title: "Unsolved incidents by category",
        },
      ],
    };
    setUnsolvedIncidentsByType(unsolvedChartData);

    const solvedChartData = {
      labels: data.solved.map((i) => i.incidentType),
      datasets: [
        {
          label: "Incidents",
          data: data.solved.map((i) => i.count),
          backgroundColor: colors,
          borderColor: "#fff",
          borderWidth: 1,
          title: "Solved incidents by category",
        },
      ],
    };
    setSolvedIncidentsByType(solvedChartData);
  };

  // Fetch average time data
  const fetchAverageTimeData = async () => {
    // Fetch and process the data
    const data = await getIncidentStats(); // Replace with the function to fetch average time data

    // Create the chart data object
    const chartData = {
      labels: data.solved.map((item) => item.incidentType),
      datasets: [
        {
          label: "Average Time",
          data: data.solved.map((item) => item.averageTime),
          backgroundColor: colors,
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    };

    // Set the average time data
    setAverageTimeData(chartData);
  };

  // Fetch total time data
  const fetchTotalTimeData = async () => {
    // Fetch and process the data
    const data = await getIncidentStats(); // Replace with the function to fetch total time data

    // Create the chart data object
    const chartData = {
      labels: data.solved.map((item) => item.incidentType),
      datasets: [
        {
          label: "Total Time",
          data: data.solved.map((item) => item.totalTime),
          backgroundColor: colors,
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    };

    console.log(chartData);
    // Set the total time data
    setTotalTimeData(chartData);
  };

  useEffect(() => {
    fetchIncidentTypeData();
    fetchUnsolvedAndSolvedBasedOnType();
    fetchAverageTimeData();
    fetchTotalTimeData();
  }, [isMobile]);

  return (
    <div className="generateReportsPage">
      {incidentData ? (
        <>
          <InfoCard
            title={"Incidents reported by category"}
            children={
              <BarChart
                width={isMobile ? "400px" : "1500px"}
                data={incidentData}
              />
            }
          />
        </>
      ) : (
        <LoadingScreen />
      )}

      {unsolvedIncidentsByType && (
        <div className="miniContainer">
          <InfoCard
            title={"Incidents unsolved by category"}
            children={
              <>
                <BarChart
                  width={isMobile ? "400px" : "700px"}
                  data={unsolvedIncidentsByType}
                />
              </>
            }
          />
          <InfoCard
            title={"Incidents solved by category"}
            children={
              <>
                <BarChart
                  width={isMobile ? "400px" : "700px"}
                  data={solvedIncidentsByType}
                />
              </>
            }
          />
        </div>
      )}
      <div className="miniContainer">
        {averageTimeData && (
          <InfoCard
            title={"Average Time Taken to Solve/Resolve a Reported Incident "}
            children={
              <BarChart
                width={isMobile ? "400px" : "700px"}
                data={averageTimeData}
              />
            }
          />
        )}
        {totalTimeData && (
          <InfoCard
            title={"Total Time Spent On Every Incident Category"}
            children={
              <BarChart
                width={isMobile ? "400px" : "700px"}
                data={totalTimeData}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default GenerateReports;
