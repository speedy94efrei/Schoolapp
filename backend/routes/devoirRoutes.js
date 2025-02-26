const express = require("express");
const { creerDevoir, obtenirDevoirsClasse } = require("../Controller/devoirController"); // Vérifie la casse !


const router = express.Router();

// 🛠 Ajouter un devoir
router.post("/", creerDevoir);

// 🛠 Récupérer les devoirs d'une classe
router.get("/:id_classe", obtenirDevoirsClasse);

module.exports = router;
