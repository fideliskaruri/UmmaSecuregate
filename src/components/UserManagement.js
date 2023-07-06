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

const UserManagement = ({ guard }) => {
  const [userList, setUserList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
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

  return (
    <>
      {isAdmin && (
        <Button
          text={"Add User"}
          color={"outline-light"}
          onClick={() => navigate("./admin")}
        />
      )}

      <div className="usersListArea">
        {userList.map((user) => (
          <UserCard key={user.id} guard={user} />
        ))}
      </div>
    </>
  );
};

export default UserManagement;
