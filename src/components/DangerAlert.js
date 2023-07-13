import { useEffect } from "react";

const DangerAlert = ({ onClick, text, color, width, timeAlert }) => {
    useEffect(() => {
      const timeoutId = setTimeout(() => timeAlert(false), 3000);
      return () => clearTimeout(timeoutId);
    }, []);

  return (
    <>
      <div
        className={`d-flex alert alert-${color} alert-dismissible fade show w-${width} align-items-center justify-content-center p-2 m-3   alertPopup`}
        role="alert"
        onClick={onClick}
        style={{
          cursor: "pointer",
          fontSize: "11px",
          position: "absolute",
          top: "-150px",
          right: "0px",
          height: "30px",
          zIndex: "9999",
        }}
      >
        {text}
      </div>
    </>
  );
};

export default DangerAlert;
