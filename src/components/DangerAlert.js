const DangerAlert = ({ onClick, text, color }) => {
  return (
    <div
      className={`d-flex alert alert-${color} alert-dismissible fade show w-50 m-0 align-items-center p-2 `}
      role="alert"
      onClick={onClick}
      style={{ cursor: "pointer", fontSize:'11px' }}
    >
      {text}
    </div>
  );
};

export default DangerAlert;
