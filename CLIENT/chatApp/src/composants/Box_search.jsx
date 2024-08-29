import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Box_search({setSearch,setval, setUSer }) {
  // fonction pour rechercher les utilisateur instantanement en utilisant fetch
  const searchUser = async (event) => {
    const id = localStorage.getItem('userId');
    const search = event.target.value;
    setval(search);
    if (search) {
      fetch(`http://localhost:5000/api/users?q=${search}`)
        .then((response) => response.json())
        .then((data) =>setSearch(data.filter(q => q.id_user != id)))
        // gestion des erreurs
        .catch((error) => console.error(error));
    }
      if(search == ''){
        setSearch([]);
      }
  };
  useEffect(() => {
    const us = () => {
    const id = localStorage.getItem('userId');
    // ajoute l'option de recherche instantane associer a la fonction contenu dans le comp
    fetch(`http://localhost:5000/api/listUs/`)
     .then(response => response.json())
     .then(data => setUSer(data.filter(user => user.id_user != id)))
     // gestion des erreurs
     .catch(error => console.error(error));
      // alert(query.length);
    }
    setInterval(() => {
    us();
    // searchUser();
  }, 1000);
  },[]);
  const [isopen,setOpen] = useState(true);
  const menu = () => {
    setOpen(!isopen);
  }
    const deconnexion = () => {
    localStorage.removeItem("token");
    location.href="/connexion";
  };
  // Récupération des utilisateurs lors de la saisie d'un mot clé
  return (
    <>
      <div className="b_seaech">
        <div className="b_b_search">
          <input
            type="search"
            placeholder="Search ..."
            onChange={searchUser}
          />
          <span className="icon-search"></span>
        </div>
        <span className="icon-ellipsis params" onClick={() => menu()}></span>
        <div className={isopen ? "menu open" : "menu"}>
          <ul>
            <li>pofile</li>
            <li>ami(e)s</li>
            <li onClick={() => deconnexion()}>deconnexion</li>
          </ul>
        </div>
      </div>
    </>
  );
}
