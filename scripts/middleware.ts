import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {
  const token = await getToken({ req });

  const restrictedPaths = ["/dashboard", "/agentes", "/mensagens"];

  if (restrictedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    // For now, we'll check if user has an active subscription via Stripe
    // You might want to add subscription info to the JWT token or check via API
    // This is a simplified check - in production you'd verify subscription status
    if (!token.subscriptionActive) {
      return NextResponse.redirect(new URL("/billing", req.url));
    }
  }

  return NextResponse.next();
}
