import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Button from "./Button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import DangerAlert from "./DangerAlert";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [show, setShow] = useState(false);
  //list states
  const [showGuards, setShowGuards] = useState(false);
  const [showAdmins, setShowAdmins] = useState(false);
  const [showSupervisors, setShowSupevisors] = useState(false);
  const collectionRef = collection(db, "users");
  const navigate = useNavigate();
  const { checkAdmin } = UserAuth();

  const refreshData = async () => {
    onSnapshot(collectionRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => doc.data());
      setUserList(newData);
    });
  };

  useEffect(() => {
    checkAdmin().then((result) => setIsAdmin(result));
    refreshData();
  }, []);

  const deleteUser = async (id) => {
    setShow(true);
    await deleteDoc(doc(db, "users", id));
  };
  return (
    <>
      {show && (
        <DangerAlert
          text={"Deleting User"}
          color={"danger"}
          timeAlert={setShow}
        />
      )}
      {isAdmin && (
        <Button
          text={"Add User"}
          color={"outline-light"}
          onClick={() => navigate("./admin")}
        />
      )}

      <div className="usersListArea" style={{ cursor: "pointer" }}>
        <ul className="list-group container-fluid">
          <li
            className="list-group-item  text-capitalize bg-light text-dark rounded d-flex align-items-center "
            onClick={() => setShowAdmins(!showAdmins)}
          >
            <div
              className="rounded-circle"
              style={{
                width: "15px",
                height: "15px",
                marginRight: "10px",
                backgroundColor: `${showAdmins ? "lightgreen" : "lightblue"}`,
              }}
            />
            Administrators
          </li>
          <li className="listarea">
            {showAdmins &&
              userList.map(
                (user) =>
                  user.role === "Admin" && (
                    <UserCard
                      key={user.id}
                      userCard={user}
                      deleteUser={() => deleteUser(user.id)}
                    />
                  )
              )}
          </li>
        </ul>
        <ul className="list-group container-fluid">
          <li
            className="list-group-item w-100 text-capitalize bg-light text-dark rounded d-flex align-items-center"
            onClick={() => setShowSupevisors(!showSupervisors)}
          >
            <div
              className="rounded-circle"
              style={{
                width: "15px",
                height: "15px",
                marginRight: "10px",
                backgroundColor: `${
                  showSupervisors ? "lightgreen" : "lightblue"
                }`,
              }}
            />
            Supervisors
          </li>
          <li className="listarea">
            {showSupervisors &&
              userList.map(
                (user) =>
                  user.role === "Supervisor" && (
                    <UserCard
                      key={user.id}
                      userCard={user}
                      deleteUser={() => deleteUser(user.id)}
                    />
                  )
              )}
          </li>
        </ul>
        <ul className="list-group container-fluid">
          <li
            className="list-group-item w-100 text-capitalize bg-light text-dark rounded d-flex align-items-center"
            onClick={() => setShowGuards(!showGuards)}
          >
            <div
              className="rounded-circle"
              style={{
                width: "15px",
                height: "15px",
                marginRight: "10px",
                backgroundColor: `${showGuards ? "lightgreen" : "lightblue"}`,
              }}
            />
            Guards
          </li>
          <li className="listarea">
            {showGuards &&
              userList.map(
                (user) =>
                  user.role === "Guard" && (
                    <UserCard
                      key={user.id}
                      userCard={user}
                      deleteUser={() => deleteUser(user.id)}
                    />
                  )
              )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserManagement;
