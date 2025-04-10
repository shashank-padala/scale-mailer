
// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

// Check if environment variables are defined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// For development only - if you're running in production, you must set these env variables
const devFallbackUrl = "https://placeholder-project.supabase.co";
const devFallbackKey = "placeholder-anon-key";

// Use the env vars if available, otherwise fallback to dev values with warning
let clientUrl = supabaseUrl || devFallbackUrl;
let clientKey = supabaseAnonKey || devFallbackKey;

// Show warning toast if using fallbacks
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase URL or Anon Key not found in environment variables. Using development fallbacks."
  );
  
  // Using setTimeout to ensure toast is called after the component is mounted
  setTimeout(() => {
    toast.warning(
      "Supabase credentials not configured. Please set up your environment variables to connect to Supabase.",
      {
        duration: 10000,
      }
    );
  }, 1000);
}

export const supabase = createClient(clientUrl, clientKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};
