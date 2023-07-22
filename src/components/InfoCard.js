const InfoCard = ({ children, color, title, minWidth }) => {
  return (
    <div>
      <h6>{title}</h6>
      <div
        className="d-flex align-items-center justify-content-around p-3  mb-3  rounded   "
        style={{
          backgroundColor: "whitesmoke",
          height: "250px",
          width: "fit-content",
          // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          // border:"white solid 1px"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
