import React, { useState } from 'react';
import { ArrowRight, BookOpen, HeartHandshake, UserCheck, Trophy, Compass, Globe, Sparkles } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import KineticFlair from '../components/KineticFlair';
import MagneticButton from '../components/MagneticButton';
import './ParentsPerspectiveSection.css';

const parentPillars = [
  {
    icon: BookOpen,
    title: 'Your child will have strong foundations',
    desc: 'Academic excellence begins with the basics done well. Your child will learn in a structured environment with clear expectations, strong teaching and individual attention, building the knowledge and discipline needed for long-term success.'
  },
  {
    icon: HeartHandshake,
    title: 'Your child will grow with values',
    desc: 'Education is as much about character as it is about achievement. Respect, integrity, humility, responsibility and compassion are reinforced throughout school life, so that your child grows into someone you are proud of, not only for what they achieve, but for who they become.'
  },
  {
    icon: UserCheck,
    title: 'Your child will be known and supported',
    desc: 'Your child will never be just a name on a class list. Our teachers work to understand their strengths, challenges and progress, providing the encouragement, attention and guidance they need at every stage.'
  },
  {
    icon: Trophy,
    title: 'Your child will find their confidence',
    desc: 'Some children shine academically, others through sport, art, technology, public speaking or leadership. We create opportunities for your child to discover their strengths, express themselves and develop the confidence to stand on their own.'
  },
  {
    icon: Compass,
    title: 'Your child will be prepared for more than examinations',
    desc: 'Marks matter, but life demands much more. We want your child to communicate well, think independently, work with others, solve problems and take responsibility, while remaining grounded in the values with which they were raised.'
  },
  {
    icon: Globe,
    title: 'Your child will be ready for a bigger world',
    desc: 'Where a child grows up should never limit how far they can go. With strong roots, modern learning and wider exposure, we prepare your child to pursue opportunities with confidence, in Ayodhya, across India and wherever their ambitions may take them.'
  }
];

export default function ParentsPerspectiveSection({ onOpenEnquiry, onOpenVisit }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="parent-perspective-section section-padding" id="parents">
      <div className="container">
        <div className="pp-header">
          <div className="pp-header-left">
            <ScrollReveal variant="fadeUp">
              <span className="tag-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                PARENT PERSPECTIVE
                <KineticFlair type="sparkle" size={14} />
              </span>
            </ScrollReveal>
            
            <AnimatedText 
              as="h2" 
              className="heading-section"
              style={{ marginTop: '0.5rem' }}
              text="WHAT THIS MEANS FOR OUR PARENTS"
              delay={0.1}
            />
          </div>

          <ScrollReveal variant="fadeUp" delay={0.2} className="pp-header-right">
            <p className="text-body text-editorial-lead" style={{ maxWidth: '640px' }}>
              We view parents as essential partners. Entrusting your child’s education to us is a profound responsibility, and we match your aspirations with unwavering dedication, clear communication, and personal care.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Pillars Editorial Grid */}
        <ScrollReveal className="pp-grid" stagger staggerAmount={0.08} variant="fadeUp" delay={0.25}>
          {parentPillars.map((p, idx) => {
            const Icon = p.icon;
            const isSelected = activeIdx === idx;
            return (
              <div 
                key={idx} 
                className={`pp-card hover-lift ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <div className="pp-card-top">
                  <div className="pp-icon-box">
                    <Icon size={20} />
                  </div>
                  <span className="pp-pillar-number">0{idx + 1}</span>
                </div>
                <h3 className="pp-pillar-title">{p.title}</h3>
                <p className="pp-pillar-desc">{p.desc}</p>
              </div>
            );
          })}
        </ScrollReveal>

        {/* Partnership Highlight Box */}
        <div className="pp-partnership-box">
          <div className="pp-partnership-content">
            <span className="tag-label" style={{ color: 'var(--color-accent)' }}>A TRUSTED PARTNERSHIP</span>
            <h3 className="font-display" style={{ fontSize: '2rem', color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
              Building Tomorrow's Leaders in Ayodhya
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.82)', lineHeight: '1.7', marginBottom: '1.75rem', maxWidth: '640px' }}>
              From transparent parent communication portals to regular one-on-one progress discussions, we ensure you are always an active participant in your child’s triumphs, milestones, and daily growth.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <MagneticButton strength={4}>
                <button 
                  className="btn-enquire" 
                  onClick={onOpenEnquiry}
                  aria-label="Connect with Admissions"
                >
                  Admissions Enquiry 2026-27 <ArrowRight size={16} />
                </button>
              </MagneticButton>
              <MagneticButton strength={4}>
                <button 
                  className="btn-menu-trigger" 
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.25)' }}
                  onClick={onOpenVisit}
                  aria-label="Book a Campus Visit"
                >
                  Schedule Campus Visit
                </button>
              </MagneticButton>
            </div>
          </div>

          <div className="pp-partnership-visual">
            <img 
              src="/school-media/New Pages/Page 2/DSC00067.JPG" 
              alt="Parents and students experiencing vibrant campus community at GD Goenka Ayodhya"
              className="pp-partnership-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
