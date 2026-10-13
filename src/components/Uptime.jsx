import { useEffect, useState } from 'react'

// Career start — the uptime clock counts from here.
const START = new Date(2023, 7, 1) // 1 August 2023 (month is 0-indexed)

// Whole years first, then the leftover days, so leap years take care of themselves.
function elapsed(now = new Date()) {
  let years = now.getFullYear() - START.getFullYear()
  const anniversary = new Date(now.getFullYear(), START.getMonth(), START.getDate())
  if (now < anniversary) years -= 1
  const last = new Date(START.getFullYear() + years, START.getMonth(), START.getDate())
  const days = Math.floor((now - last) / 86400000)
  return { years, days }
}

export default function Uptime() {
  const [{ years, days }, setUp] = useState(() => elapsed())

  // The value only moves once a day; an hourly tick keeps a long-open tab honest.
  useEffect(() => {
    const id = setInterval(() => setUp(elapsed()), 3600000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="uptime mono" title={`Testing since 1 August 2023 — ${years}y ${days}d`}>
      up {years}y {days}d
    </span>
  )
}
