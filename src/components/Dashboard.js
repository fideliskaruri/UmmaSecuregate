import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import CurrentUserCard from "./CurrentUserCard";
import LoadingScreen from "./LoadingScreen";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import { fetchUser } from "./fetchUser";
import InfoCard from "./InfoCard";

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
      <InfoCard
        title={"Your Reported Incidents"}
        minWidth={"350px"}
        children={
          <>
            <DoughnutChart
              data={{
                labels: ["Solved", "Unsolved"],
                datasets: [
                  {
                    data: [
                      (solved.length / allIncidents) * 100,
                      (unsolved.length / allIncidents) * 100,
                    ],
                    backgroundColor: [
                      "rgb(198, 219, 226)",
                      "rgb(255, 204, 203)",
                    ],
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
                      "rgb(255, 204, 203)",
                      "rgb(221, 160, 221)",
                    ],
                  },
                ],
              }}
            />
          </>
        }
      />
      {currentUser && (
        <div className="dashboardContainer">
          {currentUser ? (
            <CurrentUserCard currentUser={currentUser} />
          ) : (
            <LoadingScreen />
          )}
          <InfoCard
            title={"Incidents You've not Reported"}
            children={
              <BarChart
                data={{
                  labels: ["Solved", "Unsolved", "All Incidents"],
                  datasets: [
                    {
                      data: [solved.length, unsolved.length, allIncidents],
                      backgroundColor: [
                        "rgb(198, 219, 226)",
                        "rgb(255, 204, 203)",
                        "rgb(221, 160, 221)",
                      ],
                    },
                  ],
                }}
              />
            }
          />
          <InfoCard
            title={"Incidents Reported"}
            children={
              <BarChart
                data={{
                  labels: ["Solved", "Unsolved", "All Incidents"],
                  datasets: [
                    {
                      data: [solved.length, unsolved.length, allIncidents],
                      backgroundColor: [
                        "rgb(198, 219, 226)",
                        "rgb(255, 204, 203)",
                        "rgb(221, 160, 221)",
                      ],
                    },
                  ],
                }}
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
