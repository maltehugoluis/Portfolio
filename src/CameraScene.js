import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useProgress } from '@react-three/drei';
import Camera from './camera';

// Loader-Komponente außerhalb des Canvas für maximale Stabilität
function OverlayLoader({ loading }) {
  const { progress } = useProgress();
  
  // Wenn das Laden beendet ist, blenden wir den Loader aus
  if (!loading) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      zIndex: 2000 // Über allem anderen
    }}>
      <div className="spinner"></div>
      <p style={{ 
        fontFamily: 'Helvetica Neue, Arial, sans-serif', 
        fontWeight: '900', 
        marginTop: '20px',
        color: '#000',
        letterSpacing: '2px'
      }}>
        LOADING {Math.round(progress)}%
      </p>
    </div>
  );
}

export default function CameraScene({ onSelect }) {
  const controlsRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const { progress } = useProgress();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Sobald der Fortschritt 100 erreicht, setzen wir isLoading auf false
  useEffect(() => {
    if (progress === 100) {
      // Kleiner Delay für geschmeidigeren Übergang
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="canvas-container" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      
      {/* Das Branding */}
      <div className="site-brand">
        <div className="site-logo">MHL</div>
        <div className="site-subtitle">INTERACTIVE</div>
        <div className="site-tagline">PORTFOLIO</div>
      </div>

      {/* DER LOADER (AUẞERHALB DES CANVAS) */}
      <OverlayLoader loading={isLoading} />

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