import React from 'react';
import { useGLTF, Html, useProgress } from '@react-three/drei';

export default function Camera({ onSelect }) {
  const { scene } = useGLTF('/models/camera.glb');
  const { progress } = useProgress(); // Ladestatus abfragen

  return (
    <group>
      <primitive object={scene} scale={20} />
      
      {/* Das Display wird nur gerendert, wenn progress === 100 */}
      {progress === 100 && (
        <Html
          transform
          occlude
          position={[0.95, -0.30, 0.27]}
          rotation={[0, Math.PI / 2, 0]}
          distanceFactor={2.0} 
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
      )}
    </group>
  );
}