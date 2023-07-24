import { useState } from "react";
import DangerAlert from "./DangerAlert";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserAuth } from "../context/AuthContext";

const AddIncident = ({ onAdd }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [incidentDescription, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [showAlert, setAlert] = useState(false);
  const [text, setText] = useState("");
  const { user } = UserAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstname ||
      !lastname ||
      !registrationNumber ||
      !incidentDescription ||
      !title ||
      !incidentType
    ) {
      setText("Please fill in all the fields.");
      setAlert(true);
    } else {
      try {
        const customId = crypto.randomUUID(); // Set your custom ID here
        const incidentRef = doc(db, "incidents", customId);
        const userId = user.uid;

        const ReportedIncidentsData = {
          id: customId,
          completed: false,
        };
        await setDoc(incidentRef, {
          firstname,
          lastname,
          registrationNumber,
          incidentDescription,
          title,
          incidentType,
          date: Date(),
          timeReported: Date.now(),
          completed: false,
          id: customId,
          user: userId,
        });

        //update the reported incidents array
        await setDoc(
          doc(db, "users", userId),
          {
            ReportedIncidents: arrayUnion(ReportedIncidentsData),
          },
          { merge: true }
        );

        console.log("Document written with custom ID: ", customId);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      setFirstName("");
      setLastName("");
      setRegistrationNumber("");
      setDescription("");
      setTitle("");
    }
  };

  return (
    <form className="mt-3" onSubmit={onSubmit}>
      {showAlert && (
        <DangerAlert
          text={text}
          onClick={() => setAlert(false)}
          timeAlert={setAlert}
          color={"warning"}
          width={"25"}
        />
      )}
      <label htmlFor="">Names</label>
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={firstname}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="form-control"
          type="text"
          value={lastname}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <label htmlFor="">Student/Guard Registration Number</label>
      <input
        className="form-control mb-3 w-50"
        type="text"
        value={registrationNumber}
        placeholder="Registration Number"
        onChange={(e) => setRegistrationNumber(e.target.value)}
      />
      <label htmlFor="">Incident Title</label>
      <div className="input-group w-100 mb-3">
        <input
          className="form-control mb-3"
          type="text"
          value={title}
          placeholder="Incident Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className=" form-control h-25"
          aria-label="Default select example"
          value={incidentType}
          onChange={(e) => setIncidentType(e.target.value)}
        >
          <option>Select incident type</option>
          <option value="Theft or Burglary">Theft or Burglary</option>
          <option value="Vandalism">Vandalism</option>
          <option value="Assault or Physical Altercation">
            Assault or Physical Altercation
          </option>
          <option value="Harassment or Threats">Harassment or Threats</option>
          <option value="Property Damage">Property Damage</option>
          <option value="Fire or Smoke Incident">Fire or Smoke Incident</option>
          <option value="Medical Emergency">Medical Emergency</option>
          <option value="Suspicious Activity or Persons">
            Suspicious Activity or Persons
          </option>
          <option value="Cybersecurity Breach">Cybersecurity Breach</option>
          {/* Add more incident types as needed */}
        </select>
      </div>

      <label htmlFor="">Incident Description</label>
      <textarea
        rows={"6"}
        className="form-control mb-3 "
        type="text"
        value={incidentDescription}
        placeholder="Describe the incident"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input className="btn btn-outline-primary" type="submit" value={"Save"} />
    </form>
  );
};

export default AddIncident;
