import { useEffect, useState } from 'react'

// A partial recreation of the Smart CV Generator (MERN) UI, rebuilt from its
// real components: the home hero (ScoreStat), the job-tailored AI rewrite
// (RewriteProgress + TailorReview) and the employer's applicants page.
// The tabs are clickable; otherwise the screens cycle on their own.

// Same colour rule as the app's ScoreStat: red (0) → amber (50) → green (100).
const scoreColour = (pct) => `hsl(${Math.max(0, Math.min(100, pct)) * 1.2} 72% 40%)`
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useCountUp(target, run) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!run) return
    if (reduceMotion()) {
      setValue(target)
      return
    }
    let frame
    const start = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - start) / 1200)
      setValue(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) frame = requestAnimationFrame(step)
    }
    setValue(0)
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, run])
  return value
}

/* ------------------------------------------------------------------ Home */

function ScoreStat({ label, value, suffix = '', run }) {
  const current = useCountUp(value, run)
  const colour = scoreColour(current)
  return (
    <div className="sc-stat">
      <span className="sc-stat-label">{label}</span>
      <b style={{ color: colour }}>
        {Math.round(current)}{suffix}
        {!suffix && <small>/100</small>}
      </b>
      <span className="sc-track"><i style={{ width: `${current}%`, background: colour }} /></span>
    </div>
  )
}

function CvPaper({ className = '', accent, children }) {
  return (
    <div className={`sc-paper ${className}`}>
      <span className="sc-paper-head" style={{ background: accent }} />
      <i className="w70" /><i className="w50" />
      <em style={{ background: accent }} />
      <i /><i className="w80" /><i className="w60" />
      <em style={{ background: accent }} />
      <i /><i className="w70" />
      {children}
    </div>
  )
}

function HomeScreen({ on }) {
  return (
    <div className="sc-home">
      <div>
        <span className="sc-eyebrow">CV builder with ATS matching</span>
        <h4>Write a CV that gets past the filter</h4>
        <p>Build it, score it out of 100, and see how well it matches any job, then apply without leaving the page.</p>
        <div className="sc-stats">
          <ScoreStat label="AI CV score" value={82} run={on} />
          <ScoreStat label="AI job match" value={76} suffix="%" run={on} />
        </div>
        <span className="sc-caption">Example figures: one finished CV, one job advert.</span>
        <div className="sc-btns">
          <span className="sc-btn sc-btn--primary">Create a free account</span>
          <span className="sc-btn">Browse jobs</span>
        </div>
      </div>
      <div className="sc-fan">
        <CvPaper className="sc-paper--l" accent="#0f766e" />
        <CvPaper className="sc-paper--r" accent="#be185d" />
        <CvPaper className="sc-paper--c" accent="#4f46e5" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ AI rewrite */

const REWRITE_STEPS = [
  'Reading the advert',
  'Weighting what it asks for',
  'Scoring your CV against it',
  'Re-ordering what matters most',
  'Rewriting in the advert’s language',
  'Checking the new match score',
]

const CHANGES = [
  {
    section: 'Experience',
    field: 'Achievement 1',
    kind: 'rewritten',
    reason: 'Uses the advert’s words for the same work.',
    before: 'Worked on testing of the website.',
    after: 'Ran functional, regression and cross-browser testing on checkout, login and search.',
  },
  {
    section: 'Summary',
    field: '',
    kind: 'lengthened',
    reason: 'Built from facts already on your CV.',
    before: 'QA engineer.',
    after: 'QA engineer with 3+ years testing SaaS and e-commerce, automating regression in Playwright.',
  },
]

const SKILLS = [
  { name: 'Playwright' },
  { name: 'API testing' },
  { name: 'Postman' },
  { name: 'Jira' },
  { name: 'CI/CD', assumed: true },
]

function RewriteProgress({ step }) {
  return (
    <div className="sc-progress">
      <div className="sc-sweep"><i /></div>
      <div className="sc-progress-body">
        <span className="sc-spark">✦</span>
        <div>
          <span className="sc-h">Rewriting &ldquo;QA Engineer CV&rdquo; for this job</span>
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

function TailorResult({ on }) {
  const before = useCountUp(54, on)
  const after = useCountUp(81, on)
  return (
    <div className="sc-tailor">
      <div className="sc-tailor-main">
        <div className="sc-card">
          <span className="sc-h">Match against this job</span>
          <div className="sc-figs">
            <span className="sc-fig"><em>Before</em><b style={{ color: scoreColour(before) }}>{Math.round(before)}</b><small>Fair</small></span>
            <span className="sc-arrow">→</span>
            <span className="sc-fig"><em>After</em><b style={{ color: scoreColour(after) }}>{Math.round(after)}</b><small>Strong</small></span>
            <span className="sc-diff">+27 points</span>
          </div>
          <span className="sc-note">CV strength 68 → 84 out of 100.</span>
        </div>

        <div className="sc-card sc-changes">
          <span className="sc-changes-head"><span className="sc-h">{CHANGES.length} changes made</span><em>Hide</em></span>
          {CHANGES.map((c) => (
            <div key={c.section + c.kind} className="sc-change">
              <span className="sc-change-title">
                {c.section}{c.field && ` · ${c.field}`}
                <span className="sc-kind">{c.kind}</span>
              </span>
              <span className="sc-reason">{c.reason}</span>
              {c.before && <p className="sc-before">{c.before}</p>}
              {c.after && <p className="sc-after">{c.after}</p>}
            </div>
          ))}
        </div>

        <div className="sc-card">
          <span className="sc-h">Skills</span>
          <span className="sc-reason">The skills this advert asks for have been moved to the front.</span>
          <span className="sc-skills">
            {SKILLS.map((s) => (
              <span key={s.name} className={`sc-skill ${s.assumed ? 'sc-skill--assumed' : ''}`}>
                {s.name}{s.assumed && <small> assumed</small>} <i>×</i>
              </span>
            ))}
          </span>
        </div>
      </div>

      <aside className="sc-card sc-live">
        <span className="sc-h">Live preview</span>
        <span className="sc-reason">The tailored CV as it will be saved.</span>
        <div className="sc-live-frame">
          <CvPaper className="sc-paper--live" accent="#4f46e5">
            <span className="sc-paper-hl" />
          </CvPaper>
        </div>
        <span className="sc-btn sc-btn--primary sc-btn--block">Save as new CV</span>
      </aside>
    </div>
  )
}

function TailorScreen({ on }) {
  const [step, setStep] = useState(0)

  // Restart the progress every time this screen comes into view.
  useEffect(() => {
    if (on) setStep(reduceMotion() ? REWRITE_STEPS.length : 0)
  }, [on])

  useEffect(() => {
    if (!on || step >= REWRITE_STEPS.length) return
    const t = setTimeout(() => setStep((s) => s + 1), 420)
    return () => clearTimeout(t)
  }, [on, step])

  const done = step >= REWRITE_STEPS.length
  return (
    <div className="sc-tailor-wrap">
      <div className="sc-page-head">
        <span className="sc-crumb">Jobs / QA Engineer · Kathmandu</span>
        <span className="sc-h sc-h--lg">Tailor your CV to this job</span>
      </div>
      {done ? <TailorResult on={on && done} /> : <RewriteProgress step={step} />}
    </div>
  )
}

/* -------------------------------------------------------------- Employer */

const applicants = [
  { name: 'Aarav Shrestha', from: 62, to: 88, status: 'Shortlisted' },
  { name: 'Sita Karki', from: 58, to: 79, status: 'Reviewing' },
  { name: 'Bikash Tamang', from: 41, to: 52, status: 'Rejected' },
]

function EmployerScreen() {
  return (
    <div className="sc-employer">
      <div className="sc-emp-head">
        <div>
          <span className="sc-h sc-h--lg">Applicants</span>
          <span className="sc-job">QA Engineer · Full-time · On-site</span>
        </div>
        <span className="sc-btn sc-btn--primary">+ Post a job</span>
      </div>
      {applicants.map((a) => (
        <div key={a.name} className="sc-applicant">
          <span className="sc-logo-sq">{a.name.split(' ').map((w) => w[0]).join('')}</span>
          <span className="sc-app-name"><b>{a.name}</b><em>Applied with a tailored CV</em></span>
          <span className="sc-match" style={{ color: scoreColour(a.to), borderColor: scoreColour(a.to) }}>
            <i>{a.from}%</i> → {a.to}%
          </span>
          <span className={`sc-status sc-status--${a.status.toLowerCase()}`}>{a.status}</span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ Shell */

const screens = [
  { key: 'home', tab: 'My CVs', tag: 'AI CV score', ms: 4200 },
  { key: 'tailor', tab: 'Tailor ✦', tag: 'Job seeker · AI rewrite', ms: 9000 },
  { key: 'employer', tab: 'Company', tag: 'Employer · applicants', ms: 4200 },
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
  return (
    <div className="sc-mock">
      <div className="sc-top">
        <span className="sc-brand"><span className="sc-brand-sq">CV</span>Smart CV Generator</span>
        <span className="sc-nav" role="tablist" aria-label="CV Generator screens">
          {screens.map((s, n) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={n === i}
              className={n === i ? 'on' : ''}
              onClick={() => {
                setI(n)
                setPaused(true)
              }}
            >
              {s.tab}
            </button>
          ))}
        </span>
      </div>
      <div className="sc-stage" aria-hidden="true">
        <div className={`sc-pane ${key === 'home' ? 'is-on' : ''}`}><HomeScreen on={key === 'home'} /></div>
        <div className={`sc-pane ${key === 'tailor' ? 'is-on' : ''}`}><TailorScreen on={key === 'tailor'} /></div>
        <div className={`sc-pane ${key === 'employer' ? 'is-on' : ''}`}><EmployerScreen /></div>
      </div>
    </div>
  )
}
