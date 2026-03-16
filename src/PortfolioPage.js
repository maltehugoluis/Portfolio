import React, { useEffect, useState } from 'react';

const GALLERY_DATA = {
  EVENTS: [
    { id: 1, src: '/images/event_freeflow_01.webp', title: 'FreeFlowFestival Badchieff', type: 'EVENT' },
    { id: 2, src: '/images/event_freeflow_02.webp', title: 'FreeFlowFestival Kreissparkasse Biberach', type: 'EVENT' },
    { id: 3, src: '/images/event_freeflow_03.webp', title: 'FreeFlowFestival Atmosphäre', type: 'EVENT' },
    { id: 4, src: '/images/event_freeflow_04.webp', title: 'FreeFlowFestival Kreissparkasse Biberach', type: 'EVENT' },
    { id: 5, src: '/images/event_freeflow_05.webp', title: 'FreeFlowFestival Atmosphäre', type: 'EVENT' },
    { id: 6, src: '/images/event_freeflow_06.webp', title: 'FreeFlowFestival Atmosphäre', type: 'EVENT' },
    { id: 7, src: '/images/event_freeflow_07.webp', title: 'FreeFlowFestival Souly', type: 'EVENT' },
    { id: 8, src: '/images/event_freeflow_08.webp', title: 'FreeFlowFestival Souly', type: 'EVENT' },
    
  ],
  STREET: [
    { id: 10, src: '/images/street1.jpg', title: 'Street Life', type: 'portrait' },
    // ... weitere Bilder
  ],
  NATURE: [
    { id: 20, src: '/images/nature1.jpg', title: 'Mountain', type: 'landscape' },
    // ... weitere Bilder
  ],
  PEOPLE: [ // Hier stand vorher ABOUT
    { id: 30, src: '/images/people1.jpg', title: 'Portrait', type: 'portrait' },
    // ... weitere Bilder
  ]
};


export default function PortfolioPage({ category, onBack }) {
  const [selectedImg, setSelectedImg] = useState(null); // Zustand für die Lightbox

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = GALLERY_DATA[category] || [];

  return (
    <div className="portfolio-wrapper">
      <header className="portfolio-header">
        <div className="header-left">
          <div className="logo-wrapper">
            <div className="site-brand in-header">
              <div className="site-logo">MHL</div>
              <div className="site-subtitle">INTERACTIVE</div>
              <div className="site-tagline">PORTFOLIO</div>
            </div>
          </div>
          <h1 className="category-display-title">// {category}</h1>
        </div>
        <button className="close-button" onClick={onBack}>CLOSE ✕</button>
      </header>

      <main className="portfolio-main">
        <div className="masonry-grid">
          {images.map((img) => (
            <div 
              key={img.id} 
              className="grid-item" 
              onClick={() => setSelectedImg(img)} // Bild für Lightbox auswählen
            >
              <img src={img.src} alt={img.title} loading="lazy" />
              <div className="image-overlay">
                <span>{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* LIGHTBOX OVERLAY */}
      {selectedImg && (
        <div className="lightbox" onClick={() => setSelectedImg(null)}>
          <div className="lightbox-close">✕</div>
          <img src={selectedImg.src} alt={selectedImg.title} onClick={(e) => e.stopPropagation()} />
          <div className="lightbox-caption">{selectedImg.title}</div>
        </div>
      )}

      <footer className="portfolio-footer">
        <p>© 2026 MHL INTERACTIVE</p>
      </footer>
    </div>
  );
}


