import { useState } from 'react'
import Nav from './components/Nav'
import PageLoader from './components/PageLoader'
import ResumeModal from './components/ResumeModal'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import About from './sections/About'
import Services from './sections/Services'
import TestRun from './sections/TestRun'
import Experience from './sections/Experience'
import Work from './sections/Work'
import Process from './sections/Process'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import { profile } from './data'

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const openResume = () => setResumeOpen(true)
  const [loaderKey, setLoaderKey] = useState(0)

  return (
    <div className="backdrop">
      <PageLoader key={loaderKey} />
      <div className="sheet">
        <Nav onOpenResume={openResume} />
        <main>
          <Hero onOpenResume={openResume} />
          <Marquee />
          <About />
          <Services />
          <TestRun />
          <Experience />
          <Work />
          <Process />
          <Skills />
          <Contact onOpenResume={openResume} />
        </main>
        <footer className="footer">
          <div className="footer-row">
            <span className="mono footer-tagline">Test wise &amp; Build</span>
            <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
          </div>
          <button
            type="button"
            className="bug-replay"
            onClick={() => setLoaderKey((k) => k + 1)}
            aria-label="Replay the loading bug"
          >
            🐞 <span>Replay the bug</span>
          </button>
          <a href="#top" className="footer-top">Back to top <span>↑</span></a>
        </footer>
      </div>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  )
}
