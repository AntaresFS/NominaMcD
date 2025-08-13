import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Configuración del cliente Supabase
/**
 * persistSession: true  -> “Recordarme” (usa localStorage)
 * persistSession: false -> Sesión de pestaña (sessionStorage)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // si el usuario desmarca “recordarme”, cambia esto a false
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});