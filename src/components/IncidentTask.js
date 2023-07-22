import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Button from "./Button";

const IncidentTask = ({
  incident,
  onToggle,
  text,
  EditText,
  color,
  onDelete,
  onEdit,
}) => {
  const [visible, setVisible] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    if (user.uid === incident.user) {
      setVisible(true);
    }
  }, []);
  return (
    <>
      <div
        className={`card border-${color} text-bg-dark p-0 mb-3 w-100`}
        style={{ maxHeight: "250px" }}
      >
        <div className={`card-header border-${color} text-capitalize`}>
          {incident.date}
        </div>
        <div className="card-body overflow-auto scrollbar scrollbar-primary">
          <h6 className="card-title ">{incident.title}</h6>
          <p className="card-text">{incident.incidentDescription}</p>
        </div>
        {visible && (
          <div className="card-body">
            <Button onClick={onEdit} color={`${color}`} text={EditText} />
            <Button onClick={onToggle} color={`${color}`} text={text} />
            <Button onClick={onDelete} color="outline-danger" text="Delete" />
          </div>
        )}
      </div>
    </>
  );
};

export default IncidentTask;
