"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSubscriptionButton } from "@/components/SubscriptionGuard";

export default function SettingsPage() {
  const [qr, setQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const { isLoading: subscriptionLoading, handleClick } = useSubscriptionButton();

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  function startSseSession() {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    try {
      const es = new EventSource("/api/whatsapp/qr/stream");
      eventSourceRef.current = es;

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data || "{}");
          if (data.qr) {
            setQr(data.qr as string);
            setLoading(false);
            setError(null);
          }
        } catch {
        }
      };

      es.onerror = () => {
        setLoading(false);
        setError("Falha no canal de atualização do QR (SSE).");
        es.close();
        eventSourceRef.current = null;
      };
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "Erro ao iniciar sessão via SSE");
    }
  }

  async function handleStartSession() {
    // Verificar assinatura antes de conectar WhatsApp
    const canProceed = handleClick(() => {});
    if (!canProceed) return;
    
    setLoading(true);
    setError(null);
    setQr(null);

    if (typeof window !== "undefined" && "EventSource" in window) {
      startSseSession();
      return;
    }

    try {
      const res = await fetch("/api/whatsapp/qr");
      const data = await res.json();
      if (!res.ok || !data?.qr) {
        throw new Error("Falha ao obter QR Code");
      }
      setQr(data.qr as string);
    } catch (err: any) {
      setError(err.message || "Erro ao iniciar sessão");
    } finally {
      setLoading(false);
    }
  }

  function handleRegenerate() {
    // Verificar assinatura antes de regenerar QR
    const canProceed = handleClick(() => {});
    if (!canProceed) return;
    
    handleStartSession();
  }

  function handleDisconnect() {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setQr(null);
    setError(null);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#181818] bg-[#111111] p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Status do WhatsApp</p>
            <p className="text-sm font-semibold text-slate-50">Desconectado</p>
          </div>
          <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-400">
            offline
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <Button
            className="bg-emerald-500 text-[11px] font-semibold text-white hover:bg-emerald-400"
            onClick={handleStartSession}
            disabled={loading || subscriptionLoading}
          >
            {loading ? "Conectando..." : subscriptionLoading ? "Verificando assinatura..." : "Iniciar sessão"}
          </Button>
          <Button
            variant="outline"
            className="border-transparent bg-red-600/90 text-[11px] font-semibold text-white hover:bg-red-500"
            onClick={handleDisconnect}
          >
            Desconectar
          </Button>
          <Button
            variant="outline"
            className="border-[#2c2c2c] bg-[#1C1C1C] text-[11px] text-slate-200 hover:bg-[#252525]"
            onClick={handleRegenerate}
            disabled={loading || subscriptionLoading}
          >
            {loading ? "Resetando..." : subscriptionLoading ? "Verificando assinatura..." : "Resetar sessão / Regenerar QR"}
          </Button>
        </div>
        {error && (
          <p className="mt-3 text-xs text-red-400">{error}</p>
        )}
        {qr && (
          <div className="mt-4 flex justify-center">
            <img
              src={qr}
              className="mx-auto h-64 w-64"
              alt="QR Code do WhatsApp"
            />
          </div>
        )}
      </section>
    </div>
  );
}
