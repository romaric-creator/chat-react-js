import axios from "axios";
import React from "react";
import { useEffect } from "react";
export default function List_us({ query, val, user }) {
  const openchat = (idres) => {
    localStorage.setItem("idres", idres);
  };
  return (
    // affiche les utilisateur ici sauf celui de l'utilisateur connecter
    <div className="b_list">
      {query.length > 0 ? (
        query.map((query) => (
          <div
            className="list"
            key={query.id_user}
            onClick={() => openchat(query.id_user)}
            id="bme"
          >
            <div className="pp">
              <span className="icon-user"></span>
            </div>
            <div className="desc">
              <div className="nad">
                <p className="name">{query.nom}</p>
                <p className="date">12:45</p>
              </div>
              <p className="last-send">bonjour Mr</p>
            </div>
          </div>
        ))
      ) : query.length == 0 && val.length > 0 ? (
        <p align="center">Aucun resultat</p>
      ) : (
        user.map((user) => (
          <div
            className="list"
            key={user.id_user}
            onClick={() => openchat(user.id_user)}
          >
            <div className="pp">
              <span className="icon-user"></span>
            </div>
            <div className="desc">
              <div className="nad">
                <p className="name">{user.nom}</p>
                <p className="date">12:45</p>
              </div>
              <p className="last-send">bonjour Mr</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
