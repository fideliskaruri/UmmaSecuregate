import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import DangerAlert from "./DangerAlert";

const AccessPointForm = () => {
  //Danger Alert States
  const [show, setShow] = useState(false);

  //others
  const [accessPointName, setAccessPointName] = useState("");
  const [checkedGender, setCheckedGender] = useState(true);
  const [selectedGuards, setSelectedGuards] = useState([]);

  const addAccessPoint = async (e) => {
    e.preventDefault();
    const customId = crypto.randomUUID();
    const accessPointsCollectionRef = doc(db, "accessPoints", customId);

    if (!accessPointName) {
      setShow(true);
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
      {show && (
        <DangerAlert
          text={"Please fill in access point name!"}
          color={"danger"}
          onClick={() => setShow(false)}
          timeAlert={setShow}
        />
      )}

      <form className="w-100 m-0" onSubmit={addAccessPoint}>
        <label
          className="text-warning"
          htmlFor="checkbox"
          style={{ fontSize: "12px" }}
        >
          Uncheck the box only if the Access Point can have any gender assigned
          to it.
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control rounded-left"
            placeholder="Access point name"
            value={accessPointName}
            onChange={(e) => setAccessPointName(e.target.value)}
          />
          <input
            className="form-check-input p-0 m-0"
            type="checkbox"
            value="oppositeGender"
            name="checkbox"
            checked={checkedGender}
            onChange={(e) => setCheckedGender(e.target.checked)}
            style={{ height: "40px", width: "20px" }}
          />
        </div>

        <div className="input-group">
          <input
            className="btnbtn-outline-primary form-control"
            type="submit"
            value="Save"
          />
        </div>
      </form>
    </>
  );
};

export default AccessPointForm;
