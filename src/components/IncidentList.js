import { useEffect, useState } from "react";
import IncidentTask from "./IncidentTask";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const IncidentList = () => {
  const [incidentList, setIncidentList] = useState([]);
  const incidentCollectionRef = collection(db, "incidents");

  const refreshData = async () => {
    onSnapshot(incidentCollectionRef, (snapshot) => {
      let newData = [];
      newData = snapshot.docs.map((docu) => docu.data());
      setIncidentList(newData);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  //This updated the completed field in the incident object to true depending on its id
  const setIncidentSolved = async (id) => {
    const updatedData = doc(db, "incidents", id);

    //set the completed field to true
    await updateDoc(updatedData, {
      completed: true,
    });
    refreshData();
  };

  //Deletes a specific incident based on its id
  const toggleDelete = async (id) => {
    await deleteDoc(doc(db, "incidents", id));
    //filters out the deleted document
    refreshData();
  };

  return (
    <div className="listarea">
      {incidentList.map((incident) =>
        incident.completed ? null : (
          <IncidentTask
            key={incident.id}
            incident={incident}
            text="Pending"
            color="light"
            onToggle={() => setIncidentSolved(incident.id)}
            onDelete={() => toggleDelete(incident.id)}
            printUser={() => console.log(incident.user)}
          />
        )
      )}
    </div>
  );
};

export default IncidentList;
