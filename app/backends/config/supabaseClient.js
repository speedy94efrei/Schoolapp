import { createClient } from '@supabase/supabase-js';

// Remplace par tes propres clés Supabase
const SUPABASE_URL = 'https://xyzcompany.supabase.co';
const SUPABASE_ANON_KEY = 'public-anon-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Ajoute cet export par défaut
export default supabase;
