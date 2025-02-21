const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const csvParser = require("csv-parser");
require("dotenv").config();

const SUPABASE_URL = "https://jfqhohgczksnkrubhcbu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcWhvaGdjemtzbmtydWJoY2J1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTcyNDAyMSwiZXhwIjoyMDUxMzAwMDIxfQ.HAAviPE8GXdM3JVxa2UZg8JVI_b5NHG23YrHTe2-ecE";

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
