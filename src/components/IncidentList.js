import { useEffect, useState } from "react";
import IncidentTask from "./IncidentTask";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const IncidentList = () => {
  const [incidentList, setIncidentList] = useState([]);
  const incidentCollectionRef = collection(db, "incidents");

  //current time
  const time = Date.now();

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


    //sets completed to true and adds a completed time and then merges
    await setDoc(
      updatedData,
      { completed: true, timeCompleted: time },
      { merge: true }
    );
    refreshData();
  };

  //Deletes a specific incident based on its id
  const toggleDeleteUnsolvedIncident = async (id) => {
    await deleteDoc(doc(db, "incidents", id));
    //filters out the deleted document
    refreshData();
  };

  //Deletes a specific incident based on its id and then adds it to the history
  const toggleDelete = async (incident) => {
    const customId = incident.id;
    try {
      const incidentRef = doc(db, "history", customId);

      await setDoc(incidentRef, incident);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    await deleteDoc(doc(db, "incidents", customId));
  };
  return (
    <div className="mainContainer">
      <div className="listarea">
        {incidentList.map((incident) =>
          incident.completed ? null : (
            <IncidentTask
              key={incident.id}
              incident={incident}
              text="Pending"
              color="light"
              onToggle={() => setIncidentSolved(incident.id)}
              onDelete={() => toggleDeleteUnsolvedIncident(incident.id)}
              printUser={() => console.log(incident.user)}
            />
          )
        )}
      </div>
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
    </div>
  );
};

export default IncidentList;
