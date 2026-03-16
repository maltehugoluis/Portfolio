import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Camera from './camera';

export default function CameraScene({ onSelect }) {
  const controlsRef = useRef();

  return (
    <div className="canvas-container">
      {/* Dein Branding oben links */}
      <div className="site-brand">
        <div className="site-logo">MHL</div>
        <div className="site-subtitle">INTERACTIVE</div>
        <div className="site-tagline">PORTFOLIO</div>
      </div>

      <Canvas camera={{ position: [8, 0, 0], fov: 35 }}>
        <ambientLight intensity={0.8} />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <OrbitControls ref={controlsRef} enablePan={false} 
          // ZOOM-LIMITS (Beispielwerte basierend auf 20%)
            minDistance={4}   // Verhindert zu nahes Heranzoomen
            maxDistance={8}   // Verhindert zu weites Wegzoomen
  />
          {/* HIER ist der wichtige Punkt: onSelect weiterreichen! */}
          <Camera onSelect={onSelect} />
        </Suspense>

        <ContactShadows position={[0, -0.4, 0]} opacity={0.6} scale={2} blur={1.5} far={0.8} />
      </Canvas>
    </div>
  );
}
