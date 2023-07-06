import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  CiSquareQuestion,
  CiCircleList,
  CiGrid41,
  CiUser,
  CiFileOn,
  CiTimer,
  CiRainbow,
} from "react-icons/ci";
import { ReactComponent as Logo } from "./logo.svg";
import Button from "./Button";
import { getAuth, signOut } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";

const Sidebar = () => {
  const auth = getAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { saveAccessLog, user } = UserAuth();

  const { checkAdmin } = UserAuth();

  useEffect(() => {
    checkAdmin().then((result) => setIsAdmin(result));
  });
  const logOut = () => {
    signOut(auth)
      .then(() => {
        //sign out succeful
        saveAccessLog(user.email, true, "signOut");
        navigate("/");
        console.log("signed out successfully");
      })
      .catch((e) => {
        //error
        console.log(e);
      });
  };

  const links = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: CiGrid41,
    },
    {
      path: "/usermanagement",
      label: "Users",
      icon: CiUser,
    },
    {
      path: "/securityincidents",
      label: "Security Incidents",
      icon: CiCircleList,
    },
    {
      path: "/accesspoints",
      label: "Access Points",
      icon: CiRainbow,
    },
    {
      path: "/accesslogs",
      label: "Access Logs",
      icon: CiFileOn,
      showIfAdmin: true,
    },
    {
      path: "/history",
      label: "History",
      icon: CiTimer,
    },
    {
      path: "/generatereports",
      label: "Generate Reports",
      icon: CiFileOn,
    },
    {
      path: "/helpandsupport",
      label: "Help and Support",
      icon: CiSquareQuestion,
    },
  ];

  return (
    <div className="grid-container">
      <ul className="sidebar text-bg-dark">
        <li>
          <Link to="/dashboard" className="sidebar-link">
            <Logo
              style={{
                backgroundColor: "transparent",
                width: "100px",
                height: "40px",
              }}
            />
          </Link>
        </li>
        {links.map((link, index) => {
          if (link.showIfAdmin && !isAdmin) return null;
          return (
            <li key={index}>
              <Link to={link.path} className="sidebar-link">
                {React.createElement(link.icon, {
                  style: {
                    backgroundColor: "transparent",
                  },
                })}
                <span className="link-text">{link.label}</span>
              </Link>
            </li>
          );
        })}

        <li>
          <Button text={"Logout"} color={"outline-light"} onClick={logOut} />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
