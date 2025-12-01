import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { NextApiRequest } from 'next';

const supabaseUrl = process.env.SUPABASE_URL || '';
// TODO: Definir SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY no ambiente
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '';
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const supabaseAdmin: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey);

export function createSupabaseClientForRequest(req: NextApiRequest): SupabaseClient {
  const authHeader = req.headers.authorization || '';
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: authHeader as string,
      },
    },
  });
}

export async function getAuthUser(req: NextApiRequest): Promise<{ id: string } | null> {
  if (process.env.NODE_ENV === 'test') {
    const testUserId = req.headers['x-user-id'] as string | undefined;
    if (!testUserId) return null;
    return { id: testUserId };
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;
  const accessToken = authHeader.slice('Bearer '.length);

  return getAuthUserFromAccessToken(accessToken);
}

export async function getAuthUserFromAccessToken(accessToken: string): Promise<{ id: string } | null> {
  const client = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await client.auth.getUser(accessToken);
  if (error || !data.user) return null;
  return { id: data.user.id };
}
