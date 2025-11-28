import { NextRequest } from 'next/server';
import { POST as postWebhookHandler } from '@/app/api/webhook/meta/route';

const handleMetaWebhookPayloadMock = jest.fn();

jest.mock('@/services/metaService', () => ({
  validateMetaWebhookVerification: jest.fn(),
  handleMetaWebhookPayload: (...args: any[]) => handleMetaWebhookPayloadMock(...args),
}));

describe('POST /api/webhook/meta (App Router)', () => {
  it('aceita payload Meta válido e chama handler de payload', async () => {
    const samplePayload = {
      object: 'whatsapp_business_account',
      entry: [
        {
          id: 'waba_123',
          changes: [
            {
              value: {
                messages: [
                  {
                    id: 'wamid.TEST_INBOUND',
                    from: '5511999999999',
                    timestamp: '1699999999',
                    type: 'text',
                    text: { body: 'Olá do cliente' },
                  },
                ],
                metadata: {
                  display_phone_number: '5511888888888',
                },
                contacts: [{ wa_id: '5511999999999' }],
              },
              field: 'messages',
            },
          ],
        },
      ],
    };

    const req = new NextRequest(
      new Request('http://localhost/api/webhook/meta', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(samplePayload),
      }) as any,
    );

    const res = await postWebhookHandler(req);
    expect(res.status).toBe(200);

    const json = (await res.json()) as any;
    expect(json).toEqual({ ok: true });
    expect(handleMetaWebhookPayloadMock).toHaveBeenCalledTimes(1);
    expect(handleMetaWebhookPayloadMock).toHaveBeenCalledWith(samplePayload);
  });
});
