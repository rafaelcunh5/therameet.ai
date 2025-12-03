export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { requireSubscriptionServer } from '@/lib/subscription';

export async function GET(req: Request) {
  // Verificar assinatura para gerar QR Code
  const { needsUpgrade } = await requireSubscriptionServer(req);
  if (needsUpgrade) {
    return NextResponse.json({ 
      error: 'Premium feature',
      message: 'Esta funcionalidade requer uma assinatura ativa.',
      requiresUpgrade: true 
    }, { status: 403 });
  }

  const qrCodeData =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YyqS5kAAAAASUVORK5CYII=";
  const qrImage = `data:image/png;base64,${qrCodeData}`;

  return NextResponse.json({ qr: qrImage });
}
