import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Users, Music, Activity, Cpu, Palette, Heart, CheckCircle2 } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import KineticFlair from '../components/KineticFlair';
import FinalCTA from '../components/FinalCTA';
import './ThrivePage.css';

export const thrivePillars = [
  {
    id: 'team-centric',
    letter: 'T',
    num: '01',
    value: 'Team Centric',
    title: 'TEAM CENTRIC',
    subtitle: 'Collaborative Spirit & Shared Victory',
    icon: Users,
    shortDesc: 'Fostering camaraderie, mutual respect, and collaborative leadership through athletics, house leagues, and group inquiry.',
    expandedTitle: 'Team Centric: Collaborative Spirit & Shared Victory',
    expandedNarrative: 'At G.D. Goenka Public School, Ayodhya, we believe greatness is never a solo pursuit. Through inter-house championships, competitive sports leagues, robotics team challenges, and collaborative classroom problem-solving, our students learn that listening, supporting peers, and working toward a shared vision creates lasting impact.',
    points: [
      'Active student leadership in Tagore, Teresa, Vivekananda & Radhakrishnan houses.',
      'Team sports development including football, basketball, and athletic relays.',
      'Collaborative STEM and digital lab projects encouraging shared problem-solving.',
      'Peer-mentorship programs where senior students guide and uplift juniors.'
    ],
    visualFocus: 'Athletics Meet & Taekwondo Championship Teams',
    image: '/school-media/Taekwando/Taekwondo Winners.jpg',
    imageAlt: 'GD Goenka Ayodhya Taekwondo champions and athletic team',
    quote: 'Individually we are unique; together as Goenkans, we are unstoppable.'
  },
  {
    id: 'harmonious',
    letter: 'H',
    num: '02',
    value: 'Harmonious',
    title: 'HARMONIOUS',
    subtitle: 'Inner Balance, Joy & Cultural Resonance',
    icon: Music,
    shortDesc: 'Cultivating emotional well-being, mindfulness, classical music, and rich cultural traditions in sacred Ayodhya.',
    expandedTitle: 'Harmonious: Inner Balance, Joy & Cultural Resonance',
    expandedNarrative: 'Education is an art of balance. In the historic and sacred cultural landscape of Ayodhya, we cultivate emotional harmony alongside academic excellence. From vibrant Dandiya celebrations and Indian classical dance to quiet morning reflections, our students develop inner calm, cultural pride, and respectful relationships with those around them.',
    points: [
      'Classical vocal music, instrumental training, and theatrical performance arts.',
      'Mindfulness, yoga, and social-emotional wellness integrated into daily routines.',
      'Grand cultural celebrations honoring festivals with environmental mindfulness.',
      'A peaceful, inclusive campus environment where every child feels valued.'
    ],
    visualFocus: 'Cultural Conclaves, Classical Dance & Music Ensembles',
    image: '/school-media/Cultural Celebration/classical_dance_performance.jpg',
    imageAlt: 'Creative artistic expression and classical dance performance at GD Goenka',
    quote: 'When character harmonizes with knowledge, learning becomes a joyous melody.'
  },
  {
    id: 'resilient',
    letter: 'R',
    num: '03',
    value: 'Resilient',
    title: 'RESILIENT',
    subtitle: 'Unshakable Grit & Emotional Strength',
    icon: Activity,
    shortDesc: 'Instilling perseverance and emotional strength, empowering students to embrace challenges and rise with courage.',
    expandedTitle: 'Resilient: Unshakable Grit & Emotional Strength',
    expandedNarrative: 'Life is filled with unexpected hurdles, and the true measure of education is how one responds to adversity. At GD Goenka Ayodhya, we treat obstacles as essential stepping stones. Whether pushing boundaries on the athletic track, tackling complex mathematical proofs, or mastering a difficult debate topic, our students build the emotional stamina to persevere with dignity.',
    points: [
      'Growth-mindset pedagogy that celebrates effort, reflection, and iterative improvement.',
      'Rigorous physical endurance training in martial arts, skating, and athletics.',
      'Safe learning spaces that encourage positive risk-taking without fear of failure.',
      'Mentorship from faculty coordinators to guide students through academic challenges.'
    ],
    visualFocus: 'Track & Field Athletics & Competitive Excellence',
    image: '/school-media/Opening Photos/B/SPF_7322.JPG',
    imageAlt: 'Students demonstrating determination and athletic stamina on campus',
    quote: 'Resilience is not merely weathering the storm; it is learning to soar above it.'
  },
  {
    id: 'innovative',
    letter: 'I',
    num: '04',
    value: 'Innovative',
    title: 'INNOVATIVE',
    subtitle: 'Curious Inquiry & Technological Fluency',
    icon: Cpu,
    shortDesc: 'Sparking curiosity, digital experimentation, phonetic fluency, and scientific inquiry in modern laboratories.',
    expandedTitle: 'Innovative: Curious Inquiry & Technological Fluency',
    expandedNarrative: 'In an era defined by artificial intelligence and rapid global technological shifts, rote memorization is obsolete. In our state-of-the-art Digital Language Lab, interactive smart classrooms, and advanced science discovery centres, students question conventions, test hypotheses, and create original solutions for 21st-century challenges.',
    points: [
      'Ayodhya’s premier Digital Language Lab with phonetic listening booths and bilingual fluency.',
      'Interactive Smart Boards, coding modules, and multimedia research workstations.',
      'Experimental science laboratories for hands-on physics, chemistry, and biology research.',
      'Inquiry-based learning frameworks that turn students from passive consumers into active creators.'
    ],
    visualFocus: 'Digital Language Lab & Interactive Computer Workstations',
    image: '/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg',
    imageAlt: 'Students exploring 21st-century technology in the Digital Language Lab',
    quote: 'Innovation begins with the audacity to ask: what if there is a better way?'
  },
  {
    id: 'versatile',
    letter: 'V',
    num: '05',
    value: 'Versatile',
    title: 'VERSATILE',
    subtitle: 'Multi-Disciplinary Brilliance & Adaptability',
    icon: Palette,
    shortDesc: 'Encouraging dynamic growth across academics, public speaking, visual arts, and experiential discovery.',
    expandedTitle: 'Versatile: Multi-Disciplinary Brilliance & Adaptability',
    expandedNarrative: 'The future belongs to agile polymaths. We encourage our students never to be confined to a single dimension. A Goenkan mathematician is also an articulate debater, a creative visual artist, and an empathetic leader capable of adapting to any global arena.',
    points: [
      'Holistic CBSE curriculum seamlessly blended with Reggio Emilia-inspired early discovery.',
      'Experiential color days, phonetic picnics, and theme-based learning journeys.',
      'Public speaking forums, elocution clubs, and Model United Nations preparation.',
      'Extensive co-curricular modules spanning performing arts, sports, and creative writing.'
    ],
    visualFocus: 'Experiential Thematic Learning & Public Speaking',
    image: '/school-media/Blue Day/blue_day_celebration_banner.jpg',
    imageAlt: 'Students actively exploring experiential learning and creative arts',
    quote: 'Versatility gives wings to intellect, enabling our children to thrive in any domain.'
  },
  {
    id: 'empathetic',
    letter: 'E',
    num: '06',
    value: 'Empathetic',
    title: 'EMPATHETIC',
    subtitle: 'Compassion, Integrity & Civic Responsibility',
    icon: Heart,
    shortDesc: 'Building deep social consciousness, kindness, eco-stewardship, and ethical values that uplift society.',
    expandedTitle: 'Empathetic: Compassion, Integrity & Civic Responsibility',
    expandedNarrative: 'Intellect without heart is hollow. Through eco-friendly Diwali rangoli initiatives, E-waste collection drives, and an inclusive school community ethos, we nurture young minds who feel deeply for others and act courageously to make the world kinder and more sustainable.',
    points: [
      'Eco-stewardship initiatives including campus tree plantations and waste segregation.',
      'Community outreach programs and festive charity drives for social responsibility.',
      'Ethical values, respect for elders, and kindness woven into everyday classroom culture.',
      'Inclusivity practices that celebrate every child’s individual background and pace.'
    ],
    visualFocus: 'Eco-Stewardship, Community Engagement & Value Drives',
    image: '/school-media/E-Waste/DSC_2105.JPG',
    imageAlt: 'Students participating in eco-stewardship and community responsibility',
    quote: 'Compassion is the truest compass of leadership; empathy transforms society.'
  }
];

export default function ThrivePage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  useEffect(() => {
    // If a hash exists (e.g. #team-centric or #t or #harmonious), scroll smoothly to that element
    const hash = window.location.hash || (window.location.href.includes('#') ? '#' + window.location.href.split('#')[1] : '');
    if (hash) {
      const rawTarget = hash.replace('#', '').toLowerCase();
      const letterMap = {
        't': 'team-centric',
        'team': 'team-centric',
        'team-centric': 'team-centric',
        'h': 'harmonious',
        'harmony': 'harmonious',
        'harmonious': 'harmonious',
        'r': 'resilient',
        'resilience': 'resilient',
        'resilient': 'resilient',
        'i': 'innovative',
        'innovation': 'innovative',
        'innovative': 'innovative',
        'v': 'versatile',
        'versatility': 'versatile',
        'versatile': 'versatile',
        'e': 'empathetic',
        'empathy': 'empathetic',
        'empathetic': 'empathetic'
      };

      const targetId = letterMap[rawTarget] || rawTarget;
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="thrive-page-root">
      {/* Hero Header */}
      <section className="thrive-hero-section">
        <div className="container">
          <div className="thrive-hero-nav">
            <button 
              className="thrive-back-btn" 
              onClick={() => { setCurrentRoute('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              aria-label="Back to Homepage"
            >
              <ArrowLeft size={16} /> Back to Homepage
            </button>
          </div>

          <div className="thrive-hero-content text-center">
            <ScrollReveal variant="fadeUp">
              <span className="tag-label" style={{ color: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                THE GOENKA METHOD
                <KineticFlair type="star" size={14} color="var(--color-accent)" />
              </span>
            </ScrollReveal>

            <AnimatedText 
              as="h1" 
              className="thrive-hero-title"
              text="THRIVE FOR LIFE"
              delay={0.1}
            />

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="thrive-hero-lead">
                Our educational philosophy is anchored in six foundational values—spelling <strong>THRIVE</strong>. These defining principles shape how every Goenkan learns, grows, and leads in an ever-evolving world.
              </p>
            </ScrollReveal>

            {/* Quick Letter Jump Navigation */}
            <ScrollReveal variant="fadeUp" delay={0.3} className="thrive-jump-bar">
              {thrivePillars.map((p) => (
                <a 
                  key={p.id} 
                  href={`#${p.id}`}
                  className="thrive-jump-pill"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(p.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <strong className="jump-letter">{p.letter}</strong>
                  <span className="jump-title">{p.value}</span>
                </a>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Comprehensive Pillar Detail Sections */}
      <section className="thrive-details-section">
        <div className="container">
          <div className="thrive-pillars-list">
            {thrivePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isEven = idx % 2 === 1;

              return (
                <div 
                  key={pillar.id} 
                  id={pillar.id}
                  className={`thrive-pillar-block ${isEven ? 'reverse' : ''}`}
                >
                  {/* Text Column */}
                  <div className="pillar-info-col">
                    <div className="pillar-header-meta">
                      <span className="pillar-letter-tag">{pillar.letter}</span>
                      <div className="pillar-icon-bubble">
                        <Icon size={18} />
                      </div>
                    </div>

                    <h2 className="pillar-main-title">{pillar.title}</h2>
                    <h3 className="pillar-sub-title">{pillar.subtitle}</h3>

                    <p className="pillar-narrative">{pillar.expandedNarrative}</p>

                    <div className="pillar-points-list">
                      <h4 className="points-heading">HOW WE CULTIVATE THIS AT GD GOENKA AYODHYA:</h4>
                      <ul>
                        {pillar.points.map((pt, pIdx) => (
                          <li key={pIdx}>
                            <CheckCircle2 size={16} className="pt-check-icon" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <blockquote className="pillar-quote-box">
                      "{pillar.quote}"
                    </blockquote>
                  </div>

                  {/* Visual Column */}
                  <div className="pillar-visual-col">
                    <div className="pillar-image-card">
                      <img 
                        src={pillar.image} 
                        alt={pillar.imageAlt}
                        className="pillar-card-img"
                        loading="lazy"
                      />
                      <div className="pillar-img-overlay">
                        <span className="pillar-focus-badge">{pillar.visualFocus}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Action */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
