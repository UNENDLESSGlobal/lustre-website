import { useMemo } from 'react'
import * as THREE from 'three'
import { roundedRectShape } from './roundedRect'

export default function GlassLayer({ width, height, glassThickness, cornerRadius, zOffset }) {
  const geometry = useMemo(() => {
    const shape = roundedRectShape(width, height, cornerRadius)
    const glass = new THREE.ExtrudeGeometry(shape, {
      depth: glassThickness,
      bevelEnabled: false,
      curveSegments: 24,
    })
    // Center it along Z so its front is at +glassThickness / 2 and back at -glassThickness / 2
    glass.translate(0, 0, -glassThickness / 2)
    glass.computeVertexNormals()
    return glass
  }, [width, height, glassThickness, cornerRadius])

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transmission: 1,
        roughness: 0.02,
        metalness: 0,
        ior: 1.5,
        thickness: glassThickness,
        reflectivity: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        transparent: true,
        opacity: 1, // Keep opacity 1, let transmission handle transparency
        depthWrite: false,
      }),
    [glassThickness],
  )

  return (
    <mesh
      geometry={geometry}
      material={material}
      position={[0, 0, zOffset]}
      renderOrder={2}
    />
  )
}
