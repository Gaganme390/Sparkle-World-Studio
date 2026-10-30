import React from 'react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import KineticFlair from '../components/KineticFlair';
import './WhyGoenkaSection.css';

const whyGoenkaPillars = [
  {
    title: 'First Digital English Lab in Ayodhya',
    desc: 'Pioneering technology-driven language education with interactive phonetic stations, listening booths, and spoken English fluency labs.'
  },
  {
    title: 'District Champion Martial Arts & Sports',
    desc: 'Clinched 11 medals (2 Gold, 3 Silver, 6 Bronze) at District Taekwondo Championship 2025 alongside our energetic Annual Athletic Meet.'
  },
  {
    title: 'Mentored by New Delhi Head Office',
    desc: 'Curriculum delivery, teacher excellence, and quality benchmarks closely mentored by Ms. Rajni Jauhari & Ms. Yasmin Khan from GD Goenka Group HQ.'
  },
  {
    title: 'Experiential & Environmental Learning',
    desc: 'Hands-on discovery from early years, including UKG Electronic Waste Management (CD clocks & bulb craft) and vibrant Blue & Orange Days.'
  },
  {
    title: '4 Dynamic Houses & Cultural Celebrations',
    desc: 'Active student leadership in Tagore, Teresa, Vivekananda & Radhakrishnan houses; grand Dandiya Nights and eco-friendly Diwali Rangoli contests.'
  },
  {
    title: 'Empathy & Social Outreach',
    desc: 'Inculcating compassion from young age through "One for Me, One for You" outreach in partnership with Muskan Rehabilitation Centre, Ayodhya.'
  }
];

export default function WhyGoenkaSection() {
  return (
    <section className="whygoenka-section section-padding" id="whygoenka">
      <div className="container">
        <div>
          <ScrollReveal variant="fadeUp">
            <span className="tag-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              THE GOENKA ADVANTAGE
              <KineticFlair type="diamond" size={15} />
            </span>
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
              <h3 className="why-title">{item.title}</h3>
              <p className="why-desc">{item.desc}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
