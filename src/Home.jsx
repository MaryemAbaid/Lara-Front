import React from "react";
import { useState } from "react";

function Home() {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  function sund(e) {
    e.preventDefault();
    if (name === "admin@gmail.com" && password === "admin") {
      window.location.pathname = "/dash";
    } else {
      alert("password or name incoreect");
    }
  }
  return (
    <>
      <div class="center">
        <h1>Connexion</h1>
        <form method="post" onSubmit={sund}>
          <div class="txt_field">
            <input
              type="email"
              required
              onChange={(e) => setname(e.target.value)}
            />
            <span></span>
            <label>email</label>
          </div>
          <div class="txt_field">
            <input
              type="password"
              required
              onChange={(e) => setpassword(e.target.value)}
            />
            <span></span>
            <label>Mot de passe</label>
          </div>
          <input type="submit" value="Connexion" />
        </form>
      </div>
    </>
  );
}

export default Home;
