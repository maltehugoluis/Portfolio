import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useProgress } from '@react-three/drei';
import Camera from './camera';

// Loader-Komponente außerhalb des Canvas für maximale Stabilität
function OverlayLoader({ loading }) {
  const { progress } = useProgress();
  
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
      zIndex: 2000 
    }}>
      <div className="spinner"></div>
      <p style={{ 
        fontFamily: 'Helvetica Neue, Arial, sans-serif', 
        fontWeight: '900', 
        marginTop: '20px',
        color: '#000',
        letterSpacing: '2px',
        textTransform: 'uppercase'
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
    // Erhöhe den Timeout auf 800ms, damit das Modell sicher gerendert ist
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
    }
    }, [progress]);

  return (
    <div className="canvas-container" style={{ position: 'relative', width: '100vw', height: '100vh', background: '#fff' }}>
      
      <div className="site-brand">
        <div className="site-logo">MHL</div>
        <div className="site-subtitle">INTERACTIVE</div>
        <div className="site-tagline">PORTFOLIO</div>
      </div>

      <OverlayLoader loading={isLoading} />

      <Canvas 
        /* gl-Einstellungen für maximale Kompatibilität auf Apple-Geräten */
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          preserveDrawingBuffer: true
        }}
        dpr={[1, 2]} 
        camera={{ 
          position: [12, 0, 0], 
          fov: isMobile ? 45 : 35, // Leicht reduzierter FOV für besseren Fokus auf Mobile
          near: 0.1,
          far: 1000
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
            /* Begrenzung der Rotation für ein sauberes UI-Gefühl auf Mobile */
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
          
          <group 
            scale={isMobile ? 0.8 : 1} 
            position={isMobile ? [0, -0.5, 0] : [0, 0, 0]}
            >
            {/* Wir übergeben isLoading als prop an die Camera */}
            <Camera onSelect={onSelect} isReady={!isLoading} />
            </group>

          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}