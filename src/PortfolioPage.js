import React, { useEffect, useState } from 'react';

const GALLERY_DATA = {
  EVENTS: [
    { id: 1, src: '/images/event_freeflow_01.webp', fallback: '/images/event_freeflow_01.jpg', title: 'FreeFlowFestival Badchieff', type: 'EVENT' },
    { id: 2, src: '/images/event_freeflow_02.webp', fallback: '/images/event_freeflow_02.jpg', title: 'FreeFlowFestival Kreissparkasse Biberach', type: 'EVENT' },
    { id: 3, src: '/images/event_freeflow_03.webp', fallback: '/images/event_freeflow_03.jpg', title: 'FreeFlowFestival Atmosphäre', type: 'EVENT' },
    { id: 4, src: '/images/event_freeflow_04.webp', fallback: '/images/event_freeflow_04.jpg', title: 'FreeFlowFestival Kreissparkasse Biberach', type: 'EVENT' },
    { id: 5, src: '/images/event_freeflow_05.webp', fallback: '/images/event_freeflow_05.jpg', title: 'FreeFlowFestival Atmosphäre', type: 'EVENT' },
    { id: 6, src: '/images/event_freeflow_06.webp', fallback: '/images/event_freeflow_06.jpg', title: 'FreeFlowFestival Atmosphäre', type: 'EVENT' },
    { id: 7, src: '/images/event_freeflow_07.webp', fallback: '/images/event_freeflow_07.jpg', title: 'FreeFlowFestival Souly', type: 'EVENT' },
    { id: 8, src: '/images/event_freeflow_08.webp', fallback: '/images/event_freeflow_08.jpg', title: 'FreeFlowFestival Souly', type: 'EVENT' },
    { id: 9, src: '/images/event_hochzeit_09.webp', fallback: '/images/event_hochzeit_09.jpg', title: 'Hochzeit', type: 'EVENT' },
    { id: 10, src: '/images/event_hochzeit_10.webp', fallback: '/images/event_hochzeit_10.jpg', title: 'Hochzeit', type: 'EVENT' },
    { id: 11, src: '/images/event_hochzeit_11.webp', fallback: '/images/event_hochzeit_11.jpg', title: 'Hochzeit', type: 'EVENT' },
  ],
  STREET: [
    { id: 10, src: '/images/street1.webp', fallback: '/images/street1.jpg', title: 'Street Life', type: 'portrait' },
  ],
  NATURE: [
    { id: 20, src: '/images/nature1.webp', fallback: '/images/nature1.jpg', title: 'Mountain', type: 'landscape' },
  ],
  PEOPLE: [
    { id: 30, src: '/images/people1.webp', fallback: '/images/people1.jpg', title: 'Portrait', type: 'portrait' },
  ]
};

export default function PortfolioPage({ category, onBack }) {
  const [selectedImg, setSelectedImg] = useState(null); 

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
              onClick={() => setSelectedImg(img)} 
            >
              <picture>
                <source srcSet={img.src} type="image/webp" />
                <img 
                  src={img.fallback || img.src} 
                  alt={img.title} 
                  loading="lazy" 
                  decoding="async" 
                />
              </picture>
              <div className="image-overlay">
                <span>{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedImg && (
        <div className="lightbox" onClick={() => setSelectedImg(null)}>
          <div className="lightbox-close">✕</div>
          <picture>
            <source srcSet={selectedImg.src} type="image/webp" />
            <img 
              src={selectedImg.fallback || selectedImg.src} 
              alt={selectedImg.title} 
              onClick={(e) => e.stopPropagation()} 
              decoding="async" 
            />
          </picture>
          <div className="lightbox-caption">{selectedImg.title}</div>
        </div>
      )}

      <footer className="portfolio-footer">
        <p>© 2026 MHL INTERACTIVE</p>
      </footer>
    </div>
  );
}