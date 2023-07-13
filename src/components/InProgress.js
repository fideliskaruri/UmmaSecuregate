import IncidentTask from "./IncidentTask";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserAuth } from "../context/AuthContext";

const InProgress = () => {
  const [incidentList, setIncidentList] = useState([]);
  const collectionRef = collection(db, "incidents");
  const { currentTime } = UserAuth();

  const refreshData = async () => {
    onSnapshot(collectionRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => doc.data());
      setIncidentList(newData);
      console.log(newData);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  //Deletes a specific incident based on its id
  const toggleDelete = async (incident) => {
    const customId = incident.id;
    try {
      const incidentRef = doc(db, "history", customId);

      await setDoc(incidentRef, { incident, timeComplete: currentTime });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    await deleteDoc(doc(db, "incidents", customId));
  };
  return (
    <div className="listarea">
      {incidentList.map(
        (incident) =>
          incident.completed && (
            <IncidentTask
              text={"Solved"}
              color={"success"}
              key={incident.id}
              incident={incident}
              onDelete={() => toggleDelete(incident)}
            />
          )
      )}
    </div>
  );
};

export default InProgress;
