import QRPrint from './QRPrint'
import GlassLayer from './GlassLayer'

// Actual image pixel dimensions
const IMAGE_WIDTH = 786
const IMAGE_HEIGHT = 1281

export default function QRStand() {
  const height = 4.6
  const width = height * (IMAGE_WIDTH / IMAGE_HEIGHT)
  const thickness = 0.0825
  const cornerRadius = 0.22

  // Thinner glass
  const glassThickness = 0.005

  // Glass sits flush against the print face with minimal gap
  const glassZOffset = thickness / 2 + 0.0005

  return (
    <group>
      <QRPrint width={width} height={height} thickness={thickness} cornerRadius={cornerRadius} />
      <GlassLayer
        width={width}
        height={height}
        glassThickness={glassThickness}
        cornerRadius={cornerRadius}
        zOffset={glassZOffset}
      />
    </group>
  )
}
