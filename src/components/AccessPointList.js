import { useEffect, useState } from "react";
import AccessPointForm from "./AccessPointForm";
import Button from "./Button";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import AccessPoint from "./AccessPoint";
import { db } from "../firebaseConfig";

const AccessPointList = () => {
  const [showForm, setShowForm] = useState(false);
  const [accessPointList, setAccessPointList] = useState([]);
  const [guards, setGuards] = useState([]); //set guards fetched from the database
  const [show, setShow] = useState(false);
  const [allguards, setAllGuards] = useState([]); //randomly selected guards that are placed into accesspoints

  //database references
  const accessPointCollectionRef = collection(db, "accessPoints");
  const usersCollectionRef = collection(db, "users");

  const refreshData = () => {
    onSnapshot(accessPointCollectionRef, (snapshot) => {
      const newData = snapshot.docs.map((docu) => docu.data());
      setAccessPointList(newData);
    });

    onSnapshot(usersCollectionRef, (snapshot) => {
      const newData = [];
      snapshot.docs.map(
        (docu) => docu.data().assigned === false && newData.push(docu.data())
      );
      setGuards(newData);
    });
    onSnapshot(usersCollectionRef, (snapshot) => {
      const newData = [];
      snapshot.docs.map((docu) => newData.push(docu.data()));
      setAllGuards(newData);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  //shuffle guards
  const shuffleGuards = async () => {
    let unassignedGuards = [];
    let assignedGuards = [];
    guards.map((guard) => {
      unassignedGuards.push(!guard.assigned && guard.id);
    });
    if (unassignedGuards.length > 0) {
      for (var accessPoint in accessPointList) {
        const currentAccessPoint = accessPointList[accessPoint].id;
        console.log(accessPoint);
        for (var i = 0; i < 2; i++) {
          let len = unassignedGuards.length;
          let randIndex = Math.floor(Math.random() * len);
          let currentGuard = unassignedGuards[randIndex];

          console.log("guards:", currentGuard);
          //update the state of the assigned boolean to true
          await updateDoc(doc(db, "users", currentGuard), {
            assigned: true,
          });

          assignedGuards.push(currentGuard);
          unassignedGuards.splice(randIndex, 1);
        }
        console.log("Currently assigned guards:", assignedGuards);
        await updateDoc(doc(db, "accessPoints", currentAccessPoint), {
          selectedGuards: assignedGuards,
        });
        assignedGuards = [];
      }
    } else {
      setShow(!show);
      console.log("no unassigned guards");
    }
  };

  //shuffle all the guards regardless of assignment
  const shuffleAllGuards = async () => {
    console.log("started");
    let unassignedGuards = [];
    let assignedGuards = [];
    allguards.map((guard) => {
      unassignedGuards.push(guard.id);
    });

    for (var accessPoint in accessPointList) {
      const currentAccessPoint = accessPointList[accessPoint].id;
      console.log(accessPoint);
      for (var i = 0; i < 2; i++) {
        let len = unassignedGuards.length;
        let randIndex = Math.floor(Math.random() * len);
        let currentGuard = unassignedGuards[randIndex];

        console.log("guards:", currentGuard);
        //update the state of the assigned boolean to true
        await updateDoc(doc(db, "users", currentGuard), {
          assigned: true,
        });

        assignedGuards.push(currentGuard);
        unassignedGuards.splice(randIndex, 1);
      }
      console.log("Currently assigned guards:", assignedGuards);
      await updateDoc(doc(db, "accessPoints", currentAccessPoint), {
        selectedGuards: assignedGuards,
      });
      assignedGuards = [];
    }
  };
  //unassign all guards
  const unassignAllGuards = async () => {
    for (var i = 0; i < allguards.length; i++) {
      const currentGuard = allguards[i].id;

      //set assigned boolean to false in users collection
      await updateDoc(doc(usersCollectionRef, currentGuard), {
        assigned: false,
      }).catch((e) => {
        console.log(e);
      });
    }
    for (var j = 0; j < accessPointList.length; j++) {
      const currentAccessPoint = accessPointList[j].id;

      //set all guards that were selected to empty
      await updateDoc(doc(db, "accessPoints", currentAccessPoint), {
        selectedGuards: [],
      }).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <>
      <div className="d-flex input-group w-100 " style={{ height: "50px" }}>
        <Button
          text={"Add Access Point"}
          onClick={() => setShowForm(!showForm)}
          color={"outline-light"}
        />
        <Button
          text={"Shuffle Unassigned Guards"}
          onClick={shuffleGuards}
          color={guards.length === 0 ? `danger` : `outline-light`}
        />
        <Button
          text={"Shuffle All Guards"}
          onClick={shuffleAllGuards} // shuffles all the guards whether or not they're assigned
          color={"outline-light"}
        />
        <Button
          text={"Unassign All Guards"}
          onClick={unassignAllGuards}
          color={"outline-light"}
        />
      </div>

      <div className="mainContainer">
        <div>
          <h2 className="text-light">Access Points</h2>
          {showForm && <AccessPointForm />}

          <ul className="list-group">
            {accessPointList.map((accesspoint) => (
              <AccessPoint
                key={crypto.randomUUID()}
                accesspoint={accesspoint}
              />
            ))}
          </ul>
        </div>
        <div>
          {guards.length > 0 ? (
            <h2 className="text-light">Unassigned Guards</h2>
          ) : (
            <h2 className="text-light">All guards have been assigned</h2>
          )}
          <ul className="list-group">
            {guards.map((guard) => (
              <li className="list-group-item " key={guard.id}>
                {guard.firstname} {guard.lastname}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AccessPointList;
