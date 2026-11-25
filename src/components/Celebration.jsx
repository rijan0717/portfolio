import { useEffect, useMemo, useState } from 'react'
import { milestoneOn } from '../data'
import { Close } from './Icons'

// On a milestone date — a birthday, a work anniversary, a years-in-QA mark —
// the site says so once: a dismissible banner under the nav and a single
// confetti burst. Any other day this renders nothing at all.

const PIECES = 46
const COLOURS = ['#f4511e', '#22c55e', '#3b82f6', '#eab308', '#ec4899', '#8b5cf6']

// Fixed per mount so the burst does not re-randomise on every render.
function useConfetti(seedKey) {
  return useMemo(
    () =>
      Array.from({ length: PIECES }, (_, i) => ({
        id: `${seedKey}-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        duration: 2.6 + Math.random() * 1.8,
        drift: (Math.random() - 0.5) * 220,
        spin: 360 + Math.random() * 720,
        size: 6 + Math.random() * 6,
        colour: COLOURS[i % COLOURS.length],
        round: i % 3 === 0,
      })),
    [seedKey],
  )
}

export default function Celebration() {
  // Worked out once per mount: the page is not open across midnight in practice.
  const event = useMemo(() => milestoneOn(), [])
  const [dismissed, setDismissed] = useState(true)
  const [burst, setBurst] = useState(false)
  const confetti = useConfetti(event?.key || 'none')

  useEffect(() => {
    if (!event) return
    // Shown once per browser session, so a reload is not a second party.
    let seen = false
    try {
      seen = sessionStorage.getItem(`celebrated:${event.key}`) === '1'
    } catch {
      // Private mode or blocked storage: show it, just do not remember.
    }
    if (seen) return
    setDismissed(false)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBurst(true)
      const t = setTimeout(() => setBurst(false), 5000)
      return () => clearTimeout(t)
    }
  }, [event])

  if (!event || dismissed) return null

  const close = () => {
    setDismissed(true)
    setBurst(false)
    try {
      sessionStorage.setItem(`celebrated:${event.key}`, '1')
    } catch {
      // Nothing to do: the banner simply reappears next time.
    }
  }

  return (
    <>
      {burst && (
        <div className="confetti" aria-hidden="true">
          {confetti.map((p) => (
            <i
              key={p.id}
              className={p.round ? 'confetti-dot' : ''}
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size * (p.round ? 1 : 1.6)}px`,
                background: p.colour,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                '--drift': `${p.drift}px`,
                '--spin': `${p.spin}deg`,
              }}
            />
          ))}
        </div>
      )}

      <div className="celebrate" role="status">
        <span className="celebrate-emoji" aria-hidden="true">{event.emoji}</span>
        <span className="celebrate-copy">
          <b>{event.title}</b>
          <em>{event.text}</em>
        </span>
        <button type="button" className="celebrate-close" onClick={close} aria-label="Dismiss">
          <Close width={16} height={16} />
        </button>
      </div>
    </>
  )
}
