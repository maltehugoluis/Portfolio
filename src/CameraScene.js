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
// In deiner CameraScene.js (oder wo das Modell geladen wird)

export default function CameraScene() {
  // Check, ob der Bildschirm schmaler als 768px ist
  const isMobile = window.innerWidth < 768;

  // Werte für Desktop vs. Mobile
  const cameraScale = isMobile ? 0.7 : 1; // Kamera auf dem Handy 40% kleiner
  const cameraPosition = isMobile ? [0, -0.5, 0] : [0, 0, 0]; // Etwas nach unten schieben auf Mobile
  
  return (
    <group scale={cameraScale} position={cameraPosition}>
       <primitive object={gltf.scene} />
       
       {/* Dein HTML Display-Element */}
       <Html
         transform
         occlude
         // Hier kannst du die Position des Displays auf dem Handy feinjustieren
         position={[0.96, -0.38, 0.27]} 
         rotation={[0, Math.PI / 2, 0]}
         scale={isMobile ? 0.18 : 0.23} // Display-Inhalt auf Mobile auch skalieren
       >
         <div className="camera-screen">
            {/* ... Dein Inhalt ... */}
         </div>
       </Html>
    </group>
  );
}