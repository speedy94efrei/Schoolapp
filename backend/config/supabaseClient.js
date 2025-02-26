require("dotenv").config({ path: "../.env" });


const { createClient } = require("@supabase/supabase-js");

// Récupère les valeurs depuis .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Erreur : SUPABASE_URL ou SUPABASE_KEY manquant dans .env !");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
