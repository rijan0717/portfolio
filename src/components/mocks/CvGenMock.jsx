import { useEffect, useState } from 'react'

// A recreation of the Smart CV Generator (MERN) UI, rebuilt from the real app:
// the "Create CV" landing with its live builder, the template gallery, and the
// "Get hired" landing with the job-tailored AI rewrite running.
// The screens cycle on their own; the pill toggle and the dots are clickable.

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* -------------------------------------------------------------- Chrome */

function TopBar() {
  return (
    <div className="sc-top">
      <span className="sc-brand">
        <span className="sc-brand-sq" aria-hidden="true">
          <i /><i /><i />
        </span>
        SmartCV
      </span>

      <span className="sc-search">
        <span className="sc-search-ph">Search templates, jobs, people, help&hellip;</span>
        <span className="sc-search-scope">All <b>⌄</b></span>
        <span className="sc-search-go">⌕</span>
      </span>

      <span className="sc-links">
        <span>Get hired <b>⌄</b></span>
        <span>Hire talent <b>⌄</b></span>
        <span>Explore <b>⌄</b></span>
      </span>

      <span className="sc-account">
        <span className="sc-sun">☀</span>
        <span className="sc-pill sc-pill--primary">Sign up</span>
        <span className="sc-pill">Log in</span>
      </span>
    </div>
  )
}

// The CREATE CV / GET HIRED switch that heads both landing screens.
function ModeToggle({ mode, onPick }) {
  return (
    <span className="sc-toggle">
      <button
        type="button"
        className={mode === 'create' ? 'on' : ''}
        onClick={() => onPick('create')}
      >
        Create CV
      </button>
      <button
        type="button"
        className={mode === 'hired' ? 'on' : ''}
        onClick={() => onPick('hired')}
      >
        Get hired
      </button>
    </span>
  )
}

function Landing({ eyebrow, head, headAccent, points, cta, altCta, children, mode, onPick }) {
  return (
    <div className="sc-landing">
      <div className="sc-landing-copy">
        <ModeToggle mode={mode} onPick={onPick} />
        <span className="sc-eyebrow">{eyebrow}</span>
        <h4>
          {head}
          <em>{headAccent}</em>
        </h4>
        <ul className="sc-points">
          {points.map((p) => (
            <li key={p}><i>✓</i>{p}</li>
          ))}
        </ul>
        <div className="sc-btns">
          <span className="sc-btn sc-btn--primary">{cta}</span>
          <span className="sc-btn-ghost">{altCta}</span>
        </div>
        <span className="sc-foot">
          Free to use · ATS-friendly templates · PDF, Word and Excel export
        </span>
      </div>
      <div className="sc-landing-art">{children}</div>
    </div>
  )
}

/* ------------------------------------------------------- Screen: builder */

// The field the builder types into, so the preview visibly fills in.
const FIELDS = [
  { label: 'Full name', value: 'Oliver Bennett' },
  { label: 'Headline', value: 'Full Stack Developer' },
  { label: 'Address or city', value: 'Manchester, UK' },
  { label: 'Skills', value: 'React' },
]

function BuilderPanel() {
  return (
    <div className="sc-editor">
      <div className="sc-editor-head">
        <b>My resume</b>
        <span className="sc-steps-pills">
          <span>1. Design</span>
          <span className="on">2. Content</span>
        </span>
        <em>Editing</em>
      </div>

      <div className="sc-editor-body">
        <div className="sc-form">
          <span className="sc-form-head">Personal details</span>
          {FIELDS.map((f, i) => (
            <label key={f.label} className={`sc-field ${i === FIELDS.length - 1 ? 'is-focus' : ''}`}>
              <span>{f.label}</span>
              <i>{f.value}</i>
            </label>
          ))}
        </div>

        <div className="sc-preview">
          <b>OLIVER BENNETT</b>
          <span>Full Stack Developer</span>
          <span>Manchester, UK</span>
          <hr />
          <em>Summary</em>
          <i className="w95" /><i className="w85" /><i className="w60" />
          <em>Experience</em>
          <i className="w70" /><i className="w90" />
          <em>Skills</em>
          <span className="sc-preview-chip">React</span>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------- Screen: templates */

const TEMPLATES = [
  { name: 'Classic', kind: 'classic', likes: 282, views: '12.7k' },
  { name: 'Modern', kind: 'modern', likes: 146, views: '14.2k', picked: true },
  { name: 'Minimal', kind: 'minimal', likes: 212, views: '15.9k' },
  { name: 'Creative', kind: 'creative', likes: 91, views: '26.5k' },
]

// A résumé thumbnail: each template arranges the same skeleton differently.
function TemplatePaper({ kind }) {
  if (kind === 'modern' || kind === 'minimal') {
    return (
      <div className={`sc-tpl-paper sc-tpl-paper--${kind}`}>
        <div className="sc-tpl-side">
          <span className="sc-tpl-face" />
          <i /><i className="w70" /><i /><i className="w80" /><i className="w60" />
        </div>
        <div className="sc-tpl-main">
          <b />
          <i className="w40" />
          <i className="w95" /><i className="w85" /><i className="w90" />
          <i className="w70" /><i className="w95" /><i className="w60" />
        </div>
      </div>
    )
  }
  return (
    <div className={`sc-tpl-paper sc-tpl-paper--${kind}`}>
      <div className="sc-tpl-head">
        <b />
        <i className="w50" />
      </div>
      <div className="sc-tpl-main">
        <i className="w95" /><i className="w85" /><i className="w90" />
        <i className="w70" /><i className="w95" /><i className="w60" />
        <i className="w90" /><i className="w75" />
      </div>
    </div>
  )
}

function TemplatesScreen() {
  return (
    <div className="sc-gallery">
      {TEMPLATES.map((t) => (
        <div key={t.name} className={`sc-tpl ${t.picked ? 'is-picked' : ''}`}>
          <TemplatePaper kind={t.kind} />
          <span className="sc-tpl-meta">
            <b>{t.name}</b>
            <em>♥ {t.likes}</em>
            <em>◉ {t.views}</em>
          </span>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------- Screen: rewrite */

const REWRITE_STEPS = [
  'Reading the advert',
  'Weighting what it asks for',
  'Scoring your CV against it',
  'Re-ordering what matters most',
  'Rewriting in the advert’s language',
  'Checking the new match score',
]

function RewritePanel({ on }) {
  const [step, setStep] = useState(0)

  // Restart the run every time this screen comes back into view.
  useEffect(() => {
    if (on) setStep(reduceMotion() ? REWRITE_STEPS.length - 1 : 0)
  }, [on])

  useEffect(() => {
    if (!on || step >= REWRITE_STEPS.length - 1) return
    const t = setTimeout(() => setStep((s) => s + 1), 900)
    return () => clearTimeout(t)
  }, [on, step])

  return (
    <div className="sc-rewrite">
      <span className="sc-rewrite-edge" />
      <div className="sc-rewrite-body">
        <span className="sc-spark">✦</span>
        <div>
          <b>Rewriting your primary CV for this job</b>
          <ol className="sc-steps">
            {REWRITE_STEPS.map((label, i) => {
              const state = i < step ? 'done' : i === step ? 'active' : 'waiting'
              return (
                <li key={label} className={`sc-step sc-step--${state}`}>
                  <span className="sc-step-mark">{state === 'done' ? '✓' : ''}</span>
                  {label}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ Shell */

const screens = [
  { key: 'create', label: 'Create CV', ms: 6000 },
  { key: 'templates', label: 'Templates', ms: 4500 },
  { key: 'hired', label: 'Get hired', ms: 7500 },
]

export default function CvGenMock() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || reduceMotion()) return
    const t = setTimeout(() => setI((n) => (n + 1) % screens.length), screens[i].ms)
    return () => clearTimeout(t)
  }, [i, paused])

  const key = screens[i].key
  const pick = (k) => {
    setI(screens.findIndex((s) => s.key === k))
    setPaused(true)
  }

  return (
    <div className="sc-mock">
      <TopBar />

      <div className="sc-stage" aria-hidden="true">
        <div className={`sc-pane ${key === 'create' ? 'is-on' : ''}`}>
          <Landing
            mode="create"
            onPick={pick}
            eyebrow="No CV yet?"
            head="Create a résumé that "
            headAccent="gets you shortlisted"
            points={[
              'Pick one of forty templates, from strictly ATS-friendly to boldly creative',
              'It opens already filled with sample content — replace it section by section',
              'Download it as a PDF, a Word file or a spreadsheet — free, no watermark',
            ]}
            cta="Create my CV"
            altCta="or browse the templates"
          >
            <BuilderPanel />
          </Landing>
        </div>

        <div className={`sc-pane sc-pane--wide ${key === 'templates' ? 'is-on' : ''}`}>
          <TemplatesScreen />
        </div>

        <div className={`sc-pane ${key === 'hired' ? 'is-on' : ''}`}>
          <Landing
            mode="hired"
            onPick={pick}
            eyebrow="Already have a CV?"
            head="Rewrite it for the job "
            headAccent="you actually want"
            points={[
              'Drop the CV you already have and see which open jobs it fits, no account needed',
              'Pick a job and it is rewritten to use the words that advert uses',
              'Every fact stays yours — only the phrasing changes, and you approve each line',
            ]}
            cta="Rewrite your CV"
            altCta="or just browse the jobs"
          >
            <RewritePanel on={key === 'hired'} />
          </Landing>
        </div>
      </div>

      <div className="sc-dots" role="tablist" aria-label="Smart CV Generator screens">
        {screens.map((s, n) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={s.label}
            className={n === i ? 'on' : ''}
            onClick={() => {
              setI(n)
              setPaused(true)
            }}
          />
        ))}
      </div>
    </div>
  )
}
