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
            <div className="studentlife-card-image-wrap">
              <img 
                src="/school-media/Taekwando/Taekwondo Winners.jpg" 
                alt="GD Goenka Ayodhya Taekwondo & Athletic Champions" 
                className="studentlife-card-img"
                loading="lazy"
              />
              <span className="studentlife-card-tag">11 DISTRICT MEDALS</span>
            </div>
            <div className="studentlife-card-content">
              <div className="studentlife-icon-box">
                <Trophy size={24} />
              </div>
              <h3 className="studentlife-title">Athletic & Martial Arts</h3>
              <p className="studentlife-desc">
                Competitive track and field athletics, annual sports meets, and district-champion Taekwondo training fostering physical stamina, character, and perseverance.
              </p>
            </div>
          </div>

          <div className="studentlife-card hover-lift">
            <div className="studentlife-card-image-wrap">
              <img 
                src="/school-media/Cultural Celebration/classical_dance_performance.jpg" 
                alt="Classical Dance & Cultural Performing Arts at GD Goenka Ayodhya" 
                className="studentlife-card-img"
                loading="lazy"
              />
              <span className="studentlife-card-tag">PERFORMING ARTS</span>
            </div>
            <div className="studentlife-card-content">
              <div className="studentlife-icon-box">
                <Music size={24} />
              </div>
              <h3 className="studentlife-title">Cultural & Performing Arts</h3>
              <p className="studentlife-desc">
                From vibrant Dandiya Night and Dussehra celebrations to the Inter-House Rangoli championships, students explore musical rhythms, classical dance, and folk arts.
              </p>
            </div>
          </div>

          <div className="studentlife-card hover-lift">
            <div className="studentlife-card-image-wrap">
              <img 
                src="/school-media/Disability Day/IMG_1673.JPG" 
                alt="Social Outreach at GD Goenka Ayodhya" 
                className="studentlife-card-img"
                loading="lazy"
              />
              <span className="studentlife-card-tag">EMPATHY IN ACTION</span>
            </div>
            <div className="studentlife-card-content">
              <div className="studentlife-icon-box">
                <Compass size={24} />
              </div>
              <h3 className="studentlife-title">Community & Social Outreach</h3>
              <p className="studentlife-desc">
                Compassionate initiatives like "One for Me, One for You" with Muskan Rehabilitation Centre, World AIDS Day assemblies, and UKG E-Waste upcycling projects.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
