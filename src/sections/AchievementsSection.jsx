import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievementsData, statisticsPillars } from '../data/achievements';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import './AchievementsSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function AchievementsSection() {
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.stat-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="achievements-section section-padding" id="achievements">
      <div className="container">
        <div>
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">11 — MILESTONES & LAURELS</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem' }}
            text="A CULTURE OF EXCELLENCE."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ maxWidth: '640px', marginTop: '0.75rem' }}>
              Recognizing early achievements, STEM laurels, athletic championships, and environmental certifications earned by our campus.
            </p>
          </ScrollReveal>
        </div>

        {/* Statistics Bar */}
        <div ref={statsRef} className="stats-bar-grid">
          {statisticsPillars.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Achievements Cards */}
        <ScrollReveal className="achievements-grid" stagger staggerAmount={0.12} variant="fadeUp" delay={0.3}>
          {achievementsData.map((item, idx) => (
            <div key={idx} className="achievement-card hover-lift">
              <div>
                <span className="achieve-badge">{item.category} • {item.year}</span>
                <h3 className="achieve-title">{item.title}</h3>
                <p className="achieve-desc">{item.desc}</p>
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-warm-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-accent)' }}>HONOR:</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-primary-dark)' }}>{item.highlight}</span>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
