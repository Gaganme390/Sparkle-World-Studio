import React from 'react';
import { Trophy, Music, Compass } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import './StudentLifeSection.css';

export default function StudentLifeSection() {
  return (
    <section className="studentlife-section section-padding" id="studentlife">
      <div className="container">
        <div>
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">08 — STUDENT LIFE</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem' }}
            text="LIFE BEYOND THE TIMETABLE."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ maxWidth: '640px', marginTop: '0.75rem' }}>
              Co-curricular clubs, competitive athletics, Model UN debate forums, musical orchestras, and community initiatives enrich every student’s daily school experience.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="studentlife-grid" stagger staggerAmount={0.12} variant="scaleIn" delay={0.3}>
          <div className="studentlife-card hover-lift">
            <div className="studentlife-icon-box">
              <Trophy size={24} />
            </div>
            <h3 className="studentlife-title">Athletic Academies</h3>
            <p className="studentlife-desc">
              Professional coaching in swimming, lawn tennis, basketball, cricket nets, and track athletics fostering team spirit and physical resilience.
            </p>
          </div>

          <div className="studentlife-card hover-lift">
            <div className="studentlife-icon-box">
              <Music size={24} />
            </div>
            <h3 className="studentlife-title">Cultural & Fine Arts</h3>
            <p className="studentlife-desc">
              Classical & Western music studios, classical dance choreography, theatrical drama productions, and sculptural fine art exhibitions.
            </p>
          </div>

          <div className="studentlife-card hover-lift">
            <div className="studentlife-icon-box">
              <Compass size={24} />
            </div>
            <h3 className="studentlife-title">Societies & Leadership</h3>
            <p className="studentlife-desc">
              Model UN diplomacy forums, robotics clubs, environmental sustainability charters, and social responsibility community outreach.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
