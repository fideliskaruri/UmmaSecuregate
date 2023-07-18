import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import CurrentUserCard from "./CurrentUserCard";
import LoadingScreen from "./LoadingScreen";
import BarChart from "./Charts/BarChart";
import DoughnutChart from "./Charts/DoughnutChart";
import { fetchUser } from "./fetchUser";
import InfoCard from "./InfoCard";
import {
  getAllIncidentInfo,
  getGuardData,
  getIncidentData,
  getUserData,
} from "../data/Data";
import PieChart from "./Charts/PieChart";
import LineChart from "./Charts/LIneChart";

const Dashboard = () => {
  const { user } = UserAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [solved, setSolved] = useState([]);
  const [unsolved, setUnsolved] = useState([]);
  const [allUserIncidents, setAllUserIncidents] = useState([]);
  const [incidentData, setIncidentData] = useState({});
  const [allIncidentInfo, setAllIncidentInfo] = useState({});
  const [guardData, setGuardData] = useState({});
  const [guardRoles, setGuardRoles] = useState({});
  const allIncidents = allUserIncidents.length;

  useEffect(() => {
    fetchUserData();
    fetchGuardData();
    fetchIncidentData();
  }, []);

  const fetchUserData = async () => {
    const userData = await fetchUser(user.uid);
    setCurrentUser(userData.currentUser);
    setSolved(userData.solved);
    setUnsolved(userData.unsolved);
    setAllUserIncidents(userData.allUserIncidents);
  };

  const fetchIncidentData = async () => {
    const data = await getIncidentData();
    const incidentInfoData = await getAllIncidentInfo();

    setAllIncidentInfo(incidentInfoData)
    setIncidentData(data);
    console.log("incident data" + JSON.stringify(incidentData));
  };

  const fetchGuardData = async () => {
    const data = await getGuardData();
    const guardRolesData = await getUserData();
    setGuardRoles(guardRolesData);
    setGuardData(data);
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
                  <PieChart
                    data={{
                      labels: ["Solved", "Unsolved"],
                      datasets: [
                        {
                          data: [
                            Math.floor((solved.length / allIncidents) * 100),
                            Math.floor((unsolved.length / allIncidents) * 100),
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
                  width={"500px"}
                    data={{
                      labels: ["Solved", "Unsolved", "Total"],
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
                  <BarChart
                    width={"600px"}
                    data={{
                      labels: ["Solved", "Unsolved", "Archived", "Total"],
                      datasets: [
                        {
                          data: [
                            allIncidentInfo.unsolved,
                            allIncidentInfo.solved,
                            allIncidentInfo.archived,
                            allIncidentInfo.Total,
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
              minWidth={"max-content"}
              children={
                <>
                  <BarChart
                    data={{
                      labels: ["Assigned", "Unassigned", "Total"],
                      datasets: [
                        {
                          data: [
                            guardData.Assigned,
                            guardData.Unassigned,
                            guardData.Total,
                          ],
                          backgroundColor: [
                            "rgb(198, 219, 226)",
                            "#BAA1E4",
                            "rgb(221, 160, 221)",
                          ],
                        },
                      ],
                    }}
                  />{" "}
                  <BarChart
                    data={{
                      labels: ["Admins", "Guards", "Supervisors"],
                      datasets: [
                        {
                          data: [
                            guardRoles.Admin,
                            guardRoles.Guard,
                            guardRoles.Supervisor,
                          ],
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
              title={"Within the last week"}
              children={
                <LineChart
                  width={"400px"}
                  data={{
                    labels: Object.keys(incidentData),
                    datasets: [
                      {
                        label: "Incidents",
                        data: Object.values(incidentData).map(
                          (day) => day.count
                        ),
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
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
