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
import { isMobile } from "mobile-device-detect";

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

  const colors = [
    "rgba(255, 99, 132)",
    "rgba(54, 162, 235)",
    "rgba(255, 206, 86)",
    "rgba(75, 192, 192)",
    "rgba(153, 102, 255)",
    "rgba(255, 159, 64)",
  ];

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

    setAllIncidentInfo(incidentInfoData);
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
    <div className="generateReportsPage">
      {currentUser ? (
        <>
          <div className="miniContainer">
            <InfoCard
              title={"Your Reported Incidents"}
              minWidth={"max-content"}
              children={
                <>
                  <CurrentUserCard currentUser={currentUser} />
                  <DoughnutChart
                    width={isMobile ? "100px" : "150px"}
                    data={{
                      labels: ["Solved", "Unsolved"],
                      datasets: [
                        {
                          data: [
                            Math.floor((solved.length / allIncidents) * 100),
                            Math.floor((unsolved.length / allIncidents) * 100),
                          ],
                          backgroundColor: colors,
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
                    width={isMobile ? "290px" : "500px"}
                    data={{
                      labels: ["Solved", "Unsolved", "Total"],
                      datasets: [
                        {
                          data: [solved.length, unsolved.length, allIncidents],
                          backgroundColor: colors,
                          borderColor: "#fff",
                          borderWidth: 1,
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
                    width={isMobile ? "350px" : "500px"}
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
                          backgroundColor: colors,
                          borderColor: "#fff",
                          borderWidth: 1,
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
              children={
                <>
                  <BarChart
                    width={isMobile ? "200px" : "350px"}
                    data={{
                      labels: ["Assigned", "Unassigned", "Total"],
                      datasets: [
                        {
                          data: [
                            guardData.Assigned,
                            guardData.Unassigned,
                            guardData.Total,
                          ],
                          backgroundColor: colors,
                          borderColor: "#fff",
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                  <BarChart
                    width={isMobile ? "200px" : "350px"}
                    data={{
                      labels: ["Admins", "Guards", "Supervisors"],
                      datasets: [
                        {
                          data: [
                            guardRoles.Admin,
                            guardRoles.Guard,
                            guardRoles.Supervisor,
                          ],
                          backgroundColor: colors,
                          borderColor: "#fff",
                          borderWidth: 1,
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
                  width={isMobile ? "300px" : "500px"}
                  data={{
                    labels: Object.keys(incidentData),
                    datasets: [
                      {
                        label: "Incidents",
                        data: Object.values(incidentData).map(
                          (day) => day.count
                        ),
                        backgroundColor: colors,
                        borderColor: "#fff",
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
