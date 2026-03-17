// src/camera.js
import React from 'react';
import { useGLTF, Html, useProgress } from '@react-three/drei';
 
export default function Camera({ onSelect, isReady, currentView, isMobile }) {
  const { scene } = useGLTF('/models/camera.glb');
  const { progress } = useProgress();
 
  // FIX 3: distanceFactor und position adaptiv je nach Gerät
  // Falls das Display bei deinen Freunden immer noch leicht verschoben ist,
  // passe die position-Werte für mobile/desktop separat an.
  const htmlPosition = isMobile
    ? [0.95, -0.30, 0.27]   // Mobile-Position – ggf. anpassen
    : [0.95, -0.30, 0.27];  // Desktop-Position – ggf. anpassen
 
  // FIX 4: distanceFactor abhängig vom FOV (Mobile: 45°, Desktop: 35°)
  // Kleinerer FOV = Objekt wirkt größer = distanceFactor muss kleiner sein
  const distanceFactor = isMobile ? 1.11 : 2;
 
  return (
    <group>
      <primitive object={scene} scale={20} />
      
      {isReady && currentView === 'camera' && (
        <Html
          transform
          occlude
          position={htmlPosition}
          rotation={[0, Math.PI / 2, 0]}
          distanceFactor={distanceFactor}
          eps={0.0001}
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