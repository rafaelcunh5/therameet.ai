import { serverFor } from '../utils';
import type { NextApiHandler } from 'next';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import handler from '../../src/pages/api/webhooks/whatsapp';

describe('POST /api/webhooks/whatsapp', () => {
  const metaSample = {
    object: 'whatsapp_business_account',
    entry: [
      {
        id: 'waba_123',
        changes: [
          {
            value: {
              messages: [
                {
                  id: 'wamid.HBgLNzkx...',
                  from: '5511999999999',
                  timestamp: '1699999999',
                  type: 'text',
                  text: { body: 'Olá, preciso de ajuda' },
                },
              ],
              metadata: { phone_number_id: '12345' },
            },
            field: 'messages',
          },
        ],
      },
    ],
  };

  const twilioSample = {
    SmsMessageSid: 'SMxxxxxxxx',
    From: 'whatsapp:+5511999999999',
    To: 'whatsapp:+14155238886',
    Body: 'Oi, tem horário?'
  };

  it('handles Meta webhook inbound and replies 200', async () => {
    const app = serverFor(handler as unknown as NextApiHandler);
    const res = await app
      .post('/api/webhooks/whatsapp')
      .set('x-test-mode', '1')
      .send(metaSample);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
  });

  it('handles Twilio webhook form-encoded and replies 200', async () => {
    const app = serverFor(handler as unknown as NextApiHandler);
    const res = await app
      .post('/api/webhooks/whatsapp')
      .set('x-test-mode', '1')
      .type('form')
      .send(twilioSample);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
  });

  it('is idempotent for the same event', async () => {
    const app = serverFor(handler as unknown as NextApiHandler);
    const event = { ...metaSample, entry: [{ ...metaSample.entry[0], changes: [{ ...metaSample.entry[0].changes[0], value: { ...metaSample.entry[0].changes[0].value, messages: [{ id: 'dup-id', from: '5511', timestamp: '1', type: 'text', text: { body: 'dup' } }] } }] }] };
    const first = await app.post('/api/webhooks/whatsapp').set('x-test-mode', '1').send(event);
    const second = await app.post('/api/webhooks/whatsapp').set('x-test-mode', '1').send(event);
    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
  });
});
