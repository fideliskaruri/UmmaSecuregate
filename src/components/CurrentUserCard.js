import { useState } from "react";

const CurrentUserCard = ({ currentUser }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`d-flex flex-column text-bg-dark ml-2 mb-3 rounded  align-items-center justify-content-center border text`}
      style={{
        height: `${show ? "210px" : "27px"}`,
        width: "300px",
        position: "fixed",
        top: `${!show && "10px"}`,
        right: `${!show && "10px"}`,
        cursor: "pointer",
      }}
      onClickCapture={() => setShow(true)}
      onTouchStartCapture={() => setShow(true)}
    >
      {!show && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "20px" }}
        >
          <img
            className="card-img-top rounded-circle "
            src={`${currentUser.imageURL}`}
            alt=""
            style={{
              height: "25px",
              width: "25px",
            }}
          />
          <h5 className="card-title text-uppercase m-2">
            {currentUser.firstname} {currentUser.lastname}
          </h5>
          <h4 className="pt-2 text-success ">{currentUser.role}</h4>
        </div>
      )}
      {show && (
        <div>
          <img
            className="card-img-top rounded-circle "
            src={`${currentUser.imageURL}`}
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
              Name: {currentUser.firstname} {currentUser.lastname}
            </h4>
            <h6>Gender: {currentUser.gender}</h6>
            <h6>Role: {currentUser.role}</h6>
            <h6>Contact: {currentUser.email}</h6>
          </div>
          <button
            className="btn btn-light btn-sm w-100"
            onClick={() => setShow(false)}
          >
            Hide
          </button>
        </div>
      )}
    </div>
  );
};

export default CurrentUserCard;
