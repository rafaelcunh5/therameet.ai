'use client';

import { createBrowserClient } from '@supabase/ssr';

export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// compatibilidade com código antigo
export function createClient() {
  return createSupabaseBrowser();
}
