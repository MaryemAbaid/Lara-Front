import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// import swal from 'sweetalert';
import NavBar from "../NavBar/NavBar";
import SideBar from "../sideBar/SideBar";
import "./produit.scss";
function CreateProdect(props) {
  const [activeSid, setActiveSide] = useState(false);
  window.onscroll = () => {
    setActiveSide(false);
  };
  const [nom, setnom] = useState("");
  const [description, setdescription] = useState("");
  const [marque, setmarque] = useState("");
  const [categories_parent, setcategories_parent] = useState("");
  const [idC, setidC] = useState("");
  const [Quantite, setquantite] = useState("");
  const [size, setsize] = useState([]);
  const [prix, setprix] = useState("");
  const [prix_ofrire, setprix_ofrire] = useState("");
  const [brefDesc, setbrefDesc] = useState("");
  const [image, setImage] = useState([]);
  const Check = (e) => {
    if (!size.includes(e.target.value)) {
      setsize([...size, e.target.value]);
    } else {
      setsize([...size.filter((item) => item !== e.target.value)]);
    }
  };
  const images = (e) => {
    setImage(e.target.files);
  };
  async function SendData(e) {
    e.preventDefault();
    let imgPr = image[0];
    let fil = [];
    for (let index = 0; index < image.length; index++) {
      fil.push(image[index]);
    }
    console.log(image);
    console.log(fil);
    // console.log("=============================");
    // console.log(imgPr);
    let information = {
      nom: nom,
      description: description,
      marque: marque,
      categories_parent: categories_parent,
      idC: idC,
      price: prix,
      price_of: prix_ofrire,
      brefDesc: brefDesc,
      Quantite: Quantite,
      size: size,
      imgPr: imgPr,
      fil: fil,
      datePromo: "",
      Promotion: "0",
    };
    // if (flag) {
    try {
      let res = await axios.post(
        "http://127.0.0.1:8000/api/Produit/create",
        information,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // .then((t) => console.log(t.data.message));
      if (res.status === 200) {
        window.location.pathname = "/dash/produit";
      }
    } catch (error) {
      console.log(error);
    }
  }

  // prendre info cat
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
                                <h4 className="card-title">
                                  Ajouter un produit
                                </h4>
                              </div>
                            </div>
                            <form onSubmit={SendData}>
                              <div className="tab-content" id="myTabContent">
                                <div
                                  className="tab-pane fade show active"
                                  id="home-tab-pane"
                                  role="tabpanel"
                                  aria-labelledby="home-tab"
                                  tabindex="0"
                                >
                                  <div className="mb-3 mt-3">
                                    <label
                                      for="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      Nom de produit
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={nom}
                                      onChange={(e) => setnom(e.target.value)}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      for="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      brève description
                                    </label>
                                    <input
                                      type="text"
                                      value={brefDesc}
                                      className="form-control"
                                      onChange={(e) =>
                                        setbrefDesc(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      for="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      prix
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={prix}
                                      onChange={(e) => setprix(e.target.value)}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      for="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      prix_ofrire
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={prix_ofrire}
                                      onChange={(e) =>
                                        setprix_ofrire(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      for="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      Marque
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={marque}
                                      onChange={(e) =>
                                        setmarque(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      for="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      Quantité
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={Quantite}
                                      onChange={(e) =>
                                        setquantite(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      for="exampleInputEmail1"
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
                                    <label>XXL</label>
                                  </div>
                                  <div className="mb-3">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                      onChange={(e) =>
                                        setcategories_parent(e.target.value)
                                      }
                                      value={categories_parent}
                                    >
                                      <option selected> category parent</option>
                                      <option value="homme">hommes</option>
                                      <option value="femme">fammes</option>
                                      <option value="enfant">enfants</option>
                                    </select>
                                  </div>
                                  <div className="mb-3">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                      onChange={(e) => setidC(e.target.value)}
                                    >
                                      <option selected> select child</option>
                                      {CatEnfan.filter(
                                        (item) =>
                                          item.cat_prents === categories_parent
                                      ).map((e) => (
                                        <>
                                          <option key={e.id} value={e.id}>
                                            {e.nom}
                                          </option>
                                        </>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      for="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      description
                                    </label>
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      onChange={(e) =>
                                        setdescription(e.target.value)
                                      }
                                      value={description}
                                    ></textarea>
                                  </div>
                                  <div className="mb-3">
                                    {/* <label
                                      htmlFor="recipient-name"
                                      className="col-form-label"
                                    >
                                      image{" "}
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      id="recipient-name"
                                      multiple
                                      onChange={images}

                                      // value={prix_offer}
                                    /> */}
                                    <input
                                      type="file"
                                      name="file"
                                      id="file"
                                      class="inputfile"
                                      onChange={images}
                                      multiple
                                    />
                                    <label for="file">
                                      image <i class="fa-solid fa-upload"></i>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Ajouter un produit
                              </button>
                            </form>
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

export default CreateProdect;
