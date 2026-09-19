import { useEffect, useRef } from 'react'
import { getScrollProgress } from '../utils/scrollProgress'

/**
 * Subtle animated chevron + "Scroll" hint at the bottom of the viewport.
 * Fades out once the user starts scrolling.
 */
export default function ScrollHint() {
  const ref = useRef()

  useEffect(() => {
    let rafId

    const update = () => {
      const el = ref.current
      if (!el) return
      el.classList.toggle('hidden', getScrollProgress() > 0.04)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={ref} className="scroll-hint">
      <span>Scroll</span>
      <div className="scroll-hint-chevron" />
    </div>
  )
}
