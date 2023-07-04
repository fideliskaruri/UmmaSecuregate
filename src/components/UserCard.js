const UserCard = ({ guard, IMGURL }) => {
  console.log(guard);
  return (
    <div
      className=" text-bg-dark mb-3 d-flex rounded-pill align-items-center "
      // style={{ width: "250px", minHeight: "150px",maxHeight:"250px" }}
    >
      <img
        className="card-img-top rounded-circle "
        src={`${guard.imageURL}`}
        alt="Card image cap"
        style={{
          maxHeight: "100px",
          minHeight: "100px",
          maxWidth: "100px",
        }}
      />
      <div className="card-body mt-2  ">
        <p className="card-title text-uppercase">
          Name: {guard.firstname} {guard.lastname}
        </p>
        <p>Gender: {guard.gender}</p>
        <p>Role: {guard.role}</p>
        <p>Contact: {guard.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
