import { useState } from "react";
import DangerAlert from "./DangerAlert";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserAuth } from "../context/AuthContext";

const AddIncident = ({ onAdd }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [incidentDescription, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [showAlert, setAlert] = useState(false);
  const { user, date } = UserAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstname ||
      !lastname ||
      !registrationNumber ||
      !incidentDescription ||
      !title
    ) {
      setAlert(true);
    } else {
      try {
        const customId = crypto.randomUUID(); // Set your custom ID here
        const incidentRef = doc(db, "incidents", customId);

        await setDoc(incidentRef, {
          firstname,
          lastname,
          registrationNumber,
          incidentDescription,
          title,

          date,
          completed: false,
          id: customId,
          user: user.uid,
        });

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
          text={"Please make sure to fill in every field"}
          onClick={() => setAlert(false)}
        />
      )}
      <label htmlFor="">Names</label>
      <div className="input-group mb-3 w-75">
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
      <div className="input-group w-75">
        <input
          className="form-control mb-3"
          type="text"
          value={title}
          placeholder="Incident Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <label htmlFor="">Incident Description</label>
      <textarea
        rows={"6"}
        className="form-control mb-3 w-75 "
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
