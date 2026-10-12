import { useEffect, useState } from 'react'

// Partial React recreations of the products Rijan has tested, plus his bug
// report sheet and Playwright report. Sized in cqi so they scale with the card.

const Stars = () => <span className="rb-stars">★★★★★</span>

export function RentalBuxMock() {
  return (
    <div className="rb-mock" aria-hidden="true">
      <div className="rb-left">
        <span className="rb-free">Free on all plans until 15 November 2026.</span>
        <h4>MTD for Landlords.<br />And Self-Employed.<br />One Platform.</h4>
        <span className="rb-rated"><Stars /> Rated 4.7 / 5 on Trustpilot</span>
        <div className="rb-badges">
          <span><i>☆</i>MTD &rsquo;26 Winner</span>
          <span><i>▣</i>HMRC Recognised</span>
          <span><i>☑</i>FCA Registered</span>
        </div>
      </div>
      <div className="rb-right">
        <span className="rb-logo"><span className="rb-cube" />rentalbux</span>
        <h5>Welcome to RentalBux</h5>
        <label>Email Address <b>*</b></label>
        <span className="rb-input">example@rentalbux.com</span>
        <label>Password <b>*</b></label>
        <span className="rb-input">••••••••</span>
        <span className="rb-forgot">Forgot Password?</span>
        <span className="rb-btn">Log In</span>
        <span className="rb-or">or</span>
        <div className="rb-sso"><span>Google</span><span>Microsoft</span><span>Apple</span></div>
      </div>
    </div>
  )
}

const figsPoints = [
  '30-day free trial, no card required',
  'One record from first enquiry to final invoice',
  'Proposals and engagement letters in seconds',
  'AML built into onboarding, not bolted on',
]

export function FigsFlowMock() {
  return (
    <div className="ff-mock" aria-hidden="true">
      <span className="ff-logo">figsflow</span>
      <div className="ff-grid">
        <div className="ff-left">
          <span className="ff-pill">ONE PRACTICE ERP</span>
          <h4>The whole practice,<br /><b>on one</b> client record.</h4>
          <ul>{figsPoints.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
        <div className="ff-card">
          <h5>Sign in to FigsFlow</h5>
          <p>Run your firm from lead to signed engagement.</p>
          <label>Email address <b>*</b></label>
          <span className="ff-input">✉ Enter your email</span>
          <label>Password <b>*</b> <em>Forgot password?</em></label>
          <span className="ff-input">🔒 Enter your password</span>
          <span className="ff-btn">Sign in</span>
          <span className="ff-or">Or continue with</span>
          <div className="ff-sso"><span>G</span><span className="ff-ms"><i /><i /><i /><i /></span></div>
        </div>
      </div>
    </div>
  )
}

const tmsNav = [
  { group: 'Work', items: ['Jobs', 'Meetings', 'Email', 'Client requests', 'Internal tasks'] },
  { group: 'Practice', items: ['Clients', 'Templates', 'Settings'] },
]

const tmsDays = [
  { day: 'Overdue', sub: 'before today', n: 7, overdue: true },
  { day: 'Today', sub: '11 Oct', n: 0, today: true },
  { day: 'Tomorrow', sub: '12 Oct', n: 0 },
  { day: 'Tuesday', sub: '13 Oct', n: 0 },
  { day: 'Wednesday', sub: '14 Oct', n: 0 },
]

const tmsTasks = [
  { title: 'Collect client records', client: 'QA O’Brien-Smith Test Person', days: 7, status: 'Not Started', tone: 'blue' },
  { title: 'Manager review', client: 'QA O’Brien-Smith Test Person', days: 7, status: 'Manager Level Review', tone: 'amber' },
  { title: 'Collect client records', client: 'QA Retest Org Ltd', days: 6, status: 'Not Started', tone: 'blue' },
  { title: 'Prepare tax computation', client: 'QA Retest Org Ltd', days: 6, status: 'Preparation · In Progress', tone: 'grey' },
]

export function TmsMock() {
  return (
    <div className="tm-mock" aria-hidden="true">
      <aside className="tm-side">
        <span className="tm-logo">figsflow <em>TMS</em></span>
        <span className="tm-link tm-link--on">⌂ Home</span>
        {tmsNav.map((g) => (
          <div key={g.group} className="tm-group">
            <span className="tm-group-h">{g.group}</span>
            {g.items.map((it) => (
              <span key={it} className="tm-link">
                {it}{it === 'Clients' && <b>2</b>}
              </span>
            ))}
          </div>
        ))}
        <span className="tm-ws"><i>QL</i><span><b>QA Delivery Team</b><em>Firm workspace</em></span></span>
      </aside>

      <div className="tm-main">
        <div className="tm-top">
          <span className="tm-search">⌕ Search clients, jobs, tasks, tickets…</span>
          <span className="tm-track">◷ Track Time</span>
          <span className="tm-bell">🔔<i>5</i></span>
          <span className="tm-raise">+ Raise a ticket</span>
          <span className="tm-avatar">R</span>
        </div>

        <div className="tm-body">
          <div className="tm-head">
            <b>☀ My Day</b>
            <span>Sunday, 11 October 2026 · 0 due today, 7 overdue</span>
          </div>
          <div className="tm-chips">
            <span className="tm-seg">⚑ Internal target <em>🏛 Statutory date</em></span>
            {['Completion', 'Deadlines', 'Error rate', 'Email 1st reply'].map((c) => (
              <span key={c} className="tm-chip">{c}<i>—</i></span>
            ))}
          </div>
          <div className="tm-days">
            {tmsDays.map((d) => (
              <span key={d.day} className={`tm-day ${d.overdue ? 'tm-day--over' : ''} ${d.today ? 'tm-day--today' : ''}`}>
                <b>{d.day}</b>
                <em>{d.sub}</em>
                <i>{d.n}</i>
              </span>
            ))}
          </div>
          <div className="tm-list-h"><i />Overdue <em>7 items</em></div>
          {tmsTasks.map((t, idx) => (
            <div key={idx} className="tm-row">
              <span className="tm-check" />
              <span className="tm-task">
                <b>{t.title}</b>
                <em>{t.client} · Self Assessment tax return</em>
              </span>
              <span className="tm-type">JOB TASK</span>
              <span className="tm-over">{t.days} days overdue</span>
              <span className={`tm-status tm-status--${t.tone}`}>{t.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// FigsFlow as one product: the CRM (real figsflow.com screenshot) and the TMS
// "My Day" dashboard, switchable with tabs and cycling on their own.
const suiteViews = [
  { key: 'crm', label: 'CRM', sub: 'Client record' },
  { key: 'tms', label: 'TMS', sub: 'My Day' },
]

export function FigsFlowSuiteMock() {
  const [view, setView] = useState('crm')
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setView((v) => (v === 'crm' ? 'tms' : 'crm')), 5000)
    return () => clearTimeout(t)
  }, [view, paused])

  return (
    <div className="fs-mock">
      <div className="fs-tabs" role="tablist" aria-label="FigsFlow modules">
        {suiteViews.map((v) => (
          <button
            key={v.key}
            type="button"
            role="tab"
            aria-selected={view === v.key}
            className={view === v.key ? 'on' : ''}
            onClick={() => {
              setView(v.key)
              setPaused(true)
            }}
          >
            <b>{v.label}</b> {v.sub}
          </button>
        ))}
      </div>
      <div className="fs-stage" aria-hidden="true">
        <div className={`fs-pane ${view === 'crm' ? 'is-on' : ''}`}>
          <img className="fs-shot" src="/projects/figsflow.webp" alt="" loading="lazy" />
        </div>
        <div className={`fs-pane ${view === 'tms' ? 'is-on' : ''}`}>
          <TmsMock />
        </div>
      </div>
    </div>
  )
}

const bugRows = [
  { project: 'Diskiss', type: 'Shopify store migration', total: 22, high: 3, med: 13, low: 6 },
  { project: 'Mayoral', type: 'Shopify theme build', total: 17, high: 0, med: 7, low: 10 },
  { project: 'Aztec Tactical', type: 'WooCommerce store', total: 13, high: 5, med: 4, low: 4 },
  { project: 'NoSS', type: 'Product review plugin', total: 7, high: 3, med: 3, low: 1 },
]

export function BugSheetMock() {
  const sum = (k) => bugRows.reduce((n, r) => n + r[k], 0)
  return (
    <div className="bs-mock" aria-hidden="true">
      <div className="bs-bar">
        <span className="bs-icon" />
        <span className="bs-file">RijanPariyar-Manual-QA-Bug-Reports-Ecommerce</span>
        <span className="bs-xlsx">.XLSX</span>
      </div>
      <div className="bs-sheet">
        <div className="bs-cols"><i /><i>A</i><i>B</i><i>C</i><i>D</i><i>E</i><i>F</i></div>
        <div className="bs-title"><i>1</i><b>Manual QA Bug Reports</b></div>
        <div className="bs-sub"><i>2</i><span>Rijan Pariyar · QA Engineer · Matat Nepal</span></div>
        <div className="bs-row bs-row--head">
          <i>4</i><span>Project</span><span>Application</span><span>Total</span><span>High</span><span>Medium</span><span>Low</span>
        </div>
        {bugRows.map((r, idx) => (
          <div key={r.project} className="bs-row">
            <i>{idx + 5}</i><span>{r.project}</span><span>{r.type}</span>
            <span className="num">{r.total}</span>
            <span className="num bs-high">{r.high || ''}</span>
            <span className="num">{r.med}</span>
            <span className="num">{r.low}</span>
          </div>
        ))}
        <div className="bs-row bs-row--total">
          <i>9</i><span>Total</span><span />
          <span className="num">{sum('total')}</span><span className="num">{sum('high')}</span>
          <span className="num">{sum('med')}</span><span className="num">{sum('low')}</span>
        </div>
      </div>
    </div>
  )
}

const specs = [
  ['search.spec.ts', 'search returns results for keyword', '2.4s'],
  ['search.spec.ts', 'filters results by department', '3.1s'],
  ['product.spec.ts', 'product page shows title, price and rating', '1.8s'],
  ['cart.spec.ts', 'adds product to cart and updates count', '2.9s'],
  ['cart.spec.ts', 'changes quantity in cart', '2.2s'],
  ['location.spec.ts', 'delivery location popover can be dismissed', '1.1s'],
]

export function PlaywrightMock() {
  return (
    <div className="pw-mock" aria-hidden="true">
      <div className="pw-head">
        <span className="pw-title">Playwright Test Report</span>
        <span className="pw-search">amazon-playwright-automation</span>
      </div>
      <div className="pw-filters">
        <span className="on">All <b>{specs.length}</b></span>
        <span className="pw-pass">Passed <b>{specs.length}</b></span>
        <span>Failed <b>0</b></span>
        <span>Flaky <b>0</b></span>
        <span>Skipped <b>0</b></span>
      </div>
      <div className="pw-list">
        {specs.map(([file, name, ms], i) => (
          <div key={name} className="pw-row" style={{ animationDelay: `${i * 0.45}s` }}>
            <span className="pw-tick">✓</span>
            <span className="pw-name"><b>{name}</b><em>{file}</em></span>
            <span className="pw-proj">chromium</span>
            <span className="pw-ms">{ms}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
