import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Box_head_mes() {
  const [profil,setProfil] = useState([]);
    const idp = localStorage.getItem("idres");
    const id = localStorage.getItem("userId");
    const [status,setSta] = useState([]);
    const now = new Date();
    const dates = new Date();
    const seconde = now.getSeconds();
    useEffect(() => {
      const updateDate = axios.put(`http://localhost:5000/api/offine`,{
        id: id,
        date: now,
      });
      if(!updateDate){
        console.log("erreur de verification");
      }

      fetch(`http://localhost:5000/api/offineUp?id=${idp}`).
      then(response => response.json()).
      then(data =>setSta(data)).catch(error => console.error("erreur",error));
    }, [seconde]);
      
    useEffect(() => {
       fetch(`http://localhost:5000/api/userP?id=${idp}`).
      then(response => response.json()).
      then(data => {
        setProfil(data);
      }).catch(error => {
        console.error("erreur de selection du profil");
      });
  }, [idp]);
  return (
    <div className="b_head">
      <div className="head">
        <div className="pp">
          <span className="icon-user"></span>
        </div>
        <div className="desc">
          <div className="nad">
            <p className="name">{profil.map(nom => nom.nom)}</p>
          </div>
          <p className="send-last2">en ligne</p>
        </div>
      </div>
      <span className="icon-ellipsis params"></span>
    </div>
  );
}
