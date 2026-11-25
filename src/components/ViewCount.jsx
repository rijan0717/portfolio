import { useEffect, useState } from 'react'

// Genuine page views, counted server-side by a Cloudflare Worker backed by KV
// (source in workers/views-counter.js), so the number is the real total across
// every visitor rather than something made up on the client.
//
// A visit counts once per browser session, so a reload or a tab left open
// overnight does not inflate it.
//
// One retry on failure, and the last good answer is cached so a repeat visitor
// sees a number immediately. If nothing is known the component renders
// nothing: a made-up number is worse than no number.

const BASE = 'https://portfoli-views.rijan-rentalbux.workers.dev'
const CACHE = 'viewCount'
const TIMEOUT = 6000

async function once(verb) {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), TIMEOUT)
  try {
    const res = await fetch(`${BASE}/${verb}`, { cache: 'no-store', signal: ctl.signal })
    if (!res.ok) throw new Error(`counter ${res.status}`)
    const body = await res.json()
    if (typeof body?.value !== 'number') throw new Error('counter shape')
    return body.value
  } finally {
    clearTimeout(timer)
  }
}

// One retry, because a single timeout is the common case rather than an outage.
// The retry only ever reads: the hit, if it landed, must not be counted twice.
async function count(verb) {
  try {
    return await once(verb)
  } catch {
    return once('get')
  }
}

function readCache() {
  try {
    const n = Number(localStorage.getItem(CACHE))
    return Number.isFinite(n) && n > 0 ? n : null
  } catch {
    return null
  }
}

export default function ViewCount() {
  // Start from the last known total so a repeat visitor never sees a gap.
  const [total, setTotal] = useState(readCache)

  useEffect(() => {
    let live = true

    // Increment once per session; every later mount only reads.
    let counted = false
    try {
      counted = sessionStorage.getItem('viewCounted') === '1'
    } catch {
      // Blocked storage: read only, so we never over-count.
      counted = true
    }

    if (!counted) {
      try {
        // Set before the request: a retry must not count a second time.
        sessionStorage.setItem('viewCounted', '1')
      } catch {
        // Nothing to do; worst case the next tab counts again.
      }
    }

    count(counted ? 'get' : 'hit')
      .then((n) => {
        if (!live) return
        setTotal(n)
        try {
          localStorage.setItem(CACHE, String(n))
        } catch {
          // Cache is a nicety, not a requirement.
        }
      })
      .catch(() => {
        // Offline, blocked or the service is down: keep whatever we had.
      })

    return () => {
      live = false
    }
  }, [])

  if (!total) return null

  const n = total.toLocaleString('en-GB')
  const noun = total === 1 ? 'view' : 'views'
  return (
    <span className="views mono" title={`${n} portfolio ${noun} so far`}>
      {n} portfolio {noun}
    </span>
  )
}
