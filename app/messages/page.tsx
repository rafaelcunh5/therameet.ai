"use client";

import { useState, useEffect } from "react";

export default function MessagesPage() {
  const [businessInfo, setBusinessInfo] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [mounted, setMounted] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Carregar informações do negócio do localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("business_info");
      if (saved) {
        setBusinessInfo(saved);
      }
    }
  }, []);

  const handleSaveBusinessInfo = () => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("business_info", businessInfo);
      setSaveMessage("Informações salvas com sucesso!");
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleSendMessage = () => {
    if (mounted && message.trim()) {
      // Simular resposta da IA baseada nas informações do negócio
      let aiResponse = `Recebi sua mensagem: "${message}".\n\n`;
      
      if (businessInfo.trim()) {
        aiResponse += `Baseado nas informações do seu negócio, posso ajudar com: ${businessInfo.substring(0, 100)}...\n\n`;
      }
      
      aiResponse += `Esta é uma resposta simulada do assistente virtual. Em produção, eu usaria as informações do negócio para fornecer respostas mais personalizadas e relevantes para seus clientes.`;
      
      setResponse(aiResponse);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Configuração do Assistente */}
      <div className="space-y-6">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-50 mb-2">Informações do Negócio</h2>
            <p className="text-sm text-slate-400">
              Adicione informações sobre seu negócio para enriquecer as respostas da IA
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Descreva seu negócio
              </label>
              <textarea
                rows={8}
                placeholder="Descreva seus produtos, serviços, políticas de atendimento, diferenciais, informações sobre preços, etc... Quanto mais detalhes, melhor será o atendimento da sua IA."
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
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSaveBusinessInfo}
                disabled={!mounted}
              >
                Salvar Informações
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat de Teste */}
      <div className="space-y-6">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-50 mb-4">Testar IA</h2>
          <p className="text-sm text-slate-400 mb-4">
            Simule uma conversa com um cliente para ver como sua IA responde
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Pergunta de Teste
              </label>
              <textarea
                rows={4}
                placeholder="Digite uma mensagem que um cliente enviaria... Ex: 'Olá, gostaria de saber mais sobre seus produtos'"
                className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!mounted}
              />
            </div>

            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSendMessage}
              disabled={!mounted || !message.trim()}
            >
              Enviar Pergunta Teste
            </button>
          </div>
        </div>

        {/* Resposta da IA */}
        {response && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Resposta do Assistente</h3>
            <div className="rounded-lg border border-slate-600 bg-slate-900/50 p-4">
              <div className="space-y-2">
                <p className="text-slate-100 whitespace-pre-wrap text-sm leading-relaxed">
                  {response}
                </p>
                <p className="text-xs text-slate-500 pt-2 border-t border-slate-700">
                  Respondido por: <span className="font-medium text-slate-300">Assistente Automático</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
