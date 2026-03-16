import React, { useState } from 'react';
import CameraScene from './CameraScene';
import PortfolioPage from './PortfolioPage';
import './App.css';

function App() {
  const [view, setView] = useState('camera');
  const [category, setCategory] = useState(null);

  const handleOpenFolder = (selectedCat) => {
    setCategory(selectedCat);
    setView('portfolio');
  };

  // src/App.js
return (
  <div className="main-wrapper">
    {/* Die Kamera bleibt im Hintergrund geladen, wird aber ausgeblendet */}
    <div style={{ display: view === 'camera' ? 'block' : 'none' }}>
      <CameraScene onSelect={handleOpenFolder} />
    </div>

    {/* Das Portfolio wird darübergelegt */}
    {view === 'portfolio' && (
      <PortfolioPage category={category} onBack={() => setView('camera')} />
    )}
  </div>
);
}

export default App;