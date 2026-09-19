import QRPrint from './QRPrint'
import Sunboard from './Sunboard'
import GlassLayer from './GlassLayer'

// Actual image pixel dimensions
const IMAGE_WIDTH = 786
const IMAGE_HEIGHT = 1281

export default function QRStand() {
  const height = 4.6
  const width = height * (IMAGE_WIDTH / IMAGE_HEIGHT)
  const thickness = 0.0825 // Sunboard thickness
  const cornerRadius = 0.22

  const printThickness = 0.001 // Very thin print layer
  const glassThickness = thickness / 3 // 2mm glass : 6mm sunboard ratio

  // Sunboard is centered at z=0, so its front face is at +thickness/2
  // Place the print just in front of the sunboard
  const printZOffset = thickness / 2 + printThickness / 2
  
  // Place the glass just in front of the print, with a slight offset to avoid z-fighting
  const glassZOffset = printZOffset + printThickness / 2 + glassThickness / 2 + 0.0001

  return (
    <group>
      <Sunboard width={width} height={height} thickness={thickness} cornerRadius={cornerRadius} />
      <QRPrint 
        width={width} 
        height={height} 
        thickness={printThickness} 
        cornerRadius={cornerRadius} 
        zOffset={printZOffset} 
      />
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
