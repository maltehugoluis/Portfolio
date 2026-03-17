import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Camera from './camera';

export default function CameraScene({ onSelect }) {
  const controlsRef = useRef();

  // Mobile-Check
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="canvas-container">
      {/* Dein Branding */}
      <div className="site-brand">
        <div className="site-logo">MHL</div>
        {/* ... */}
      </div>

      <Canvas 
        // WICHTIG: dpr={[1, 2]} passt die Auflösung ans Handy an
        dpr={[1, 2]}
        // fov: 45 auf Mobile zeigt mehr vom Raum, damit die Kamera nicht verschwindet
        camera={{ position: [10, 0, 0], fov: isMobile ? 45 : 35, near: 0.1, }}
      >
        <ambientLight intensity={0.8} />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <OrbitControls 
            ref={controlsRef} 
            enablePan={false} 
            minDistance={4}   
            maxDistance={12} // Etwas mehr Spielraum zum Zurückzoomen
          />
          
          <group 
            scale={isMobile ? 0.6 : 1} 
            position={isMobile ? [0, -0.5, 0] : [0, 0, 0]}
          >
            <Camera onSelect={onSelect} />
          </group>
        </Suspense>

        <ContactShadows position={[0, -0.4, 0]} opacity={0.6} scale={2} blur={1.5} far={0.8} />
      </Canvas>
    </div>
  );
}