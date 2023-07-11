import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import DangerAlert from "./DangerAlert";

const Login = ({ setAuthState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signInUser, setShow, show, alertColor, alertText } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return;
      }
      await signInUser(email, password);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <form
      className="d-flex flex-column align-items-center justify-content-center w-100"
      style={{ marginTop: "120px" }}
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="mb-4" style={{ color: "#0D6EEF" }}>
        Umma SecureGate
      </h1>

      <div className="form-group">
        {show && (
          <DangerAlert
            onClick={() => setShow(false)}
            color={alertColor}
            text={alertText}
            timeAlert={setShow}
          />
        )}
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <h6 id="emailHelp" className="form-text text-secondary ">
          Only Registered Employees can sigin!
        </h6>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-lg btn-outline-primary mt-3 ">
        Sign In
      </button>
    </form>
  );
};

export default Login;
