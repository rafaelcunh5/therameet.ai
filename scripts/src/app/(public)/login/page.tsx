"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();

      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });
      if (authError || !data.session) {
        throw authError || new Error("Falha ao autenticar");
      }

      // Persistir o access token para o dashboard usar nas chamadas à API
      if (typeof window !== "undefined") {
        window.localStorage.setItem("supabase_token", data.session.access_token);
      }

      router.push("/dashboard");
    } catch (err: any) {
      // Exibe a mensagem real vinda do Supabase quando possível
      const message = err?.message || "Erro ao entrar. Tente novamente.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-slate-50">Entrar</h1>
          <p className="text-sm text-slate-400">
            Acesse seu painel da TheraMeetAI e gerencie suas automações de WhatsApp.
          </p>
        </div>
        
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6 space-y-6">
          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200" htmlFor="email">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Seu e-mail"
                className="bg-slate-800/50 border-slate-700 text-slate-50 placeholder:text-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200" htmlFor="password">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Sua senha"
                className="bg-slate-800/50 border-slate-700 text-slate-50 placeholder:text-slate-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="text-center">
            <Link 
              href="/reset-password" 
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Esqueci minha senha
            </Link>
          </div>

          <div className="text-center text-xs text-slate-400">
            Não tem uma conta?{" "}
            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300">
              Criar conta
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
