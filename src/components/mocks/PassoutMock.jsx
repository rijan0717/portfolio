// A partial, scaled-down recreation of projectpassout.vercel.app (hero + a peek of
// the featured projects). Everything is sized in cqi so it scales with the card.
const featured = [
  { tag: 'BCA / BIM / BIT', title: 'Online Medicine Delivery System', stack: ['PHP', 'MySQL', 'HTML'] },
  { tag: 'BCA', title: 'Library Management System', stack: ['PHP', 'MySQL', 'Bootstrap'] },
  { tag: 'BIT', title: 'Online Voting System', stack: ['React', 'Node.js', 'MongoDB'] },
]

export default function PassoutMock() {
  return (
    <div className="pp-mock" aria-hidden="true">
      <div className="pp-scroll">
        <div className="pp-nav">
          <span className="pp-logo">Project<b>Passout</b></span>
          <span className="pp-links"><i>Home</i><i>Projects</i><i>Pricing</i><i>Contact</i></span>
          <span className="pp-burger"><i /><i /><i /></span>
        </div>

        <div className="pp-hero">
          <span className="pp-badge">🎓 Nepal&rsquo;s #1 College Project Marketplace</span>
          <h4>
            Buy &amp; Submit <b>College</b>
            <br />
            <b>Projects</b> with Ease
          </h4>
          <p>Browse ready-made projects, get custom work done, or submit your own. Built for Nepali college students.</p>
          <div className="pp-btns">
            <span className="pp-btn pp-btn--fill">Browse Projects</span>
            <span className="pp-btn">Contact Us</span>
          </div>
          <div className="pp-stats">
            <span><b>50+</b>Projects Available</span>
            <span><b>200+</b>Happy Students</span>
            <span><b>10+</b>Colleges Covered</span>
          </div>
        </div>

        <div className="pp-featured">
          <span className="pp-eyebrow">OUR WORK</span>
          <h5>Featured <b>Projects</b></h5>
          <div className="pp-cards">
            {featured.map((f) => (
              <div key={f.title} className="pp-card">
                <span className="pp-chip">{f.tag}</span>
                <strong>{f.title}</strong>
                <span className="pp-stack">{f.stack.map((s) => <i key={s}>{s}</i>)}</span>
                <span className="pp-view">View More</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
