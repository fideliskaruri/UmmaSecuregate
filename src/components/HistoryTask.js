import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Button from "./Button";

const HistoryTask = ({
  incident,
  onToggle,
  text,
  color,
  onDelete,
  printUser,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { checkAdmin } = UserAuth();

  useEffect(() => {
    checkAdmin().then((result) => setIsAdmin(result));
  }, []);
  return (
    <>
      <div
        className={`card border-${color} text-bg-dark p-0 mb-3 w-100`}
        style={{ maxHeight: "250px" }}
        onDoubleClick={printUser}
      >
        <div className={`card-header border-${color} text-capitalize`}>
          {incident.date}
        </div>
        <div className="card-body overflow-auto scrollbar scrollbar-primary">
          <h6 className="card-title ">{incident.title}</h6>
          <p className="card-text">{incident.incidentDescription}</p>
        </div>
        {isAdmin && (
          <div className="card-body">
            <Button onClick={onDelete} color="outline-danger" text="Delete" />
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryTask;
