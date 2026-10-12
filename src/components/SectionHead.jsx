import Reveal from './Reveal'

export default function SectionHead({ index, label, title, aside }) {
  return (
    <Reveal className="section-head">
      <div className="section-label">
        <span className="mono">{index}</span>
        <span>{label}</span>
      </div>
      <h2 className="section-title">{title}</h2>
      {aside && <p className="section-aside">{aside}</p>}
    </Reveal>
  )
}
