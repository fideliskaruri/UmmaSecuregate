import { useState, useEffect } from "react";
import Button from "./Button";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserAuth } from "../context/AuthContext";

const AccessPoint = ({ accesspoint, toggleDelete, Unassign }) => {
  const [show, setShow] = useState(false);
  const [guardList, setGuardList] = useState([]);
  //admin state
  const [isAdmin, setIsAdmin] = useState(false);

  const guardsCollectionRef = collection(db, "users");

  //check admin privileges
  const { checkAdmin } = UserAuth();

  const refreshData = () => {
    onSnapshot(guardsCollectionRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => doc.data());
      setGuardList(newData);
    });
  };

  useEffect(() => {
    checkAdmin().then((result) => setIsAdmin(result));
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
        <div className="d-flex  w-50 justify-content-between">
          {isAdmin && (
            <>
              <div onClick={toggleDelete}>delete</div>
              <div onClick={Unassign}>Unassign</div>
            </>
          )}
        </div>
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
