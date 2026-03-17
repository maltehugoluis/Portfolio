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

    // Statt scale, nutze distanceFactor für konsistente Größe
    const distanceFactor = isMobile
    ? isSmallMobile ? 3.5 : 4.5
    : undefined; // Desktop bleibt wie es ist

    const htmlScale = isMobile ? 0.28 : 0.23; // Mobile etwas größer

  return (
    <group>
      <primitive object={scene} scale={20} />
      <Html
        transform
        occlude
        position={screenPosition}
        rotation={[0.00, Math.PI / 2, 0]}
        scale={htmlScale}
        distanceFactor={distanceFactor}  // ← neu
        zIndexRange={[100, 0]}
        pointerEvents="auto"
        >
        <div className="camera-screen" style={{ width: '280px', height: '180px' }}>
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