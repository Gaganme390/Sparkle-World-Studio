import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { galleryItems, galleryCategories } from '../data/gallery';
import Lightbox from '../components/Lightbox';
import FinalCTA from '../components/FinalCTA';

export default function GalleryPage({ onOpenEnquiry, setCurrentRoute }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter((i) => i.category === selectedCategory);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1);
    else setLightboxIndex(filteredItems.length - 1);
  };

  const handleNext = () => {
    if (lightboxIndex < filteredItems.length - 1) setLightboxIndex(lightboxIndex + 1);
    else setLightboxIndex(0);
  };

  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <span className="tag-label">ARCHITECTURAL & LIFE VISUALS</span>
          <h1 className="heading-hero" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            CAMPUS GALLERY.
          </h1>
          <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
            Explore our state-of-the-art classrooms, sports arenas, art studios, and vibrant student life moments across Ayodhya campus.
          </p>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`academic-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                style={{ 
                  position: 'relative', 
                  borderRadius: 'var(--radius-md)', 
                  overflow: 'hidden', 
                  height: '320px', 
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-subtle)'
                }}
                className="hover-scale-img"
              >
                <img src={item.image} alt={item.title} width="600" height="320" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(23, 24, 29, 0.85) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem',
                    color: '#FFFFFF'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-accent)', letterSpacing: '0.15em' }}>
                    {item.category}
                  </span>
                  <h3 className="font-display" style={{ fontSize: '1.25rem', color: '#FFFFFF', marginTop: '0.25rem' }}>
                    {item.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-soft-accent)', marginTop: '0.5rem' }}>
                    <Eye size={14} /> VIEW STORY
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox 
        item={currentItem}
        items={filteredItems}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
