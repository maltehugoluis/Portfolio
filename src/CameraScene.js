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
        <div className="site-subtitle">INTERACTIVE</div>
        <div className="site-tagline">PORTFOLIO</div>
      </div>

      <Canvas 
        dpr={[1, 2]}
        camera={{ 
          position: [10, 0, 0], 
          fov: isMobile ? 45 : 35, 
          near: 0.1 
        }}
        // WICHTIG: Macht den Canvas-Hintergrund weiß
        onCreated={({ gl }) => {
          gl.setClearColor('white');
        }}
      >
        <ambientLight intensity={0.8} />
        {/* 'studio' preset passt gut zu weißem Hintergrund */}
        <Environment preset="studio" />
        
        <Suspense fallback={null}>
          <OrbitControls 
            ref={controlsRef} 
            enablePan={false} 
            minDistance={4}   
            maxDistance={12}

            /* DREH-BEGRENZUNG (nur Mobile) */
            minAzimuthAngle={isMobile ? Math.PI / 3.5 : -Infinity}
            maxAzimuthAngle={isMobile ? Math.PI / 1.6 : Infinity}
            minPolarAngle={isMobile ? Math.PI / 2.8 : 0}
            maxPolarAngle={isMobile ? Math.PI / 1.8 : Math.PI}
            
            makeDefault
          />
          
          {/* Die Kamera */}
          <group 
            scale={isMobile ? 0.6 : 1} 
            position={isMobile ? [0, -0.3, 0] : [0, 0, 0]}
          >
            <Camera onSelect={onSelect} />
          </group>

          {/* SAUBERER BODEN MIT WEICHEM SCHATTEN */}
          {/* Ein unsichtbares Plane, um Schatten aufzufangen */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, isMobile ? -1.0 : -1.2, 0]}>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
          
          {/* Weicher, realistischer Schatten (ContactShadows) */}
          <ContactShadows 
            position={[0, isMobile ? -1.0 : -1.2, 0]} // Position unter der Kamera
            opacity={0.5} 
            scale={12} // Größe des Schattens
            blur={2.0} // Wie weich der Schatten ist
            far={1.5} 
            resolution={512} // Schärfe des Schattens
          />
        </Suspense>
      </Canvas>
    </div>
  );
}