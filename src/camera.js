import React, { useState, useEffect } from 'react';
import { useGLTF, Html } from '@react-three/drei';

export default function Camera({ onSelect }) {
  const { scene } = useGLTF('/models/camera.glb');
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewport.width < 768;
  const isSmallMobile = viewport.width < 400;

  // Feste 3D-Position relativ zum Modell – kein responsives Switching mehr
  const screenPosition = [0.97, -0.30, 0.27];
  
  // Skalierung basierend auf Viewport-Breite normalisieren
  const htmlScale = isMobile
    ? isSmallMobile ? 0.13 : 0.17
    : 0.23;

  return (
    <group>
      <primitive object={scene} scale={20} />
      <Html
        transform
        occlude
        position={screenPosition}
        rotation={[0.00, Math.PI / 2, 0]}
        scale={htmlScale}
        zIndexRange={[100, 0]}
        pointerEvents="auto"
        style={{ pointerEvents: 'auto' }}
        // Verhindert dass Html seine eigene Transform-Matrix neu berechnet
        distanceFactor={undefined}
      >
        <div className="camera-screen" style={{ width: '220px', height: '160px' }}>
          <div className="os-header">
            <span>MHL OS v2.0</span>
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