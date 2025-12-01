import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { pathname } = nextUrl;

  // Cookie definido após login com Supabase
  const accessToken = cookies.get('sb-njlyaswdgvwdfbqbyyys-auth-token')?.value;

  // Rotas que exigem login (mas não necessariamente assinatura)
  const protectedRoutes = [
    '/dashboard',
    '/agents',
    '/messages',
    '/settings',
    '/whatsapp',
    '/integrations'
  ];
  
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  if (isProtectedRoute && !accessToken) {
    // Usuário não está logado - redirecionar para login
    const loginUrl = new URL('/login', req.url);
    const redirectTo = pathname;
    if (redirectTo !== '/') {
      loginUrl.searchParams.set('redirect', redirectTo);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Permitir acesso - a verificação de assinatura será feita no componente
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/agents/:path*', 
    '/messages/:path*',
    '/settings/:path*',
    '/whatsapp/:path*',
    '/integrations/:path*'
  ],
};
