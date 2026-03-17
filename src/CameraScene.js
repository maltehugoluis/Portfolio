import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Camera from './camera';

export default function CameraScene({ onSelect }) {
  const controlsRef = useRef();

  // Check für mobile Endgeräte (schmaler als 768px)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="canvas-container">
      {/* Dein Branding oben links */}
      <div className="site-brand">
        <div className="site-logo">MHL</div>
        <div className="site-subtitle">INTERACTIVE</div>
        <div className="site-tagline">PORTFOLIO</div>
      </div>

      <Canvas 
        camera={{ position: [8, 0, 0], fov: 35 }}
        dpr={[1, 2]} // WICHTIG: Erlaubt normale und High-Res Displays (bis zu 2x)
>
        <ambientLight intensity={0.8} />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <OrbitControls 
            ref={controlsRef} 
            enablePan={false} 
            // ZOOM-LIMITS
            minDistance={4}   
            maxDistance={8}   
          />
          
          {/* Die Kamera wird in eine Gruppe gepackt, 
              die nur auf Mobile runterskaliert und verschoben wird.
          */}
          <group 
            scale={isMobile ? 0.7 : 1} 
            position={isMobile ? [0,89, -0.2, 0] : [0, 0, 0]}
          >
            <Camera onSelect={onSelect} />
          </group>
        </Suspense>

        <ContactShadows position={[0, -0.4, 0]} opacity={0.6} scale={2} blur={1.5} far={0.8} />
      </Canvas>
    </div>
  );
}