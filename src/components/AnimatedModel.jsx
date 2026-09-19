import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import QRStand from './QRStand'
import { getScrollProgress } from '../utils/scrollProgress'

// Keyframe definitions: each entry is a scroll-position snapshot.
// The model interpolates between adjacent keyframes with smoothstep easing.
const keyframes = [
  //  t      rotY     posX    posY    posZ    scale
  { t: 0,    rotY: 0,     posX: 0,    posY: 0,    posZ: 0,    scale: 1 },
  // Close-up of top-right corner: the corner sits at local (1.41, 2.3).
  // At scale 3×, we offset by -(1.41*3*cos0.4, 2.3*3) ≈ (-3.5, -6.5) to place it at viewport center.
  { t: 0.5,  rotY: -0.4,  posX: -3.5, posY: -6.5, posZ: 3.0,  scale: 3.0 },
  // Nearly side-on view, shifted slightly right → room for "Durable" text on the left
  { t: 1.0,  rotY: -1.4,  posX: 1.0,  posY: 0,    posZ: 1.2,  scale: 1.2 },
]

function smoothstep(t) {
  const c = Math.max(0, Math.min(1, t))
  return c * c * (3 - 2 * c)
}

function interpolate(kfs, t) {
  t = Math.max(0, Math.min(1, t))

  let i = 0
  for (; i < kfs.length - 2; i++) {
    if (t <= kfs[i + 1].t) break
  }

  const a = kfs[i]
  const b = kfs[i + 1]
  const localT = b.t > a.t ? (t - a.t) / (b.t - a.t) : 0
  const s = smoothstep(localT)

  return {
    rotY:  a.rotY  + (b.rotY  - a.rotY)  * s,
    posX:  a.posX  + (b.posX  - a.posX)  * s,
    posY:  a.posY  + (b.posY  - a.posY)  * s,
    posZ:  a.posZ  + (b.posZ  - a.posZ)  * s,
    scale: a.scale + (b.scale - a.scale) * s,
  }
}

export default function AnimatedModel() {
  const groupRef = useRef()
  const smoothProgress = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const raw = getScrollProgress()
    // Exponential smoothing for buttery-smooth transitions (no jitter from discrete scroll events)
    smoothProgress.current += (raw - smoothProgress.current) * (1 - Math.exp(-5 * delta))

    const { rotY, posX, posY, posZ, scale } = interpolate(keyframes, smoothProgress.current)

    groupRef.current.rotation.y = rotY
    groupRef.current.position.set(posX, posY, posZ)
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef}>
      <QRStand />
    </group>
  )
}
