// Renders a data string, turning **key words** into highlighted <strong> text.
// Keeps data.js as plain strings: wrap a phrase in ** ** to emphasise it.
export default function Rich({ text }) {
  if (!text) return null
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="hl">{part}</strong> : part,
  )
}
