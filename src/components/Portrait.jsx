import { useState } from 'react'
import { profile } from '../data'

// Shows public/rijan.png when present; otherwise a QA-themed placeholder.
export default function Portrait() {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        className="portrait-img"
        src={profile.photo}
        alt={`${profile.firstName} ${profile.lastName}`}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div className="portrait-placeholder" role="img" aria-label="Portrait placeholder">
      <div className="pp-scan" />
      <span className="pp-initials">RP</span>
      <div className="pp-tags">
        <span className="pp-tag"><i className="ok" /> visual.spec.ts</span>
        <span className="pp-tag"><i className="ok" /> a11y.spec.ts</span>
        <span className="pp-tag"><i className="ok" /> api.spec.ts</span>
      </div>
    </div>
  )
}
