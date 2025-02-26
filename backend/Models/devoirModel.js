// 📂 models/devoirModel.js
const supabase = require("../config/supabaseClient");

// 🔹 Ajouter un devoir (évite d'insérer `id_devoir`)
const createDevoir = async (devoir) => {
    const { titre, description, datelimite, id_agenda, id_professeur, id_matiere, id_classe } = devoir;

    const { data, error } = await supabase
        .from("_devoir") // ✅ Utilisation du bon nom de table
        .insert([{ titre, description, datelimite, id_agenda, id_professeur, id_matiere, id_classe }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// 🔹 Récupérer les devoirs d'une classe
const getDevoirsByClasse = async (id_classe) => {
    const { data, error } = await supabase
        .from("_devoir")
        .select("id_devoir, titre, description, datelimite, id_matiere") // ✅ Correction ici !
        .eq("id_classe", id_classe);

    if (error) throw error;
    return data;
};

module.exports = { createDevoir, getDevoirsByClasse };
