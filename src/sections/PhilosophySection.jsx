import React, { useState } from 'react';
import { X, ArrowRight, Sparkles, Compass, Lightbulb, Heart, ShieldCheck, Microscope } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import KineticFlair from '../components/KineticFlair';
import './PhilosophySection.css';

const philosophyPillars = [
  {
    id: 'curious',
    num: '01',
    title: 'CURIOUS',
    shortDesc: 'Encouraging students to ask questions, explore ideas and develop a lifelong love of learning.',
    icon: Microscope,
    expandedTitle: 'Curiosity: The Spark of Lifelong Discovery',
    expandedNarrative: 'We believe education begins with the desire to know more. We encourage our students to ask questions, explore ideas and look beyond the obvious, developing a lifelong curiosity that makes learning meaningful.',
    visualFocus: 'Science Lab & Discovery Inquiry',
    image: '/school-media/New Pages/Page 2/DSC07338.JPG',
    imageAlt: 'Students exploring scientific discovery and hands-on experiments in lab',
    quote: 'Questions open worlds that textbooks alone can never reveal.'
  },
  {
    id: 'creative',
    num: '02',
    title: 'CREATIVE',
    shortDesc: 'Nurturing imagination, original thinking and the confidence to approach problems in new ways.',
    icon: Lightbulb,
    expandedTitle: 'Creativity: Seeing Possibilities Beyond Limits',
    expandedNarrative: 'We believe imagination allows students to see possibilities where others see limits. Through exploration, expression and original thinking, we encourage students to approach ideas and challenges in their own way.',
    visualFocus: 'Art, Music & Theatrical Expression',
    image: '/school-media/Cultural Celebration/classical_dance_performance.jpg',
    imageAlt: 'Creative artistic expression and classical dance performance',
    quote: 'Imagination turns knowledge into invention and self-expression.'
  },
  {
    id: 'confident',
    num: '03',
    title: 'CONFIDENT',
    shortDesc: 'Developing articulate, independent young people who believe in themselves and are prepared to take initiative.',
    icon: Compass,
    expandedTitle: 'Confidence: Finding Your Voice and Purpose',
    expandedNarrative: 'We believe confidence grows when students are encouraged to participate, express themselves and step beyond what feels comfortable. Through opportunity, challenge and experience, they learn to trust their abilities and find their own voice.',
    visualFocus: 'Public Speaking, Stage & Leadership Moments',
    image: '/school-media/New Pages/Page 9/IMG20260916111006.jpg',
    imageAlt: 'Student speaking confidently at the Public Speaking Arena',
    quote: 'Real confidence is not the absence of fear, but the courage to express oneself.'
  },
  {
    id: 'compassionate',
    num: '04',
    title: 'COMPASSIONATE',
    shortDesc: 'Building empathy, respect, strong values and a sense of responsibility towards others and the community.',
    icon: Heart,
    expandedTitle: 'Compassion: Character That Uplifts Communities',
    expandedNarrative: 'We believe true education shapes not only what one knows, but how one treats others. Through empathy, respect and kindness, our students learn to understand different perspectives, support those around them and contribute positively to their community.',
    visualFocus: 'Collaboration, Peer Support & Community Action',
    image: '/school-media/New Pages/Page 2/DSC00051.JPG',
    imageAlt: 'Students learning together and supporting one another in collaborative activity',
    quote: 'Knowledge without empathy is incomplete; kindness makes education profound.'
  },
  {
    id: 'conscientious',
    num: '05',
    title: 'CONSCIENTIOUS',
    shortDesc: 'Developing discipline, integrity and a strong sense of right and wrong, taking ownership of choices and impact.',
    icon: ShieldCheck,
    expandedTitle: 'Conscientiousness: Responsibility in Action',
    expandedNarrative: 'We believe achievement carries responsibility. By developing discipline, integrity and a strong sense of right and wrong, our students learn to take ownership of their choices, their work and the impact they have on the world around them.',
    visualFocus: 'Environmental Stewardship & Ethical Leadership',
    image: '/school-media/E-Waste/DSC_2105.JPG',
    imageAlt: 'Students engaging in eco-stewardship and responsible environmental action',
    quote: 'True leadership is demonstrated when no one is watching: integrity and accountability.'
  }
];

export default function PhilosophySection() {
  const [activeModalId, setActiveModalId] = useState(null);

  const activePillar = philosophyPillars.find(p => p.id === activeModalId);

  return (
    <section className="philosophy-section" id="philosophy">
      <div className="container">
        <div className="philosophy-header">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label" style={{ color: 'var(--color-soft-accent)', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              SCHOOL PHILOSOPHY
              <KineticFlair type="star" size={15} color="var(--color-soft-accent)" />
            </span>
          </ScrollReveal>

          <AnimatedText 
            as="h2" 
            className="heading-section" 
            style={{ color: '#FFFFFF', marginTop: '0.5rem' }}
            text="THE GOENKA METHOD"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body philosophy-subtitle" style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '720px', marginTop: '1rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
              OUR FIVE Cs: Defining values that shape how our students learn, grow, and thrive, for life.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="philosophy-grid" stagger staggerAmount={0.12} variant="fadeUp" delay={0.3}>
          {philosophyPillars.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="philosophy-card hover-lift"
                onClick={() => setActiveModalId(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveModalId(item.id); }}
                aria-label={`Explore ${item.title}`}
              >
                <div className="philosophy-card-top">
                  <span className="philosophy-card-num">{item.num}</span>
                  <div className="philosophy-card-icon-pill">
                    <Icon size={16} />
                  </div>
                </div>
                <h3 className="philosophy-card-title">{item.title}</h3>
                <p className="philosophy-card-desc">{item.shortDesc}</p>
                <div className="philosophy-card-cta">
                  <span>Explore {item.title}</span>
                  <ArrowRight size={14} className="cta-arrow" />
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </div>

      {/* C-Expansion Interactive Modal (PDF 1 Page 5 & 6) */}
      {activePillar && (
        <div 
          className="c-expansion-overlay" 
          onClick={() => setActiveModalId(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="c-expansion-title"
        >
          <div 
            className="c-expansion-modal" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header & Navigation Tabs */}
            <div className="c-expansion-header">
              <div className="c-expansion-tabs">
                {philosophyPillars.map((p) => (
                  <button
                    key={p.id}
                    className={`c-tab-btn ${p.id === activePillar.id ? 'active' : ''}`}
                    onClick={() => setActiveModalId(p.id)}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
              <button 
                className="c-expansion-close-btn"
                onClick={() => setActiveModalId(null)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="c-expansion-body">
              <div className="c-expansion-content">
                <span className="c-expansion-badge">
                  {activePillar.num} • {activePillar.visualFocus}
                </span>
                <h3 id="c-expansion-title" className="c-expansion-title">
                  {activePillar.expandedTitle}
                </h3>
                <p className="c-expansion-narrative">
                  {activePillar.expandedNarrative}
                </p>
                <blockquote className="c-expansion-quote">
                  "{activePillar.quote}"
                </blockquote>
              </div>

              <div className="c-expansion-visual">
                <img 
                  src={activePillar.image} 
                  alt={activePillar.imageAlt}
                  className="c-expansion-img"
                  loading="lazy"
                />
                <span className="c-expansion-caption">
                  {activePillar.visualFocus}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
