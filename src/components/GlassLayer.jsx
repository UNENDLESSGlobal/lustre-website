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
    glass.computeVertexNormals()
    return glass
  }, [width, height, glassThickness, cornerRadius])

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transmission: 0.94,
        roughness: 0.05,
        metalness: 0,
        ior: 1.52,
        thickness: 0.3,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        reflectivity: 0.5,
        transparent: true,
        depthWrite: false,
      }),
    [],
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
