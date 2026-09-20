import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import AnimatedModel from './AnimatedModel'

function CameraAim() {
  const camera = useThree((state) => state.camera)

  useEffect(() => {
    camera.lookAt(0, 0, 0)
    camera.updateMatrixWorld()
  }, [camera])

  return null
}

function Studio() {
  return (
    <>
      {/* Soft ambient fill */}
      <ambientLight intensity={1.0} />

      {/* Warm hemisphere for natural top-bottom gradient */}
      <hemisphereLight args={['#fffdf8', '#ded8cf', 0.6]} />

      {/* Key light — soft directional with shadow */}
      <directionalLight
        castShadow
        position={[-3.5, 5, 6]}
        intensity={2.0}
        color="#fffaf1"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0002}
      />

      {/* Gentle fill from the opposite side */}
      <directionalLight
        position={[4, 2, -3]}
        intensity={0.4}
        color="#f0eee8"
      />

      {/* Ground shadow catcher */}
      <mesh receiveShadow position={[0, -2.35, -0.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
    </>
  )
}

export default function ProductScene() {
  return (
    <div className="product-scene" aria-label="3D QR sunboard stand">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [1.8, 0.5, 9.5],
          fov: 32,
          near: 0.1,
          far: 100,
        }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#d2d2d7']} />
        <CameraAim />
        <Studio />
        
        <Environment preset="studio" resolution={1024}>
          <group>
            {/* Large softbox top-front */}
            <mesh position={[0, 8, 4]} rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[10, 5]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            
            {/* Narrow vertical light strip left */}
            <mesh position={[-4, 2, 6]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[1, 15]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            
            {/* Narrow vertical light strip right */}
            <mesh position={[4, 2, 6]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[1, 15]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Subtle horizontal highlight below */}
            <mesh position={[0, -3, 5]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[10, 0.5]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Darker area behind the camera to provide contrast gaps */}
            <mesh position={[0, 0, 15]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshBasicMaterial color="#050505" />
            </mesh>
          </group>
        </Environment>

        <Suspense fallback={null}>
          <AnimatedModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
