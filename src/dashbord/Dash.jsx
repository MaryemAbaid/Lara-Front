import React, { useState } from "react";
import "./Dash.css";
import Home from "./Home";
import NavBar from "./NavBar/NavBar";
import SideBar from "./sideBar/SideBar";

function Dash(props) {
  const [activeSid, setActiveSide] = useState(false);
  window.onscroll = () => {
    setActiveSide(false);
  };
  return (
    <div className="container-scroller">
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <NavBar setActiveSide={setActiveSide} SetSideBsr={props.SetSideBsr} />
      </nav>
      <div className="container-fluid page-body-wrapper">
        <SideBar active={activeSid} />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 stretch-card">
                <div className="card">
                  <div className="card-body">
                    <Home />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default Dash;
