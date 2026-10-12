import { useEffect } from 'react'

// Drives the hero's parallax through CSS custom properties on the section:
//   --p   scroll progress through the hero, 0 → 1
//   --mx  pointer x relative to the hero centre, -1 → 1 (smoothed)
//   --my  pointer y relative to the hero centre, -1 → 1 (smoothed)
// Layers read these in CSS, so scrolling never re-renders React.
export function useHeroParallax(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let target = { x: 0, y: 0 }
    let current = { x: 0, y: 0 }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const h = el.offsetHeight || window.innerHeight
        const p = Math.min(1, Math.max(0, window.scrollY / h))
        el.style.setProperty('--p', p.toFixed(4))
      })
    }

    // Pointer parallax only for precise pointers (mouse / trackpad).
    const finePointer = window.matchMedia('(pointer: fine)').matches
    let easing = 0
    const ease = () => {
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08
      el.style.setProperty('--mx', current.x.toFixed(4))
      el.style.setProperty('--my', current.y.toFixed(4))
      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001
      easing = settled ? 0 : requestAnimationFrame(ease)
    }
    const startEase = () => {
      if (!easing) easing = requestAnimationFrame(ease)
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      target = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: ((e.clientY - r.top) / r.height) * 2 - 1,
      }
      startEase()
    }
    const onLeave = () => {
      target = { x: 0, y: 0 }
      startEase()
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    if (finePointer) {
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(easing)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [ref])
}
