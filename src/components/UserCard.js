const UserCard = ({ user }) => {
  return (
    <div
      className="d-flex flex-column text-bg-dark mb-3 rounded align-items-start justify-content-center border text  "
      style={{
        height: "200px",
        minWidth: "260px",
        maxWidth: "100%",
        fontSize: "11px",
        padding: "10px",
      }}
    >
      <div>
        <img
          className="card-img-top rounded-circle "
          src={`${user.imageURL}`}
          alt=""
          style={{
            maxHeight: "55px",
            minHeight: "55px",
            maxWidth: "55px",
            marginRight: "10px",
          }}
        />
        <div className="card-body mt-2 w-100">
          <h4 className="card-title text-uppercase mb-2">
            Name: {user.firstname} {user.lastname}
          </h4>
          <h6>Gender: {user.gender}</h6>
          <h6>Role: {user.role}</h6>
          <h6>Contact: {user.email}</h6>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
