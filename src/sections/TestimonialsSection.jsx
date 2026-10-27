import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import KineticFlair from '../components/KineticFlair';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section section-padding theme-warm-soft" id="testimonials">
      <div className="container">
        <div>
          <ScrollReveal variant="fadeUp">
            <span className="tag-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              COMMUNITY VOICES
              <KineticFlair type="star" size={15} />
            </span>
          </ScrollReveal>


          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem', marginBottom: '1.25rem' }}
            text="WHAT PARENTS & VISITORS SAY"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ maxWidth: '640px', marginBottom: '3rem' }}>
              Real experiences and perspectives from parents and visitors who form the heart of our Goenkan community in Ayodhya.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal 
          className="testimonials-grid" 
          stagger 
          staggerAmount={0.12} 
          variant="fadeUp" 
          delay={0.25}
        >
          {testimonialsData.map((item) => (
            <div key={item.id} className="testimonial-card hover-lift">
              <div className="testimonial-header">
                <span className="badge-editorial" style={{ fontSize: '0.72rem' }}>{item.tag}</span>
                <div style={{ display: 'flex', gap: '3px', color: 'var(--color-accent)' }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>

              <div className="testimonial-quote-icon">
                <Quote size={24} style={{ color: 'var(--color-accent)', opacity: 0.5 }} />
              </div>

              <p className="testimonial-quote-text">
                "{item.quote}"
              </p>

              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <img src={item.image} alt={item.name} />
                </div>
                <div>
                  <h4 className="testimonial-name">{item.name}</h4>
                  <span className="testimonial-role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
