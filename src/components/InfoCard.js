const InfoCard = ({ children, color, title, minWidth }) => {
  return (
    <div>
      <h4>{title}</h4>
      <div
        className="d-flex align-items-center justify-content-start p-3  mb-3  rounded   "
        style={{
          backgroundColor: "rgb(26,31,31)",
          height: "250px",
          minWidth: minWidth,
          maxWidth: "100%",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          marginRight: "30px",
          // border:"white solid 1px"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
