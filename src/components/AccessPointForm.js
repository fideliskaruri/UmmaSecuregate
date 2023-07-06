import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import DangerAlert from "./DangerAlert";

const AccessPointForm = () => {
  const [alert, setAlert] = useState(false);
  const [accessPointName, setAccessPointName] = useState("");
  const [checkedGender, setCheckedGender] = useState(false);
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
          checkedGender,
          id: customId,
        });

        setAccessPointName("");
        setCheckedGender(false);
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
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="oppositeGender"
            checked={checkedGender}
            onChange={(e) => setCheckedGender(e.target.checked)}
            style={{ height: "20px", width: "20px" }}
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Opposite Gender
          </label>
        </div>
      </form>
    </>
  );
};

export default AccessPointForm;
