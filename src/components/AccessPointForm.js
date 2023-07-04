import {
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import DangerAlert from "./DangerAlert";
import Button from "./Button";

const AccessPointForm = () => {
  const [alert, setAlert] = useState(false);
  const [guards, setGuards] = useState([]);
  const [accessPointName, setAccessPointName] = useState("");
  const [selectedGuards, setSelectedGuards] = useState([]);

  const addAccessPoint = async (e) => {
    e.preventDefault();
    const customId = crypto.randomUUID();
    const accessPointsCollectionRef = doc(db, "accessPoints", customId);

    if (!accessPointName) {
      setAlert(true);
    } else {
      try {
        await setDoc(accessPointsCollectionRef, {
          accessPointName,
          selectedGuards,
          id: customId,
        });

        setAccessPointName("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {alert && (
        <DangerAlert
          text={"Please fill in access point name!"}
          onClick={() => setAlert(false)}
        />
      )}

      <form className="w-75 mb-3" onSubmit={addAccessPoint}>
        <div className="input-group">
          <input
            type="text"
            className="form-control rounded-left"
            placeholder="Access point name"
            value={accessPointName}
            onChange={(e) => setAccessPointName(e.target.value)}
          />
          <input
            className="btn btn-outline-primary rounded-right"
            type="submit"
            value="Save"
          />
        </div>
      </form>
    </>
  );
};

export default AccessPointForm;
