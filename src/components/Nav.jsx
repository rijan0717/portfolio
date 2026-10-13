import { useEffect, useRef, useState } from 'react'
import { projects, services } from '../data'
import { ArrowUpRight, Menu, Close, FileDown } from './Icons'
import ThemeToggle from './ThemeToggle'
import Uptime from './Uptime'

const links = [
  { href: '#work', label: 'Work', count: String(projects.length) },
  { href: '#services', label: 'Services', count: String(services.length) },
  { href: '#experience', label: 'Experience', count: '3y+' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav({ onOpenResume }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const progressRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // Reading progress bar under the nav, updated once per frame.
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const openResume = () => {
    setOpen(false)
    onOpenResume()
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <span className="nav-progress" ref={progressRef} aria-hidden="true" />
      <a href="#top" className="status-pill">
        <span className="status-dot" />
        Active
        <Uptime />
      </a>

      <nav className={`nav-links ${open ? 'nav-links--open' : ''}`} aria-label="Primary">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
            {l.count && <span className="nav-count">[{l.count}]</span>}
          </a>
        ))}
        <button type="button" className="nav-resume-link" onClick={openResume}>
          Résumé <span className="nav-count">[PDF]</span>
        </button>
      </nav>

      <div className="nav-actions">
        <ThemeToggle />
        <button type="button" className="btn btn-outline nav-resume" onClick={openResume}>
          <FileDown /> Résumé
        </button>
        <a href="#contact" className="btn btn-dark nav-cta">
          Let&rsquo;s Talk <ArrowUpRight />
        </a>
      </div>

      <button
        className="menu-btn"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <Close width={20} height={20} /> : <Menu width={20} height={20} />}
      </button>
    </header>
  )
}
