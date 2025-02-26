const express = require("express");
const { loginUtilisateur, creerUtilisateur, obtenirUtilisateurs, supprimerUtilisateur } = require("../Controller/utilisateurController");

const router = express.Router();

// ✅ Route pour la connexion
router.post("/login", loginUtilisateur);

// ✅ Route pour ajouter un utilisateur
router.post("/", creerUtilisateur);

// ✅ Route pour récupérer tous les utilisateurs
router.get("/", obtenirUtilisateurs);

// ✅ Route pour supprimer un utilisateur
router.delete("/:id_utilisateur", supprimerUtilisateur);

module.exports = router;
