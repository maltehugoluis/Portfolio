import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Camera from './camera'; // Importiert deine Camera-Komponente aus camera.js

export default function CameraScene({ onSelect }) {
  const controlsRef = useRef();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="canvas-container">
      <div className="site-brand">
        <div className="site-logo">MHL</div>
        <div className="site-subtitle">INTERACTIVE</div>
        <div className="site-tagline">PORTFOLIO</div>
      </div>

      <Canvas 
        dpr={[1, 2]}
        camera={{ 
          position: [12, 0, 0], 
          fov: isMobile ? 50 : 35 
        }}
      >
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={0.8} />
        <Environment preset="studio" />
        
        <Suspense fallback={null}>
          <OrbitControls 
            ref={controlsRef} 
            enablePan={false} 
            minDistance={8}   
            maxDistance={15}
            makeDefault
          />
          
          <group 
            scale={isMobile ? 0.8 : 1} 
            position={isMobile ? [0, -0.5, 0] : [0, 0, 0]}
          >
            <Camera onSelect={onSelect} />
          </group>

          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}