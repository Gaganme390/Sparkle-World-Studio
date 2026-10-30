import React, { useState } from 'react';
import { ArrowRight, BookOpen, HeartHandshake, UserCheck, Trophy, Compass, Globe } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import KineticFlair from '../components/KineticFlair';
import MagneticButton from '../components/MagneticButton';
import './ParentsPerspectiveSection.css';

const parentPillars = [
  {
    icon: BookOpen,
    title: 'Your child will have strong foundations',
    desc: 'Academic excellence begins with the basics done well. Your child will learn in a structured environment with clear expectations, strong teaching and individual attention, building the knowledge and discipline needed for long-term success.',
    tag: 'Strong Foundations'
  },
  {
    icon: HeartHandshake,
    title: 'Your child will grow with values',
    desc: 'Education is as much about character as it is about achievement. Respect, integrity, humility, responsibility and compassion are reinforced throughout school life, so that your child grows into someone you are proud of, not only for what they achieve, but for who they become.',
    tag: 'Values & Character'
  },
  {
    icon: UserCheck,
    title: 'Your child will be known and supported',
    desc: 'Your child will never be just a name on a class list. Our teachers work to understand their strengths, challenges and progress, providing the encouragement, attention and guidance they need at every stage.',
    tag: 'Individual Mentorship'
  },
  {
    icon: Trophy,
    title: 'Your child will find their confidence',
    desc: 'Some children shine academically, others through sport, art, technology, public speaking or leadership. We create opportunities for your child to discover their strengths, express themselves and develop the confidence to stand on their own.',
    tag: 'Holistic Confidence'
  },
  {
    icon: Compass,
    title: 'Your child will be prepared for more than examinations',
    desc: 'Marks matter, but life demands much more. We want your child to communicate well, think independently, work with others, solve problems and take responsibility, while remaining grounded in the values with which they were raised.',
    tag: 'Life Skills & Critical Thinking'
  },
  {
    icon: Globe,
    title: 'Your child will be ready for a bigger world',
    desc: 'Where a child grows up should never limit how far they can go. With strong roots, modern learning and wider exposure, we prepare your child to pursue opportunities with confidence, in Ayodhya, across India and wherever their ambitions may take them.',
    tag: 'Global Horizon'
  }
];

export default function ParentsPerspectiveSection({ onOpenEnquiry, onOpenVisit }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="parent-perspective-section section-padding" id="parents">
      <div className="container">
        <div className="pp-bryanston-layout">
          
          {/* LEFT COLUMN: Tall Authentic Photo */}
          <div className="pp-bryanston-media">
            <div className="pp-sticky-photo-wrapper">
              <div className="pp-photo-frame">
                <img 
                  src="/school-media/New Pages/Page 2/DSC00067.JPG"
                  alt="Parents and teachers collaborating in warm campus environment at GD Goenka Ayodhya"
                  className="pp-tall-photo"
                  loading="lazy"
                />

                <div className="pp-photo-overlay-gradient"></div>

                {/* Floating Glassmorphic Badge */}
                <div className="pp-photo-caption-card">
                  <div className="pp-caption-pill">
                    <span className="pp-caption-dot"></span>
                    <span>GD Goenka Ayodhya • Parent Partnership</span>
                  </div>
                  <h4 className="pp-caption-title">
                    {parentPillars[activeIdx]?.tag || 'A Trusted Partnership'}
                  </h4>
                  <p className="pp-caption-text">
                    Nurturing character, building confidence, and preparing children to thrive with excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Content */}
          <div className="pp-bryanston-content">
            <ScrollReveal variant="fadeUp">
              <span className="tag-label pp-tag-badge">
                PARENT PERSPECTIVE
                <KineticFlair type="sparkle" size={14} />
              </span>
            </ScrollReveal>

            <AnimatedText 
              as="h2" 
              className="pp-main-heading"
              text="WHAT THIS MEANS FOR OUR PARENTS"
              delay={0.1}
            />

            <ScrollReveal variant="fadeUp" delay={0.15}>
              <p className="pp-lead-summary">
                At GD Goenka School, Ayodhya, we view parents as essential partners. Entrusting your child’s education to us is a profound responsibility, and we match your aspirations with unwavering dedication, clear communication, and personal care.
              </p>
            </ScrollReveal>

            {/* Vertical list of 6 Parent Pillars */}
            <div className="pp-pillars-vertical-list">
              {parentPillars.map((p, idx) => {
                const isSelected = activeIdx === idx;
                return (
                  <ScrollReveal 
                    key={idx} 
                    variant="fadeUp" 
                    delay={0.1 + idx * 0.05}
                    className={`pp-vertical-item ${isSelected ? 'active' : ''}`}
                  >
                    <div 
                      className="pp-item-inner"
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={() => setActiveIdx(idx)}
                    >
                      <div className="pp-item-header">
                        <div className="pp-item-title-wrap">
                          <span className="pp-item-bullet">•</span>
                          <h3 className="pp-item-title">{p.title}</h3>
                        </div>
                      </div>
                      <p className="pp-item-desc">{p.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Action Buttons */}
            <ScrollReveal variant="fadeUp" delay={0.35}>
              <div className="pp-actions-row">
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
                    style={{ 
                      color: 'var(--color-primary-dark, #123985)', 
                      borderColor: 'rgba(18, 57, 133, 0.25)',
                      padding: '0.85rem 1.6rem',
                      borderRadius: 'var(--radius-full, 9999px)',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                    onClick={onOpenVisit}
                    aria-label="Book a Campus Visit"
                  >
                    Schedule Campus Visit
                  </button>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
