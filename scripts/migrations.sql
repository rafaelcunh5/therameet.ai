-- Supabase schema for TheraMeetAI (MVP)
-- TODO: Run with supabase CLI and adjust RLS as needed

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text not null default 'user',
  created_at timestamptz default now()
);

create table if not exists agents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  persona text,
  prompt_base text,
  channels jsonb not null default '{}',
  active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references agents(id) on delete cascade,
  external_user_id text not null,
  provider text not null,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  created_at timestamptz default now()
);

-- Campos auxiliares para integrações (Meta/Twilio)
alter table agents add column if not exists phone text;
alter table messages add column if not exists external_id text;

create table if not exists billing_status (
  user_id uuid primary key references profiles(id) on delete cascade,
  stripe_customer_id text,
  subscription_status text,
  plan text,
  metered_messages integer not null default 0,
  updated_at timestamptz default now()
);

create table if not exists billing_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text not null,
  status text not null,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists webhook_events (
  id text primary key,
  source text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;
alter table agents enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table billing_status enable row level security;
alter table billing_subscriptions enable row level security;

-- Policies (basic)
create policy profiles_select_self on profiles for select using (auth.uid() = id);
create policy agents_owner_all on agents for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy conv_agent_owner on conversations for all using (
  exists (select 1 from agents a where a.id = agent_id and a.owner_id = auth.uid())
) with check (
  exists (select 1 from agents a where a.id = agent_id and a.owner_id = auth.uid())
);
create policy msg_conv_owner on messages for all using (
  exists (select 1 from conversations c join agents a on a.id = c.agent_id where c.id = conversation_id and a.owner_id = auth.uid())
) with check (
  exists (select 1 from conversations c join agents a on a.id = c.agent_id where c.id = conversation_id and a.owner_id = auth.uid())
);
