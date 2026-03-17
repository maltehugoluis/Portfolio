import React from 'react';
import { useGLTF, Html, useProgress } from '@react-three/drei';

export default function Camera({ onSelect, isReady, currentView }) {
  const { scene } = useGLTF('/models/camera.glb');
  const { progress } = useProgress();

  return (
    <group>
      {/* Das 3D-Modell der Kamera */}
      <primitive object={scene} scale={20} />
      
      {/* Das Display wird nur gerendert, wenn:
          1. Das Modell zu 100% geladen ist (isReady)
          2. Wir uns im Kamera-Modus befinden (currentView)
      */}
      {isReady && currentView === 'camera' && (
        <Html
          transform
          occlude
          /* Absolute Positionierung in 3D-Einheiten */
          position={[0.95, -0.30, 0.27]}
          rotation={[0, Math.PI / 2, 0]}
          /* distanceFactor fixiert die Größe relativ zum Modell für alle Geräte */
          distanceFactor={2} 
          /* Höhere Präzision gegen Z-Fighting auf iOS */
          eps={0.00001}
          /* Rendert das Element außerhalb des Canvas-DOM für bessere Apple-Kompatibilität */
          portal={{ current: document.body }}
        >
          <div className="camera-screen-pro">
            <div className="os-header">
              <span>MHL OS v2.5</span>
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
      )}
    </group>
  );
}