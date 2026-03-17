// src/CameraScene.js
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useProgress } from '@react-three/drei';
import Camera from './camera';

function OverlayLoader({ loading }) {
  const { progress } = useProgress();
  if (!loading) return null;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#ffffff', zIndex: 2000
    }}>
      <div className="spinner"></div>
      <p style={{
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
        fontWeight: '900', marginTop: '20px',
        color: '#000', letterSpacing: '2px', textTransform: 'uppercase'
      }}>
        LOADING {Math.round(progress)}%
      </p>
    </div>
  );
}

export default function CameraScene({ onSelect, currentView }) {
  const controlsRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const { progress } = useProgress();

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (progress === 100) {
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
        gl={{
          antialias: true, alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true
        }}
        dpr={window.devicePixelRatio}
        camera={{
          position: [12, 0, 0],
          fov: isMobile ? 45 : 35,
          near: 0.1, far: 1000
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
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />

          <group
            scale={isMobile ? 0.8 : 1}
            position={isMobile ? [0, -0.5, 0] : [0, 0, 0]}
          >
            <Camera
              onSelect={onSelect}
              isReady={!isLoading}
              currentView={currentView}
            />
          </group>

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4} scale={20} blur={2} far={4.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}