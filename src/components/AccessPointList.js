import { useEffect, useState } from "react";
import AccessPointForm from "./AccessPointForm";
import Button from "./Button";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import AccessPoint from "./AccessPoint";
import { db } from "../firebaseConfig";
import { UserAuth } from "../context/AuthContext";
import DangerAlert from "./DangerAlert";
import UnassignedGuards from "./UnassignedGuards";

const AccessPointList = () => {
  //admin state
  const [isAdmin, setIsAdmin] = useState(false);
  //form state
  const [showForm, setShowForm] = useState(false);
  //access point list
  const [accessPointList, setAccessPointList] = useState([]);
  //Danger Alert States
  const [alertText, setAlertText] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [show, setShow] = useState(true);

  //guards state
  const [guards, setGuards] = useState([]); //set guards fetched from the database
  const [allguards, setAllGuards] = useState([]); //randomly selected guards that are placed into accesspointsa

  //check admin privileges
  const { checkAdmin } = UserAuth();

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
        (docu) =>
          docu.data().assigned === false &&
          docu.data().role === "Guard" &&
          newData.push(docu.data())
      );
      setGuards(newData);
    });
    onSnapshot(usersCollectionRef, (snapshot) => {
      const newData = [];
      snapshot.docs.map(
        (docu) => docu.data().role === "Guard" && newData.push(docu.data())
      );
      setAllGuards(newData);
    });
  };

  useEffect(() => {
    checkAdmin().then((result) => setIsAdmin(result));

    refreshData();
  }, []);

  //generate random index from array size
  const generateRadomIndex = (n) => {
    const randIndex = Math.floor(Math.random() * n.length);
    return randIndex;
  };

  //shuffle guards
  const shuffleGuards = async () => {
    //male guards
    const male = [];
    guards.map((guard) => guard.gender === "Male" && male.push(guard));
    //female guards
    const female = [];
    guards.map((guard) => guard.gender === "Female" && female.push(guard));
    //unassigned Guards
    let unassignedGuards = [];
    let assignedGuards = [];

    guards.map((guard) => {
      unassignedGuards.push(!guard.assigned && guard.id);
    });

    if (unassignedGuards.length > 0) {
      for (var accessPoint in accessPointList) {
        console.log(accessPointList[accessPoint].selectedGuards);
        if (accessPointList[accessPoint].selectedGuards.length === 2) {
          setShow(true);
          setAlertColor("danger");
          setAlertText("Access Point Full");
        } else {
          setShow(true);
          setAlertColor("success");
          setAlertText("Assigning Guards To Posts");
          const currentAccessPoint = accessPointList[accessPoint].id;
          const maleIndex = generateRadomIndex(male);
          const femaleIndex = generateRadomIndex(female);

          if (accessPointList[accessPoint].checkedGender) {
            console.log("checking");
            if (male.length > 0) {
              if (female.length > 0) {
                const maleG = male[maleIndex];
                const femaleG = female[femaleIndex];
                console.log("assigning");

                //add assigned guards to the assigned guards array
                assignedGuards.push(maleG.id);
                assignedGuards.push(femaleG.id);

                //remove assigned guards from array
                male.splice(maleIndex, 1);
                console.log(male);
                female.splice(femaleIndex, 1);
                console.log(female);

                // remove assigned guards from unassignedGuards array
                unassignedGuards = unassignedGuards.filter(
                  // eslint-disable-next-line no-loop-func
                  (guard) => !assignedGuards.includes(guard)
                );

                for (let j = 0; j <= 1; j++) {
                  console.log("updating database");
                  //update the state of the assigned boolean to true
                  await updateDoc(doc(db, "users", assignedGuards[j]), {
                    assigned: true,
                  });
                }
              } else {
                console.log();
                setShow(true);
                setAlertColor("danger");
                setAlertText(
                  `Insuficient number of female guards to continue assignment, stopped at ${accessPointList[accessPoint].accessPointName}`
                );
                return;
              }
            } else {
              setShow(true);
              setAlertColor("danger");
              setAlertText(
                `Insuficient number of male guards to continue assignment, stopped at ${accessPointList[accessPoint].accessPointName}`
              );
              return;
            }
          } else if (!accessPointList[accessPoint].checkedGender) {
            for (let i = 0; i < 2; i++) {
              if (unassignedGuards.length !== 0) {
                let randIndex = generateRadomIndex(unassignedGuards);
                let currentGuard = unassignedGuards[randIndex];

                console.log("guards:", currentGuard);
                //update the state of the assigned boolean to true
                await updateDoc(doc(db, "users", currentGuard), {
                  assigned: true,
                });

                assignedGuards.push(currentGuard);
                unassignedGuards.splice(randIndex, 1);
              } else {
                setShow(true);
                setAlertColor("danger");
                setAlertText(
                  `Could not finish assigning guards for ${accessPointList[accessPoint].accessPointName}. Please Add more guards`
                );
              }
            }
          }

          console.log("Currently assigned guards:", assignedGuards);
          await updateDoc(doc(db, "accessPoints", currentAccessPoint), {
            selectedGuards: assignedGuards,
          });
          assignedGuards = [];
        }
      }
    } else {
      setShow(true);
      setAlertText("Every Guard has been Assigned");
      setAlertColor("warning");
      console.log("no unassigned guards");
    }
  };

  // //shuffle all the guards regardless of assignment
  // const shuffleAllGuards = async () => {
  //   console.log("started");
  //   let unassignedGuards = [];
  //   let assignedGuards = [];
  //   allguards.map((guard) => {
  //     unassignedGuards.push(guard.id);
  //   });

  //   await unassignAllGuards();
  //   for (var accessPoint in accessPointList) {
  //     const currentAccessPoint = accessPointList[accessPoint].id;
  //     console.log(accessPoint);
  //     for (var i = 0; i < 2; i++) {
  //       let len = unassignedGuards.length;
  //       let randIndex = Math.floor(Math.random() * len);
  //       let currentGuard = unassignedGuards[randIndex];

  //       console.log("guards:", currentGuard);
  //       //update the state of the assigned boolean to true
  //       await updateDoc(doc(db, "users", currentGuard), {
  //         assigned: true,
  //       });

  //       assignedGuards.push(currentGuard);
  //       unassignedGuards.splice(randIndex, 1);
  //     }
  //     console.log("Currently assigned guards:", assignedGuards);
  //     await updateDoc(doc(db, "accessPoints", currentAccessPoint), {
  //       selectedGuards: assignedGuards,
  //     });
  //     assignedGuards = [];
  //   }
  // };
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
    <div className="accessPointList">
      {isAdmin && (
        <div
          className="d-flex input-group justify-content-start w-100 "
          style={{ height: "50px" }}
        >
          <Button
            text={showForm ? "Close" : "Add Access Point"}
            onClick={() => setShowForm(!showForm)}
            color={"outline-light"}
          />
          <Button
            text={"Shuffle Unassigned Guards"}
            onClick={shuffleGuards}
            color={guards.length === 0 ? `danger` : `outline-light`}
          />
          {/* <Button
            text={"Shuffle All Guards"}
            onClick={shuffleAllGuards} // shuffles all the guards whether or not they're assigned
            color={"outline-light"}
          /> */}
          <Button
            text={"Unassign All Guards"}
            onClick={unassignAllGuards}
            color={guards.length === 0 ? "danger" : "outline-light"}
          />
          {show && (
            <>
              <DangerAlert
                text={alertText}
                color={alertColor}
                onClick={() => setShow(false)}
              />
              {setTimeout(() => setShow(false), 10000)}
            </>
          )}
        </div>
      )}

      <div className="mainContainer" style={{ cursor: "pointer" }}>
        <div>
          <h2 className="text-light mb-0">Access Points</h2>

          <ul className="list-group">
            {accessPointList.map((accesspoint) => (
              <AccessPoint key={accesspoint.id} accesspoint={accesspoint} />
            ))}
            <li
              className="list-group-item d-flex align-items-center p-0 m-0 mb-3"
              style={{ height: "40px", fontFamily: "monospace" }}
            >
              <input
                className="form-control"
                value={`${showForm ? "Close Form" : "Add Access Point"}`}
                type="button"
                onClick={() => setShowForm(!showForm)}
              />
            </li>
            {showForm && <AccessPointForm />}
          </ul>
        </div>
        <div>
          {guards.length > 0 ? (
            <h2 className="text-light mb-0">Unassigned Guards</h2>
          ) : (
            <h2 className="text-light mb-0">All guards have been assigned</h2>
          )}

          <div className="mainContainer">
            <UnassignedGuards guards={guards} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessPointList;
