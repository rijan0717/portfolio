import { experience } from '../data'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import Rich from '../components/Rich'

export default function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHead
        index="04"
        label="Experience"
        title={<>3+ years of making <em>“works on my machine”</em> work everywhere</>}
      />
      <div className="timeline">
        {experience.map((job, i) => (
          <Reveal key={job.company} className="job" delay={i * 100}>
            <div className="job-side">
              <span className="job-period mono">{job.period}</span>
              {job.current && <span className="job-now"><span className="status-dot" /> Current</span>}
            </div>
            <div className="job-main">
              <h3>{job.company}</h3>
              <p className="job-role">{job.role} · {job.location}</p>
              <ul>
                {job.points.map((p) => <li key={p}><Rich text={p} /></li>)}
              </ul>
              <div className="tags">
                {job.stack.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
