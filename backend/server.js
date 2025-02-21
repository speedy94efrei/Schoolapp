const { createClient } = require("@supabase/supabase-js");



// 📌 Initialisation de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 📌 Fonction d'importation
async function testInsert() {
    console.log("🛠️ Test d'insertion dans Supabase...");

    const { data, error } = await supabase
        .from("utilisateur")  // Vérifie que "utilisateur" est bien le nom de la table
        .insert([
            {
                nom: "Test",
                prenom: "Utilisateur",
                email: "test.utilisateur@email.com",
                motdepasse: "test123",
                role: "Eleve",
            },
        ]);

    if (error) {
        console.error("❌ Erreur lors de l'insertion :", error);
    } else {
        console.log("✅ Insertion réussie :", data);
    }
}

// ✅ Lancer le test d’insertion
testInsert();


