import React from 'react'
import { useGLTF, Html } from '@react-three/drei'

export default function Camera({ onSelect }) {
  const { scene } = useGLTF('/models/camera.glb')

  // Check für mobile Endgeräte
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Hier kannst du die Position für Mobile (oben) und Desktop (unten) getrennt tunen
  const mobilePosition = [1.02, -0.28, 0.27]; // X leicht erhöht gegen Durchscheinen
  const desktopPosition = [0.97, -0.30, 0.27];

  return (
    <group>
      <primitive object={scene} scale={20} />
      
      <Html
        transform
        occlude
        position={isMobile ? mobilePosition : desktopPosition} 
        rotation={[0.00, Math.PI / 2, 0]}
        // Skalierung auf Mobile etwas kleiner, damit es in den Kamerarücken passt
        scale={isMobile ? 0.22 : 0.23}
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