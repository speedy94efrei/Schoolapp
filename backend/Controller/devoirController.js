const { createDevoir, getDevoirsByClasse } = require("../Models/devoirModel"); // ✅ Correction ici

// ✅ Ajouter un devoir
const creerDevoir = async (req, res) => {
    try {
        console.log("📌 Données reçues :", req.body); // ✅ Vérifier les données envoyées
        const devoir = await createDevoir(req.body); // ✅ Correction ici
        res.status(201).json({ message: "Devoir ajouté avec succès", devoir });
    } catch (error) {
        console.error("❌ Erreur lors de l'ajout du devoir :", error);
        res.status(500).json({ message: "Erreur lors de l'ajout du devoir", error: error.message });
    }
};

// 🟢 Récupérer les devoirs d'une classe
const obtenirDevoirsClasse = async (req, res) => {
    const { id_classe } = req.params;
    try {
        console.log("📌 Recherche des devoirs pour la classe :", id_classe); // ✅ Ajout de logs pour debug
        const devoirs = await getDevoirsByClasse(id_classe);
        res.status(200).json(devoirs);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des devoirs :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des devoirs", error: error.message });
    }
};

module.exports = { creerDevoir, obtenirDevoirsClasse };
