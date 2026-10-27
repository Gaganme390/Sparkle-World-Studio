import React, { useState } from 'react';
import { Eye, Sparkles, Compass, Shield, Award, Globe, ArrowUpRight } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import KineticFlair from '../components/KineticFlair';
import './IntroductionSection.css';

const studentPillars = [
  {
    icon: Eye,
    title: 'You will be known',
    desc: 'Every child has different strengths, interests and potential. We take the time to understand our students, recognise what they do well and give them the attention they need to keep moving forward.',
    tag: 'Individual Attention'
  },
  {
    icon: Award,
    title: 'You will be challenged to excel',
    desc: 'We believe in high expectations. Strong academics, dedicated teaching and consistent guidance encourage our students to work hard, think deeply and strive for excellence in everything they undertake.',
    tag: 'Academic Rigour'
  },
  {
    icon: Compass,
    title: 'You will find your confidence',
    desc: 'Education extends far beyond textbooks. Through the classroom, sports, performing arts, public speaking, competitions and leadership opportunities, every student is encouraged to discover their strengths and develop the confidence to express them.',
    tag: 'Beyond Textbooks'
  },
  {
    icon: Shield,
    title: 'You will grow with strong values',
    desc: 'Achievement matters, but so does character. Respect, discipline, integrity, empathy and responsibility are woven into everyday school life, helping our students become not only accomplished individuals, but good human beings.',
    tag: 'Character & Integrity'
  },
  {
    icon: Sparkles,
    title: 'You will learn to stand on your own',
    desc: 'As students grow, so does their responsibility. We teach them to make thoughtful decisions, manage their time, take ownership of their work and develop the independence to face challenges with confidence.',
    tag: 'Independence & Agency'
  },
  {
    icon: Globe,
    title: 'You will be prepared for the world ahead',
    desc: 'The opportunities available to our children are no longer limited by geography. We combine strong foundations with modern learning, technology, communication and a broader outlook so our students are prepared to succeed wherever their ambitions take them.',
    tag: 'Global Horizon'
  }
];

export default function IntroductionSection({ setCurrentRoute }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="student-perspective-section section-padding" id="students">
      <div className="container">
        <div className="sp-bryanston-layout">
          {/* LEFT COLUMN: Editorial Content */}
          <div className="sp-bryanston-content">
            <ScrollReveal variant="fadeUp">
              <span className="tag-label sp-tag-badge">
                STUDENT PERSPECTIVE
                <KineticFlair type="star" size={14} />
              </span>
            </ScrollReveal>

            <AnimatedText 
              as="h2" 
              className="sp-main-heading"
              text="WHAT THIS MEANS FOR OUR STUDENTS"
              delay={0.1}
            />

            <ScrollReveal variant="fadeUp" delay={0.15}>
              <p className="sp-lead-summary">
                At GD Goenka School, Ayodhya, education is personal. We create an environment where every young person is seen as an individual, supported with care, and challenged to grow into their fullest potential.
              </p>
            </ScrollReveal>

            {/* Vertical list of 6 Pillars */}
            <div className="sp-pillars-vertical-list">
              {studentPillars.map((p, idx) => {
                const Icon = p.icon;
                const isSelected = activeIdx === idx;
                return (
                  <ScrollReveal 
                    key={idx} 
                    variant="fadeUp" 
                    delay={0.1 + idx * 0.05}
                    className={`sp-vertical-item ${isSelected ? 'active' : ''}`}
                  >
                    <div 
                      className="sp-item-inner"
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={() => setActiveIdx(idx)}
                    >
                      <div className="sp-item-header">
                        <div className="sp-item-title-wrap">
                          <span className="sp-item-bullet">•</span>
                          <h3 className="sp-item-title">{p.title}</h3>
                        </div>
                        <span className="sp-item-num">0{idx + 1}</span>
                      </div>
                      <p className="sp-item-desc">{p.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Tall Authentic Student Photo */}
          <div className="sp-bryanston-media">
            <div className="sp-sticky-photo-wrapper">
              <div className="sp-photo-frame">
                <img 
                  src="/school-media/New Pages/Page 1/DSC07329.JPG"
                  alt="GD Goenka Ayodhya student engaged in focused learning in the school library"
                  className="sp-tall-photo"
                  loading="lazy"
                />

                <div className="sp-photo-overlay-gradient"></div>

                {/* Floating Glassmorphic Badge */}
                <div className="sp-photo-caption-card">
                  <div className="sp-caption-pill">
                    <span className="sp-caption-dot"></span>
                    <span>GD Goenka Ayodhya</span>
                  </div>
                  <h4 className="sp-caption-title">
                    {studentPillars[activeIdx]?.tag || 'Personalized Mentorship'}
                  </h4>
                  <p className="sp-caption-text">
                    Nurturing confident, curious minds ready to thrive in an ever-changing world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
