import { useMemo, useState } from 'react'
import { projects, projectGroups } from '../data'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { ArrowUpRight, Github, Filter } from '../components/Icons'
import PassoutMock from '../components/mocks/PassoutMock'
import CvGenMock from '../components/mocks/CvGenMock'
import EaseMedsMock from '../components/mocks/EaseMedsMock'
import { RentalBuxMock, FigsFlowMock, FigsFlowSuiteMock, TmsMock, BugSheetMock, PlaywrightMock } from '../components/mocks/QaMocks'

const mocks = {
  passout: PassoutMock,
  cvgen: CvGenMock,
  easemeds: EaseMedsMock,
  rentalbux: RentalBuxMock,
  figsflow: FigsFlowMock,
  tms: TmsMock,
  figsflowSuite: FigsFlowSuiteMock,
  bugsheet: BugSheetMock,
  playwright: PlaywrightMock,
}

const langColors = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  PHP: '#4f5d95',
}

// A full-page screenshot shown at its real proportions (full width, natural
// height) that scrolls slowly from top to bottom inside the browser frame.
function ScrollShot({ project }) {
  return (
    <div className="scrollshot" tabIndex={0} aria-label={`${project.title} full page screenshot, scrolling`}>
      <img
        className="scrollshot-img"
        src={`/projects/${project.scrollShot}`}
        alt={`${project.title} full page`}
        loading="lazy"
      />
    </div>
  )
}

// A React mock-up of the project's UI, framed in a browser window.
function MockVisual({ project }) {
  const Mock = mocks[project.mock]
  return (
    <div className="work-visual work-visual--mock" data-mock={project.mock}>
      <div className="browser">
        <div className="browser-bar">
          <span className="browser-dots"><i /><i /><i /></span>
          <span className="browser-url mono">{project.url}</span>
        </div>
        {project.scrollShot ? <ScrollShot project={project} /> : <Mock />}
      </div>
      <span className="work-kind">{project.kind}</span>
    </div>
  )
}

// Shows public/projects/<image> when it exists, otherwise a styled cover.
function ProjectVisual({ project, index }) {
  const [failed, setFailed] = useState(!project.image)
  if (project.mock || project.scrollShot) return <MockVisual project={project} />

  return (
    <div
      className={`work-visual ${failed ? '' : 'has-image'}`}
      data-idx={(index % 4) + 1}
      style={!failed && project.imageBg ? { background: project.imageBg } : undefined}
    >
      {!failed && (
        <img
          className={`work-shot ${project.imageFit === 'contain' ? 'work-shot--contain' : ''}`}
          src={`/projects/${project.image}`}
          alt={`${project.title} screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <span className="work-kind">{project.kind}</span>
      {failed && <span className="work-metric">{project.metric || project.title}</span>}
      {failed && <span className="work-num mono">0{index + 1}</span>}
    </div>
  )
}

function ProjectCard({ project: p, index, delay, flip }) {
  // The card itself is not a link, so interactive mock-ups (tabs) work inside it.
  // Projects with a public repo link out from the arrow and the repo name.
  // Employer products link to their live site instead of a repo.
  const href = p.link || p.live
  const ext = { href, target: '_blank', rel: 'noreferrer' }
  const liveHost = p.live && new URL(p.live).hostname.replace(/^www\./, '')
  return (
    <Reveal
      className={`work-card ${p.featured ? 'work-card--featured' : ''} ${flip ? 'work-card--flip' : ''} ${href ? '' : 'work-card--static'}`}
      delay={delay}
    >
      <ProjectVisual project={p} index={index} />
      <div className="work-body">
        <div className="work-title">
          <h3>{p.title}</h3>
          {href && (
            <a className="work-arrow" {...ext} aria-label={p.link ? `${p.title} on GitHub` : `Visit ${liveHost}`}>
              <ArrowUpRight />
            </a>
          )}
        </div>
        <p>{p.text}</p>
        {p.features && (
          <ul className="work-features">
            {p.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        )}
        <div className="tags">
          {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="work-meta">
          <span className="work-lang">
            <i style={{ background: langColors[p.language] || '#22c55e' }} />
            {p.language}
          </span>
          {p.repo ? (
            <a className="work-repo work-repo--link mono" {...ext}>
              <Github width={14} height={14} />rijan0717/{p.repo}
            </a>
          ) : p.live ? (
            <span className="work-repo mono">
              <a className="work-repo--link" {...ext}>{liveHost} ↗</a>
              {p.org && <> · @ {p.org}</>}
            </span>
          ) : (
            <span className="work-repo mono">@ {p.org}</span>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export default function Work() {
  const [activeTag, setActiveTag] = useState(null)

  const allTags = useMemo(() => {
    const seen = new Set()
    projects.forEach((p) => p.tags.forEach((t) => seen.add(t)))
    return [...seen].sort((a, b) => a.localeCompare(b))
  }, [])

  const visibleProjects = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects

  return (
    <section className="section" id="work">
      <SectionHead
        index="05"
        label="Selected work"
        title={<>Things I&rsquo;ve <em>built</em>, and things I&rsquo;ve <em>broken</em> on purpose</>}
      />

      <Reveal className="work-filters">
        <span className="work-filters-label"><Filter width={14} height={14} /> Filter</span>
        <div className="work-filters-list">
          <button
            type="button"
            className={`filter-chip ${activeTag === null ? 'filter-chip--active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            All <span className="nav-count">[{projects.length}]</span>
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              className={`filter-chip ${activeTag === t ? 'filter-chip--active' : ''}`}
              onClick={() => setActiveTag((cur) => (cur === t ? null : t))}
            >
              {t}
            </button>
          ))}
        </div>
      </Reveal>

      {projectGroups.map((g) => {
        const items = visibleProjects.filter((p) => p.group === g.key)
        if (!items.length) return null
        return (
          <div key={g.key} className="work-group">
            <Reveal className="work-group-head">
              <h3>{g.title} <span className="nav-count">[{items.length}]</span></h3>
              <p>{g.blurb}</p>
            </Reveal>
            <div className="work-grid">
              {items.map((p, i) => {
                // Alternate the visual side on consecutive full-width cards.
                const featuredIndex = items.filter((q, j) => q.featured && j < i).length
                return (
                  <ProjectCard
                    key={p.title}
                    project={p}
                    index={i}
                    flip={p.featured && featuredIndex % 2 === 1}
                    delay={p.featured ? 0 : (i % 2) * 100}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </section>
  )
}
