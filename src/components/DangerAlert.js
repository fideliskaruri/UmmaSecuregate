const DangerAlert = ({ onClick, text }) => {
  return (
    <div
      className="d-flex alert alert-danger alert-dismissible fade show w-75 p-2"
      
      role="alert"
    >
      {text}
      <button type="button" className="btn-close pb-2 btn-sm" onClick={onClick}></button>
    </div>
  );
};

export default DangerAlert;
