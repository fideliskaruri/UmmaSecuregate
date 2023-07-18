import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

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
  { category: "Lost or Stolen Items", count: 0 },
];

//organizes incidents data by date
export const getIncidentData = async () => {
  const incidentDocs = await getDocs(collection(db, "incidents"));
  const incidentData = {};
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  incidentDocs.forEach((incident) => {
    const incidentDate = new Date(incident.data().timeReported);
    if (incidentDate >= oneWeekAgo) {
      const date = incidentDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (incidentData.hasOwnProperty(date)) {
        incidentData[date].count++;
        incidentData[date].incidents.push(incident.data());
      } else {
        incidentData[date] = {
          count: 1,
          incidents: [incident.data()],
        };
      }
    }
  });

  return incidentData;
};

//organizes incidents data by date
export const getIncidentDataOverTime = async () => {
  const incidentDocs = await getDocs(collection(db, "incidents"));
  const incidentData = {};
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  incidentDocs.forEach((incident) => {
    const incidentDate = new Date(incident.data().timeReported);
    if (incidentDate >= oneWeekAgo) {
      const date = incidentDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (incidentData.hasOwnProperty(date)) {
        incidentData[date].count++;
        incidentData[date].incidents.push(incident.data());
      } else {
        incidentData[date] = {
          count: 1,
          incidents: [incident.data()],
        };
      }
    }
  });

  return incidentData;
};

//users are organized by their role
export const getUserData = async () => {
  const userDocs = await getDocs(collection(db, "users"));
  const userData = {
    Admin: 0,
    Supervisor: 0,
    Guard: 0,
  };

  userDocs.forEach((user) => {
    const role = user.data().role;
    if (userData.hasOwnProperty(role)) {
      userData[role]++;
    }
  });

  return userData;
};

//users are organized by their role
export const getGuardData = async () => {
  const guardDocs = await getDocs(collection(db, "users"));
  const guardData = {
    Total: 0,
    Assigned: 0,
    Unassigned: 0,
  };

  guardDocs.forEach((user) => {
    const Assigned = user.data().assigned;
    guardData["Total"]++;
    if (Assigned) {
      guardData["Assigned"]++;
    } else {
      guardData["Unassigned"]++;
    }
  });

  return guardData;
};

//incidents are analyzed to check for the total unsolved and solved incidents based on its category
export const getIncidentStats = async () => {
  const incidentDocs = await getDocs(collection(db, "incidents"));
  const incidentStats = {
    solved: {},
    unsolved: {},
  };

  incidentDocs.forEach((incident) => {
    const incidentType = incident.data().incidentType;
    const completed = incident.data().completed;
    if (completed) {
      if (incidentStats.solved.hasOwnProperty(incidentType)) {
        incidentStats.solved[incidentType]++;
      } else {
        incidentStats.solved[incidentType] = 1;
      }
    } else {
      if (incidentStats.unsolved.hasOwnProperty(incidentType)) {
        incidentStats.unsolved[incidentType]++;
      } else {
        incidentStats.unsolved[incidentType] = 1;
      }
    }
  });

  return incidentStats;
};

//incidents are analyzed to check for the total unsolved and solved incidents based on its category
export const getAllIncidentInfo = async () => {
  const incidentDocs = await getDocs(collection(db, "incidents"));
  const historyDocs = await getDocs(collection(db, "history"));

  const allIncidentInfo = {
    solved: 0,
    unsolved: 0,
    archived: 0,
    Total: 0,
  };

  incidentDocs.forEach((incident) => {
    allIncidentInfo["Total"]++;
    if (incident.data().completed) {
      allIncidentInfo["solved"]++;
    } else {
      allIncidentInfo["unsolved"]++;
    }
  });

  historyDocs.forEach((incident) => {
    allIncidentInfo["solved"]++;
    allIncidentInfo["archived"]++;
    allIncidentInfo["Total"]++;
  });

  return allIncidentInfo;
};

//fetch incident data to count the unsolved and solved incidents
export const fetchData = async () => {
  const incidentDocs = await getDocs(doc(db, "incidents"));
  const historyDocs = await getDocs(doc(db, "history"));

  incidentDocs.forEach((incident) => {
    const incidentType = incident.data().incidentType;
    const index = incidentCategories.findIndex(
      (item) => item.category === incidentType
    );
    if (index !== -1) {
      incidentCategories[index].count++;
    }
  });

  historyDocs.forEach((history) => {
    const incidentType = history.data().incidentType;
    const index = incidentCategories.findIndex(
      (item) => item.category === incidentType
    );
    if (index !== -1) {
      incidentCategories[index].count++;
    }
  });

  return incidentCategories;
};
