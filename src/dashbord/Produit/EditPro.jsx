import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./produit.scss";
import NavBar from "../NavBar/NavBar";
import SideBar from "../sideBar/SideBar";
function EditPro(props) {
  const [activeSid, setActiveSide] = useState(false);
  window.onscroll = () => {
    setActiveSide(false);
  };
  const [info, setinfo] = useState({
    nom: "",
    description: "",
    marque: "",
    categories_parent: "",
    idC: "",
    prix: "",
    prix_ofrire: "",
    brefDesc: "",
    Quantite: "",
    tendence: "",
    Promotion: "",
    datePromo: "",
    Glissier: "",
  });
  console.log(info.tendence);
  const [image, setimage] = useState([]);
  const [size, setsize] = useState([]);
  const Check = (e) => {
    if (!size.includes(e.target.value)) {
      setsize([...size, e.target.value]);
    } else {
      setsize([...size.filter((item) => item !== e.target.value)]);
    }
  };
  const Img = (e) => {
    setimage(e.target.files);
  };

  const { id } = useParams();
  async function SendData(e) {
    let fil = [];
    for (let index = 0; index < image.length; index++) {
      fil.push(image[index]);
    }
    // let flag = true;
    e.preventDefault();
    let imgPr = image[0];
    console.log(imgPr);
    // try {
    let formdata = {
      nom: info.nom,
      description: info.description,
      marque: info.marque,
      categories_parent: info.categories_parent,
      idC: info.idC,
      price: info.prix,
      price_ofrire: info.prix_ofrire,
      brefDesc: info.brefDesc,
      tendence: info.tendence,
      Quantite: info.Quantite,
      size: size,
      fil: fil,
      image: imgPr,
      datePromo: info.datePromo,
      Promotion: info.Promotion,
      Glissier: info.Glissier,
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
        window.location.pathname = "/dash/produit/";
        // console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // prendre info produit
  useEffect(() => {
    fetchProduit();
  }, []);

  const fetchProduit = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/Produit/show/" + id)
      .then(({ data }) => {
        const {
          nom,
          description,
          categories_parent,
          marque,
          idC,
          brefDesc,
          price,
          price_of,
          Promotion,
          Quantite,
          datePromo,
          Glissier,
        } = data.produit;
        setinfo({
          nom: nom,
          description: description,
          marque: marque,
          categories_parent: categories_parent,
          idC: idC,
          prix: price,
          prix_ofrire: price_of,
          brefDesc: brefDesc,
          Promotion: Promotion,
          Quantite: Quantite,
          datePromo: datePromo,
          Glissier: Glissier,
        });
      });
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
                    <div className="table-responsive">
                      <>
                        <div className="card">
                          <div className="card-body">
                            <div>
                              <div className="d-flex justify-content-between align-items-center pb-3">
                                <h4 className="card-title">Modifier Produit</h4>
                              </div>
                            </div>
                            <div className="table-responsive">
                              <form onSubmit={SendData}>
                                <div className="tab-content" id="myTabContent">
                                  <div className="mb-3 mt-3">
                                    <label
                                      htmlFor="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      Nom de produit
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={info.nom}
                                      onChange={(e) =>
                                        setinfo({ nom: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      brève description
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={info.brefDesc}
                                      onChange={(e) =>
                                        setinfo({ brefDesc: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      price
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={info.prix}
                                      onChange={(e) =>
                                        setinfo({ prix: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      price_offrire
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={info.prix_ofrire}
                                      onChange={(e) =>
                                        setinfo({
                                          prix_ofrire: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      Marque
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={info.prix}
                                      onChange={(e) =>
                                        setinfo({ prix: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      Quantite
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={info.Quantite}
                                      onChange={(e) =>
                                        setinfo({ Quantite: e.target.value })
                                      }
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setinfo({
                                          categories_parent: e.target.value,
                                        })
                                      }
                                    >
                                      <option defaultValue>
                                        {" "}
                                        parent de catégorie
                                      </option>
                                      <option value="homme">hommes</option>
                                      <option value="femme">fammes</option>
                                      <option value="enfant">enfants</option>
                                    </select>
                                  </div>
                                  <div className="mb-3">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setinfo({ idC: e.target.value })
                                      }
                                    >
                                      <option defaultValue>
                                        {" "}
                                        sélectionner catégorie
                                      </option>
                                      {CatEnfan.filter(
                                        (item) =>
                                          item.cat_prents ===
                                          info.categories_parent
                                      ).map((e, key) => (
                                        <>
                                          <option key={key} value={e.id}>
                                            {e.nom}
                                          </option>
                                        </>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      description
                                    </label>
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      onChange={(e) =>
                                        setinfo({
                                          description: e.target.value,
                                        })
                                      }
                                      value={info.description}
                                    ></textarea>
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      Taille
                                    </label>{" "}
                                    <br />
                                    <input
                                      type="checkbox"
                                      onChange={(e) => Check(e)}
                                      name="size"
                                      value="M"
                                      id=""
                                      className="ms-3 me-1"
                                    />
                                    <label>M</label>
                                    <input
                                      type="checkbox"
                                      onChange={(e) => Check(e)}
                                      name="size"
                                      value="S"
                                      id=""
                                      className="ms-3 me-1"
                                    />
                                    <label>S</label>
                                    <input
                                      type="checkbox"
                                      onChange={(e) => Check(e)}
                                      name="size"
                                      value="L"
                                      id=""
                                      className="ms-3 me-1"
                                    />
                                    <label>L</label>
                                    <input
                                      type="checkbox"
                                      onChange={(e) => Check(e)}
                                      name="size"
                                      value="XL"
                                      id=""
                                      className="ms-3 me-1"
                                    />
                                    <label>XL</label>
                                    <input
                                      type="checkbox"
                                      onChange={(e) => Check(e)}
                                      name="size"
                                      value="Xll"
                                      id=""
                                      className="ms-3 me-1"
                                    />
                                    <label>XLL</label>
                                  </div>
                                  <div className="mb-3">
                                    <input
                                      type="file"
                                      name="file"
                                      id="file"
                                      class="inputfile"
                                      onChange={(e) => Img(e)}
                                      multiple
                                    />
                                    <label for="file">
                                      image <i class="fa-solid fa-upload"></i>
                                    </label>
                                  </div>
                                </div>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Modifier un produit
                                </button>
                              </form>
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
  );
}

export default EditPro;
