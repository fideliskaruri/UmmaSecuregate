import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import CurrentUserCard from "./CurrentUserCard";
import InfoCard from "./InfoCard";
import LoadingScreen from "./LoadingScreen";

const Dashboard = () => {
  const { user } = UserAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userInfo = await getDoc(doc(db, "users", user.uid));
    if (userInfo) {
      const thisUser = userInfo.data();
      setCurrentUser(thisUser);
      console.log(currentUser);
    } else {
      console.log("invalid");
    }
  };
  return (
    <div className="dashboard">
      {currentUser ? (
        <CurrentUserCard currentUser={currentUser} />
      ) : (
        <LoadingScreen />
      )}
      {currentUser && <div className="mainContainer"></div>}
    </div>
  );
};

export default Dashboard;
