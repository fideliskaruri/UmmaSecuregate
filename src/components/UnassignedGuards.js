import { useState } from "react";

const UnassignedGuards = ({ guards }) => {
  const [showMale, setShowMale] = useState(false);
  const [showFemale, setShowFemale] = useState(false);

  return (
    <div>
      {guards.length > 0 ? (
        <h4 style={{ padding: "0px", margin: "0px" }}>Unassigned guards.</h4>
      ) : (
        <h4 style={{ padding: "0px", margin: "0px" }}>
          All guards have been assigned.
        </h4>
      )}
      <div className="mainContainer">
        <ul className="list-group">
          <li
            className="list-group-item bg-dark text-white"
            onClick={() => setShowMale(!showMale)}
          >
            <div className="d-flex align-items-center">
              <div
                className="rounded"
                style={{
                  height: "10px",
                  width: "10px",
                  backgroundColor: `${showMale ? "lightgreen" : "lightblue"}`,
                  marginRight: "5px",
                }}
              />
              Male Guards
            </div>
          </li>
          {showMale &&
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
      </div>
    </div>
  );
};

export default UnassignedGuards;
