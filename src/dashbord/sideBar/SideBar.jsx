import React from "react";
import { Link } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";
function SideBar(props) {
  return (
    <>
      <nav
        className={`sidebar sidebar-offcanvas ${props.active ? "active" : ""}`}
        id="sidebar"
      >
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/dash">
              <i class="fa-solid fa-house menu-icon"></i>
              <span className="menu-title">Tableau de bord</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dash/Categorie" className="nav-link">
              <i class="fa-solid fa-box-open  menu-icon"></i>
              <span className="menu-title">Catégorie</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/dash/produit" className="nav-link">
              <i class="fa-solid fa-box  menu-icon"></i>
              <span className="menu-title">Produit</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/" className="nav-link">
            <i class="fa-solid fa-right-from-bracket menu-icon"></i>
          
              <span className="menu-title">Se déconnecter</span>
            </Link>
          </li>

         
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
