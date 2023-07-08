import { useEffect } from "react";
import Button from "./Button";

const ModalComponent = ({ text, Accept, Decline }) => {

  useEffect(() => {
    const preventTab = (e) => {
      if (e.keyCode === 9) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", preventTab);
    return () => {
      document.removeEventListener("keydown", preventTab);
    };
  }, []);

  return (
    <div
      className="rounded modal "
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // add a translucent background
      }}
    >
      <div
        className="rounded text-bg-dark"
        style={{
          width: "300px",
          height: "100px", // add a white background for the content
          padding: "10px", // add some padding for the content
          display: "flex",
          flexDirection: "column", // make the content vertical
          alignItems: "center", // center the content horizontally
          justifyContent: "space-between", // space out the content vertically
        }}
      >
        <h2>{text}</h2>
        <div>
          <Button text={"Yes"} color={"danger"} onClick={Accept} />
          <Button text={"No"} color={"outline-primary"} onClick={Decline} />
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
