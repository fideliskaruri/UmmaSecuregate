import { useEffect, useState } from "react";
import Button from "./Button";

const ModalComponent = ({ text, handleModalAction, handleShowModal }) => {
  const [value, setValue] = useState("");

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleModalAction(value);
    handleShowModal(false);
  };

  useEffect(() => {
    setValue("");
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
        zIndex: 9999,
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // add a translucent background
      }}
    >
      <form
        className="w-25 h-25 mt-5 rounded border border-light text-bg-dark d-flex justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <h4>{text}</h4>
          <input
            className="btn btn-danger btn-lg m-3 mb-0"
            type="submit"
            onClick={(e) => setValue(e.target.value)}
            value="Yes"
          />
          <input
            className="btn btn-primary btn-lg m-3 mb-0"
            type="submit"
            onClick={(e) => setValue(e.target.value)}
            value="No"
          />
        </div>
      </form>
    </div>
  );
};

export default ModalComponent;
