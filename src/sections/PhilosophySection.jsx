import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import KineticFlair from '../components/KineticFlair';
import './PhilosophySection.css';

export const thrivePillars = [
  {
    id: 'team-centric',
    letter: 'T',
    flexWeight: 254,
    value: 'Team Centric',
    title: 'TEAM CENTRIC',
    shortDesc: 'Fostering camaraderie, mutual respect, and collaborative leadership.',
    image: '/school-media/Taekwando/Taekwondo Winners.jpg'
  },
  {
    id: 'harmonious',
    letter: 'H',
    flexWeight: 278,
    value: 'Harmonious',
    title: 'HARMONIOUS',
    shortDesc: 'Cultivating emotional well-being, mindfulness, and rich cultural resonance.',
    image: '/school-media/Cultural Celebration/classical_dance_performance.jpg'
  },
  {
    id: 'resilient',
    letter: 'R',
    flexWeight: 252,
    value: 'Resilient',
    title: 'RESILIENT',
    shortDesc: 'Instilling perseverance, mental grit, and courage to rise above obstacles.',
    image: '/school-media/Opening Photos/B/SPF_7322.JPG'
  },
  {
    id: 'innovative',
    letter: 'I',
    flexWeight: 88,
    value: 'Innovative',
    title: 'INNOVATIVE',
    shortDesc: 'Sparking curiosity, digital fluency, and scientific inquiry.',
    image: '/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg'
  },
  {
    id: 'versatile',
    letter: 'V',
    flexWeight: 290,
    value: 'Versatile',
    title: 'VERSATILE',
    shortDesc: 'Encouraging dynamic polymath agility across academics, arts, and leadership.',
    image: '/school-media/Blue Day/blue_day_celebration_banner.jpg'
  },
  {
    id: 'empathetic',
    letter: 'E',
    flexWeight: 190,
    value: 'Empathetic',
    title: 'EMPATHETIC',
    shortDesc: 'Building social consciousness, kindness, eco-stewardship, and civic empathy.',
    image: '/school-media/E-Waste/DSC_2105.JPG'
  }
];

// Exact SVG Vector Paths matching GD Goenka Flagship
const SVG_LETTERS = {
  T: {
    viewBox: '-1 0 255.523 292.953',
    path: (
      <path 
        d="M170.58,69.054v223.9H81.92V69.054H0V0H253.523V69.054Z" 
        vectorEffect="non-scaling-stroke"
      />
    )
  },
  H: {
    viewBox: '-1 0 280.834 292.953',
    path: (
      <path 
        d="M478.238,292.953v-109.3H376.911v109.3H288.659V0h88.252V108.479H478.238V0h88.255V292.953Z" 
        transform="translate(-288.659)" 
        vectorEffect="non-scaling-stroke"
      />
    )
  },
  R: {
    viewBox: '-1 0 253.475 292.953',
    path: (
      <path 
        d="M846.98,218.383q-9.809-25.332-22.166-38.2a70.939,70.939,0,0,0-30.95-18.591v-.819q33.709-9.192,50.766-29.62T861.687,80.49q0-40.246-29.316-60.368T741.565,0H624.3V292.953h88.252V189.993h3.473q11.85,0,21.96,10.622t16.446,29.214l21.858,63.124,99.486-.005Zm-89.886-100.3q-10.827,10.011-28.6,10.01H712.556V61.085h18.182q19.2,0,28.193,8.579t8.988,23.289A32.783,32.783,0,0,1,757.094,118.081Z" 
        transform="translate(-624.305)" 
        vectorEffect="non-scaling-stroke"
      />
    )
  },
  I: {
    viewBox: '-1 -1 90.252 294.953',
    path: (
      <rect 
        x="0" 
        y="0" 
        width="88.252" 
        height="292.953" 
        vectorEffect="non-scaling-stroke"
      />
    )
  },
  V: {
    viewBox: '-1 0 291.475 292.953',
    path: (
      <path 
        d="M1222.458,292.953h-99.08L1028.794,0h94.993l44.739,180.388q5.31,21.861,5.923,32.685h2.044q1.227-13.685,6.333-33.913L1226.341,0h91.928Z" 
        transform="translate(-1028.794)" 
        vectorEffect="non-scaling-stroke"
      />
    )
  },
  E: {
    viewBox: '-1 0 191.173 292.953',
    path: (
      <path 
        d="M1349.32,292.953V0h182.431V69.054h-94.177v42.694h88.457V180.8h-88.457v43.1h100.919v69.054Z" 
        transform="translate(-1349.32)" 
        vectorEffect="non-scaling-stroke"
      />
    )
  }
};

export default function PhilosophySection({ setCurrentRoute }) {
  const [hoveredLetter, setHoveredLetter] = useState(null);

  const handleLetterClick = (pillarId) => {
    if (typeof setCurrentRoute === 'function') {
      setCurrentRoute(`/thrive#${pillarId}`);
    } else {
      window.location.href = `/thrive#${pillarId}`;
    }
  };

  return (
    <section className="home_sec_three" id="philosophy">
      <div className="container-fluid thrive-outer-container">
        
        {/* Section Header */}
        <div className="united_lft">
          <ScrollReveal variant="fadeUp">
            <h4 className="title16">
              EXCEPTIONAL LEARNING EXPERIENCES
              <KineticFlair type="star" size={14} color="var(--color-accent, #b39759)" />
            </h4>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h5 className="title36">
              WE PREPARE STUDENTS FOR SUCCESS, EMPOWERING THEM TO THRIVE <br />IN AN EVER-CHANGING WORLD.
            </h5>
          </ScrollReveal>
        </div>

        {/* Hero Showcase with Child Photo Background & Full Form of THRIVE */}
        <div className="thrive-child-hero-showcase">
          {/* Panoramic Background with Smiling Children */}
          <div className="thrive-bg-photo-wrap">
            <img 
              src="/school-media/vasantkunj_pic_new.webp" 
              onError={(e) => { e.currentTarget.src = '/school-media/thrive_ayodhya_banner.jpg'; }}
              alt="GD Goenka students smiling and thriving in learning"
              className="thrive-bg-photo-img"
              loading="lazy"
            />
            {/* Cinematic Gradient Tint for Maximum Contrast & Readability */}
            <div className="thrive-bg-overlay-tint" />
          </div>

          {/* Interactive THRIVE Transparent Glass Cards Overlay */}
          <div className="thrive-letters-overlay">
            <div className="thrive-cards-grid" aria-label="THRIVE Values and Pillars">
              {thrivePillars.map((p) => {
                const config = SVG_LETTERS[p.letter];
                const isHovered = hoveredLetter === p.letter;
                return (
                  <div 
                    key={p.id}
                    id={`hero-${p.letter}`}
                    className={`thrive-glass-card ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredLetter(p.letter)}
                    onMouseLeave={() => setHoveredLetter(null)}
                    onClick={() => handleLetterClick(p.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.letter} - ${p.value}`}
                    title={`Click to read full definition of ${p.value}`}
                  >
                    {/* Big Letter Outline */}
                    <div className="thrive-card-letter-wrap">
                      <svg 
                        viewBox={config.viewBox}
                        className="thrive-card-letter-svg"
                        aria-hidden="true"
                      >
                        {config.path}
                      </svg>
                    </div>

                    {/* Bottom Full Form Pill */}
                    <div className="thrive-card-pill-wrap">
                      <div className="thrive-card-pill">
                        <span className="thrive-pill-text">{p.value}</span>
                      </div>
                    </div>

                    <a 
                      href={`/thrive#${p.id}`} 
                      className="thrive-hitbox-link" 
                      onClick={(e) => { e.preventDefault(); handleLetterClick(p.id); }}
                      aria-label={p.value} 
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA Guide */}
        <div className="thrive-footer-cta">
          <button 
            className="thrive-nav-pill-btn"
            onClick={() => handleLetterClick('team-centric')}
            aria-label="Click any letter above to explore the complete definition of every value"
          >
            <Sparkles size={16} className="sparkle-icon" />
            <span>Click any value above to explore its complete definition</span>
            <ArrowRight size={16} className="arrow-icon" />
          </button>
        </div>

      </div>
    </section>
  );
}
