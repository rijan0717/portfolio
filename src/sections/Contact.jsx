import { useState } from 'react'
import { profile } from '../data'
import Reveal from '../components/Reveal'
import { ArrowUpRight, Mail, Phone, Linkedin, Github, Instagram, FileDown } from '../components/Icons'

export default function Contact({ onOpenResume }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="contact" id="contact">
      <Reveal className="contact-inner">
        <span className="status-pill status-pill--dark">
          <span className="status-dot" /> Open to work
        </span>
        <h2 className="contact-title">
          Let&rsquo;s ship it <span className="outline-light">bug-free.</span>
        </h2>
        <p className="contact-sub">
          Hiring a QA engineer, or have a product that needs a careful second look before
          launch? I usually reply within a day.
        </p>

        <div className="contact-actions">
          <a href={`mailto:${profile.email}`} className="btn btn-light btn-lg">
            <Mail /> {profile.email} <ArrowUpRight />
          </a>
          <button className="btn btn-ghost btn-lg" onClick={copy}>
            {copied ? 'Copied ✓' : 'Copy email'}
          </button>
        </div>

        <div className="contact-links">
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}><Phone /> {profile.phone}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>
          <a href={profile.instagram} target="_blank" rel="noreferrer"><Instagram /> Instagram</a>
          <button type="button" onClick={onOpenResume}><FileDown /> Preview résumé</button>
          <a href={profile.resume} download><FileDown /> Download résumé</a>
        </div>
      </Reveal>
    </section>
  )
}
