import React from "react";
import "./produit.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../sideBar/SideBar";
function ProductList(props) {
  const [activeSid, setActiveSide] = useState(false);
  window.onscroll = () => {
    setActiveSide(false);
  };

  // firsth prti
  const [produit, setproduit] = useState([]);

  const fetchproduit = async () => {
    await axios.get("http://127.0.0.1:8000/api/Produit").then(({ data }) => {
      setproduit(data);
    });
  };
  useEffect(() => {
    fetchproduit();
  }, []);

  // =====================

  // delete Produit
  const deleteProduit = async (produit) => {
    return window.confirm("")
      ? await axios
          .post(`http://127.0.0.1:8000/api/Produit/delete/${produit}`)
          .then(({ data }) => {
            console.log(data.message);
            fetchproduit();
          })
          .catch((eror) => {
            console.log(eror);
          })
      : "";
  };
  // search
  const [search, setSearch] = useState("");
  const [active, setactive] = useState(false);
  const [tendace, settendace] = useState("");
  const [Glissier, setGlissier] = useState("");
  const [Promotion, setPromotion] = useState(0);
  const [datePro, setdatePro] = useState("");
  const [id, setID] = useState("");
  const showProduit = (id) => {
    setactive(true);
    setID(id);
  };
  const [activeUp, setactiveUP] = useState(false);
  const EditProduit = (id, Glissier, Tendence, Promotion, date) => {
    setactiveUP(true);
    setID(id);
    setGlissier(Glissier);
    settendace(Tendence);
    setPromotion(Promotion);
    setdatePro(date);
  };
  // update
  async function SendData(e) {
    // let flag = true;
    e.preventDefault();

    // try {
    let formdata = {
      tendence: tendace,
      datePromo: datePro,
      Promotion: Promotion,
      Glissier: Glissier,
    };

    try {
      let res = await axios.post(
        "http://127.0.0.1:8000/api/Produit/update/" + id,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // .then((t) => console.log(t.data.message));
      if (res.status === 200) {
        // window.location.pathname = "/dash/produit/";
        setactiveUP(false);
        fetchproduit();

        // console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
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
                            <Link
                              to="createProduit"
                              className="btn btn-primary"
                            >
                              Ajouter Un Produit
                            </Link>
                            <div className="card-body">
                              <div>
                                <div className="d-flex justify-content-between align-items-center pb-3">
                                  <h4 className="card-title">
                                    Tableau Produit
                                  </h4>
                                </div>
                                <div>
                                  <form className="d-flex mb-3" role="search">
                                    <input
                                      className="form-control me-2"
                                      type="search"
                                      placeholder="Chercher"
                                      aria-label="Search"
                                      onChange={(e) =>
                                        setSearch(e.target.value)
                                      }
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
                                      <th>brève Description</th>
                                      <th>prix</th>
                                      <th>prix_ofrire</th>
                                      <th>Marque</th>
                                      <th>Catégorie Enfant</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {produit
                                      .filter((item) => {
                                        return search.toLowerCase() === ""
                                          ? item
                                          : item.nomP
                                              .toLowerCase()
                                              .includes(search);
                                      })
                                      .map((e, s) => (
                                        <tr key={s}>
                                          <td>{e.idPro}</td>
                                          <td>{e.nomP}</td>
                                          <td>
                                            <img
                                              src={`http://127.0.0.1:8000/produit/${e.imageP}`}
                                              width="30px"
                                            />
                                          </td>
                                          <td>{e.categories_parent}</td>
                                          <td>{e.brefDesc}</td>
                                          <td>{e.price}</td>
                                          <td>{e.price_of}</td>
                                          <td>{e.marque}</td>
                                          <td>{e.nameCat}</td>
                                          <td
                                            style={{ width: "3rem !important" }}
                                            className=" d-flex justify-content-between"
                                          >
                                            <button
                                              className="btn btn-success me-3"
                                              onClick={() =>
                                                showProduit(e.idPro)
                                              }
                                            >
                                              <i className="fa-solid fa-eye"></i>
                                            </button>
                                            <button
                                              className="btn btn-danger me-3"
                                              onClick={() =>
                                                deleteProduit(e.idPro)
                                              }
                                            >
                                              <i className="fa-solid fa-trash"></i>
                                            </button>
                                            <button
                                              className="btn btn-success me-3 Promotion"
                                              onClick={() =>
                                                EditProduit(
                                                  e.idPro,
                                                  e.Glissier,
                                                  e.tendence,
                                                  e.Promotion,
                                                  e.datePromo
                                                )
                                              }
                                            >
                                              <i class="fa-solid fa-pen"></i>{" "}
                                              <span>
                                                modifier Promotion et{" "}
                                              </span>
                                            </button>
                                            <Link
                                              to={`edit/${e.idPro}`}
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

                            <section
                              class={`form-container ${active ? "active" : ""}`}
                            >
                              <form action="" method="post">
                                <i
                                  class="fa-solid fa-x"
                                  id="delete"
                                  onClick={() => setactive((active) => !active)}
                                ></i>
                                <div className="table-responsive">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th>id</th>
                                        <th>tendence</th>
                                        <th>description</th>
                                        <th>Quantite</th>
                                        <th>Publicite</th>
                                        <th>Glissier</th>
                                        <th>Promotion</th>
                                        <th>date fin Promotion</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {produit
                                        .filter((item) => item.idPro == id)
                                        .map((e, s) => (
                                          <tr key={s}>
                                            <td>{e.idPro}</td>
                                            <td>{e.tendence}</td>
                                            <td>{e.description}</td>
                                            <td>{e.Quantite}</td>
                                            <td>{e.Quantite}</td>
                                            <td>
                                              {e.Glissier == 0
                                                ? "non active"
                                                : "active"}
                                            </td>
                                            <td> {e.Promotion}</td>
                                            <td>{e.datePromo}</td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                              </form>
                            </section>
                            <section
                              class={`form-container ${
                                activeUp ? "active" : ""
                              }`}
                            >
                              <form
                                action=""
                                method="post"
                                className="pt-3"
                                onSubmit={SendData}
                              >
                                <i
                                  class="fa-solid fa-x"
                                  id="delete"
                                  onClick={() =>
                                    setactiveUP((activeUp) => !activeUp)
                                  }
                                ></i>
                                <div className="table-responsive mt-3 pe-3 ps-3">
                                  <>
                                    {produit
                                      .filter((item) => item.idPro == id)
                                      .map((e) => (
                                        <>
                                          <div className="mb-3">
                                            <select
                                              className="form-select"
                                              aria-label="Default select example"
                                              onChange={(e) =>
                                                settendace(e.target.value)
                                              }
                                            >
                                              <option defaultValue>
                                                Tendence
                                              </option>
                                              <option value="Active">
                                                Active
                                              </option>
                                              <option value="nonActive">
                                                Non Active
                                              </option>
                                            </select>
                                          </div>
                                          <div className="mb-3">
                                            <select
                                              className="form-select"
                                              aria-label="Default select example"
                                              onChange={(e) =>
                                                setGlissier(e.target.value)
                                              }
                                            >
                                              <option defaultValue>
                                                {" "}
                                                Glissier
                                              </option>
                                              <option value="Active">
                                                Active
                                              </option>
                                              <option value="nonActive">
                                                Non Active
                                              </option>
                                            </select>
                                          </div>
                                          <div className="mb-3">
                                            <label
                                              htmlFor="exampleInputEmail1"
                                              className="form-label"
                                              style={{ width: "100%",textAlign:"start" }}
                                            >
                                              Promotion
                                            </label>
                                            <input
                                              type="number"
                                              className="form-control"
                                              value={Promotion}
                                              onChange={(e) =>
                                                setPromotion(e.target.value)
                                              }
                                            />
                                          </div>

                                          <div className="mb-3">
                                            <label
                                              htmlFor="exampleInputEmail1"
                                              className="form-label"
                                              style={{ width: "100%",textAlign:"start" }}
                                            >
                                              date Promotion
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              value={datePro}
                                              onChange={(e) =>
                                                setdatePro(e.target.value)
                                              }
                                            />
                                          </div>
                                          <button
                                            type="submit"
                                            className="btn btn-success"
                                          >
                                            Modifier un produit
                                          </button>
                                        </>
                                      ))}
                                  </>
                                </div>
                              </form>
                            </section>
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

export default ProductList;
