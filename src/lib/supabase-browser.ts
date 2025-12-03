"use client";

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

// O app continua funcionando, mas o login não vai funcionar corretamente
// até que as variáveis de ambiente públicas sejam configuradas.
// Mantemos o aviso, mas o client em si nunca será null.
// eslint-disable-next-line no-console
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    "Supabase client not fully configured: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local",
  );
}

export const supabaseBrowser = createSupabaseBrowser();
