import { useState, useEffect } from "react";
import { filterSupportedImages } from "@/utils/imageUtils";

interface PhotoCarouselProps {
  photos: string[];
  alt: string;
}

export function PhotoCarousel({ photos, alt }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter out unsupported formats and normalize paths - MUST encode for React/Vite
  const validPhotos = filterSupportedImages(photos).map(photo => {
    // React/Vite requires explicit URL encoding for spaces and special characters
    let path = photo.trim();
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }
    path = path.replace(/([^:]\/)\/+/g, '$1');
    // MUST ENCODE - React doesn't auto-encode like plain HTML
    return encodeURI(path);
  });

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`📸 PhotoCarousel for "${alt}":`, {
      totalPhotos: photos.length,
      validPhotos: validPhotos.length,
      photos: photos,
      validPhotos: validPhotos
    });
  }

  if (validPhotos.length === 0) {
    return (
      <div className="area-main-carousel">
        <div className="area-carousel-slide">
          <i className="fas fa-image placeholder-icon"></i>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? validPhotos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === validPhotos.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const lightboxPrevious = () => {
    setLightboxIndex((prev) => (prev === 0 ? validPhotos.length - 1 : prev - 1));
  };

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev === validPhotos.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === 0 ? validPhotos.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === validPhotos.length - 1 ? 0 : prev + 1));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, validPhotos.length]);

  return (
    <>
      <div className="area-main-carousel">
        <div 
          className="area-carousel-track" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {validPhotos.map((photoPath, index) => (
            <div key={index} className="area-carousel-slide">
              <img
                src={photoPath}
                alt={`${alt} - ${index + 1}`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.error('❌ Carousel image failed:', photoPath);
                  // Try encoded version as fallback
                  const encodedPath = encodeURI(photoPath);
                  console.log('Trying encoded fallback:', encodedPath);
                  target.src = encodedPath;
                }}
                onLoad={() => {
                  console.log('✅ Carousel image loaded:', photoPath);
                }}
              />
            </div>
          ))}
        </div>
        
        {validPhotos.length > 1 && (
          <>
            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="carousel-nav-btn prev"
              aria-label="Previous photo"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={goToNext}
              className="carousel-nav-btn next"
              aria-label="Next photo"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Dots Indicator */}
            <div className="carousel-indicators">
              {validPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Expand Photos Button */}
        <button 
          className="expand-photos-btn"
          onClick={() => setIsGridOpen(!isGridOpen)}
        >
          <i className={`fas ${isGridOpen ? 'fa-times' : 'fa-th'}`}></i> 
          {isGridOpen ? 'Close' : `View All Photos (${validPhotos.length})`}
        </button>
      </div>

      {/* Photo Grid Container */}
      <div className={`photo-grid-container ${isGridOpen ? 'active' : ''}`}>
        <div className="photo-grid">
          {validPhotos.map((photoPath, index) => (
            <div 
              key={index} 
              className="photo-grid-item" 
              onClick={() => openLightbox(index)}
            >
              <img 
                src={photoPath} 
                alt={`${alt} photo ${index + 1}`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (!target.nextElementSibling) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'photo-grid-item flex items-center justify-center';
                    placeholder.innerHTML = '<i class="fas fa-image placeholder-icon"></i>';
                    target.parentElement?.appendChild(placeholder);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox active" onClick={closeLightbox}>
          <button 
            className="lightbox-close" 
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <i className="fas fa-times"></i>
          </button>
          <button 
            className="lightbox-prev" 
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              lightboxPrevious();
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="lightbox-next" 
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              lightboxNext();
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={validPhotos[lightboxIndex]} 
              alt={`${alt} - ${lightboxIndex + 1}`}
              className="lightbox-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <div className="lightbox-counter">
            <span>{lightboxIndex + 1}</span> / <span>{validPhotos.length}</span>
          </div>
        </div>
      )}
    </>
  );
}
