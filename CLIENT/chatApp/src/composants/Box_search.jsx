import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
export default function Box_search({ setSearch, setval, setUSer }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const id = localStorage.getItem("userId");

  const onubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.put("http://localhost:5000/api/addami",
        data
      );
      console.log(response.data.message);
      if (response.ok) {
        setisopena(!isopena);
      }
    } catch (error) {
      console.error("Erreur d'insertion:", error);
    }
  };
  const [pro, setProfile] = useState([]);
  // fonction pour rechercher les utilisateur instantanement en utilisant fetch
  const searchUser = async (event) => {
    const id = localStorage.getItem("userId");
    const search = event.target.value;
    setval(search);
    if (search) {
      fetch(`http://localhost:5000/api/users?q=${search}`)
        .then((response) => response.json())
        .then((data) => setSearch(data.filter((q) => q.id_user != id)))
        // gestion des erreurs
        .catch((error) => console.error(error));
    }
    if (search == "") {
      setSearch([]);
    }
  };
  useEffect(() => {
    const us = () => {
      const id = localStorage.getItem("userId");
      // ajoute l'option de recherche instantane associer a la fonction contenu dans le comp
      fetch(`http://localhost:5000/api/listUs/`)
        .then((response) => response.json())
        .then((data) => setUSer(data.filter((user) => user.id_user != id)))
        // gestion des erreurs
        .catch((error) => console.error(error));
      // alert(query.length);
    };
    setInterval(() => {
      us();
      // searchUser();
    }, 1000);
  }, []);
  const [isopen, setOpen] = useState(true);
  const menu = () => {
    setOpen(!isopen);
  };
  const deconnexion = () => {
    localStorage.removeItem("token");
    location.href = "/connexion";
  };
  const [isopenp, setOpenp] = useState(false);
  const profil = () => {
    setOpenp(!isopenp);

    const idpr = localStorage.getItem("userId");
    fetch(`http://localhost:5000/api/pp?id=${idpr}`)
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) =>
        console.error("erreur de profil de l'utilisateur", error)
      );
  };
  const [isopeni, setisopeni] = useState(false);
  const amie = () => {
    setisopeni(!isopeni);
  };
  const [isopena, setisopena] = useState(null);
  const addami = () => {
    setisopena(!isopena);
  };
  // Récupération des utilisateurs lors de la saisie d'un mot clé
  return (
    <>
      <div className="b_seaech">
        <div className="b_b_search">
          <input type="search" placeholder="Search ..." onChange={searchUser} />
          <span className="icon-search"></span>
        </div>
        <span className="icon-ellipsis params" onClick={() => menu()}></span>
        <div className={isopen ? "menu open" : "menu"}>
          <ul>
            <li onClick={() => profil()}>pofile</li>
            <li onClick={() => amie()}>ami(e)s</li>
            <li onClick={() => deconnexion()}>deconnexion</li>
          </ul>
        </div>
      </div>
      <div className={isopenp ? "profil open2" : "profil"}>
        <span className="icon-arrow-left trv" onClick={() => profil()}></span>
        <div className="user">
          <div className="ci">
            <span className="icon-user pp2"></span>
          </div>
        </div>
        <ul>
          <li className="nameP">{pro.map((prof) => prof.nom)}</li>
          <li>
            <a href="">lh;k h fklg </a>
          </li>
          <li>
            <a href="">lh;k h fklg </a>
          </li>
          <li>
            <a href="">lh;k h fklg </a>
          </li>
          <li>
            <a href="">lh;k h fklg </a>
          </li>
          <li>
            <a href="">lh;k h fklg </a>
          </li>
        </ul>
      </div>

      <div className={isopeni ? "amie open3" : "amie"}>
        <span className="icon-arrow-left trv" onClick={() => amie()}></span>
        <span className="icon-user-plus param" onClick={() => addami()}></span>
        <ul className="an">
          {pro.map((proa) => (
            <div className="list cc" key={proa.id_user}>
              <div className="pp">
                <span className="icon-user"></span>
              </div>
              <div className="desc">
                <div className="nad">
                  <p className="name">{proa.nom}</p>
                  <p className="date">12:45</p>
                </div>
                <p className="last-send">bonjour Mr</p>
              </div>
            </div>
          ))}
        </ul>
        <div className={isopena ? "foram open4" : "foram"}>
          <span className="icon-close param2" onClick={() => addami()}></span>
          <form onSubmit={handleSubmit(onubmit)}>
            <p className="tam">Ajouter un ami(e)</p>
            <TextField
              label="email"
              variant="outlined"
              fullWidth
              size="small"
              margin="normal"
              {...register("email", { required: true })}
              error={errors.email && true}
              helperText={errors.email && "Email est requis"}
            /> <input type="hidden" value={id}{...register("id", { required: true })} />
            <Button type="submit" variant="contained" style={{ width: "100%" }}>
              ajouter en tant qu'amie
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
