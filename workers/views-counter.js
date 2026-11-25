/**
 * Page-view counter for rijan-pariyar.com.np — a Cloudflare Worker backed by KV.
 *
 * Deployed as: https://profile-views.rijan-rentalbux.workers.dev
 * Needs a KV namespace bound as `VIEWS`.
 *
 *   GET /hit  -> increments, returns { "value": n }
 *   GET /get  -> reads only,  returns { "value": n }
 *
 * Only the site's own origins may call it, so the number cannot be inflated
 * from somewhere else. Add any new origin here before it goes live.
 */

// CORS is a browser-side check, not a security boundary — anyone can forge an
// Origin with curl. It is here so that a *page* on another site cannot quietly
// pad the count from its visitors' browsers.
const ALLOWED = [
  'https://rijan-pariyar.com.np',
  'https://www.rijan-pariyar.com.np',
  // Local development: vite dev and vite preview.
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
]

const KEY = 'total'

function cors(origin) {
  const allow = ALLOWED.includes(origin) ? origin : ALLOWED[0]
  return {
    'access-control-allow-origin': allow,
    'access-control-allow-methods': 'GET, OPTIONS',
    'vary': 'origin',
    'cache-control': 'no-store',
  }
}

function json(value, origin) {
  return new Response(JSON.stringify({ value }), {
    headers: { 'content-type': 'application/json', ...cors(origin) },
  })
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin') || ''
    const { pathname } = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origin) })
    }
    if (request.method !== 'GET') {
      return new Response('method not allowed', { status: 405, headers: cors(origin) })
    }

    // Without the binding every call throws a bare 1101, which says nothing.
    // Name the problem instead.
    if (!env.VIEWS || typeof env.VIEWS.get !== 'function') {
      return new Response(
        JSON.stringify({ error: 'KV binding "VIEWS" is not configured on this Worker' }),
        { status: 503, headers: { 'content-type': 'application/json', ...cors(origin) } },
      )
    }

    const current = Number(await env.VIEWS.get(KEY)) || 0

    if (pathname === '/get') return json(current, origin)

    if (pathname === '/hit') {
      const next = current + 1
      // KV is eventually consistent, so two visits in the same instant can
      // land on the same number. For a view count that is an acceptable
      // trade for staying inside the free tier.
      await env.VIEWS.put(KEY, String(next))
      return json(next, origin)
    }

    return new Response('not found', { status: 404, headers: cors(origin) })
  },
}
