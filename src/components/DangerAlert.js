const DangerAlert = ({ onClick, text, color, width }) => {
  return (
    <>
      <div
        className={`d-flex alert alert-${color} alert-dismissible fade show w-${width} align-items-center justify-content-center p-2 alertPopup`}
        role="alert"
        onClick={onClick}
        style={{
          cursor: "pointer",
          fontSize: "11px",
          position: "absolute",
          top: "-150px",
          right: "0px",
          height: "30px",
        }}
      >
        {text}
      </div>
    </>
  );
};

export default DangerAlert;
