"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/browser";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const selectedPlan = searchParams?.get("plan") || "";
  const supabase = createClient();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // SEMPRE redirecionar para /pricing após signup
      const redirectUrl = selectedPlan 
        ? (typeof window !== "undefined" ? `${window.location.origin}/pricing?plan=${selectedPlan}` : `/pricing?plan=${selectedPlan}`)
        : (typeof window !== "undefined" ? `${window.location.origin}/pricing` : "/pricing");

      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) throw error;

      // Redirecionar SEMPRE para pricing após signup
      router.push(redirectUrl);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-slate-50">
            Criar conta grátis
          </h1>
          <p className="text-sm text-slate-400">
            Comece a automatizar seu WhatsApp hoje mesmo
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6 space-y-6">
          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Seu e-mail"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-slate-800/50 border-slate-700 text-slate-50 placeholder:text-slate-400"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Sua senha"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="bg-slate-800/50 border-slate-700 text-slate-50 placeholder:text-slate-400"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirmar senha"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                className="bg-slate-800/50 border-slate-700 text-slate-50 placeholder:text-slate-400"
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? "Criando conta..." : "Criar conta grátis"}
            </Button>
          </form>

          <div className="text-center text-xs text-slate-400">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
              Entrar
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
