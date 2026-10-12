import { tools } from '../data'

export default function Marquee() {
  const row = [...tools, ...tools]
  return (
    <div className="marquee" aria-label="Tools I work with">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="marquee-item" aria-hidden={i >= tools.length}>
            {t}
            <span className="marquee-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
