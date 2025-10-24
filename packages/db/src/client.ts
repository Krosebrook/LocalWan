import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function getSupabaseClient(
  supabaseUrl: string,
  supabaseKey: string
) {
  return createClient<Database>(supabaseUrl, supabaseKey);
}

export function getSupabaseServerClient(
  supabaseUrl: string,
  serviceRoleKey: string
) {
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
