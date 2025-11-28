"use client";

import { createSupabaseBrowser } from "@/lib/supabase/browser";

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
