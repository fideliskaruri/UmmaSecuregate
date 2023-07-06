import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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

const MainContent = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [signedIn, setSignedIn] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [user]);

  return (
    <div className={signedIn ? "grid-container" : "container w-100 h-100"}>
      <Router>
        {signedIn && <Sidebar />}
        <aside className="maincontent">
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
            <Route path="/dashboard" element={signedIn && <Dashboard />} />
            <Route
              path="/usermanagement"
              element={signedIn && <UserManagement />}
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

            <Route path="/History" element={signedIn && <History />} />
            <Route path="/accesslogs" element={signedIn && <AccessLogs />} />
            <Route
              path="/accesspoints"
              element={signedIn && <AccessPointList />}
            />
            <Route
              path="/generatereports"
              element={signedIn && <GenerateReports />}
            />
            <Route
              path="/helpandsupport"
              element={signedIn && <HelpAndSupport />}
            />
            <Route
              path="/securityincidents"
              element={signedIn && <SecurityIncidents />}
            />
          </Routes>
        </aside>
      </Router>
    </div>
  );
};

export default MainContent;
