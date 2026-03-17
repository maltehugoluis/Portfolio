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
    { id: 12, src: '/images/street_dublin_01.webp', fallback: '/images/street_dublin_01.jpg', title: 'Dublin Street', type: 'STREET' },
    { id: 13, src: '/images/street_dublin_02.webp', fallback: '/images/street_dublin_02.jpg', title: 'Dublin Street', type: 'STREET' },
    { id: 14, src: '/images/street_dublin_03.webp', fallback: '/images/street_dublin_03.jpg', title: 'Dublin Street', type: 'STREET' },
    { id: 15, src: '/images/street_dublin_04.webp', fallback: '/images/street_dublin_04.jpg', title: 'Dublin Street', type: 'STREET' },
    { id: 16, src: '/images/street_hamburg_01.webp', fallback: '/images/street_hamburg_01.jpg', title: 'Hamburg Street', type: 'STREET' },
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

  // Blockiert das Scrollen der Seite im Hintergrund, wenn die Lightbox offen ist
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImg]);

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

      {/* LIGHTBOX OVERLAY - Für Mobile optimiert */}
      {selectedImg && (
        <div 
          className="lightbox" 
          onClick={() => setSelectedImg(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <div 
            className="lightbox-close" 
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              fontSize: '32px',
              cursor: 'pointer',
              zIndex: 100000,
              color: '#000000',
              padding: '10px'
            }}
          >✕</div>
          
          <picture 
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '80vh'
            }}
          >
            <source srcSet={selectedImg.src} type="image/webp" />
            <img 
              src={selectedImg.fallback || selectedImg.src} 
              alt={selectedImg.title} 
              decoding="async" 
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </picture>

          <div 
            className="lightbox-caption"
            style={{
              marginTop: '15px',
              fontSize: '16px',
              fontWeight: '500',
              color: '#000000',
              textAlign: 'center'
            }}
          >
            {selectedImg.title}
          </div>
        </div>
      )}

      <footer className="portfolio-footer">
        <p>© 2026 MHL INTERACTIVE</p>
      </footer>
    </div>
  );
}