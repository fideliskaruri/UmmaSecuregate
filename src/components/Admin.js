import { UserAuth } from "../context/AuthContext";
import DangerAlert from "./DangerAlert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Admin = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  //Danger Alert States
  const [alertText, setAlertText] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [showAlert, setShowAlert] = useState(true);

  const { createUser, emailInUse, userRegistered, setUserRegistered } =
    UserAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !file ||
      !gender ||
      !role
    ) {
      setShowAlert(true);
      setAlertColor("info");
      setAlertText("Make sure to fill in all the fields!");
    } else {
      if (password !== confirmPassword) {
        setAlertColor("warning");
        setAlertText("Passwords don't match!");
        setShowAlert(true);
      } else {
        const file = document.getElementById("formFile").files[0];

        createUser(firstname, lastname, role, gender, email, password, file);

        if (emailInUse) {
          setShowAlert(true);
          setAlertColor("info");
          setAlertText("Email is already in use!");
          return;
        } else {
          if (userRegistered) {
            setShowAlert(true);
            setAlertColor("success");
            setAlertText("User Registered Successfully.");
            setUserRegistered(false);
          }
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setGender("");
          setRole("");
          setFile("");
        }
      }
    }
  };
  return (
    <>
      <Button
        text={"Go Back"}
        color={"outline-light"}
        onClick={() => navigate("/usermanagement")}
      />
      <form className="mt-5" onSubmit={onSubmit}>
        {showAlert && (
          <DangerAlert
            text={alertText}
            color={alertColor}
            onClick={() => setShowAlert(false)}
            timeAlert={setShowAlert}
          />
        )}
        <label htmlFor="">Guard Names</label>
        <div className="input-group mb-3 w-75">
          <input
            className="form-control"
            type="text"
            value={firstname}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            value={lastname}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <label> Email</label>
        <div className="mb-3">
          <input
            className="form-control w-75"
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label htmlFor="inputPassword2">Password</label>
        <div className="w-75 input-group mb-3">
          <input
            type="password"
            value={password}
            className="form-control"
            id="inputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            value={confirmPassword}
            className="form-control"
            id="inputPassword2"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="w-75 mb-3">
          <label htmlFor="formFile" className="form-label mb-0">
            Image
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            value={file}
            onChange={(e) => setFile(e.target.value)}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </div>
        <div className="input-group w-75 mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Select role</option>
            <option value="Guard">Guard</option>
            <option value="Admin">Admin</option>
            <option value="Supervisor">Supervisor</option>
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <input className="btn btn-primary" type="submit" value={"Register"} />
      </form>
    </>
  );
};

export default Admin;
