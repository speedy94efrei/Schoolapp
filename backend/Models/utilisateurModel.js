const supabase = require("../config/supabaseClient");

// ✅ Ajouter un utilisateur
const createUtilisateur = async (utilisateur) => {
    const { nom, prenom, email, motdepasse, role } = utilisateur;

    const { data, error } = await supabase
        .from("utilisateur")
        .insert([{ nom, prenom, email, motdepasse, role }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// ✅ Récupérer tous les utilisateurs
const getUtilisateurs = async () => {
    const { data, error } = await supabase
        .from("utilisateur")
        .select("id_utilisateur, nom, prenom, email, role");

    if (error) throw error;
    return data;
};

// ✅ Supprimer un utilisateur
const deleteUtilisateur = async (id_utilisateur) => {
    const { data, error } = await supabase
        .from("utilisateur")
        .delete()
        .eq("id_utilisateur", id_utilisateur);

    if (error) throw error;
    return data;
};

// ✅ Vérifier l'utilisateur avec email et mot de passe
const getUtilisateurByCredentials = async (email, motdepasse) => {
    const { data, error } = await supabase
        .from("utilisateur")
        .select("id_utilisateur, nom, prenom, email, role")
        .eq("email", email)
        .eq("motdepasse", motdepasse)
        .single();

    if (error) throw error;
    return data;
};

// ✅ Vérifie que toutes les fonctions sont bien exportées
module.exports = { createUtilisateur, getUtilisateurs, deleteUtilisateur, getUtilisateurByCredentials };
