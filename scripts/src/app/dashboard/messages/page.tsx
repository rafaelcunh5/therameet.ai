"use client";

import { useState, useEffect } from "react";

export default function DashboardMessagesPage() {
  const [businessInfo, setBusinessInfo] = useState("");
  const [testQuestion, setTestQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Carregar informações salvas do localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("business_info");
      if (saved) {
        setBusinessInfo(saved);
      }
    }
  }, []);

  async function saveBusinessInfo(info: string) {
    console.log("Saving business info:", info);
    // Simulação de salvamento - depois integrar com Supabase
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Informações salvas com sucesso!" });
      }, 1000);
    });
  }

  const handleSaveBusinessInfo = async () => {
    if (!businessInfo.trim()) {
      setSaveMessage("Por favor, preencha as informações do negócio.");
      return;
    }

    setLoading(true);
    try {
      const result = await saveBusinessInfo(businessInfo);
      setSaveMessage((result as any).message || "Informações salvas!");
      
      // Salvar no localStorage também
      if (typeof window !== "undefined") {
        localStorage.setItem("business_info", businessInfo);
      }
      
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage("Erro ao salvar informações.");
    } finally {
      setLoading(false);
    }
  };

  // IA real via API
  const sendTest = async () => {
    setAiResponse("Carregando resposta...");

    const res = await fetch("/api/ai/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: testQuestion,
        businessInfo,
      }),
    });

    const data = await res.json();

    if (data.error) {
      setAiResponse("Erro: " + data.error);
    } else {
      setAiResponse(data.answer);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        {/* Sidebar - Layout do Dashboard */}
        <div className="w-64 bg-slate-900/50 border-r border-slate-800 min-h-screen p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-50 mb-2">Dashboard</h2>
            <p className="text-sm text-slate-400">Gerencie seu assistente</p>
          </div>
          
          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block px-3 py-2 text-sm text-slate-300 rounded-lg hover:bg-slate-800 hover:text-slate-50 transition-colors"
            >
              📊 Visão Geral
            </a>
            <a
              href="/dashboard/messages"
              className="block px-3 py-2 text-sm text-white bg-indigo-600 rounded-lg"
            >
              💬 Mensagens
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-sm text-slate-300 rounded-lg hover:bg-slate-800 hover:text-slate-50 transition-colors"
            >
              ⚙️ Configurações
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-50 mb-2">Assistente Virtual</h1>
              <p className="text-slate-400">Configure e teste as respostas da sua IA</p>
            </div>

            <div className="space-y-8">
              {/* Seção: Informações do Negócio */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-50 mb-2">Informações do Negócio</h2>
                  <p className="text-sm text-slate-400">
                    Descreva seu negócio para personalizar as respostas do assistente
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Descrição do Negócio
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Ex: Tenho uma escola de inglês e quero responder meus clientes de forma cordial. Oferecemos aulas online e presenciais, com foco em conversação..."
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                      value={businessInfo}
                      onChange={(e) => setBusinessInfo(e.target.value)}
                      disabled={!mounted}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      {saveMessage || `${businessInfo.length} caracteres`}
                    </span>
                    <button
                      onClick={handleSaveBusinessInfo}
                      disabled={loading || !mounted}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      {loading ? "Salvando..." : "Salvar Informações"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Seção: Testar IA */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-50 mb-2">Testar IA</h2>
                  <p className="text-sm text-slate-400">
                    Simule uma conversa para ver como sua IA responderia
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Pergunta de Teste
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Quais são os horários das aulas?"
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      value={testQuestion}
                      onChange={(e) => setTestQuestion(e.target.value)}
                      disabled={!mounted}
                      onKeyPress={(e) => e.key === 'Enter' && sendTest()}
                    />
                  </div>

                  <button
                    onClick={sendTest}
                    disabled={!mounted || !testQuestion.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Enviar Pergunta Teste
                  </button>

                  {/* Resposta da IA */}
                  {aiResponse && (
                    <div className="mt-6 rounded-lg border border-slate-600 bg-slate-900/50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">AI</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-slate-200 mb-2">Resposta do Assistente</h4>
                          <p className="text-slate-100 text-sm leading-relaxed whitespace-pre-wrap">
                            {aiResponse}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
