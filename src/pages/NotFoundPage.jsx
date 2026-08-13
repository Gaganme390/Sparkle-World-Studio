import React from 'react';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFoundPage({ setCurrentRoute }) {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-warm-white)', paddingTop: 'var(--header-height)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-soft-accent-subtle)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Compass size={32} />
        </div>
        <span className="tag-label">404 ERROR</span>
        <h1 className="heading-hero" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginTop: '0.5rem', marginBottom: '1rem' }}>
          LOST YOUR WAY?
        </h1>
        <p className="text-body" style={{ marginBottom: '2.5rem' }}>
          The page or resource you are looking for is not found. Let's get you back to G.D. Goenka School Ayodhya.
        </p>

        <button 
          className="btn-enquire" 
          onClick={() => { setCurrentRoute('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}
        >
          <ArrowLeft size={18} /> Return to Homepage
        </button>
      </div>
    </main>
  );
}
