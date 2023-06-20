import React, { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [countcat, setcountcat] = useState(0);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/cat/count").then((res) => {
      setcountcat(res.data);
    });
  }, []);
  // produit
  const [countpro, setcountpro] = useState(0);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/Produit/count").then((res) => {
      setcountpro(res.data);
    });
  }, []);
  
 
  return (
    <>
      {" "}
      <div className="row">
        <div className=" col-md-3 col-sm-6 mb-3">
          <div className="card">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h5 class="card-title">{countcat}</h5>
                <p class="card-text">Catégorie</p>
              </div>
              <div className="icuns-product">
                <i class="fa-solid fa-box-open  menu-icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-md-3 col-sm-6 mb-3">
          <div className="card">
            <div className="card-body d-flex justify-content-between">
              <div>
                <h5 class="card-title">{countpro}</h5>
                <p class="card-text">Produit</p>
              </div>
              <div className="icuns-product">
                <i class="fa-solid fa-box  menu-icon"></i>
              </div>
            </div>
          </div>
        </div>
       
      
      </div>
    </>
  );
}

export default Home;
