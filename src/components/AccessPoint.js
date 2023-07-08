import { useState, useEffect } from "react";
import Button from "./Button";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AccessPoint = ({ accesspoint, toggleDelete, Unassign }) => {
  const [show, setShow] = useState(false);
  const [guardList, setGuardList] = useState([]);

  const guardsCollectionRef = collection(db, "users");

  const refreshData = () => {
    onSnapshot(guardsCollectionRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => doc.data());
      setGuardList(newData);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);



  return (
    <>
      <li
        className={
          show
            ? `list-group-item w-100 text-capitalize bg-dark text-white d-flex justify-content-between`
            : `list-group-item w-100 text-capitalize bg-dark text-white d-flex justify-content-between`
        }
        onClick={() => setShow(!show)}
      >
        <div className="d-flex align-items-center ">
          <div
            className="rounded"
            style={{
              height: "10px",
              width: "10px",
              backgroundColor: `${
                accesspoint.checkedGender
                  ? show
                    ? "lightgreen"
                    : "lightblue"
                  : show
                  ? "#fdff38"
                  : "white"
              }
            
              `,
              marginRight: "5px",
            }}
          />
          {accesspoint.accessPointName}
        </div>
        <div onClick={toggleDelete}>delete</div>
        <div onClick={Unassign}>Unassign</div>
      </li>

      <div className="d-flex">
        {show &&
          guardList.map((guard) =>
            accesspoint.selectedGuards.map(
              (selected) =>
                selected === guard.id && (
                  <li
                    className="list-group-item w-50 "
                    style={
                      guard.gender === "Female"
                        ? {
                            backgroundColor: "#f6b092",
                          }
                        : { backgroundColor: "#f0f8ff" }
                    }
                    key={guard.id}
                  >
                    {guard.firstname} {guard.lastname}
                  </li>
                )
            )
          )}
      </div>
    </>
  );
};

export default AccessPoint;
