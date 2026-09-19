import { useEffect, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import qrImage from '../../qr_image.jpeg'
import { roundedRectShape } from './roundedRect'

export default function QRPrint({ width, height, thickness, cornerRadius, zOffset = 0 }) {
  const texture = useLoader(THREE.TextureLoader, qrImage)

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.repeat.set(1, 1)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = false
    texture.needsUpdate = true
  }, [texture])

  const geometry = useMemo(() => {
    const shape = roundedRectShape(width, height, cornerRadius)
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: false,
      curveSegments: 24,
    })
    
    // Center it
    geo.translate(0, 0, -thickness / 2)
    geo.computeVertexNormals()

    const uvAttr = geo.attributes.uv
    const halfW = width / 2
    const halfH = height / 2

    for (let i = 0; i < uvAttr.count; i++) {
      const u = (uvAttr.getX(i) + halfW) / width
      const v = (uvAttr.getY(i) + halfH) / height
      uvAttr.setXY(i, u, v)
    }
    uvAttr.needsUpdate = true

    return geo
  }, [width, height, thickness, cornerRadius])

  return (
    <mesh geometry={geometry} castShadow receiveShadow position={[0, 0, zOffset]}>
      <meshStandardMaterial map={texture} roughness={0.88} metalness={0} />
    </mesh>
  )
}
