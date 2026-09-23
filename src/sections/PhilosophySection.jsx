import React from 'react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import './PhilosophySection.css';

const philosophyPillars = [
  {
    num: '01',
    title: 'CURIOUS',
    desc: 'Encouraging relentless exploration through Ayodhya’s first Digital English Language Lab, interactive multimedia modules, and scientific inquiry.'
  },
  {
    num: '02',
    title: 'CREATIVE',
    desc: 'Fostering cultural artistry through Dandiya Night, Inter-House Rangoli competitions (Tagore House winners), and UKG upcycling bulb/CD crafts.'
  },
  {
    num: '03',
    title: 'CONFIDENT',
    desc: 'Instilling sportsmanship and leadership poise, proven by our 11 District Taekwondo medalists and spirited Annual Athletic Meet.'
  },
  {
    num: '04',
    title: 'COMPASSIONATE',
    desc: 'Cultivating empathy and kindness through social initiatives like "One for Me, One for You" supporting children at Muskan Rehabilitation Centre.'
  },
  {
    num: '05',
    title: 'CONSCIENTIOUS',
    desc: 'Building environmental responsibility from early childhood through Electronic Waste Management, recycling, and sustainable green campus initiatives.'
  }
];

export default function PhilosophySection() {
  return (
    <section className="philosophy-section" id="philosophy">
      <div className="container">
        <div className="philosophy-header">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label" style={{ color: 'var(--color-soft-accent)' }}>03 — SCHOOL PHILOSOPHY</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2" 
            className="heading-section" 
            style={{ color: '#FFFFFF', marginTop: '0.5rem' }}
            text="THE GOENKA WAY"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ color: 'rgba(255, 255, 255, 0.75)', maxWidth: '640px', marginTop: '1rem' }}>
              Five foundational pillars guiding every child's growth, character, and academic journey at GD Goenka Ayodhya.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="philosophy-grid" stagger staggerAmount={0.12} variant="fadeUp" delay={0.3}>
          {philosophyPillars.map((item, idx) => (
            <div key={idx} className="philosophy-card hover-lift">
              <span className="philosophy-card-num">{item.num}</span>
              <h3 className="philosophy-card-title">{item.title}</h3>
              <p className="philosophy-card-desc">{item.desc}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
