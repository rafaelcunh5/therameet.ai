// Meta Business API adapter (placeholder)
// TODO: Configure META_TOKEN and webhook verification
export async function sendMetaWhatsAppMessage(phoneNumberId: string, to: string, body: string) {
  // TODO: Implement POST to Graph API v16.0
  return { ok: true, provider: 'meta', to, body };
}
