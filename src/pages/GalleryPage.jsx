import React, { useState } from 'react';
import { Eye, Play } from 'lucide-react';
import { galleryItems, galleryCategories } from '../data/gallery';
import { useSchoolData } from '../hooks/useSchoolData';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import Lightbox from '../components/Lightbox';
import FinalCTA from '../components/FinalCTA';

export default function GalleryPage({ onOpenEnquiry, setCurrentRoute }) {
  const { gallery } = useSchoolData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxPlaying, setLightboxPlaying] = useState(false);

  const allItems = gallery && gallery.length > 0 ? gallery : galleryItems;

  const categories = ['All', ...new Set(allItems.map((i) => i.category || 'Campus'))];

  const filteredItems = selectedCategory === 'All' 
    ? allItems 
    : allItems.filter((i) => i.category === selectedCategory);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1);
    else setLightboxIndex(filteredItems.length - 1);
  };

  const handleNext = () => {
    if (lightboxIndex < filteredItems.length - 1) setLightboxIndex(lightboxIndex + 1);
    else setLightboxIndex(0);
  };

  const handleOpenPhoto = (idx) => {
    setLightboxIndex(idx);
    setLightboxPlaying(false);
  };

  const handleStartSlideshow = () => {
    setLightboxIndex(0);
    setLightboxPlaying(true);
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
            text="CAMPUS GALLERY"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
              <p className="text-editorial-lead" style={{ maxWidth: '680px', margin: 0 }}>
                Explore our state-of-the-art classrooms, sports arenas, art studios, and vibrant student life moments across Ayodhya campus.
              </p>
              <button 
                type="button"
                onClick={handleStartSlideshow}
                className="gallery-start-slideshow-pill"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.92rem' }}
                title="Start Fullscreen Slideshow"
              >
                <Play size={17} fill="currentColor" />
                <span>START SLIDESHOW</span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          {/* Category Tabs & Quick Slideshow Button */}
          <ScrollReveal variant="fadeUp" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`academic-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleStartSlideshow}
              className="gallery-start-slideshow-pill"
              title={`Start Slideshow for ${selectedCategory}`}
            >
              <Play size={15} fill="currentColor" />
              <span>Start Slideshow ({filteredItems.length})</span>
            </button>
          </ScrollReveal>

          {/* Masonry Layout */}
          <ScrollReveal variant="fadeUp" delay={0.1} key={selectedCategory} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id}
                onClick={() => handleOpenPhoto(idx)}
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
                <ImageReveal src={item.image} alt={item.title} width="600" height="320" style={{ height: '100%' }} objectPosition={item.objectPosition || 'center 25%'} />
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
        onClose={() => {
          setLightboxIndex(null);
          setLightboxPlaying(false);
        }}
        onPrev={handlePrev}
        onNext={handleNext}
        initialPlaying={lightboxPlaying}
      />

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
