import React from 'react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import KineticFlair from '../components/KineticFlair';
import './HeritageFutureSection.css';

export default function HeritageFutureSection() {
  return (
    <section className="heritage-future-section section-padding" id="heritage">
      <div className="container">
        <div className="hf-header">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              HERITAGE × FUTURE
              <KineticFlair type="burst" size={16} />
            </span>
          </ScrollReveal>

          <AnimatedText 
            as="h2" 
            className="heading-section" 
            style={{ marginTop: '0.5rem' }}
            text="ROOTED HERE<br />READY FOR TOMORROW"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ marginTop: '1rem' }}>
              Ayodhya’s rich heritage inspires our ethos—grounding students with deep values, character, and cultural pride, seamlessly unified with cutting-edge STEM, artificial intelligence, and modern global exposure.
            </p>
          </ScrollReveal>
        </div>

        <div className="hf-grid">
          {/* Card 1: ROOTED HERE */}
          <ScrollReveal variant="fadeRight" delay={0.2} className="hf-card hf-card-rooted">
            <div className="hf-card-visual-wrap">
              <img 
                src="/school-media/Heritage/rooted_ayodhya_heritage.jpg"
                alt="Traditional cultural welcome and character building at GD Goenka Ayodhya"
                className="hf-card-img"
                loading="lazy"
              />
              <div className="hf-card-img-overlay" />
              <span className="hf-card-badge">CORE ANCHOR</span>
            </div>

            <div className="hf-card-body">
              <span className="hf-card-tag">TIMELESS VALUES & ETHOS</span>
              <h3 className="hf-card-title">ROOTED HERE</h3>
              <p className="hf-card-lead">
                Imparting century-tested human values, character resilience, ethical discernment, and cultural pride that ground every student in their heritage.
              </p>

              <ul className="hf-list">
                <li className="hf-pill">Character Building</li>
                <li className="hf-pill">Cultural Values</li>
                <li className="hf-pill">Ethical Discernment</li>
                <li className="hf-pill">Community Respect</li>
                <li className="hf-pill">Courtyard Architecture</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Card 2: READY FOR TOMORROW */}
          <ScrollReveal variant="fadeLeft" delay={0.3} className="hf-card hf-card-future">
            <div className="hf-card-visual-wrap">
              <img 
                src="/school-media/Heritage/ready_tomorrow_digital_lab.jpg"
                alt="Interactive smart classroom and modern digital pedagogy at GD Goenka Ayodhya"
                className="hf-card-img"
                loading="lazy"
              />
              <div className="hf-card-img-overlay" />
              <span className="hf-card-badge">GLOBAL HORIZON</span>
            </div>

            <div className="hf-card-body">
              <span className="hf-card-tag">21ST CENTURY INNOVATION</span>
              <h3 className="hf-card-title">READY FOR TOMORROW</h3>
              <p className="hf-card-lead">
                Equipping young minds with artificial intelligence literacy, robotics, global debate, critical analysis, and leadership tools to thrive on world stages.
              </p>

              <ul className="hf-list">
                <li className="hf-pill">AI & Robotics Lab</li>
                <li className="hf-pill">STEM Innovation</li>
                <li className="hf-pill">Global Diplomacy (MUN)</li>
                <li className="hf-pill">Critical Analysis</li>
                <li className="hf-pill">Eco-Stewardship</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
