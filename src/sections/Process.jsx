import { process } from '../data'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'

export default function Process() {
  return (
    <section className="section">
      <SectionHead
        index="06"
        label="Process"
        title={<>From acceptance criteria to <em>go / no-go</em></>}
      />
      <ol className="process">
        {process.map((p, i) => (
          <Reveal as="li" key={p.step} className="process-step" delay={i * 70}>
            <span className="process-num mono">{String(i + 1).padStart(2, '0')}</span>
            <h3>{p.step}</h3>
            <p>{p.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
