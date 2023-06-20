import React from "react";
import axios from "axios";
import { useState } from "react";
import SideBar from "../sideBar/SideBar";
import NavBar from "../NavBar/NavBar";
// import
function CreateCat(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [catPren, setcatPren] = useState("");
  const [activeSid, setActiveSide] = useState(false);
  window.onscroll = () => {
    setActiveSide(false);
  };

  const IMgSend = (e) => {
    setImage(e.target.files[0]);
  };
  async function Send(e) {
    let flag = true;
    // let img = image.type;
    e.preventDefault();

    try {
      let formdata = {
        nom: name,
        image: image,
        cat_prents: catPren,
      };
      // if (flag) {

      if (name !== "") {
        let res = await axios.post(
          "http://127.0.0.1:8000/api/cat/create",
          formdata,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // .then(t=>console.log(t.response));
        if (res.status === 200) {
          window.location.pathname = "/dash/Categorie";
        }
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
                            <div className="card-body">
                              <div>
                                <div>
                                  <div>
                                    <div>
                                      <h1
                                        className="modal-title fs-5"
                                        id="exampleModalLabel"
                                      >
                                        Ajouter Catégorie
                                      </h1>
                                    </div>
                                    <div className="modal-body">
                                      <form onSubmit={Send} encType="">
                                        <div className="mb-3">
                                          <div>
                                            <label
                                              htmlFor="recipient-name"
                                              className="col-form-label"
                                            >
                                              Nom de catégorie:
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="recipient-name"
                                              value={name}
                                              onChange={(e) =>
                                                setName(e.target.value)
                                              }
                                            />
                                          </div>
                                        </div>

                                        <div className="mb-3">
                                          <label
                                            htmlFor="recipient-name"
                                            className="col-form-label"
                                          >
                                            catégorie
                                          </label>
                                          <select
                                            class="form-select mb-3"
                                            onChange={(e) =>
                                              setcatPren(e.target.value)
                                            }
                                          >
                                            <option selected>
                                              choisissez la catégorie parent
                                            </option>

                                            <option value="homme">
                                              hommes
                                            </option>
                                            <option value="femme">Femmes</option>
                                            <option value="enfant">
                                              Enfants
                                            </option>
                                          </select>
                                        </div>
                                        <div className="mb-3">
                                          <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            class="inputfile"
                                            onChange={IMgSend}

                                          />
                                          <label for="file">
                                            image{" "}
                                            <i class="fa-solid fa-upload"></i>
                                          </label>
                                        </div>
                                        <div className="mb-3">
                                          <button
                                            type="submit"
                                            className="btn btn-primary"
                                          >
                                            Ajouter un Categorie
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
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

export default CreateCat;
