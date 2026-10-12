import { skills, education } from '../data'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'

export default function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHead index="07" label="Toolkit" title={<>The <em>stack</em> behind the sign-off</>} />
      <div className="skills">
        {skills.map((s, i) => (
          <Reveal key={s.group} className="skill-row" delay={i * 50}>
            <h3>{s.group}</h3>
            <div className="tags">
              {s.items.map((t) => <span key={t} className="tag tag-lg">{t}</span>)}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="edu">
        <Reveal className="edu-card">
          <span className="section-label"><span>Education</span></span>
          <h3>{education.degree}</h3>
          <p>{education.school}</p>
        </Reveal>
        <Reveal className="edu-card" delay={100}>
          <span className="section-label"><span>Languages</span></span>
          {education.languages.map((l) => <h3 key={l} className="edu-lang">{l}</h3>)}
        </Reveal>
      </div>
    </section>
  )
}
