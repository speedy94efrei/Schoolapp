const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const csvParser = require("csv-parser");
require("dotenv").config();



const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const filePath =  "../data/utilisateur.csv"; // Mets ici ton vrai chemin

async function importCsv() {
    const rows = [];

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
            rows.push(row);
        })
        .on("end", async () => {
            console.log(`📥 Import de ${rows.length} utilisateurs en cours...`);

            const { data, error } = await supabase.from("utilisateur").insert(rows);

            if (error) {
                console.error("❌ Erreur lors de l'import :", error);
            } else {
                console.log("✅ Importation réussie :", data);
            }
        });
}

importCsv();
