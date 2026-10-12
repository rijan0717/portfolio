import { useEffect, useState } from 'react'
import { useInView } from './useReveal'

// Counts a stat like "59" or "3+" up from 0 the first time it scrolls into view.
// Any non-numeric suffix ("+", "%") is kept as is.
export default function CountUp({ value, duration = 1400 }) {
  const match = String(value).match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : null
  const suffix = match ? match[2] : ''
  const [ref, visible] = useInView({ threshold: 0.5 })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!visible || target === null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target)
      return
    }
    let frame
    const start = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [visible, target, duration])

  if (target === null) return <span>{value}</span>
  return (
    <span ref={ref} aria-label={String(value)}>
      <span aria-hidden="true">{n}{suffix}</span>
    </span>
  )
}
