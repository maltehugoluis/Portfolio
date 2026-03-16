import React from 'react'
import { useGLTF, Html } from '@react-three/drei'

export default function Camera({ onSelect }) {
  const { scene } = useGLTF('/models/camera.glb')

  return (
    <group>
      <primitive object={scene} scale={20} />
      
      <Html
        transform
        occlude
        // Wir lassen occlude weg, damit es niemals durch das Gehäuse verschwindet
        // X=0.48 (weiter nach außen), Y=-0.40, Z=0.27
        position={[0.97, -0.30, 0.27]} 
        rotation={[0.00, Math.PI / 2, 0]}
        scale={0.23}
        // Wichtig: Verhindert, dass das Display "flackert"
        zIndexRange={[10, 0]} 
      >
        <div className="camera-screen">
          <div className="os-header">
            <span>MHL OS v2.0</span>
          </div>

          <div className="os-grid">
            <button className="tile" onClick={() => onSelect('EVENTS')}>
              EVENTS
            </button>
            <button className="tile" onClick={() => onSelect('STREET')}>
              STREET
            </button>
            <button className="tile" onClick={() => onSelect('NATURE')}>
              NATURE
            </button>
            <button className="tile" onClick={() => onSelect('PEOPLE')}>
              PEOPLE
            </button>
          </div>
        </div>
      </Html>
    </group>
  )
}