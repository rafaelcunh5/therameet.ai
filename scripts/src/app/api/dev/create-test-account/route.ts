import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createAgent, listAgents } from '@/lib/services/agents';

const TEST_EMAIL = 'teste+demo@local.dev';
const TEST_PASSWORD = 'SenhaForte123!';

async function handle() {
  try {
    // 1. Buscar usuários via API administrativa e filtrar pelo e-mail de teste
    const { data: listUsersData, error: listUsersError } = await supabaseAdmin.auth.admin.listUsers();

    if (listUsersError) {
      console.error('[dev/create-test-account] listUsers error', listUsersError);
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }

    const existingUser = listUsersData.users.find((u) => u.email?.toLowerCase() === TEST_EMAIL) ?? null;

    let user = existingUser ?? null;

    if (user) {
      // Usuário já existe: deletamos e recriamos com as credenciais de demo para garantir estado conhecido
      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
      if (deleteError) {
        console.error('[dev/create-test-account] delete existing user error', deleteError);
        return NextResponse.json({ error: 'Failed to delete existing user' }, { status: 500 });
      }

      user = null;
    }

    if (!user) {
      const { data: createUserData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        email_confirm: true,
      });

      if (createUserError || !createUserData.user) {
        console.error('[dev/create-test-account] createUser error', createUserError);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
      }

      user = createUserData.user;
    }

    const userId = user.id;

    // 3. Garantir e-mail confirmado (camada extra de segurança caso a API admin não retorne como esperado)
    if (!user.email_confirmed_at) {
      const { error: updateUserError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        email_confirm: true,
      });

      if (updateUserError) {
        console.error('[dev/create-test-account] updateUserById error', updateUserError);
      }
    }

    // 3. Buscar ou criar agente demo
    const agents = await listAgents(userId);
    let agent = agents.find((a: any) => a.name === 'Agente Demo');

    if (!agent) {
      agent = await createAgent(userId, {
        name: 'Agente Demo',
        persona: 'Agente de teste para demonstração interna do produto.',
        prompt_base:
          'Você é um agente de WhatsApp de demonstração. Responda de forma amigável e curta, apenas para testar o fluxo do produto.',
      });
    }

    return NextResponse.json({
      success: true,
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      userId,
      agentId: agent.id,
    });
  } catch (error) {
    console.error('[dev/create-test-account] unhandled error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(_req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { message: 'Dev route disabled in production' },
      { status: 403 },
    );
  }

  return handle();
}

// Facilita testar via navegador: acessar GET /api/dev/create-test-account em ambiente de dev
export async function GET(_req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { message: 'Dev route disabled in production' },
      { status: 403 },
    );
  }

  return handle();
}
