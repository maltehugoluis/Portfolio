import React, { useState } from 'react';
import CameraScene from './CameraScene';
import PortfolioPage from './PortfolioPage';
import './App.css';

function App() {
  const [view, setView] = useState('camera');
  const [category, setCategory] = useState(null);

  // Funktion zum Öffnen eines Portfolio-Ordners
  const handleOpenFolder = (selectedCat) => {
    setCategory(selectedCat);
    setView('portfolio');
  };

  // Funktion zum Zurückkehren zur Kamera
  const handleBackToCamera = () => {
    setCategory(null);
    setView('camera');
  };

  return (
    <div className="main-wrapper">
      {/* Die Kamera-Szene bleibt im Hintergrund, damit sie nicht neu laden muss.
          Wir übergeben 'view', damit das 3D-Display in der Kamera weiß, 
          dass es sich ausblenden muss.
      */}
      <div style={{ display: view === 'camera' ? 'block' : 'none' }}>
        <CameraScene 
          onSelect={handleOpenFolder} 
          currentView={view} 
        />
      </div>

      {/* Das Portfolio wird nur gerendert, wenn eine Kategorie gewählt wurde 
          und der View auf 'portfolio' steht.
      */}
      {view === 'portfolio' && (
        <PortfolioPage 
          category={category} 
          onBack={handleBackToCamera} 
        />
      )}
    </div>
  );
}

export default App;