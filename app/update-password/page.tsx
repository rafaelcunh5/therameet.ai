export const dynamic = "force-dynamic";

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/browser";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const supabase = createClient();

  useEffect(() => {
    // Verificar se há um token na URL
    const accessToken = searchParams?.get('access_token');
    const refreshToken = searchParams?.get('refresh_token');
    
    if (accessToken && refreshToken) {
      // Sessão recuperada da URL - definir a sessão
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
  }, [searchParams, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
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

      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || "Ocorreu um erro ao atualizar sua senha");
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
            Redefinir senha
          </h1>
          <p className="text-sm text-slate-400">
            Crie uma nova senha para sua conta
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6 space-y-6">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Nova senha"
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
                  placeholder="Confirmar nova senha"
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
                {loading ? "Atualizando..." : "Redefinir senha"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-slate-50">Senha atualizada!</h3>
                <p className="text-sm text-slate-400">
                  Sua senha foi redefinida com sucesso. Você já pode fazer login com sua nova senha.
                </p>
              </div>
              <Button
                onClick={() => router.push("/login")}
                className="w-full"
              >
                Fazer login
              </Button>
            </div>
          )}

          <div className="text-center text-xs text-slate-400">
            Não solicitou redefinição?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
              Voltar para o login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
