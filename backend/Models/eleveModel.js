// 📂 models/eleveModel.js
const  supabase  = require("../config/supabaseClient"); // ✅ Assure-toi que ce chemin est correct

// 🔹 Récupérer les informations d'un élève
const getEleveById = async (idEleve) => {
    const { data, error } = await supabase
        .from("eleve") 
        .select("id_eleve, id_classe, id_utilisateur")
        .eq("id_eleve", idEleve)
        .single();
    if (error) throw error;
    return data;
};

// 🔹 Récupérer les notes d'un élève
const getNotesByEleve = async (idEleve) => {
    const { data, error } = await supabase
        .from("note_")
        .select("id_note_, id_matiere, valeur")
        .eq("id_eleve", idEleve);
    if (error) throw error;
    return data;
};

// 🔹 Récupérer les devoirs d'un élève
const getDevoirsByEleve = async (idEleve) => {
    // 🔹 Récupérer `id_classe` de l'élève
    const { data: classeData, error: classeError } = await supabase
        .from("eleve")
        .select("id_classe")
        .eq("id_eleve", idEleve)
        .single();
    
    if (classeError) throw classeError;
    const idClasse = classeData.id_classe;

    // 🔹 Récupérer les devoirs de la classe
    const { data, error } = await supabase
        .from("devoir")
        .select("id_devoir, titre, description, datelimite, id_matiere")
        .eq("id_classe", idClasse);

    if (error) throw error;
    return data;
};

const getCoursByEleve = async (idEleve) => {
    // 🔹 Récupérer `id_classe` de l'élève
    const { data: classeData, error: classeError } = await supabase
        .from("eleve")
        .select("id_classe")
        .eq("id_eleve", idEleve)
        .single();
    
    if (classeError) throw classeError;
    const idClasse = classeData.id_classe;

    // 🔹 Récupérer les cours de la classe
    const { data, error } = await supabase
        .from("agenda")
        .select("id_agenda, dateagenda, heuredebut, heurefin, id_matiere, id_professeur")
        .eq("id_classe", idClasse)
        .order("dateagenda", { ascending: true });

    if (error) throw error;
    return data;
};


module.exports = { getEleveById, getNotesByEleve, getDevoirsByEleve, getCoursByEleve };
