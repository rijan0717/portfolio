import { summary, stats, profile } from '../data'
import Reveal from '../components/Reveal'
import Rich from '../components/Rich'
import CountUp from '../components/CountUp'
import { MapPin } from '../components/Icons'

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="about-grid">
        <Reveal className="section-label">
          <span className="mono">01</span>
          <span>About</span>
        </Reveal>
        <div>
          <Reveal as="p" className="about-lead">
            I treat every release like it&rsquo;s going to production on a Friday afternoon.
            <span className="muted"> <Rich text={summary} /></span>
          </Reveal>
          <Reveal className="about-meta" delay={100}>
            <span><MapPin /> {profile.location}</span>
            <span className="mono">EN · NE</span>
          </Reveal>
        </div>
      </div>

      <div className="stats">
        {stats.map((s, i) => (
          <Reveal key={s.label} className="stat" delay={i * 80}>
            <span className="stat-value"><CountUp value={s.value} /></span>
            <span className="stat-label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
