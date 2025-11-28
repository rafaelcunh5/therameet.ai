// Callback route para OAuth - DESATIVADO TEMPORARIAMENTE
// import { createSupabaseServer } from "@/lib/supabase/server";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");
//   const next = searchParams.get("next") ?? "/dashboard";

//   if (code) {
//     const supabase = createSupabaseServer();
//     const { error } = await supabase.auth.exchangeCodeForSession(code);
    
//     if (!error) {
//       // Redirecionar para dashboard após login/signup bem-sucedido
//       return NextResponse.redirect(`${origin}${next}`);
//     }
//   }

//   // Redirecionar para página de erro em caso de falha
//   return NextResponse.redirect(`${origin}/auth/error`);
// }

// REDIRECIONAR PARA LOGIN ENQUANTO OAUTH ESTIVER DESATIVADO
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/login`);
}
