import { useState } from 'react'
import { useInView } from './useReveal'

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useInView()
  // Drop the stagger delay once revealed so hover transitions stay snappy.
  const [settled, setSettled] = useState(false)
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={settled ? undefined : { transitionDelay: `${delay}ms` }}
      onTransitionEnd={visible && !settled ? () => setSettled(true) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
