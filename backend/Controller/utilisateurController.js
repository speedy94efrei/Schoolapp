const { createUtilisateur, getUtilisateurs, deleteUtilisateur, getUtilisateurByCredentials } = require("../Models/utilisateurModel");

// ✅ Connexion Utilisateur
const loginUtilisateur = async (req, res) => {
    const { email, motdepasse } = req.body;

    try {
        const utilisateur = await getUtilisateurByCredentials(email, motdepasse);
        
        if (!utilisateur) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        res.status(200).json({ message: "Connexion réussie", utilisateur });
    } catch (error) {
        console.error("❌ Erreur de connexion :", error);
        res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
    }
};

// ✅ Ajouter un utilisateur
const creerUtilisateur = async (req, res) => {
    try {
        const utilisateur = await createUtilisateur(req.body);
        res.status(201).json({ message: "Utilisateur ajouté avec succès", utilisateur });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur", error: error.message });
    }
};

// ✅ Récupérer tous les utilisateurs
const obtenirUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await getUtilisateurs();
        res.status(200).json(utilisateurs);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error: error.message });
    }
};

// ✅ Supprimer un utilisateur
const supprimerUtilisateur = async (req, res) => {
    const { id_utilisateur } = req.params;
    try {
        const result = await deleteUtilisateur(id_utilisateur);
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error: error.message });
    }
};

module.exports = { loginUtilisateur, creerUtilisateur, obtenirUtilisateurs, supprimerUtilisateur };
