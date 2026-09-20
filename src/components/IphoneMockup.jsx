import { useMemo } from 'react'
import * as THREE from 'three'
import { roundedRectShape } from './roundedRect'
import { useTexture } from '@react-three/drei'

export default function IphoneMockup() {
  const width = 2.1
  const height = 4.3
  const thickness = 0.15
  const cornerRadius = 0.35

  const screenTexture = useTexture('/assets/mobile_screen.svg')
  screenTexture.colorSpace = THREE.SRGBColorSpace

  const geometry = useMemo(() => {
    const shape = roundedRectShape(width, height, cornerRadius)
    const phone = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02,
      curveSegments: 24,
    })
    phone.translate(0, 0, -thickness / 2)
    phone.computeVertexNormals()
    return phone
  }, [])

  const screenGeometry = useMemo(() => {
    const shape = roundedRectShape(width - 0.06, height - 0.06, cornerRadius - 0.01)
    const screen = new THREE.ShapeGeometry(shape)
    
    // Fix UVs to span [0, 1] across the bounding box
    screen.computeBoundingBox()
    const bbox = screen.boundingBox
    const uvAttribute = screen.attributes.uv
    for (let i = 0; i < uvAttribute.count; i++) {
      const u = (uvAttribute.getX(i) - bbox.min.x) / (bbox.max.x - bbox.min.x)
      const v = (uvAttribute.getY(i) - bbox.min.y) / (bbox.max.y - bbox.min.y)
      uvAttribute.setXY(i, u, v)
    }
    
    screen.computeVertexNormals()
    return screen
  }, [])

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e2e3e5', // Silver chassis
        roughness: 0.3,
        metalness: 0.8,
      }),
    [],
  )

  const screenMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff', // white base to show texture properly
        map: screenTexture,
        roughness: 0.15,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      }),
    [screenTexture],
  )

  return (
    <group>
      <mesh geometry={geometry} material={bodyMaterial} castShadow receiveShadow />
      <mesh 
        geometry={screenGeometry} 
        material={screenMaterial} 
        position={[0, 0, thickness / 2 + 0.021]} 
      />
    </group>
  )
}
