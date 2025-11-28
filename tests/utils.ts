import http from 'http';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import request from 'supertest';

export function serverFor(handler: NextApiHandler) {
  const server = http.createServer((req, res) => {
    // Minimal Next.js API compatibility wrapper
    const query = Object.fromEntries(new URL(req.url || '', 'http://localhost').searchParams.entries());
    (req as any).query = query;

    const chunks: Buffer[] = [];
    req.on('data', (c) => chunks.push(c as Buffer));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      const contentType = req.headers['content-type'] || '';
      if (raw) {
        try {
          if (contentType.includes('application/json')) {
            (req as any).body = JSON.parse(raw);
          } else if (contentType.includes('application/x-www-form-urlencoded')) {
            (req as any).body = Object.fromEntries(new URLSearchParams(raw).entries());
          } else {
            (req as any).body = raw;
          }
        } catch {
          (req as any).body = raw;
        }
      }
      (handler as any)(req as NextApiRequest, res as NextApiResponse);
    });
  });
  return request(server);
}
