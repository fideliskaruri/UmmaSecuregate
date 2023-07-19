import { Link, useLocation, useNavigate } from "react-router-dom";
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

const Sidebar = ({ showSidebar }) => {
  const auth = getAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { saveAccessLog, user } = UserAuth();
  const { checkAdmin } = UserAuth();
  const location = useLocation().pathname;
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
    // {
    //   path: "/accesslogs",
    //   label: "Access Logs",
    //   icon: CiFileOn,
    //   showIfAdmin: true,
    // },
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
    <>
      <ul className="sidebar text-bg-dark ">
        <li className="logocontainer">
          <Link to="/dashboard">
            <Logo className="logo" />
          </Link>
        </li>
        {links.map((link, index) => {
          if (link.showIfAdmin && !isAdmin) return null;
          return (
            <li key={index}>
              <Link
                to={link.path}
                className={`sidebar-link ${location === link.path && "active"}`}
              >
                {React.createElement(link.icon, {
                  style: {
                    backgroundColor: "transparent",
                  },
                })}
                <small className="link-text">{link.label}</small>
              </Link>
            </li>
          );
        })}

        <li>
          <Button text={"Logout"} color={"outline-light"} onClick={logOut} />
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
