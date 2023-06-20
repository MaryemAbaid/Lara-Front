import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./NavBar.css";
function NavBar(props) {
  const [activeProfile, setactiveProfile] = useState(false);
  const [Users, setUsers] = useState([]);
  function lougout() {
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("type");
    window.localStorage.removeItem("id");
    window.location.pathname = "/";
  }
  useEffect(() => {
    fetchUsers();
  }, []);
function Show(){
  setactiveProfile((activeProfile) => !activeProfile)
}
  window.onscroll = () => {
    setactiveProfile(false);
  };

  const fetchUsers = async () => {
    await axios.get("http://127.0.0.1:8000/api/users").then(({ data }) => {
      setUsers(data);
    });
  };
  return (
    <>
      <div className="navbar-brand-wrapper d-flex justify-content-center">
        <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
          <Link to="/" className="navbar-brand brand-logo">
            <img src={require("./rachid.png")} alt="logo" />
          </Link>
          <Link to="/" className="navbar-brand brand-logo-mini">
            <img src={require("./rachid.png")} alt="logo" />
          </Link>
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            onClick={() => props.SetSideBsr((sideBar) => !sideBar)}
          >
            <span className="mdi mdi-sort-variant"></span>
            <span className="fa-solid fa-bars mdi mdi-sort-variant"></span>
          </button>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <div
              className="nav-link"
              // data-bs-toggle="dropdown"
              id="img"
            >
              {Users.length > 0 &&
                Users.filter(
                  (e) => e.email === window.localStorage.getItem("email")
                ).map((m, x) => (
                  <>
                    <img
                      src={`http://127.0.0.1:8000/image/${m.image}`}
                      onClick={() =>
                      Show()
                      }
                      alt="profile"
                    />
                    {/* <span className="nav-profile-name">{m.name}</span> */}
                  </>
                ))}
            </div>
           
          </li>
        </ul>
        
      </div>
    </>
  );
}

export default NavBar;
