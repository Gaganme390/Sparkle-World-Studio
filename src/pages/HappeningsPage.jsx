import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, X, Cake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { happeningsData, happeningsCategories, todayBirthdayRecognitions } from '../data/happenings';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import FinalCTA from '../components/FinalCTA';

export default function HappeningsPage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
      if (window.__lenis) window.__lenis.stop();
    } else {
      document.body.style.overflow = 'auto';
      if (window.__lenis) window.__lenis.start();
    }
    return () => {
      document.body.style.overflow = 'auto';
      if (window.__lenis) window.__lenis.start();
    };
  }, [activeArticle]);

  const filtered = selectedCat === 'All' 
    ? happeningsData 
    : happeningsData.filter((h) => h.category === selectedCat);

  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">CAMPUS CHRONICLES & NEWS</span>
          </ScrollReveal>

          <AnimatedText 
            as="h1"
            className="heading-hero" 
            style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}
            text="HAPPENINGS AT GOENKA."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
              Stay informed with our latest campus announcements, daily student birthday recognitions, STEM achievements, and educational insights.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Today's Student Birthday Recognition Banner */}
      <section style={{ background: 'var(--color-primary-dark)', padding: '1rem 0', color: '#FFFFFF', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-accent)', color: '#FFFFFF', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.08em', flexShrink: 0 }}>
            <Cake size={16} /> TODAY'S BIRTHDAY RECOGNITION
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>
            {todayBirthdayRecognitions.map((b, idx) => (
              <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                🎉 <strong>{b.name}</strong> <span style={{ color: 'var(--color-accent)', fontSize: '0.8rem' }}>({b.grade})</span>
                {idx < todayBirthdayRecognitions.length - 1 && <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: '0.75rem' }}>•</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          <ScrollReveal variant="fadeUp" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {happeningsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`academic-tab-btn ${selectedCat === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.1} key={selectedCat} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {filtered.map((item) => (
              <div 
                key={item.id} 
                className="hover-lift"
                onClick={() => setActiveArticle(item)}
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 'var(--radius-lg)', 
                  border: 'var(--border-thin)', 
                  overflow: 'hidden', 
                  boxShadow: 'var(--shadow-subtle)', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: 'pointer' 
                }}
              >
                <ImageReveal src={item.image} alt={item.title} width="600" height="220" style={{ height: '220px' }} />
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: '800', marginBottom: '0.5rem' }}>
                    <span>{item.category}</span>
                    <span>•</span>
                    <span style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {item.date}
                    </span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p className="text-body" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                    {item.summary}
                  </p>
                  <button 
                    className="btn-link"
                    onClick={(e) => { e.stopPropagation(); setActiveArticle(item); }}
                    style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: '700', 
                      color: 'var(--color-accent)', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.35rem',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  >
                    Read Article <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Full Article Reader Floating Popup Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div 
            className="modal-backdrop"
            onClick={() => setActiveArticle(null)}
            data-lenis-prevent="true"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              backgroundColor: 'rgba(23, 24, 29, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '2.5rem 1rem 3rem',
              overflowY: 'auto',
              overscrollBehavior: 'contain'
            }}
          >
            <motion.div 
              className="modal-content"
              data-lenis-prevent="true"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              style={{ 
                width: '100%',
                maxWidth: '780px', 
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(224, 145, 69, 0.25)',
                boxShadow: '0 32px 80px rgba(0, 0, 0, 0.4)',
                padding: '0', 
                overflow: 'hidden',
                position: 'relative',
                margin: 'auto 0'
              }}
            >
              <div style={{ position: 'relative', height: '240px', flexShrink: 0, background: '#17181D' }}>
                <img 
                  src={activeArticle.image} 
                  alt={activeArticle.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <button 
                  className="btn-close-modal"
                  onClick={() => setActiveArticle(null)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#FFFFFF', boxShadow: '0 4px 14px rgba(0,0,0,0.3)', zIndex: 10 }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ padding: '2.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: '800', marginBottom: '0.75rem' }}>
                  <span>{activeArticle.category}</span>
                  <span>•</span>
                  <span style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {activeArticle.date}
                  </span>
                  <span>•</span>
                  <span style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {activeArticle.readTime}
                  </span>
                </div>

                <h2 className="font-display" style={{ fontSize: '1.85rem', color: 'var(--color-primary-dark)', marginBottom: '1rem', lineHeight: 1.18 }}>
                  {activeArticle.title}
                </h2>

                <p className="text-editorial-lead" style={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--color-warm-gray-800)', lineHeight: 1.55 }}>
                  {activeArticle.summary}
                </p>

                <div style={{ borderTop: '1px solid var(--color-warm-gray-200)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                  <p className="text-body" style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--color-primary-dark)', whiteSpace: 'pre-line' }}>
                    {activeArticle.content}
                  </p>
                </div>

                <div style={{ marginTop: '2.25rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-warm-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>G.D. Goenka School Ayodhya Directorate</span>
                  <button 
                    className="btn-enquire" 
                    onClick={() => { setActiveArticle(null); onOpenEnquiry(); }}
                    style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}
                  >
                    Enquire Admissions <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
