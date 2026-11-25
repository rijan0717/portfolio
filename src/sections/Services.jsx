import { services, projects } from '../data'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { serviceIcons } from '../components/Icons'

// A named project links straight to its repo or live site; one with neither
// (not every build is public) falls back to its card in the work section.
function projectHref(name) {
  const p = projects.find((x) => x.title === name)
  return p?.link || p?.live || '#work'
}

export default function Services() {
  return (
    <section className="section section--desktop" id="services">
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
                  Built: {s.projects.map((name, n) => {
                    const href = projectHref(name)
                    const ext = href !== '#work'
                    return (
                      <span key={name}>
                        {n > 0 && ' · '}
                        <a
                          href={href}
                          {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                        >
                          {name}{ext && ' ↗'}
                        </a>
                      </span>
                    )
                  })}
                </p>
              )}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
