import { useState, useEffect } from "react";
import Button from "./Button";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AccessPoint = ({ accesspoint }) => {
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
            ? `list-group-item w-50 text-capitalize active`
            : `list-group-item w-50 text-capitalize`
        }
        onClick={() => setShow(!show)}
      >
        {accesspoint.accessPointName}
        {/* <Button
          text={"show"}
          color={"outline-primary "}
          onClick={() => setShow(!show)}
        /> */}
      </li>
      {show &&
        guardList.map((guard) =>
          accesspoint.selectedGuards.map(
            (selected) =>
              selected === guard.id && (
                <li className="list-group-item w-50" key={guard.id}>
                  {guard.firstname} {guard.lastname}
                </li>
              )
          )
        )}
    </>
  );
};

export default AccessPoint;
