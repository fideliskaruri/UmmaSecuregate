import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getCollectionData = async (collectionName) => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(`Error fetching data from ${collectionName}:`, error);
    throw error;
  }
};

const INCIDENT_COLLECTION = "incidents";
const HISTORY_COLLECTION = "history";

export const getIncidentData = async () => {
  const incidentData = await getCollectionData(INCIDENT_COLLECTION);
  const historyData = await getCollectionData(HISTORY_COLLECTION);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const organizedData = {};
  incidentData.forEach((incident) => {
    const incidentDate = new Date(incident.timeReported);
    if (incidentDate >= oneWeekAgo) {
      const date = incidentDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (organizedData.hasOwnProperty(date)) {
        organizedData[date].count++;
        organizedData[date].incidents.push(incident);
      } else {
        organizedData[date] = {
          count: 1,
          incidents: [incident],
        };
      }
    }
  });
  historyData.forEach((incident) => {
    const incidentDate = new Date(incident.timeReported);
    if (incidentDate >= oneWeekAgo) {
      const date = incidentDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (organizedData.hasOwnProperty(date)) {
        organizedData[date].count++;
        organizedData[date].incidents.push(incident);
      } else {
        organizedData[date] = {
          count: 1,
          incidents: [incident],
        };
      }
    }
  });

  return organizedData;
};

export const getUserData = async () => {
  const userData = await getCollectionData("users");
  const organizedData = {
    Admin: 0,
    Supervisor: 0,
    Guard: 0,
  };

  userData.forEach((user) => {
    const role = user.role;
    if (organizedData.hasOwnProperty(role)) {
      organizedData[role]++;
    }
  });

  return organizedData;
};

export const getGuardData = async () => {
  const guardData = await getCollectionData("users");

  const organizedData = {
    Total: 0,
    Assigned: 0,
    Unassigned: 0,
  };

  guardData.forEach((user) => {
    if (user.role === "Guard") {
      const isAssigned = user.assigned;
      organizedData["Total"]++;
      if (isAssigned) {
        organizedData["Assigned"]++;
      } else {
        organizedData["Unassigned"]++;
      }
    }
  });

  return organizedData;
};

export const getIncidentStats = async () => {
  const incidentData = await getCollectionData(INCIDENT_COLLECTION);
  const historyData = await getCollectionData(HISTORY_COLLECTION);
  const incidentStats = {
    solved: [],
    unsolved: [],
  };

  incidentData.forEach((incident) => {
    const incidentType = incident.incidentType;
    const completed = incident.completed;

    if (completed) {
      const timeTaken = calculateTimeTaken(
        incident.timeReported,
        incident.timeCompleted
      );

      let solvedIndex = incidentStats.solved.findIndex(
        (item) => item.incidentType === incidentType
      );
      if (solvedIndex !== -1) {
        incidentStats.solved[solvedIndex].count++;
        incidentStats.solved[solvedIndex].totalTime += timeTaken;
        incidentStats.solved[solvedIndex].averageTime =
          incidentStats.solved[solvedIndex].totalTime /
          incidentStats.solved[solvedIndex].count;
      } else {
        incidentStats.solved.push({
          incidentType,
          count: 1,
          totalTime: timeTaken,
          averageTime: timeTaken,
        });
      }
    } else {
      let unsolvedIndex = incidentStats.unsolved.findIndex(
        (item) => item.incidentType === incidentType
      );
      if (unsolvedIndex !== -1) {
        incidentStats.unsolved[unsolvedIndex].count++;
      } else {
        incidentStats.unsolved.push({ incidentType, count: 1 });
      }
    }
  });

  historyData.forEach((incident) => {
    const incidentType = incident.incidentType;
    const completed = incident.completed;

    if (completed) {
      const timeTaken = calculateTimeTaken(
        incident.timeReported,
        incident.timeCompleted
      );

      let solvedIndex = incidentStats.solved.findIndex(
        (item) => item.incidentType === incidentType
      );
      if (solvedIndex !== -1) {
        incidentStats.solved[solvedIndex].count++;
        incidentStats.solved[solvedIndex].totalTime += timeTaken;
        incidentStats.solved[solvedIndex].averageTime =
          incidentStats.solved[solvedIndex].totalTime /
          incidentStats.solved[solvedIndex].count;
      } else {
        incidentStats.solved.push({
          incidentType,
          count: 1,
          totalTime: timeTaken,
          averageTime: timeTaken,
        });
      }
    } else {
      let unsolvedIndex = incidentStats.unsolved.findIndex(
        (item) => item.incidentType === incidentType
      );
      if (unsolvedIndex !== -1) {
        incidentStats.unsolved[unsolvedIndex].count++;
      } else {
        incidentStats.unsolved.push({ incidentType, count: 1 });
      }
    }
  });

  return incidentStats;
};

const calculateTimeTaken = (timeReported, timeCompleted) => {
  const reportedTimestamp = new Date(timeReported).getTime();
  const completedTimestamp = new Date(timeCompleted).getTime();
  const timeDiff = completedTimestamp - reportedTimestamp;

  // Convert time difference to days
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

export const getAllIncidentInfo = async () => {
  const incidentData = await getCollectionData(INCIDENT_COLLECTION);
  const historyData = await getCollectionData(HISTORY_COLLECTION);
  const allIncidentInfo = {
    solved: 0,
    unsolved: 0,
    archived: 0,
    Total: 0,
  };

  incidentData.forEach((incident) => {
    allIncidentInfo["Total"]++;
    if (incident.completed) {
      allIncidentInfo["solved"]++;
    } else {
      allIncidentInfo["unsolved"]++;
    }
  });

  historyData.forEach((incident) => {
    allIncidentInfo["solved"]++;
    allIncidentInfo["archived"]++;
    allIncidentInfo["Total"]++;
  });

  return allIncidentInfo;
};

export const fetchData = async () => {
  const incidentData = await getCollectionData(INCIDENT_COLLECTION);
  const historyData = await getCollectionData(HISTORY_COLLECTION);
  const incidentCategories = [
    { category: "Theft or Burglary", count: 0 },
    { category: "Vandalism", count: 0 },
    { category: "Assault or Physical Altercation", count: 0 },
    { category: "Harassment or Threats", count: 0 },
    { category: "Property Damage", count: 0 },
    { category: "Fire or Smoke Incident", count: 0 },
    { category: "Medical Emergency", count: 0 },
    { category: "Suspicious Activity or Persons", count: 0 },
    { category: "Cybersecurity Breach", count: 0 },
  ];

  incidentData.forEach((incident) => {
    const incidentType = incident.incidentType;
    const index = incidentCategories.findIndex(
      (item) => item.category === incidentType
    );
    if (index !== -1) {
      incidentCategories[index].count++;
    }
  });

  historyData.forEach((incident) => {
    const incidentType = incident.incidentType;
    const index = incidentCategories.findIndex(
      (item) => item.category === incidentType
    );
    if (index !== -1) {
      incidentCategories[index].count++;
    }
  });

  return incidentCategories;
};
