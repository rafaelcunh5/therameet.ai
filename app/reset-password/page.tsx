"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Por favor, insira seu e-mail");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/update-password` : "/update-password",
      });

      if (error) throw error;

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || "Ocorreu um erro ao enviar o e-mail de redefinição");
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
            Esqueci minha senha
          </h1>
          <p className="text-sm text-slate-400">
            Digite seu e-mail e enviaremos um link para redefinir sua senha
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6 space-y-6">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                {loading ? "Enviando..." : "Enviar link de redefinição"}
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
                <h3 className="text-lg font-medium text-slate-50">E-mail enviado!</h3>
                <p className="text-sm text-slate-400">
                  Enviamos um link de redefinição para <strong>{email}</strong>. 
                  Verifique sua caixa de entrada e clique no link para criar uma nova senha.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                className="w-full"
              >
                Voltar para o login
              </Button>
            </div>
          )}

          <div className="text-center text-xs text-slate-400">
            Lembrou sua senha?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
              Entrar
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
