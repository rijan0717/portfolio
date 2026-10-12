import { services } from '../data'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { serviceIcons } from '../components/Icons'

export default function Services() {
  return (
    <section className="section" id="services">
      <SectionHead
        index="02"
        label="Services"
        title={<>What I bring to <em>your</em> release cycle</>}
        aside="Four areas I own from the first sprint to the final sign-off, and the development side that sits behind them."
      />
      <div className="services">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.icon]
          return (
            <Reveal key={s.title} className={`service-card${s.wide ? ' is-wide' : ''}`} delay={i * 80}>
              <div className="service-top">
                <span className="service-icon"><Icon width={22} height={22} /></span>
                <span className="mono service-num">0{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="tags">
                {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              {s.projects && (
                <p className="service-projects">
                  Built: {s.projects.map((name, n) => (
                    <span key={name}>
                      {n > 0 && ' · '}
                      <a href="#work">{name}</a>
                    </span>
                  ))}
                </p>
              )}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
