import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Button from "./Button";
import DangerAlert from "./DangerAlert";

const UserCard = ({ userCard, deleteUser }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { checkAdmin, user } = UserAuth();
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    checkAdmin().then((result) => setIsAdmin(result));
    if (user.uid !== userCard.id) {
      setVisible(true);
    }
  }, []);
  return (
    <div
      className="d-flex flex-column text-bg-dark mb-3 rounded align-items-start justify-content-center border text  "
      style={{
        height: "200px",
        minWidth: "260px",
        maxWidth: "100%",
        fontSize: "11px",
        padding: "10px",
      }}
    >
      {show && (
        <DangerAlert
          timeAlert={setShow}
          text={
            "You Have To Double Click To Delete The User! Also Delete The User From Firebase Auth Manually."
          }
          color={"danger"}
        />
      )}
      <div>
        <img
          className="card-img-top rounded-circle "
          src={`${userCard.imageURL}`}
          alt=""
          style={{
            maxHeight: "55px",
            minHeight: "55px",
            maxWidth: "55px",
            marginRight: "10px",
          }}
        />
        <div className="card-body mt-2 w-100">
          <h4 className="card-title text-uppercase mb-2">
            Name: {userCard.firstname} {userCard.lastname}
          </h4>
          <h6>Gender: {userCard.gender}</h6>
          <h6>Role: {userCard.role}</h6>
          <h6>Contact: {userCard.email}</h6>
          {isAdmin && visible && (
            <input
              className="btn btn-sm btn-danger"
              type="button"
              value={"Delete"}
              onDoubleClick={deleteUser}
              onClick={() => setShow(true)}
              color={"danger"}
              text={"Delete"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
