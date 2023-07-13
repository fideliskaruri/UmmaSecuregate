import IncidentTask from "./IncidentTask";
import AddIncident from "./AddIncident";
import Button from "./Button";
import { useState, useEffect } from "react";
import IncidentList from "./IncidentList";
import InProgress from "./InProgress";

const SecurityIncidents = () => {
  const [showForm, setShowForm] = useState(false);

  //shows the input form if the showForm boolean is true
  const showIncidentTrackingForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className="">
        <Button
          text={showForm ? "Close" : "New"}
          color={"outline-light"}
          onClick={showIncidentTrackingForm}
        />
      </div>

      <div className="">{!showForm && <IncidentList />}</div>

      {showForm && <AddIncident />}
    </>
  );
};

export default SecurityIncidents;
