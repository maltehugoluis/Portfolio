// src/camera.js
import React, { useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';

export default function Camera({ onSelect, isReady, currentView }) {
  const { scene } = useGLTF('/models/camera.glb');
  const { camera } = useThree();
  const [cssScale, setCssScale] = useState(1);

  useFrame(() => {
    // Nur FOV ausgleichen — keine Bildschirmgröße
    // Referenz: FOV 35° (Desktop) — auf Mobile mit FOV 45° wird skaliert
    const fovRad = (camera.fov * Math.PI) / 180;
    const currentTan = Math.tan(fovRad / 2);
    const refTan = Math.tan((85 * Math.PI / 180) / 2);
    const fovScale = refTan / currentTan;
    setCssScale(fovScale);
  });

  return (
    <group>
      <primitive object={scene} scale={20} />

      {isReady && currentView === 'camera' && (
        <Html
          transform
          occlude
          position={[0.95, -0.30, 0.27]}
          rotation={[0, Math.PI / 2, 0]}
          distanceFactor={1}
          eps={0.0001}
          zIndexRange={[10, 0]}
          style={{
            transform: `scale(${cssScale})`,
            transformOrigin: 'center center',
          }}
        >
          <div className="camera-screen-pro">
            <div className="os-header">
              <span>MHL OS v2.5</span>
            </div>
            <div className="os-grid">
              <button className="tile" onClick={() => onSelect('EVENTS')}>EVENTS</button>
              <button className="tile" onClick={() => onSelect('STREET')}>STREET</button>
              <button className="tile" onClick={() => onSelect('NATURE')}>NATURE</button>
              <button className="tile" onClick={() => onSelect('PEOPLE')}>PEOPLE</button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}