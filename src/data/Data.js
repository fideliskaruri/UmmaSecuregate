import { doc, getDocs } from "firebase/firestore";
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

export const fetchData = async () => {
  const userDocs = await getDocs(doc(db, "users"));
  const incidentDocs = await getDocs(doc(db, "incidents"));
  const accesspointDocs = await getDocs(doc(db, "accessPoints"));
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

  return {
    incidentCategories
  }
};
