"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // eslint-disable-next-line no-console
    console.error("Faltando NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // eslint-disable-next-line no-console
    console.error("Faltando NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// Manter compatibilidade com código existente
export function createSupabaseBrowser() {
  return createClient();
}
