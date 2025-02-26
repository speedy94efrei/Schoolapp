const express = require("express");
const supabase = require("../config/supabaseClient");

const router = express.Router();

// 🔹 Récupérer tous les élèves de la classe 1 avec les infos des utilisateurs
router.get("/classe/1", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("eleve")
      .select("id_eleve, id_classe, utilisateur: id_utilisateur (nom, prenom, email)")
      .eq("id_classe", 1);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des élèves :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des élèves" });
  }
});

module.exports = router;
