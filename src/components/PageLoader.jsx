import { useEffect, useState } from 'react'

// A full-screen "Loading" spinner (three tilted, continuously spinning rings)
// shown on every load. It's deliberately stuck: the rings keep spinning well
// past when they should finish, before "patching" themselves — a bug, on
// brand with "things I've broken on purpose".
const LOAD_MS = 500
const STUCK_MS = 700
const FIXED_MS = 260
const FADE_MS = 280

export default function PageLoader() {
  const [phase, setPhase] = useState('loading') // loading -> stuck -> fixed -> fading -> done

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setPhase('fading')
      return
    }
    const t1 = setTimeout(() => setPhase('stuck'), LOAD_MS)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (phase !== 'stuck') return
    const t = setTimeout(() => setPhase('fixed'), STUCK_MS)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'fixed') return
    const t = setTimeout(() => setPhase('fading'), FIXED_MS)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'fading') return
    const t = setTimeout(() => setPhase('done'), FADE_MS)
    return () => clearTimeout(t)
  }, [phase])

  if (phase === 'done') return null

  return (
    <div className={`loader-screen ${phase === 'fading' ? 'is-fading' : ''}`} role="status" aria-live="polite">
      <div className="loader-rings">
        <div className="loader-tilt loader-tilt--pink"><div className="loader-spin loader-spin--pink" /></div>
        <div className="loader-tilt loader-tilt--amber"><div className="loader-spin loader-spin--amber" /></div>
        <div className="loader-tilt loader-tilt--red"><div className="loader-spin loader-spin--red" /></div>
        <div className="loader-tilt loader-tilt--cyan"><div className="loader-spin loader-spin--cyan" /></div>
        <span className="loader-label">Loading</span>
      </div>
      <div className="loader-status">
        {phase === 'stuck' && <span className="loader-bug">🐞 stuck — known issue</span>}
        {phase === 'fixed' && <span className="loader-ok">✓ patched, continuing</span>}
      </div>
    </div>
  )
}
