import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom'
import "./App.css"
import Home from './Home'
import Dash from './dashbord/Dash';
import ProductList from './dashbord/Produit/ListProduit';
import ListCat from './dashbord/Categories/ListCat';
import EditCat from './dashbord/Categories/EditCat';
import CreateCat from './dashbord/Categories/CreateCat';
import CreateProdect from './dashbord/Produit/CreateProdect';
import EditPro from './dashbord/Produit/EditPro';

function App() {
  const [activeSid, setActiveSide] = useState(false);
  window.onscroll = () => {
    setActiveSide(false);
  };
  const [sideBar, SetSideBsr] = useState(false)
  return (
    <div className={`${sideBar ? "sidebar-icon-only" : ""}`}>
      <Router>
        <>
          <Routes>
            <Route path='/'>
              <Route index element={<Home />} />
             {/* dashbord */}
              <Route path='/dash' element={<Dash activeSid={activeSid} setActiveSide={setActiveSide} SetSideBsr={SetSideBsr} />} />
              {/* produit */}
              <Route path='/dash/produit/createProduit' element={<CreateProdect activeSid={activeSid} setActiveSide={setActiveSide} SetSideBsr={SetSideBsr} />} />
              <Route path='/dash/produit' element={<ProductList activeSid={activeSid} setActiveSide={setActiveSide} SetSideBsr={SetSideBsr} />} />
              <Route path='/dash/produit/edit/:id' element={<EditPro activeSid={activeSid} setActiveSide={setActiveSide} SetSideBsr={SetSideBsr} />} />
             {/* categroie */}
              <Route path='/dash/Categorie/editCat/:id' element={<EditCat activeSid={activeSid} setActiveSide={setActiveSide} SetSideBsr={SetSideBsr} />} />
              <Route path='/dash/Categorie/createCat' element={<CreateCat activeSid={activeSid} setActiveSide={setActiveSide} SetSideBsr={SetSideBsr} />} />
              <Route path='/dash/Categorie' element={<ListCat activeSid={activeSid} setActiveSide={setActiveSide} SetSideBsr={SetSideBsr} />} />
          
            </Route>
          </Routes>
        </>
      </Router>
    </div>
  )
}

export default App