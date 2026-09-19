import { useMemo } from 'react'
import * as THREE from 'three'
import { roundedRectShape } from './roundedRect'

export default function Sunboard({ width, height, thickness, cornerRadius }) {
  const geometry = useMemo(() => {
    const shape = roundedRectShape(width, height, cornerRadius)
    const panel = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: false,
      curveSegments: 24,
    })
    // Center the extrusion along Z so front is at +thickness/2, back at -thickness/2
    panel.translate(0, 0, -thickness / 2)
    panel.computeVertexNormals()
    return panel
  }, [width, height, thickness, cornerRadius])

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#fbfaf7',
        roughness: 0.88,
        metalness: 0,
      }),
    [],
  )

  return <mesh castShadow receiveShadow geometry={geometry} material={material} />
}
