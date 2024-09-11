const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const router = express.Router();

// Configuration de MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat",
});

// Route pour l'enregistrement
router.post("/register", async (req, res) => {
  const { nom, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (nom,email, password) VALUES (?,?,?)",
    [nom, email, hashedPassword],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Utilisateur créé" });
    }
  );
});

router.get("/listUS", (req, res) => {
  db.query(
    `SELECT * FROM users`,
    async (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

router.get("/users", (req, res) => {
  // recupere le parametre passer dans l'url
  const search = req.query.q;

  // Verification si la recherche est vide
  if (!search) return res.status(400).json({ message: "Recherche vide" });

  // Verification de la ponctuation dans la recherche
  if (/[^a-zA-Z0-9 ]/.test(search))
    return res.status(400).json({ message: "Recherche invalide" });
  // requte de recherche
  db.query(
    `SELECT * FROM users WHERE nom LIKE '%${search}%'`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

router.put("/offine", (req, res) => {
  const idU = req.body.id;
  const dates = req.body.date;
  db.query(
    `UPDATE users set dernierdate=? WHERE id_user=?`,[dates,idU],
    async (err,results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  )
});
router.get("/userP", (req, res) => {
  const idU = req.query.id;
  db.query(
    `SELECT * FROM users WHERE id_user=${idU}`,
    async (err,results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  )
});
router.get("/pp", (req,res) => {
  const idpr = req.query.id;
  db.query(
    `SELECT * FROM users WHERE id_user=${idpr}`,
    async (err,results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  )
})
router.get("/offineUp", (req,res) => {
  const id = req.query.id;
  db.query(
    `SELECT * FROM users WHERE id_user=${id}`,
    async (err,results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  )
})
router.put("/addami", (req,res) => {
  const emaila = req.body.email;
  const idamie = req.body.id;
  db.query(
    `SELECT * FROM users WHERE email = ?`,
    [emaila],
     (err,results) => {
      if (err) return res.status(500).send(err);
      if(results.length > 0 ){
        const update = "UPDATE users SET idamie = ? WHERE email = ?";
        db.query(update,[idamie,emaila],(err,rows) => {
          if(err){
            res.status(500).send({message: "impossible d'ajouter a votre liste d'ami(e)"});
          }else{
            res.send({message: "amie ajouter"});
          }
        })
      }else{
        return res.status(500).send({message: 'Email introuvable ou incorect'})
      } 
    }
  )
})
router.post("/message", (req,res) => {
  const idcon = req.body.idcon;
  const idres = req.body.idres;
  const mess = req.body.mess;
  const date = new Date();
  const h = date.getHours();
  const min = date.getMinutes();
  const newdate = h+':'+min;
  db.query(
    `INSERT INTO message(iduserCon,iduserRes,contenu,date) VALUES (?,?,?,?)`,
    [idcon,idres,mess,newdate],
     (err,results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: "Utilisateur créé" });
    }
  )
})
router.get("/conve", (req, res) => {
  const idUS = req.query.idUS;
  const idusC = req.query.idusC;
  db.query(
    `SELECT * FROM message WHERE iduserCon=${idUS} AND iduserRes=${idusC} OR iduserCon=${idusC} AND iduserRes=${idUS}`,
    async (err,results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  )
});

// Route pour la connexion
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(401).json({ message: "Utilisateur non trouvé" });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(401).json({ message: "Mot de passe incorrect" });
      const userId = user.id_user;
      const token = jwt.sign({ id: user.id_user }, "votre_secret_jwt", {
        expiresIn: "30d",
      });
      res.json({ token,userId});
    }
  );
});

module.exports = router;
