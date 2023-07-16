import { useEffect, useState } from "react";
import IncidentTask from "./IncidentTask";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  setDoc,
  getDocs,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
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
  const setIncidentSolved = async (incident) => {
    const incidentId = incident.id;
    const updatedData = doc(db, "incidents", incidentId);
    const userId = incident.user;

    const userRef = doc(db, "users", userId);

    //sets completed to true and adds a completed time and then merges
    await setDoc(
      updatedData,
      { completed: true, timeCompleted: time },
      { merge: true }
    );

    // Update the ReportedIncidents array in the user document
    const userDocSnap = await getDoc(userRef);
    const reportedIncidents = userDocSnap.data().ReportedIncidents;
    const updatedIncidents = reportedIncidents.map((incident) =>
      incident.id === incidentId ? { ...incident, completed: true } : incident
    );
    await updateDoc(userRef, { ReportedIncidents: updatedIncidents });

    refreshData();
  };

  //Deletes a specific incident based on its id
  const toggleDeleteUnsolvedIncident = async (incident) => {
    const incidentId = incident.id;
    const userId = incident.user;

    const userRef = doc(db, "users", userId);

    //removes the deleted incident
    await updateDoc(userRef, {
      ReportedIncidents: arrayRemove({ id: incident.id, completed: false }),
    });

    await deleteDoc(doc(db, "incidents", incidentId));
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
              text="Mark Solved"
              color="light"
              onToggle={() => setIncidentSolved(incident)}
              onDelete={() => toggleDeleteUnsolvedIncident(incident)}
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
