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
      await signInUser(email, password);
      // navigate("/dashboard");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <form
        className="d-flex flex-column align-items-center justify-content-center w-100"
        style={{ marginTop: "100px" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="mb-4" style={{ color: "#0D6EEF" }}>
          Umma SecureGate
        </h1>

        <div className="form-group w-25">
          {show && (
            <DangerAlert
              onClick={() => setShow(false)}
              color={alertColor}
              text={alertText}
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
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group w-25">
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
    </>
  );
};

export default Login;
