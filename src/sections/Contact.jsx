import { useState } from 'react'
import { profile } from '../data'
import Reveal from '../components/Reveal'
import { ArrowUpRight, Mail, Phone, Linkedin, Github, Instagram, FileDown } from '../components/Icons'

// Formspree form ID (formspree.io). Not a secret — it ships in the client
// bundle either way — so it lives here as the default. Override it per
// environment with VITE_FORMSPREE_ID if the form ever needs swapping.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'moejkzdn'
const FORMSPREE_ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null

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
    const form = e.target
    const data = new FormData(form)

    // Honeypot: people leave this hidden field empty, bots fill it in.
    if (data.get('_gotcha')) {
      setStatus('sent')
      form.reset()
      return
    }

    if (!FORMSPREE_ENDPOINT) {
      // No backend configured — hand the message to the visitor's mail client.
      const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`
      window.location.href =
        `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio enquiry')}` +
        `&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
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
                <textarea name="message" rows={4} required minLength={10} />
              </label>

              {/* Formspree reads _subject for the notification subject line. */}
              <input type="hidden" name="_subject" value="New message from your portfolio" />
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
              />

              <div className="contact-form-foot">
                <button type="submit" className="btn btn-light" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowUpRight />
                </button>
                {status === 'error' && (
                  <span className="contact-form-error">
                    Couldn&rsquo;t send — <a href={`mailto:${profile.email}`}>email me directly</a>.
                  </span>
                )}
              </div>
              <p className="contact-form-status" role="status" aria-live="polite">
                {status === 'sending' ? 'Sending your message…' : ''}
              </p>
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
