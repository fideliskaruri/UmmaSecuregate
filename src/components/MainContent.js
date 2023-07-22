import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  redirect,
} from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import "../App.css";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import UserManagement from "./UserManagement";
import AccessLogs from "./AccessLogs";
import Admin from "./Admin";
import GenerateReports from "./GenerateReports";
import HelpAndSupport from "./HelpAndSupport.js";
import SecurityIncidents from "./SecurityIncidents";
import History from "./History";
import Login from "./Login";
import LoadingScreen from "./LoadingScreen";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import AccessPointList from "./AccessPointList";
import Button from "./Button";

const MainContent = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [signedIn, setSignedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const { user, checkAdmin } = UserAuth();
  useEffect(() => {
    // Check if the user is authenticated
    const checkUser = async () => {
      try {
        // Get the current user from your authentication context
        const currentUser = await user;
        // Set the signedIn state based on the user status
        if (currentUser) {
          checkAdmin().then((result) => setIsAdmin(result));
          setSignedIn(true);
        } else {
          setSignedIn(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    // Call the checkUser function
    checkUser();

    // Set the loading state to false after checking the user
    setLoading(false);

    //handling when to show the sidebar depending on the screen size
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Change the breakpoint as per your requirements
        setShow(true);
      } else {
        setShow(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      <div
        className={
          signedIn
            ? show
              ? "grid-container"
              : undefined
            : "container-fluid justify-content-center"
        }
      >
        <Router>
          {signedIn && show && (
            <>
              <Sidebar showSidebar={setShow} />
            </>
          )}

          <aside
            className="maincontent"
            onClickCapture={() => {
              if (window.innerWidth <= 600) {
                setShow(false);
              } else {
                setShow(show);
              }
            }}
          >
            {signedIn && (
              <div
                className="d-flex justify-content-center align-items-center border rounded btn btn-sm mr-3"
                style={{
                  position: "absolute",
                  top: "0px",
                  zIndex: 1000,
                  marginTop: "10px",
                  width: "30px",
                  height: "30px",
                }}
                onClickCapture={() => setShow(!show)}
              >
                {show ? <IoCloseOutline /> : <CiMenuFries />}
              </div>
            )}
            <div className="mt-3">
              <Routes>
                <Route
                  path="/"
                  element={
                    loading ? (
                      <LoadingScreen />
                    ) : !signedIn ? (
                      <Login />
                    ) : (
                      <Navigate to="/dashboard" />
                    )
                  }
                />
                <Route
                  path="/dashboard"
                  element={signedIn ? <Dashboard /> : <Navigate to={"?"} />}
                />
                <Route
                  path="/usermanagement"
                  element={
                    signedIn ? <UserManagement /> : <Navigate to={"/"} />
                  }
                />
                <Route
                  path="usermanagement/admin"
                  element={
                    signedIn && isAdmin ? (
                      <Admin />
                    ) : (
                      <Navigate to="/usermanagement" />
                    )
                  }
                />
                <Route
                  path="/History"
                  element={signedIn ? <History /> : <Navigate to={"/"} />}
                />
                <Route
                  path="/accesslogs"
                  element={signedIn ? <AccessLogs /> : <Navigate to={"/"} />}
                />
                <Route
                  path="/accesspoints"
                  element={
                    signedIn ? <AccessPointList /> : <Navigate to={"/"} />
                  }
                />
                <Route
                  path="/generatereports"
                  element={
                    signedIn ? <GenerateReports /> : <Navigate to={"/"} />
                  }
                />
                <Route
                  path="/helpandsupport"
                  element={
                    signedIn ? <HelpAndSupport /> : <Navigate to={"/"} />
                  }
                />
                <Route
                  path="/securityincidents"
                  element={
                    signedIn ? <SecurityIncidents /> : <Navigate to={"/"} />
                  }
                />
              </Routes>
            </div>
          </aside>
        </Router>
      </div>
    </>
  );
};

export default MainContent;
