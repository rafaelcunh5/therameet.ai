"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, MessageSquare, Bot, Clock, Activity } from "lucide-react";

export default function DashboardPage() {
  const metrics = [
    {
      title: "Tempo médio de resposta",
      value: "0.5s",
      icon: <Clock className="w-5 h-5" />,
      trend: "down",
      trendValue: "0.5s",
      description: "Melhor que ontem",
      color: "text-emerald-400"
    },
    {
      title: "Mensagens enviadas",
      value: "128",
      icon: <MessageSquare className="w-5 h-5" />,
      trend: "up",
      trendValue: "12%",
      description: "Acima da média",
      color: "text-blue-400"
    },
    {
      title: "Mensagens recebidas",
      value: "342",
      icon: <MessageSquare className="w-5 h-5" />,
      trend: "up",
      trendValue: "8%",
      description: "Crescimento constante",
      color: "text-purple-400"
    },
    {
      title: "Status do assistente",
      value: "Ativo",
      icon: <Bot className="w-5 h-5" />,
      trend: "stable",
      trendValue: "99.9%",
      description: "Uptime excelente",
      color: "text-green-400"
    }
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-50 mb-2">Dashboard</h1>
        <p className="text-slate-400">
          Monitore o desempenho e identifique oportunidades de melhoria.
        </p>
      </div>

      {/* Plan Section */}
      <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl p-6 border border-indigo-500/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                Plano gratuito
              </Badge>
              <span className="text-sm text-slate-400">Limite: 50 mensagens/mês</span>
            </div>
            <p className="text-white font-medium mb-1">
              Faça upgrade para liberar criação de agentes e conexão com WhatsApp.
            </p>
            <p className="text-sm text-slate-400">
              Desbloqueie recursos avançados e remova limitações.
            </p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2">
            Fazer upgrade
          </Button>
        </div>
      </div>

      {/* Metrics Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Aqui estão as métricas do funcionamento do seu assistente.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 hover:bg-slate-900/70 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-slate-800 rounded-lg">
                  {metric.icon}
                </div>
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                  metric.trend === 'up' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : metric.trend === 'down'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'bg-slate-600/20 text-slate-400 border border-slate-600/30'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : (
                    <Activity className="w-3 h-3" />
                  )}
                  {metric.trendValue}
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-slate-400 mb-2">{metric.title}</h3>
              <p className={`text-2xl font-bold mb-1 ${metric.color}`}>{metric.value}</p>
              <p className="text-xs text-slate-500">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">Próximos Passos</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                1
              </div>
              <div>
                <p className="text-sm text-slate-200">Configure seu assistente</p>
                <p className="text-xs text-slate-400">Adicione informações sobre seu negócio</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
                2
              </div>
              <div>
                <p className="text-sm text-slate-200">Teste as respostas</p>
                <p className="text-xs text-slate-400">Simule conversas com clientes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
                3
              </div>
              <div>
                <p className="text-sm text-slate-200">Conecte ao WhatsApp</p>
                <p className="text-xs text-slate-400">Faça upgrade para desbloquear</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">Recursos Disponíveis</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Configuração do assistente</span>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                Ativo
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Teste de conversas</span>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                Ativo
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Conexão WhatsApp</span>
              <Badge variant="secondary" className="bg-slate-800 text-slate-400">
                Bloqueado
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Múltiplos agentes</span>
              <Badge variant="secondary" className="bg-slate-800 text-slate-400">
                Bloqueado
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}