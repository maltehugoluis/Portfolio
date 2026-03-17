// src/camera.js
import React, { useRef, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';

export default function Camera({ onSelect, isReady, currentView }) {
  const { scene } = useGLTF('/models/camera.glb');
  const { camera } = useThree();
  const [distanceFactor, setDistanceFactor] = useState(2);

  // useFrame läuft jeden Frame — berechnet Distanz live
  useFrame(() => {
    const dx = camera.position.x - 0.95;
    const dy = camera.position.y - (-0.30);
    const dz = camera.position.z - 0.27;
    const realDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    // 6.5 anpassen bis die Größe passt: größer = kleiner Display, kleiner = größer Display
    const newFactor = realDistance / 5.5;

    setDistanceFactor(newFactor);
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
          distanceFactor={distanceFactor}
          eps={0.0001}
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