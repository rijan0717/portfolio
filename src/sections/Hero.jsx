import { useRef } from 'react'
import { profile, projects } from '../data'
import Portrait from '../components/Portrait'
import { useHeroParallax } from '../components/useHeroParallax'
import { ArrowUpRight, Linkedin, Github, Instagram, Mail, FileDown } from '../components/Icons'

// Decorative QA badges floating around the portrait at different parallax depths.
const badges = [
  { text: 'All checks passed', icon: '✓', tone: 'ok', pos: 'tl', depth: 1.4 },
  { text: 'GET /api · 200 OK', icon: '⇄', tone: 'api', pos: 'tr', depth: 2.2 },
  { text: 'Bug caught pre-release', icon: '🐞', tone: 'bug', pos: 'ml', depth: 1.8 },
  { text: 'Playwright · TS', icon: '▶', tone: 'pw', pos: 'mr', depth: 1.1 },
  // The one "build" badge: I develop too, not only test.
  { text: 'npm run dev → ready', icon: '$', tone: 'dev', pos: 'br', depth: 1.6 },
]

const socials = [
  { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: profile.github, Icon: Github },
  { label: 'Instagram', href: profile.instagram, Icon: Instagram },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
  { label: 'Résumé', Icon: FileDown, resume: true },
]

export default function Hero({ onOpenResume }) {
  const ref = useRef(null)
  useHeroParallax(ref)

  return (
    <section className="hero" id="top" ref={ref}>
      <h1 className="hero-name px-name" aria-label={`${profile.firstName} ${profile.lastName}`}>
        <span className="hero-name-outline">{profile.firstName}</span>{' '}
        <span className="hero-name-solid">{profile.lastName}</span>
      </h1>

      <div className="hero-stage">
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-portrait px-portrait">
          <Portrait />
        </div>

        <div className="hero-badges" aria-hidden="true">
          {badges.map((b) => (
            <span
              key={b.text}
              className={`hero-badge hero-badge--${b.pos} hero-badge--${b.tone}`}
              style={{ '--d': b.depth }}
            >
              <i>{b.icon}</i>
              {b.text}
            </span>
          ))}
        </div>

        <div className="hero-intro px-fore">
          <span className="hero-eyebrow mono">QA × Dev · Kathmandu, Nepal</span>
          <h2>{profile.role}</h2>
          <p>
            <strong>Playwright &amp; Cypress</strong> automation, API testing and debugging,
            integrating <strong>AI</strong> into daily workflows, and always building something new.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn btn-dark">
              Let&rsquo;s collaborate <ArrowUpRight />
            </a>
            <a href="#work" className="btn btn-outline">View work</a>
          </div>
          <dl className="hero-mini">
            <div><dt>3+</dt><dd>years in QA</dd></div>
            <div><dt>{projects.length}</dt><dd>projects</dd></div>
            <div><dt>999+</dt><dd>defects documented</dd></div>
          </dl>
        </div>

        <a href="#about" className="hero-scroll" aria-label="Scroll to the About section">
          <span className="hero-scroll-line" />
          Scroll
        </a>

        <ul className="hero-socials px-fore">
          {socials.map(({ label, href, Icon, resume }, i) => (
            <li key={label} style={{ animationDelay: `${600 + i * 90}ms` }}>
              {resume ? (
                <button type="button" className="pill" onClick={onOpenResume}>
                  <Icon /> {label}
                </button>
              ) : (
                <a
                  className="pill"
                  href={href}
                  {...(href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
                >
                  <Icon /> {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
