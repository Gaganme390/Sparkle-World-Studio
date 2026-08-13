import React from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ImageReveal from '../components/ImageReveal';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import './IntroductionSection.css';

export default function IntroductionSection({ setCurrentRoute }) {
  return (
    <section className="intro-section section-padding" id="introduction">
      <div className="container">
        <div className="intro-grid">
          <div className="intro-left-col">
            <ScrollReveal variant="fadeUp">
              <span className="intro-number">02 — INTRODUCTION</span>
            </ScrollReveal>
            
            <AnimatedText 
              as="h2" 
              className="intro-heading"
              text="MORE THAN EDUCATION.<br /><span>A BEGINNING.</span>"
              delay={0.1}
            />
          </div>

          <div className="intro-right-col">
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="intro-body-lead">
                G.D. Goenka School, Ayodhya is engineered as a transformative educational institution where academic mastery, character development, and future skills converge seamlessly.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.3}>
              <p className="intro-body-secondary">
                Rooted in the timeless cultural fabric of Ayodhya, our campus prepares young minds to navigate global frontiers with confidence, ethical integrity, and creative resilience.
              </p>
            </ScrollReveal>

            <div className="intro-img-box">
              <ImageReveal 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=75" 
                alt="Students engaged in collaborative inquiry at GD Goenka Ayodhya" 
                width="800"
                height="320"
                delay={0.2}
              />
            </div>

            <ScrollReveal variant="fadeUp" delay={0.4}>
              <MagneticButton strength={4}>
                <button 
                  className="btn-enquire"
                  onClick={() => { setCurrentRoute('/about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  aria-label="Discover Our Story About Page"
                >
                  Discover Our Story <ArrowRight size={16} />
                </button>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
