import React from 'react';
import { ShieldCheck, Heart, Award } from 'lucide-react';
import { houseSystem, leadershipData } from '../data/leadership';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import FinalCTA from '../components/FinalCTA';

export default function AboutPage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {

  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Page Header */}
      <section className="section-padding theme-warm-soft" id="story">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">ABOUT G.D. GOENKA SCHOOL AYODHYA</span>
          </ScrollReveal>

          <AnimatedText 
            as="h1"
            className="heading-hero" 
            style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}
            text="OUR STORY & LEGACY."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
              Built on a legacy of educational excellence established in 1994, G.D. Goenka School, Ayodhya is a bespoke campus designed to nurture curious minds, strong character, and future-ready global leaders.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Legacy & Vision Section */}
      <section className="section-padding theme-pure-white" id="legacy">
        <div className="container">
          <div className="editorial-grid" style={{ alignItems: 'center' }}>
            <ScrollReveal variant="fadeRight" delay={0.1} className="col-12 col-md-6">
              <span className="tag-label">INSTITUTIONAL FOUNDATION</span>
              <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                The GD Goenka Legacy
              </h2>
              <p className="text-body" style={{ marginBottom: '1.25rem' }}>
                The GD Goenka ecosystem has stood for innovation in schooling since 1994. The Ayodhya campus brings this rich national heritage to Uttar Pradesh, offering world-class infrastructure and pedagogical standards tailored specifically for the regional community.
              </p>
              <p className="text-body">
                We distinguish our broad institutional legacy from our newly built Ayodhya campus facilities—ensuring transparent, authentic, and verified information for every family.
              </p>
            </ScrollReveal>

            <div className="col-12 col-md-6">
              <ImageReveal 
                src="/school-media/Opening Photos/A/DSC_7282.JPG" 
                alt="GD Goenka Ayodhya Campus Architecture" 
                width="800"
                height="400"
                delay={0.2}
                style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding theme-warm-white" id="mission">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem' }}>
            <ScrollReveal variant="fadeUp">
              <span className="tag-label">GUIDING PRINCIPLES</span>
            </ScrollReveal>

            <AnimatedText 
              as="h2"
              className="heading-section" 
              style={{ marginTop: '0.5rem' }}
              text="Mission & Core Values"
              delay={0.1}
            />
          </div>

          <ScrollReveal className="editorial-grid" stagger staggerAmount={0.12} variant="fadeUp" delay={0.2}>
            <div className="col-12 col-md-4 hover-lift" style={{ background: '#FFFFFF', padding: '2.25rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)', boxShadow: 'var(--shadow-subtle)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-soft-accent)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Award size={24} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Academic Mastery</h3>
              <p className="text-body">Equipping students with deep conceptual comprehension, scientific inquiry, and analytical competence across CBSE streams.</p>
            </div>

            <div className="col-12 col-md-4 hover-lift" style={{ background: '#FFFFFF', padding: '2.25rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)', boxShadow: 'var(--shadow-subtle)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-soft-accent)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Heart size={24} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Character & Empathy</h3>
              <p className="text-body">Cultivating emotional resilience, peer kindness, ethical discernment, and cultural pride rooted in Ayodhya’s traditions.</p>
            </div>

            <div className="col-12 col-md-4 hover-lift" style={{ background: '#FFFFFF', padding: '2.25rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)', boxShadow: 'var(--shadow-subtle)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-soft-accent)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Future Preparedness</h3>
              <p className="text-body">Integrating artificial intelligence awareness, robotics suites, public debate, and sustainable eco-stewardship.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Leadership & Executive Mentorship */}
      <section className="section-padding theme-warm-soft" id="leadership">
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <ScrollReveal variant="fadeUp">
              <span className="tag-label">ACADEMIC & EXECUTIVE GOVERNANCE</span>
            </ScrollReveal>

            <AnimatedText 
              as="h2"
              className="heading-section" 
              style={{ marginTop: '0.5rem' }}
              text="LEADERSHIP & MENTORSHIP"
              delay={0.1}
            />

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-body" style={{ maxWidth: '640px', marginTop: '0.5rem' }}>
                Visionary institutional leadership committed to academic rigor, character building, and world-class Goenkan pedagogy in Ayodhya.
              </p>
            </ScrollReveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {leadershipData.map((leader, idx) => (
              <ScrollReveal key={idx} variant="fadeUp" delay={0.15 + idx * 0.1} className="hover-lift" style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: 'var(--border-thin)', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                  <img src={leader.image} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <span style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(23, 24, 29, 0.9)', color: 'var(--color-accent)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                    {leader.role}
                  </span>
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '0.25rem' }}>{leader.title}</span>
                  <h3 className="font-display" style={{ fontSize: '1.6rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>{leader.name}</h3>
                  <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--color-warm-gray-800)', lineHeight: 1.6, marginBottom: '1.25rem', borderLeft: '3px solid var(--color-accent)', paddingLeft: '1rem' }}>
                    "{leader.message}"
                  </p>
                  <p className="text-small" style={{ color: 'var(--color-text-muted)', marginTop: 'auto', borderTop: '1px solid var(--color-warm-gray-200)', paddingTop: '1rem' }}>
                    {leader.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* House System */}
      <section className="section-padding theme-pure-white" id="houses">
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <ScrollReveal variant="fadeUp">
              <span className="tag-label">STUDENT LIFE GOVERNANCE</span>
            </ScrollReveal>

            <AnimatedText 
              as="h2"
              className="heading-section" 
              style={{ marginTop: '0.5rem' }}
              text="OUR FOUR HOUSES"
              delay={0.1}
            />

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-body" style={{ maxWidth: '640px', marginTop: '0.5rem' }}>
                Fostering camaraderie, healthy competition, sportsmanship, and leadership across four house identities.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal className="editorial-grid" stagger staggerAmount={0.1} variant="fadeUp" delay={0.3}>
            {houseSystem.map((house, idx) => (
              <div key={idx} className="col-12 col-md-3 hover-lift" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)', background: 'var(--color-warm-white)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: house.color, letterSpacing: '0.15em' }}>{house.element}</span>
                <h3 className="font-display" style={{ fontSize: '1.75rem', color: 'var(--color-primary-dark)', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{house.name}</h3>
                <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>Motto: {house.motto}</p>
                <p className="text-body" style={{ fontSize: '0.9rem' }}>{house.desc}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}

