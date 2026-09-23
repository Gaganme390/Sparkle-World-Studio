import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Lightbox.css';

export default function Lightbox({ item, items, onClose, onPrev, onNext }) {
  const [isPlaying, setIsPlaying] = useState(true);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Automated slideshow timer (advances every 4 seconds when playing)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      onNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, onNext, item]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
        <div className="lightbox-topbar" onClick={(e) => e.stopPropagation()}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="lightbox-category">{item.category}</span>
              {items && items.length > 0 && (
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-accent)', letterSpacing: '0.15em' }}>
                  {String(items.findIndex((i) => i.id === item.id) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              )}
            </div>
            <h3 className="lightbox-title">{item.title}</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              className={`lightbox-action-btn ${isPlaying ? 'active' : ''}`}
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause Automated Slideshow' : 'Play Automated Slideshow'}
              title={isPlaying ? 'Pause Slideshow (Space)' : 'Play Slideshow (Space)'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span className="lightbox-btn-label">{isPlaying ? 'Slideshow Playing' : 'Play Slideshow'}</span>
            </button>
            <button className="btn-close-modal" onClick={onClose} aria-label="Close Lightbox">
              <X size={20} />
            </button>
          </div>
        </div>


        <button 
          className="lightbox-nav-btn lightbox-nav-prev" 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous Image"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="lightbox-media-container" onClick={(e) => e.stopPropagation()}>
          <motion.img 
            key={item.id}
            src={item.image} 
            alt={item.title}
            className="lightbox-image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
          {item.caption}
        </p>

        <button 
          className="lightbox-nav-btn lightbox-nav-next" 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next Image"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </AnimatePresence>
  );
}
