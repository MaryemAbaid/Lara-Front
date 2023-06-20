import React from "react";
import CreateProdect from "./CreateCat";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import SideBar from "../sideBar/SideBar";

function ListCat(props) {
  const [activeSid, setActiveSide] = useState(false);
  window.onscroll = () => {
    setActiveSide(false);
  };
  // recevoir info de category
  const [CatEnfan, setVoircategory] = useState([]);

  useEffect(() => {
    fetchcategory();
  }, []);

  const fetchcategory = async () => {
    await axios.get("http://127.0.0.1:8000/api/cat").then(({ data }) => {
      setVoircategory(data);
    });
  };

  // delte
  const deleteCat = async (cat) => {
    return window.confirm("Etes-vous sur?")
      ? await axios
          .post(`http://127.0.0.1:8000/api/cat/delete/${cat}`)
          .then(({ data }) => {
            console.log(data.message);
            fetchcategory();
          })
          .catch((eror) => {
            console.log(eror);
          })
      : "";
  };
  return (
    <>
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
                      <div className="table-responsive">
                        <>
                          <div className="card">
                            <Link to="/dash/Categorie/createCat" className="btn btn-primary">
                              Ajouter Un categorie
                            </Link>
                            <div className="card-body">
                              <div>
                                <div className="d-flex justify-content-between align-items-center pb-3">
                                  <h4 className="card-title">
                                    {" "}
                                    Table Categories
                                  </h4>
                                </div>
                                <div>
                                  <form className="d-flex mb-3" role="search">
                                    <input
                                      className="form-control me-2"
                                      type="search"
                                      placeholder="chercher"
                                      aria-label="Search"
                                    />
                                  </form>
                                </div>
                              </div>
                              <div className="table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Id</th>
                                      <th>Nom</th>
                                      <th>image</th>
                                      <th>Parent de catégorie</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {CatEnfan.map((e, s) => (
                                      <tr key={s}>
                                        <td>{e.id}</td>
                                        
                                        <td>{e.nom}</td>
                                        <td>
                                          <img
                                            src={`http://127.0.0.1:8000/categoires/${e.image}`}
                                            width="30px"
                                          />
                                          {e.name}
                                        </td>
                                        <td>{e.cat_prents}</td>
                                        <td className=" d-flex">
                                          <button
                                            className="btn btn-danger me-3"
                                            onClick={() => deleteCat(e.id)}
                                          >
                                            <i className="fa-solid fa-trash"></i>
                                          </button>
                                          <Link
                                            to={`editCat/${e.id}`}
                                            className="btn btn-success"
                                          >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListCat;
