import React from 'react';
import { useGLTF, Html } from '@react-three/drei';

export default function Camera({ onSelect, isReady }) {
  const { scene } = useGLTF('/models/camera.glb');

  return (
    <group>
      <primitive object={scene} scale={20} />
      
      {/* Das Display wird NUR gerendert, wenn isReady true ist UND progress 100 war */}
      {isReady && (
        <Html
          transform
          occlude
          position={[0.95, -0.30, 0.27]}
          rotation={[0, Math.PI / 2, 0]}
          distanceFactor={2} 
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