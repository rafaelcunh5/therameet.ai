import { serverFor } from '../utils';

// Handlers will be implemented at src/pages/api/agents/index.ts
import type { NextApiHandler } from 'next';

// Placeholder import path - will exist after implementation
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import handler from '../../src/pages/api/agents/index';

describe('POST /api/agents - create agent', () => {
  it('creates an agent for authenticated user and returns 201 with agent payload', async () => {
    const app = serverFor(handler as unknown as NextApiHandler);
    const res = await app
      .post('/api/agents')
      .set('x-user-id', 'test-user-1')
      .send({
        name: 'Agente Demo',
        persona: 'Terapeuta Cognitivo',
        prompt_base: 'Você é um terapeuta empático e objetivo.',
        channels: { whatsapp: true },
      });

    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'Agente Demo');
    expect(res.body).toHaveProperty('owner_id', 'test-user-1');
  });

  it('rejects unauthenticated requests', async () => {
    const app = serverFor(handler as unknown as NextApiHandler);
    const res = await app.post('/api/agents').send({ name: 'X' });
    expect(res.status).toBe(401);
  });
});
