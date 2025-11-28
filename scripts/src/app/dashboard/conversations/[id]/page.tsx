'use client';

import { useEffect, useState } from 'react';

interface Message {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

interface Props {
  params: { id: string };
}

export default function ConversationDetailPage({ params }: Props) {
  const conversationId = params.id;
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [to, setTo] = useState('');
  const [agentId, setAgentId] = useState('');

  async function fetchMessages() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(json));
      setMessages(json.data || []);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar mensagens');
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
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !content || !to || !agentId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ agentId, to, content }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(json));
      setContent('');
      await fetchMessages();
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar mensagem');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 4 }}>Supabase access token (Bearer)</label>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="cole aqui o access token do Supabase"
          style={{ width: '100%', maxWidth: 480 }}
        />
      </div>

      <h2>Mensagens da conversa</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Carregando...</p>}

      <ul>
        {messages.map((m) => (
          <li key={m.id} style={{ marginBottom: 4 }}>
            <strong>{m.role}</strong>: {m.content}{' '}
            <small>({new Date(m.created_at).toLocaleString()})</small>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSend} style={{ marginTop: 24 }}>
        <h3>Enviar mensagem via WhatsApp</h3>
        <div style={{ marginBottom: 8 }}>
          <input
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            placeholder="ID do agente"
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Número do cliente (ex: 55XXXXXXXXXXX)"
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Mensagem"
            rows={3}
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar via WhatsApp'}
        </button>
      </form>
    </div>
  );
}
