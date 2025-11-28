import { serverFor } from '../utils';
import type { NextApiHandler } from 'next';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import handler from '../../src/pages/api/webhooks/stripe';

describe('POST /api/webhooks/stripe', () => {
  it('acknowledges checkout.session.completed in test mode', async () => {
    const app = serverFor(handler as unknown as NextApiHandler);
    const event = {
      id: 'evt_test_1',
      type: 'checkout.session.completed',
      data: { object: { id: 'cs_test_1', customer: 'cus_123', subscription: 'sub_123' } },
    };
    const res = await app
      .post('/api/webhooks/stripe')
      .set('x-test-mode', '1')
      .send(event);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
  });

  it('is idempotent for same event id', async () => {
    const app = serverFor(handler as unknown as NextApiHandler);
    const event = { id: 'evt_dup', type: 'invoice.paid', data: { object: { id: 'in_1' } } };
    const first = await app.post('/api/webhooks/stripe').set('x-test-mode', '1').send(event);
    const second = await app.post('/api/webhooks/stripe').set('x-test-mode', '1').send(event);
    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
  });
});
