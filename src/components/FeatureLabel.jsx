import { useEffect, useRef } from 'react'
import { getScrollProgress } from '../utils/scrollProgress'

/**
 * A fixed-position text label that slides in/out based on scroll progress.
 *
 * @param {string} position  - 'left' or 'right'
 * @param {string} title     - Heading text
 * @param {string} subtitle  - Optional supporting text
 * @param {[number,number]} visibleRange - [fadeIn, fadeOut] scroll progress values (0–1)
 */
export default function FeatureLabel({ position, title, subtitle, visibleRange }) {
  const ref = useRef()
  const [start, end] = visibleRange

  useEffect(() => {
    let rafId

    const update = () => {
      const el = ref.current
      if (!el) return

      const p = getScrollProgress()
      const visible = p >= start && p <= end
      el.classList.toggle('visible', visible)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Initial state
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [start, end])

  return (
    <div ref={ref} className={`feature-label feature-label-${position}`}>
      <div className="feature-label-line" />
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
