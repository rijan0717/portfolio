import { useEffect, useRef } from 'react'
import { profile } from '../data'
import { Close, FileDown, ArrowUpRight } from './Icons'

// Full-screen preview of the résumé PDF with download and open-in-tab actions.
export default function ResumeModal({ open, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const fileName = profile.resume.split('/').pop()

  return (
    <div className="resume-overlay" onClick={onClose}>
      <div
        className="resume-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="resume-head">
          <div className="resume-title">
            <span className="resume-file"><FileDown width={18} height={18} /></span>
            <div>
              <h2 id="resume-title">{profile.firstName} {profile.lastName}: Résumé</h2>
              <span className="mono">{fileName}</span>
            </div>
          </div>
          <div className="resume-actions">
            <a className="btn btn-ghost-dark" href={profile.resume} target="_blank" rel="noreferrer">
              Open in new tab <ArrowUpRight />
            </a>
            <a className="btn btn-dark" href={profile.resume} download={fileName}>
              <FileDown /> Download PDF
            </a>
            <button ref={closeRef} className="resume-close" onClick={onClose} aria-label="Close résumé preview">
              <Close width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="resume-body">
          {/* Browsers that can't show PDFs inline (most phones) get the fallback. */}
          <object data={`${profile.resume}#view=FitH&toolbar=0`} type="application/pdf" className="resume-pdf">
            <div className="resume-fallback">
              <FileDown width={36} height={36} />
              <p>Your browser can&rsquo;t preview PDFs here.</p>
              <div className="resume-fallback-actions">
                <a className="btn btn-dark" href={profile.resume} download={fileName}>
                  <FileDown /> Download PDF
                </a>
                <a className="btn btn-ghost-dark" href={profile.resume} target="_blank" rel="noreferrer">
                  Open PDF <ArrowUpRight />
                </a>
              </div>
            </div>
          </object>
        </div>
      </div>
    </div>
  )
}
