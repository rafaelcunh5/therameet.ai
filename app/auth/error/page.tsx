"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-50">
            Erro na autenticação
          </h1>
          <p className="text-sm text-slate-400">
            Ocorreu um erro ao processar sua autenticação. Tente novamente.
          </p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/signup">Tentar novamente</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Voltar para home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
