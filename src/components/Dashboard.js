import InfoCard from "./InfoCard";
import Home from "./Home";
import { getAuth } from "firebase/auth";

const Dashboard = () => {
  return (
    <div>
      <InfoCard>
        <div className="mainContainer">{}</div>
      </InfoCard>
    </div>
  );
};

export default Dashboard;
