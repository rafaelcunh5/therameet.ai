"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-slate-100">
            TheraMeet <span className="text-indigo-400">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-slate-50",
                pathname === link.href && "text-slate-50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/signup">Começar agora</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
