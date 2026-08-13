import React from 'react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import './HeritageFutureSection.css';

export default function HeritageFutureSection() {
  return (
    <section className="heritage-future-section section-padding" id="heritage">
      <div className="container">
        <div className="hf-header">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">04 — HERITAGE × FUTURE</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2" 
            className="heading-section" 
            style={{ marginTop: '0.5rem' }}
            text="ROOTED HERE.<br />READY FOR TOMORROW."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ marginTop: '1rem' }}>
              Ayodhya’s rich architectural heritage inspires our campus aesthetic—warm sandstone tones, natural light corridors, and courtyard spaces integrated with cutting-edge STEM and artificial intelligence labs.
            </p>
          </ScrollReveal>
        </div>

        <div className="hf-grid">
          {/* ROOTED Column */}
          <ScrollReveal variant="fadeRight" delay={0.2} className="hf-card hf-card-rooted">
            <div>
              <span className="hf-card-tag">CORE ANCHOR</span>
              <h3 className="hf-card-title">ROOTED HERE</h3>
              <p className="hf-card-lead">
                Imparting century-tested human values, character resilience, ethical discernment, and cultural pride that ground every student in their heritage.
              </p>
            </div>
            <ul className="hf-list">
              <li className="hf-pill">Character Building</li>
              <li className="hf-pill">Cultural Values</li>
              <li className="hf-pill">Ethical Discernment</li>
              <li className="hf-pill">Community Respect</li>
              <li className="hf-pill">Courtyard Architecture</li>
            </ul>
          </ScrollReveal>

          {/* FUTURE Column */}
          <ScrollReveal variant="fadeLeft" delay={0.3} className="hf-card hf-card-future">
            <div>
              <span className="hf-card-tag">GLOBAL HORIZON</span>
              <h3 className="hf-card-title">READY FOR TOMORROW</h3>
              <p className="hf-card-lead">
                Equipping young minds with artificial intelligence literacy, robotics, global debate, critical analysis, and leadership tools to thrive on world stages.
              </p>
            </div>
            <ul className="hf-list">
              <li className="hf-pill">AI & Robotics Lab</li>
              <li className="hf-pill">STEM Innovation</li>
              <li className="hf-pill">Global Diplomacy (MUN)</li>
              <li className="hf-pill">Critical Analysis</li>
              <li className="hf-pill">Eco-Stewardship</li>
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
