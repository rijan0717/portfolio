import { useState } from 'react'
import { profile } from '../data'
import Reveal from '../components/Reveal'
import { ArrowUpRight, Mail, Phone, Linkedin, Github, Instagram, FileDown } from '../components/Icons'

// Replace with a real Formspree form ID (formspree.io) before launch — this
// placeholder returns a 404, which the error state below handles gracefully.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

export default function Contact({ onOpenResume }) {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error('Form submission failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contact">
      <Reveal className="contact-inner">
        <div className="contact-copy">
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
        </div>

        <form className="contact-form" onSubmit={submit}>
          <span className="contact-form-eyebrow mono">Or send a message directly</span>
          {status === 'sent' ? (
            <p className="contact-form-done">
              Thanks — your message is in. I usually reply within a day.
            </p>
          ) : (
            <>
              <div className="contact-form-row">
                <label>
                  <span>Name</span>
                  <input type="text" name="name" required autoComplete="name" />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" required autoComplete="email" />
                </label>
              </div>
              <label>
                <span>Message</span>
                <textarea name="message" rows={4} required />
              </label>
              <div className="contact-form-foot">
                <button type="submit" className="btn btn-light" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowUpRight />
                </button>
                {status === 'error' && (
                  <span className="contact-form-error">
                    Couldn&rsquo;t send — email me directly instead.
                  </span>
                )}
              </div>
            </>
          )}
        </form>

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
