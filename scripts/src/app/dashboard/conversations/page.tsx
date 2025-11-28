'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProtectedFeature } from '@/components/auth/ProtectedFeature';

interface Conversation {
  id: string;
  created_at: string;
  agent_id: string;
}

export default function ConversationsPage() {
  const [token, setToken] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchConversations() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/conversations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      
      if (res.status === 403 && json.requiresUpgrade) {
        // Mostrar modal de upgrade
        return;
      }
      
      if (!res.ok) throw new Error(JSON.stringify(json));
      setConversations(json.data || []);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar conversas');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem('supabase_token');
      if (saved) setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (token && typeof window !== "undefined") {
      localStorage.setItem('supabase_token', token);
      fetchConversations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-50 mb-2">Conversas do WhatsApp</h1>
        <p className="text-slate-400">Visualize todas as conversas do seu assistente</p>
        <Badge variant="outline" className="mt-2">
          🎓 Funcionalidade Premium
        </Badge>
      </div>

      <ProtectedFeature 
        featureName="Ver Conversas do WhatsApp"
        description="Visualize todas as conversas do seu assistente com clientes"
      >
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Token de Acesso
            </label>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Cole aqui o access token do Supabase"
              className="w-full max-w-md rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {loading && (
            <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">Carregando conversas...</p>
            </div>
          )}

          <div className="space-y-2">
            {conversations.length === 0 && !loading && !error && (
              <div className="text-center py-8">
                <p className="text-slate-400">Nenhuma conversa encontrada</p>
                <p className="text-slate-500 text-sm mt-2">As conversas aparecerão aqui quando clientes interagirem com seu WhatsApp</p>
              </div>
            )}
            
            {conversations.map((conversation) => (
              <div 
                key={conversation.id} 
                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-600 hover:border-indigo-500/50 transition-colors"
              >
                <div>
                  <p className="text-slate-50 font-medium">Conversa #{conversation.id.slice(0, 8)}</p>
                  <p className="text-slate-400 text-sm">
                    Iniciada em {new Date(conversation.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <a href={`/dashboard/conversations/${conversation.id}`}>
                    Ver Detalhes
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </ProtectedFeature>
    </div>
  );
}
