import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import IncidentTask from "./IncidentTask";
import { db } from "../firebaseConfig";

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


  //Triggers an alert to tell the user that only the admin can delete the history
  const triggerAlert = () => {
    console.log("only the admin can delete the history")
  }
  return (
    <div className="historyPage ">
     {history.map((i) => <IncidentTask key={i.id} text={"History"} incident={i} onDelete={triggerAlert} color={"warning"} /> )}
    </div>
  );
};

export default History;
