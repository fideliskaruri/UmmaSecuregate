import { useState } from "react";

const UnassignedGuards = ({ guards }) => {
  const [show, setShow] = useState(false);
  const [showFemale, setShowFemale] = useState(false);

  return (
    <>
      <ul className="list-group">
        <li
          className="list-group-item bg-dark text-white"
          onClick={() => setShow(!show)}
        >
          <div className="d-flex align-items-center">
            <div
              className="rounded"
              style={{
                height: "10px",
                width: "10px",
                backgroundColor: `${show ? "lightgreen" : "lightblue"}`,
                marginRight: "5px",
              }}
            />
            Male Guards
          </div>
        </li>
        {show &&
          guards.map(
            (guard) =>
              guard.gender === "Male" && (
                <li
                  className="list-group-item "
                  style={{
                    backgroundColor: "#f0f8ff",
                    border: "1px solid white",
                  }}
                  key={guard.id}
                >
                  {guard.firstname} {guard.lastname}
                </li>
              )
          )}
      </ul>
      <ul className="list-group">
        <li
          className="list-group-item bg-dark text-white"
          onClick={() => setShowFemale(!showFemale)}
        >
          <div className="d-flex align-items-center">
            <div
              className="rounded"
              style={{
                height: "10px",
                width: "10px",
                backgroundColor: `${showFemale ? "lightgreen" : "lightblue"}`,
                marginRight: "5px",
              }}
            />
            Female Guards
          </div>
        </li>
        {showFemale &&
          guards.map(
            (guard) =>
              guard.gender === "Female" && (
                <li
                  className="list-group-item "
                  style={{
                    backgroundColor: "#f6b092",
                    border: "1px solid white",
                  }}
                  key={guard.id}
                >
                  {guard.firstname} {guard.lastname}
                </li>
              )
          )}
      </ul>
    </>
  );
};

export default UnassignedGuards;
