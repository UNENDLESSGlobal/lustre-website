import { useEffect } from 'react'
import ProductScene from '../components/ProductScene'
import FeatureLabel from '../components/FeatureLabel'
import ScrollHint from '../components/ScrollHint'
import { setScrollProgress } from '../utils/scrollProgress'

export default function Home() {
  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const p = maxScroll > 0 ? window.scrollY / maxScroll : 0
      setScrollProgress(Math.min(Math.max(p, 0), 1))
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <main className="product-page">
      {/* Fixed full-viewport 3D canvas */}
      <div className="canvas-fixed">
        <ProductScene />
      </div>

      {/* Scroll-triggered feature text overlays */}
      <FeatureLabel
        position="right"
        title="Rounded Corners"
        subtitle="Precision-cut with smooth, refined edges"
        visibleRange={[0.18, 0.52]}
      />

      <FeatureLabel
        position="left"
        title="Durable"
        subtitle="6 mm sunboard built to last"
        visibleRange={[0.58, 0.95]}
      />

      {/* Scroll discovery hint */}
      <ScrollHint />

      {/* Invisible scroll spacer — creates the scroll distance that drives all animations */}
      <div className="scroll-spacer" aria-hidden="true" />
    </main>
  )
}
