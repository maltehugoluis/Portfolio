import React from 'react';
import { useGLTF, Html } from '@react-three/drei';

export default function Camera({ onSelect }) {
  const { scene } = useGLTF('/models/camera.glb');

  return (
    <group>
      <primitive object={scene} scale={20} />
      <Html
        transform
        occlude
        /* Nutze exakte Koordinaten */
        position={[0.97, -0.30, 0.27]}
        rotation={[0, Math.PI / 2, 0]}
        /* distanceFactor ist der Schlüssel: 
           Er fixiert die Größe relativ zur 3D-Welt, NICHT zum Bildschirm-Zoom */
        distanceFactor={1.2} 
        /* Verhindert das "Zittern" auf iOS */
        eps={0.00001}
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
    </group>
  );
}