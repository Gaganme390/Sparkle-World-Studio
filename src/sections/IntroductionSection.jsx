import React, { useState } from 'react';
import { ArrowRight, Eye, Sparkles, Compass, Shield, Award, Globe, CheckCircle } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import KineticFlair from '../components/KineticFlair';
import MagneticButton from '../components/MagneticButton';
import './IntroductionSection.css';

const studentPillars = [
  {
    icon: Eye,
    title: 'You will be known',
    desc: 'Every child has different strengths, interests and potential. We take the time to understand our students, recognise what they do well and give them the attention they need to keep moving forward.'
  },
  {
    icon: Award,
    title: 'You will be challenged to excel',
    desc: 'We believe in high expectations. Strong academics, dedicated teaching and consistent guidance encourage our students to work hard, think deeply and strive for excellence in everything they undertake.'
  },
  {
    icon: Compass,
    title: 'You will find your confidence',
    desc: 'Education extends far beyond textbooks. Through the classroom, sports, performing arts, public speaking, competitions and leadership opportunities, every student is encouraged to discover their strengths and develop the confidence to express them.'
  },
  {
    icon: Shield,
    title: 'You will grow with strong values',
    desc: 'Achievement matters, but so does character. Respect, discipline, integrity, empathy and responsibility are woven into everyday school life, helping our students become not only accomplished individuals, but good human beings.'
  },
  {
    icon: Sparkles,
    title: 'You will learn to stand on your own',
    desc: 'As students grow, so does their responsibility. We teach them to make thoughtful decisions, manage their time, take ownership of their work and develop the independence to face challenges with confidence.'
  },
  {
    icon: Globe,
    title: 'You will be prepared for the world ahead',
    desc: 'The opportunities available to our children are no longer limited by geography. We combine strong foundations with modern learning, technology, communication and a broader outlook so our students are prepared to succeed wherever their ambitions take them.'
  }
];

export default function IntroductionSection({ setCurrentRoute }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="student-perspective-section section-padding" id="students">
      <div className="container">
        <div className="sp-header">
          <div className="sp-header-left">
            <ScrollReveal variant="fadeUp">
              <span className="tag-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                STUDENT PERSPECTIVE
                <KineticFlair type="star" size={14} />
              </span>
            </ScrollReveal>
            
            <AnimatedText 
              as="h2" 
              className="heading-section"
              style={{ marginTop: '0.5rem' }}
              text="WHAT THIS MEANS FOR OUR STUDENTS"
              delay={0.1}
            />
          </div>

          <ScrollReveal variant="fadeUp" delay={0.2} className="sp-header-right">
            <p className="text-body text-editorial-lead" style={{ maxWidth: '640px' }}>
              At GD Goenka School, Ayodhya, education is personal. We create an environment where every young person is seen as an individual, supported with care, and challenged to grow into their fullest potential.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Pillars Editorial Grid */}
        <ScrollReveal className="sp-grid" stagger staggerAmount={0.08} variant="fadeUp" delay={0.25}>
          {studentPillars.map((p, idx) => {
            const Icon = p.icon;
            const isSelected = activeIdx === idx;
            return (
              <div 
                key={idx} 
                className={`sp-card hover-lift ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <div className="sp-card-top">
                  <div className="sp-icon-box">
                    <Icon size={20} />
                  </div>
                  <span className="sp-pillar-number">0{idx + 1}</span>
                </div>
                <h3 className="sp-pillar-title">{p.title}</h3>
                <p className="sp-pillar-desc">{p.desc}</p>
              </div>
            );
          })}
        </ScrollReveal>

        {/* Supporting Visual Strip */}
        <div className="sp-visual-strip">
          <div className="sp-visual-box">
            <img 
              src="/school-media/New Pages/Page 1/DSC00022.JPG" 
              alt="GD Goenka students actively learning in modern digital workstations" 
              className="sp-visual-img"
              loading="lazy"
            />
            <div className="sp-visual-overlay">
              <span className="sp-visual-tag">INQUIRY & EXCELLENCE</span>
              <h4 className="sp-visual-title">Every student known, valued, and empowered</h4>
            </div>
          </div>

          <div className="sp-visual-content">
            <span className="tag-label" style={{ color: 'var(--color-accent)' }}>OUR COMMITMENT</span>
            <h3 className="font-display" style={{ fontSize: '1.9rem', color: 'var(--color-primary-dark)', margin: '0.5rem 0 1rem' }}>
              Where Learning Shapes Character & Ambition
            </h3>
            <p className="text-body" style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
              We combine structured academic rigour with modern laboratories, expressive arts, and personal mentorship, ensuring that our students thrive inside the classroom and in the world beyond.
            </p>
            <MagneticButton strength={4}>
              <button 
                className="btn-enquire"
                onClick={() => {
                  if (setCurrentRoute) setCurrentRoute('/about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="Discover Our Story"
              >
                Discover Our Story <ArrowRight size={16} />
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
