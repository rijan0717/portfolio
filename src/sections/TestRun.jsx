import { useEffect, useState } from 'react'
import { terminalLines } from '../data'
import { useInView } from '../components/useReveal'
import Reveal from '../components/Reveal'
import { Check } from '../components/Icons'

const points = [
  'Page Object Model with locators kept separate from the tests',
  'Fixtures and test data isolated so specs can run in parallel',
  'API checks cover status codes, schemas, auth and error paths',
  'Each failure comes with evidence: trace, screenshot, request and response',
]

export default function TestRun() {
  const [ref, visible] = useInView({ threshold: 0.35 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setCount(terminalLines.length)
      return
    }
    if (count >= terminalLines.length) return
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? 300 : 260)
    return () => clearTimeout(t)
  }, [visible, count])

  const done = count >= terminalLines.length

  return (
    <section className="section testrun">
      <div className="testrun-grid">
        <div>
          <Reveal className="section-label">
            <span className="mono">03</span>
            <span>How I automate</span>
          </Reveal>
          <Reveal as="h2" className="section-title">
            Green builds you can <em>trust</em>.
          </Reveal>
          <Reveal as="p" className="section-aside" delay={80}>
            I write automation the next engineer can read, extend and debug without
            asking me. These are the conventions I follow in Playwright and Cypress:
          </Reveal>
          <ul className="checklist">
            {points.map((p, i) => (
              <Reveal as="li" key={p} delay={120 + i * 70}>
                <span className="check"><Check width={14} height={14} /></span>
                {p}
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="terminal" ref={ref}>
          <div className="terminal-bar">
            <span /><span /><span />
            <em className="mono">regression · chromium</em>
          </div>
          <div className="terminal-body mono" aria-live="polite">
            {terminalLines.slice(0, count).map((l, i) => (
              <div key={i} className={`tl tl-${l.t}`}>
                {l.t === 'ok' && <span className="tl-tick">✓</span>}
                <span className="tl-text">{l.text}</span>
                {l.ms && <span className="tl-ms">({l.ms})</span>}
              </div>
            ))}
            {!done && <span className="cursor" />}
          </div>
          <div className="terminal-foot mono">
            <span className={done ? 'badge-pass' : 'badge-run'}>{done ? 'PASSED' : 'RUNNING'}</span>
            <span>Example run (illustrative)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
