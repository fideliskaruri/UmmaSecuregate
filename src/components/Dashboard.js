import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import CurrentUserCard from "./CurrentUserCard";
import LoadingScreen from "./LoadingScreen";
import BarChart from "./Charts/BarChart";
import DoughnutChart from "./Charts/DoughnutChart";
import { fetchUser } from "./fetchUser";
import InfoCard from "./InfoCard";
import PieChart from "./Charts/PieChart";

const Dashboard = () => {
  const { user } = UserAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [solved, setSolved] = useState([]);
  const [unsolved, setUnsolved] = useState([]);
  const [allUserIncidents, setAllUserIncidents] = useState([]);
  const allIncidents = allUserIncidents.length;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userData = await fetchUser(user.uid);
    setCurrentUser(userData.currentUser);
    setSolved(userData.solved);
    setUnsolved(userData.unsolved);
    setAllUserIncidents(userData.allUserIncidents);
  };

  return (
    <div className="dashboard">
      {currentUser ? (
        <>
          <div className="dashboardContainer">
            <InfoCard
              title={"Your Reported Incidents"}
              minWidth={"max-content"}
              children={
                <>
                  <CurrentUserCard currentUser={currentUser} />
                  <DoughnutChart
                    data={{
                      labels: ["Solved", "Unsolved"],
                      datasets: [
                        {
                          data: [
                            (solved.length / allIncidents) * 100,
                            (unsolved.length / allIncidents) * 100,
                          ],
                          backgroundColor: ["rgb(198, 219, 226)", "#BAA1E4"],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              const label = context.label || "";
                              const value = context.parsed || 0;
                              return `${label}: ${value.toFixed(2)}%`;
                            },
                          },
                        },
                      },
                    }}
                  />
                  <BarChart
                    data={{
                      labels: ["Solved", "Unsolved", "All Incidents"],
                      datasets: [
                        {
                          data: [solved.length, unsolved.length, allIncidents],
                          backgroundColor: [
                            "rgb(198, 219, 226)",
                            "#BAA1E4",
                            "rgb(221, 160, 221)",
                          ],
                        },
                      ],
                    }}
                  />
                </>
              }
            />
            <InfoCard
              title={"All Incidents Reported"}
              children={
                <>
                  <DoughnutChart
                    data={{
                      labels: [
                        "Solved",
                        "Unsolved",
                        "All Incidents",
                        "Archived",
                      ],
                      datasets: [
                        {
                          data: [
                            solved.length,
                            unsolved.length,
                            allIncidents,
                            allIncidents,
                          ],
                          backgroundColor: [
                            "rgb(198, 219, 226)",
                            "#BAA1E4",
                            "rgb(221, 160, 221)",
                            "#39527E",
                          ],
                        },
                      ],
                    }}
                  />
                  <DoughnutChart
                    data={{
                      labels: ["Solved", "Unsolved"],
                      datasets: [
                        {
                          data: [
                            (solved.length / allIncidents) * 100,
                            (unsolved.length / allIncidents) * 100,
                          ],
                          backgroundColor: ["rgb(198, 219, 226)", "#BAA1E4"],
                        },
                      ],
                    }}
                  />
                </>
              }
            />
          </div>
          <div className="miniContainer">
            <InfoCard
              title={"Guards"}
              minWidth={"250px"}
              children={
                <>
                  <BarChart
                    data={{
                      labels: ["Solved", "Unsolved", "All Incidents"],
                      datasets: [
                        {
                          data: [solved.length, unsolved.length, allIncidents],
                          backgroundColor: [
                            "rgb(198, 219, 226)",
                            "#BAA1E4",
                            "rgb(221, 160, 221)",
                          ],
                        },
                      ],
                    }}
                  />
                  <BarChart
                    data={{
                      labels: ["Solved", "Unsolved", "All Incidents"],
                      datasets: [
                        {
                          data: [solved.length, unsolved.length, allIncidents],
                          backgroundColor: [
                            "rgb(123, 193, 126)",
                            "rgb(255, 105, 50) ",
                            "rgb(200, 255, 27) ",
                          ],
                        },
                      ],
                    }}
                  />
                </>
              }
            />
          </div>
        </>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default Dashboard;
