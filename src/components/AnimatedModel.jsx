import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import QRStand from './QRStand'
import IphoneMockup from './IphoneMockup'
import { getScrollProgress } from '../utils/scrollProgress'

// Keyframe definitions: each entry is a scroll-position snapshot.
// The model interpolates between adjacent keyframes with smoothstep easing.
const desktopKeyframes = [
  //  t      rotY     posX    posY    posZ    scale   phoneX  phoneRotY
  { t: 0,    rotY: 0,     posX: 0,    posY: 0,    posZ: 0,    scale: 1,    phoneX: 0,    phoneRotY: 0 },
  { t: 0.25, rotY: -0.4,  posX: -3.5, posY: -6.5, posZ: 3.0,  scale: 3.0,  phoneX: 0,    phoneRotY: 0 },
  { t: 0.45, rotY: -0.4,  posX: -3.5, posY: -6.5, posZ: 3.0,  scale: 3.0,  phoneX: 0,    phoneRotY: 0 },
  { t: 0.6,  rotY: -1.57, posX: 1.5,  posY: 0,    posZ: 2.5,  scale: 3.0,  phoneX: 0,    phoneRotY: 0 },
  { t: 0.75, rotY: -1.57, posX: 1.5,  posY: 0,    posZ: 2.5,  scale: 3.0,  phoneX: 0,    phoneRotY: 0 },
  { t: 1.0,  rotY: -0.15, posX: 1.9,  posY: 0,    posZ: -0.5, scale: 0.9,  phoneX: -3.8, phoneRotY: 0.3 },
]

const mobileKeyframes = [
  //  t      rotY     posX    posY    posZ    scale   phoneX  phoneRotY
  { t: 0,    rotY: 0,     posX: 0,    posY: 0,    posZ: 0,    scale: 1,    phoneX: 0,    phoneRotY: 0 },
  // Phase 1 (Rounded Corners): move model a bit left
  { t: 0.25, rotY: -0.4,  posX: -2.5, posY: -6.5, posZ: 3.0,  scale: 3.0,  phoneX: 0,    phoneRotY: 0 },
  { t: 0.45, rotY: -0.4,  posX: -2.5, posY: -6.5, posZ: 3.0,  scale: 3.0,  phoneX: 0,    phoneRotY: 0 },
  // Phase 2 (Durable): move model bit right (from 1.5 to 2.5)
  { t: 0.6,  rotY: -1.57, posX: 2.5,  posY: 0,    posZ: 2.5,  scale: 3.0,  phoneX: 0,    phoneRotY: 0 },
  { t: 0.75, rotY: -1.57, posX: 2.5,  posY: 0,    posZ: 2.5,  scale: 3.0,  phoneX: 0,    phoneRotY: 0 },
  // Phase 3 (Connect to App): move model left close to phone so both are centered side by side without overlapping
  { t: 1.0,  rotY: -0.15, posX: 1.2,  posY: 0,    posZ: -0.5, scale: 0.9,  phoneX: -3.2, phoneRotY: 0.3 },
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
    phoneX: a.phoneX + (b.phoneX - a.phoneX) * s,
    phoneRotY: (a.phoneRotY || 0) + ((b.phoneRotY || 0) - (a.phoneRotY || 0)) * s,
  }
}

export default function AnimatedModel() {
  const groupRef = useRef()
  const phoneRef = useRef()
  const smoothProgress = useRef(0)
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current || !phoneRef.current) return

    const raw = getScrollProgress()
    // Exponential smoothing for buttery-smooth transitions
    smoothProgress.current += (raw - smoothProgress.current) * (1 - Math.exp(-5 * delta))

    const activeKeyframes = isMobile ? mobileKeyframes : desktopKeyframes
    const { rotY, posX, posY, posZ, scale, phoneX, phoneRotY } = interpolate(activeKeyframes, smoothProgress.current)

    // Scale down model and positions on mobile to fit the screen properly
    const mobileScale = isMobile ? 0.5 : 1.0;

    groupRef.current.rotation.y = rotY
    groupRef.current.position.set(posX * mobileScale, posY * mobileScale, posZ)
    groupRef.current.scale.setScalar(scale * mobileScale)
    
    phoneRef.current.position.x = phoneX
    phoneRef.current.rotation.y = phoneRotY
    
    // Hide the phone until the Durable text phase concludes
    phoneRef.current.visible = smoothProgress.current > 0.82
  })

  return (
    <group ref={groupRef}>
      <QRStand />
      <group ref={phoneRef} position={[0, 0, -0.2]}>
        <IphoneMockup />
      </group>
    </group>
  )
}
