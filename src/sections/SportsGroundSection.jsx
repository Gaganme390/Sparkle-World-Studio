import React, { useState } from 'react';
import { Trophy, Activity, Shield, ArrowRight, CheckCircle2, Sparkles, Layers, Compass } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import './SportsGroundSection.css';

const DRONE_VIEWS = [
  {
    id: 'aerial-campus',
    title: 'Full Campus Aerial Overview',
    subtitle: 'Drone perspective showcasing academic building, manicured lawn & multi-sport complex',
    badge: 'Drone Aerial Angle',
    image: '/school-media/sports/sports_ground_drone_aerial.jpg'
  },
  {
    id: 'courts-action',
    title: 'Multi-Sport Synthetic Courts & Arena',
    subtitle: 'FIBA basketball arena, dual tennis/badminton courts & junior play park',
    badge: 'Arena Court View',
    image: '/school-media/sports/sports_arena_courts.jpg'
  },
  {
    id: 'blueprint-topdown',
    title: 'Architectural Top-Down Blueprint View',
    subtitle: 'Precision-lined synthetic interlocking surface engineered for impact absorption',
    badge: 'Top-Down Perspective',
    image: '/school-media/sports/sports_arena_topdown.jpg'
  }
];

const SPORTS_FEATURES = [
  {
    icon: Activity,
    title: 'FIBA-Spec Basketball Arena',
    description: 'Full-court configuration with competition backboards, anti-skid shock-absorbent synthetic flooring, and regulation boundary markings.',
    tag: 'Championship Regulation'
  },
  {
    icon: Trophy,
    title: 'Tennis & Badminton Complex',
    description: 'Dedicated dual-court multi-sport surface accommodating competitive racquet sports, agility drills, and skill development.',
    tag: 'Multi-Sport Turf'
  },
  {
    icon: Shield,
    title: 'Junior Adventure & Play Park',
    description: 'Specialized motor-skills development zone with rubberized protective flooring, climbing towers, balance swings, and wavy slides.',
    tag: 'Safe & Certified'
  },
  {
    icon: Compass,
    title: 'Athletics & Open Sports Outfield',
    description: 'Lush green open grounds for football conditioning, cricket training, track & field events, and morning yoga assemblies.',
    tag: 'Expansive Campus'
  }
];

const METRIC_BADGES = [
  { label: 'Surface Standard', value: 'All-Weather Synthetic' },
  { label: 'Multi-Sport Scope', value: 'Basketball, Tennis & Track' },
  { label: 'Safety Flooring', value: '100% Impact Shock-Absorbent' },
  { label: 'Coaching Mentorship', value: 'Certified Physical Trainers' }
];

export default function SportsGroundSection({ onOpenEnquiry }) {
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const activeView = DRONE_VIEWS[activeViewIndex];

  return (
    <section className="sports-ground-section section-padding" id="sports-ground">
      <div className="container">
        
        {/* Section Header */}
        <div className="sports-ground-header-row">
          <div className="sports-ground-header-left">
            <ScrollReveal variant="fadeUp">
              <span className="tag-label">
                <Sparkles size={14} style={{ color: 'var(--color-accent)' }} /> 
                OUTDOOR ATHLETIC INFRASTRUCTURE
              </span>
            </ScrollReveal>

            <AnimatedText 
              as="h2"
              className="heading-section" 
              style={{ marginTop: '0.75rem', marginBottom: '1rem' }}
              text="CHAMPIONSHIP SPORTS COMPLEX & GROUNDS"
              delay={0.1}
            />

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-editorial-lead" style={{ maxWidth: '720px', margin: 0 }}>
                Captured via aerial drone perspective — our state-of-the-art synthetic sports arena offers international-standard courts, precision-cushioned surfaces, and junior motor-skill activity zones that build physical endurance and sportsmanship.
              </p>
            </ScrollReveal>
          </div>

          <div className="sports-ground-header-cta">
            <button 
              type="button" 
              className="btn-enquire" 
              onClick={onOpenEnquiry}
              style={{ padding: '0.85rem 1.85rem', fontSize: '0.92rem' }}
            >
              Enquire Sports Programme <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Hero Drone Aerial Showcase */}
        <ScrollReveal variant="fadeUp" delay={0.15}>
          <div className="sports-drone-hero-card">
            
            {/* View Switching Header */}
            <div className="sports-drone-controls-bar">
              <div className="sports-drone-live-tag">
                <span className="sports-drone-pulse-dot" />
                <span>GD Goenka Ayodhya • Drone Aerial Capture</span>
              </div>

              {/* View Switcher Tabs */}
              <div className="sports-drone-tabs">
                {DRONE_VIEWS.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`sports-drone-tab-btn ${activeViewIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveViewIndex(idx)}
                  >
                    <Layers size={13} />
                    <span>{v.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Visual Display */}
            <div className="sports-drone-media-frame">
              <img 
                src={activeView.image} 
                alt={activeView.title}
                className="sports-drone-hero-img"
                loading="lazy"
              />
              <div className="sports-drone-img-overlay" />

              {/* Floating Caption Card */}
              <div className="sports-drone-floating-caption">
                <span className="sports-drone-caption-pill">{activeView.badge}</span>
                <h3 className="sports-drone-caption-title">{activeView.title}</h3>
                <p className="sports-drone-caption-sub">{activeView.subtitle}</p>
              </div>
            </div>

            {/* Metric Pills Bar */}
            <div className="sports-drone-metrics-bar">
              {METRIC_BADGES.map((m, mIdx) => (
                <div key={mIdx} className="sports-metric-item">
                  <span className="sports-metric-label">{m.label}</span>
                  <span className="sports-metric-value">{m.value}</span>
                </div>
              ))}
            </div>

          </div>
        </ScrollReveal>

        {/* 4 Sports Infrastructure Features Grid */}
        <div className="sports-features-grid">
          {SPORTS_FEATURES.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <ScrollReveal 
                key={idx} 
                variant="fadeUp" 
                delay={0.1 + idx * 0.08}
                className="sports-feature-col"
              >
                <div className="sports-feature-card">
                  <div className="sports-feature-top">
                    <div className="sports-feature-icon-box">
                      <IconComponent size={22} />
                    </div>
                    <span className="sports-feature-tag">{item.tag}</span>
                  </div>
                  <h4 className="sports-feature-title">{item.title}</h4>
                  <p className="sports-feature-desc">{item.description}</p>
                  <div className="sports-feature-check">
                    <CheckCircle2 size={15} style={{ color: 'var(--color-accent)' }} />
                    <span>Standardized Goenkan Curriculum</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
