// 📂 Fichier: controllers/eleveController.js
const { getEleveById, getNotesByEleve, getDevoirsByEleve, getCoursByEleve } = require("../Models/eleveModel");

// 📌 Récupérer toutes les informations nécessaires pour un élève
const getEleveData = async (req, res) => {
    try {
        const { idEleve } = req.params;
        
        // Récupération des données
        const eleve = await getEleveById(idEleve);
        const notes = await getNotesByEleve(idEleve);
        const devoirs = await getDevoirsByEleve(idEleve);
        const cours = await getCoursByEleve(idEleve);
        
        // Réponse consolidée
        res.json({
            eleve,
            notes,
            devoirs,
            cours
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getEleveData };