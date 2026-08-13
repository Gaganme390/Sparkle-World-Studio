import React from 'react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import './WhyGoenkaSection.css';

const whyGoenkaPillars = [
  {
    num: '01',
    title: 'Holistic Academic Depth',
    desc: 'Synthesizing CBSE Board standards with experiential inquiry, STEM discovery, and university entrance prep.'
  },
  {
    num: '02',
    title: 'Future-Ready STEM & AI',
    desc: 'Dedicated robotics suites, 3D printing equipment, and digital coding modules integrated from primary grades.'
  },
  {
    num: '03',
    title: 'Optimal Mentorship Ratio',
    desc: '1:15 ratio in foundational wings ensuring individual academic and emotional attention for every child.'
  },
  {
    num: '04',
    title: 'Uncompromising 360° Safety',
    desc: '24/7 CCTV surveillance, RFID attendance, GPS-tracked AC buses, and resident medical staff on campus.'
  },
  {
    num: '05',
    title: 'Sports & Fine Arts Infrastructure',
    desc: 'Standard swimming pool, synthetic basketball courts, music recording rooms, and theatrical assembly grounds.'
  },
  {
    num: '06',
    title: 'Heritage Values & Character',
    desc: 'Rooted in Ayodhya’s cultural ethics, teaching respect, environmental responsibility, and social purpose.'
  }
];

export default function WhyGoenkaSection() {
  return (
    <section className="whygoenka-section section-padding" id="whygoenka">
      <div className="container">
        <div>
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">09 — THE GOENKA ADVANTAGE</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem' }}
            text="WHY GOENKA?"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ maxWidth: '640px', marginTop: '0.75rem' }}>
              Six compelling reasons why discerning parents choose G.D. Goenka School Ayodhya for their children’s educational development.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="whygoenka-grid" stagger staggerAmount={0.08} variant="fadeUp" delay={0.3}>
          {whyGoenkaPillars.map((item, idx) => (
            <div key={idx} className="why-pill-card hover-lift">
              <span className="why-num">{item.num}</span>
              <h3 className="why-title">{item.title}</h3>
              <p className="why-desc">{item.desc}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
