import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import IncidentTask from "./IncidentTask";
import { db } from "../firebaseConfig";
import HistoryTask from "./HistoryTask";

const History = () => {
  const [history, setHistory] = useState([]);

  //history firestore reference
  const historyRef = collection(db, "history");

  //receives data whenever the firestore database changes
  const refreshData = () => {
    onSnapshot(historyRef, (snapshot) => {
      const newData = snapshot.docs.map((docu) => docu.data());
      console.log(newData);
      setHistory(newData);
    });
  };

  //refreshes the data each time the db changes
  useEffect(() => {
    refreshData();
  }, []);

  //Deletes a specific incident based on its id
  const toggleDeleteHistory = async (incident) => {
    const incidentId = incident.id;
    const userId = incident.user;

    const userRef = doc(db, "users", userId);

    //removes the deleted incident
    await updateDoc(userRef, {
      ReportedIncidents: arrayRemove({ id: incident.id, completed: true }),
    });

    await deleteDoc(doc(db, "history", incidentId));
    //filters out the deleted document
    refreshData();
  };

  return (
    <div className="historyPage ">
      {history.map((i) => (
        <HistoryTask
          key={i.id}
          text={"History"}
          incident={i}
          onDelete={() => toggleDeleteHistory(i)}
          color={"warning"}
        />
      ))}
    </div>
  );
};

export default History;
