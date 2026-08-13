import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { galleryItems, galleryCategories } from '../data/gallery';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
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
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">ARCHITECTURAL & LIFE VISUALS</span>
          </ScrollReveal>

          <AnimatedText 
            as="h1"
            className="heading-hero" 
            style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}
            text="CAMPUS GALLERY."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
              Explore our state-of-the-art classrooms, sports arenas, art studios, and vibrant student life moments across Ayodhya campus.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          {/* Category Tabs */}
          <ScrollReveal variant="fadeUp" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`academic-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          {/* Gallery Items Grid */}
          <ScrollReveal className="editorial-grid" stagger staggerAmount={0.08} variant="fadeUp" delay={0.1} key={selectedCategory}>
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="col-12 col-md-4 hover-lift"
                style={{ 
                  position: 'relative', 
                  borderRadius: 'var(--radius-md)', 
                  overflow: 'hidden', 
                  height: '320px', 
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <ImageReveal src={item.image} alt={item.title} width="600" height="320" style={{ height: '100%' }} />
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
          </ScrollReveal>
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
