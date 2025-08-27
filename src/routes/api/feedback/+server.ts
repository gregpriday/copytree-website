import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, getClientAddress, url }) => {
  try {
    const data = await request.json().catch(() => ({}));
    const payload = {
      ...data,
      path: url.pathname,
      ip: getClientAddress?.() || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      at: new Date().toISOString()
    };
    // Minimal server-side logging for feedback. Replace with real storage later.
    console.log('[feedback]', JSON.stringify(payload));
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error('[feedback] failed', err);
    return new Response(JSON.stringify({ error: 'invalid_request' }), { status: 400 });
  }
};

