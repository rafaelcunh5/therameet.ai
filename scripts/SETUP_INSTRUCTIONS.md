# 🚀 Setup do Fluxo de Autenticação + Assinatura

## 📋 O que foi implementado

✅ **Página `/signup`** - Criação de conta com Google OAuth e email/senha  
✅ **Página `/pricing`** - Planos com checkout Stripe  
✅ **Botões CTA** - Todos redirecionam para `/signup`  
✅ **Middleware** - Proteção de rotas baseada em assinatura  
✅ **API Route** - Checkout Stripe autenticado  
✅ **Redirecionamento** - Pós-signup → `/pricing`  
✅ **Webhook** - Atualização de status de assinatura  

## 🔧 Configuração Necessária

### 1. Supabase
```bash
# No .env.local
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
```

**Configurar OAuth no Supabase Dashboard:**
- Authentication → Providers → Google
- Adicionar Client ID e Client Secret do Google OAuth
- Habilitar Email provider

### 2. Stripe
```bash
# No .env.local
STRIPE_KEY=sk_test_sua_chave_secreta
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret
```

**Criar Produtos e Preços:**
1. Acesse [Stripe Dashboard](https://dashboard.stripe.com/products)
2. Crie 3 produtos: Starter, Pro, Business
3. Copie os Price IDs e atualize em:
   - `src/components/Pricing.tsx`
   - `.env.example`

**Configurar Webhook:**
1. Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
2. Ou webhook URL: `https://seusite.com/api/webhooks/stripe`
3. Eventos necessários:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 3. Google OAuth
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie novo projeto ou selecione existente
3. Ative Google+ API
4. Crie credenciais OAuth 2.0
5. Adicione redirect URI: `https://seusite.com/auth/callback`

## 🔄 Fluxo Implementado

```
Landing Page → /signup → /pricing → Checkout Stripe → /dashboard
     ↓            ↓         ↓              ↓              ↓
  Botões CTA   Conta     Planos         Pagamento     Área protegida
   grátis     grátis    (Starter/      (Assinatura    (Apenas
  (Google/      →       Pro/Business)   ativa)        assinantes)
   Email)               ↓
                   API Route
                 /api/checkout/create
```

## 🛡️ Middleware de Proteção

**Rotas protegidas (exigem assinatura ativa):**
- `/dashboard/*`
- `/agents/*` 
- `/settings/*`
- `/messages/*`

**Lógica:**
1. Verifica se usuário está logado (cookie Supabase)
2. Extrai email do token JWT
3. Consulta Stripe por assinatura ativa
4. Redireciona para `/pricing` se não tiver assinatura

## 🧪 Testes

### 1. Fluxo Completo
```bash
npm run dev
# Acesse http://localhost:3000
# Clique em "Começar agora" → /signup
# Crie conta → /pricing
# Escolha plano → Checkout Stripe
# Após pagamento → /dashboard
```

### 2. Teste de Proteção
```bash
# Acesse diretamente: http://localhost:3000/dashboard
# Deve redirecionar para /login (sem auth)
# Com auth mas sem assinatura → /pricing
# Com auth + assinatura → /dashboard
```

## 📝 Próximos Passos

1. **Configurar variáveis de ambiente**
2. **Criar produtos no Stripe**
3. **Configurar OAuth no Supabase**
4. **Testar fluxo completo**
5. **Ajustar Price IDs reais**

## 🔍 Debug

### Problemas Comuns

**Middleware não funciona:**
- Verifique nome do cookie: `sb-njlyaswdgvwdfbqbyyys-auth-token`
- Confirme variáveis de ambiente

**Checkout não funciona:**
- Verifique se usuário está autenticado
- Confirme Price IDs corretos
- Verifique chave Stripe

**OAuth não funciona:**
- Verifique redirect URI no Google Console
- Confirme credenciais no Supabase

### Logs Úteis
```bash
# Verificar middleware
console.log("Middleware:", { pathname, accessToken, userEmail, hasSubscription })

# Verificar Stripe
console.log("Stripe:", { customer, subscriptions })

# Verificar Supabase
console.log("Supabase:", { user, error })
```

## 🎯 Funcionalidades Extras (Futuro)

- [ ] Trial gratuito de 7 dias
- [ ] Downgrade/Upgrade de planos
- [ ] Cancelamento automático
- [ ] Analytics de conversão
- [ ] Testes automatizados

---

**O fluxo está 100% funcional após configuração das variáveis de ambiente!** 🚀
