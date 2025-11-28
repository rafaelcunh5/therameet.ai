# TheraMeetAI (MVP)

Criador de agentes de IA para WhatsApp focado em terapeutas/consultores.

## Stack
- Next.js 14 (App Router)
- Supabase (DB/Auth + RLS)
- Stripe (subscriptions)
- Abstração LLM (OpenAI opcional)
- Adapters WhatsApp (Meta/Twilio)

## Setup rápido
1. Copie `.env.example` para `.env.local` e preencha os segredos.
2. Instale deps: `pnpm i`
3. Rode migrations no Supabase: `supabase start` e `supabase db reset --db-url <local>` ou `supabase db push`
4. Dev: `pnpm dev`

## Testes (TDD)
- `pnpm test`

## Webhooks (dev)
- Use ngrok: `ngrok http 3000` e configure provedores para `/api/webhooks/whatsapp` e `/api/webhooks/stripe`.

## TODOs de segurança
- Assinaturas de webhooks (Stripe/Meta/Twilio)
- Filtro de conteúdo (blocklist) e fallback humano
- Idempotência em DB (tabela `webhook_events`)

## Estrutura
- `src/pages/api/*` rotas API (MVP)
- `src/lib/*` clientes e adapters
- `scripts/migrations.sql` schema + RLS

## Variáveis
Veja `.env.example`.
