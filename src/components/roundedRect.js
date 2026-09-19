import * as THREE from 'three'

export function roundedRectShape(width, height, radius) {
  const halfWidth = width / 2
  const halfHeight = height / 2
  const cornerRadius = Math.min(radius, halfWidth, halfHeight)
  const shape = new THREE.Shape()

  shape.moveTo(-halfWidth + cornerRadius, -halfHeight)
  shape.lineTo(halfWidth - cornerRadius, -halfHeight)
  shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + cornerRadius)
  shape.lineTo(halfWidth, halfHeight - cornerRadius)
  shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - cornerRadius, halfHeight)
  shape.lineTo(-halfWidth + cornerRadius, halfHeight)
  shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - cornerRadius)
  shape.lineTo(-halfWidth, -halfHeight + cornerRadius)
  shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + cornerRadius, -halfHeight)

  return shape
}
