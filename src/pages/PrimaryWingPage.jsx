import React, { useState, useEffect, useMemo } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { ArrowRight, Clock, Users, Sparkles, BookOpen, Target, Palette, Cpu, Compass, HeartHandshake } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import FinalCTA from '../components/FinalCTA';
import './PrimaryWingPage.css';

// Academics tab data directly from PDF 2 (Pages 15, 16, 17)
const primaryAcademicTabs = [
  {
    id: 'grade3',
    label: 'Grade 3',
    gradeBadge: 'GRADE 3 • ACTIVE EXPLORATION',
    image: '/school-media/New Pages/Page 15/WhatsApp Image 2026-10-07 at 5.24.11 PM.jpeg',
    alt: 'Grade 3 students exploring geometric concepts and hands-on mathematical puzzle structures',
    title: 'Active Exploration & Conceptual Discovery',
    paragraphs: [
      'Active exploration forms the heart of Grade 3 learning at GD Goenka School, Ayodhya. An inquiry-based approach develops essential skills in English, Hindi, Mathematics, and Environmental Studies, encouraging curiosity, critical thinking, and each child’s progress towards their full potential.',
      'Stories, poetry, grammar, and opportunities for expression deepen understanding of English and Hindi. Mathematics strengthens numerical fluency and problem-solving, while hands-on Environmental Studies activities connect classroom concepts with everyday life. Meaningful, engaging lessons help students become confident and independent thinkers.'
    ],
    pillars: ['Inquiry-Based Learning', 'Bilingual Literacy Mastery', 'Mental Mathematics Fluency', 'EVS Practical Projects']
  },
  {
    id: 'grade4',
    label: 'Grade 4',
    gradeBadge: 'GRADE 4 • INDEPENDENT INQUIRY',
    image: '/school-media/New Pages/Page 16/WhatsApp Image 2026-10-07 at 5.28.57 PM.jpeg',
    alt: 'Grade 4 learner sketching anatomical mannequin in visual arts and design studio',
    title: 'Investigating Complex Concepts & Independent Inquiry',
    paragraphs: [
      'With established skills as their starting point, Grade 4 learners at GD Goenka School, Ayodhya, investigate increasingly complex concepts. Reading practice develops fluency and text analysis, while narrative and informational writing help students communicate ideas clearly. Learning words in context broadens their vocabulary.',
      'Mathematics develops understanding of operations, decimals, fractions, geometry, and measurement. Practical scientific inquiry introduces ecosystems, forces, and the Earth’s features. History, Geography, and civic life expand students’ understanding of the wider world through Social Studies.',
      'Research, collaboration, and critical thinking guide students as they evaluate information and present their findings. Group activities and independent work support consistent progress suited to individual learning needs.'
    ],
    pillars: ['Decimals & Fractions Geometry', 'Scientific Inquiry & Ecosystems', 'Social Studies & World Perspectives', 'Textual Analysis & Narrative Writing']
  },
  {
    id: 'grade5',
    label: 'Grade 5',
    gradeBadge: 'GRADE 5 • RIGOUR & PURPOSE',
    image: '/school-media/New Pages/Page 17/WhatsApp Image 2026-10-07 at 5.28.58 PM.jpeg',
    alt: 'Grade 5 student in red blazer writing purposefully at desk',
    title: 'Freedom of Expression, Rigour & Personal Purpose',
    paragraphs: [
      'Greater depth in learning and freedom of expression define the Grade 5 programme at GD Goenka School, Ayodhya. Academic rigour works alongside creativity and personal development, encouraging students to think carefully and grow with purpose.',
      'Language and Literacy, Mathematics, EVS, and ABL French strengthen academic foundations. Dedicated laboratories offer opportunities to explore ICT, STEM, and Robotics. Library experiences, Physical Education, Circle Time, Dance, Music, and Drama enrich the school day, with lessons and activities encouraging curiosity, critical thinking, and collaboration.',
      'Inclusive, activity-based learning recognises the potential of every child. Within a nurturing environment, students develop as thoughtful, confident learners who are ready to contribute to and shape the world around them.'
    ],
    pillars: ['Third Language Introduction (ABL French)', 'ICT, STEM & Robotics Exploration', 'Circle Time & Emotional Intelligence', 'Academic Rigour with Creative Expression']
  }
];

// Primary Wing Experience Goenka Cards (Pages 13 to 17 of PDF 2)
const primaryExperienceCards = [
  {
    id: 'reading-prog',
    title: 'Structured Reading Programme',
    tag: 'LITERACY CULTURE',
    desc: 'Guided reading, phonetics mastery, and diverse global texts cultivate fluent, analytical readers who love exploring ideas across fiction, non-fiction, and poetry.',
    image: '/school-media/New Pages/Page 14/WhatsApp Image 2026-10-07 at 5.21.48 PM.jpeg'
  },
  {
    id: 'sports-arena',
    title: 'Indoor Sports Arena & Shooting Range',
    tag: 'PHYSICAL EXCELLENCE',
    desc: 'Professional multi-sport indoor arena featuring an Olympic-grade 10m shooting range, badminton courts, table tennis, and yoga for discipline, focus, and athletic agility.',
    image: '/school-media/New Pages/Page 14/primary_wing_landscape.jpg'
  },
  {
    id: 'music-performing',
    title: 'Music & Performing Arts Studio',
    tag: 'CREATIVE EXPRESSION',
    desc: 'Indian classical instruments including tablas, keyboard, harmonium, vocal music, and expressive theatre build stage confidence, teamwork, and cultural roots.',
    image: '/school-media/New Pages/Page 13/WhatsApp Image 2026-10-07 at 5.21.45 PM (1).jpeg'
  },
  {
    id: 'ict-hub',
    title: 'Computer & Digital Literacy Centre',
    tag: 'DIGITAL FLUENCY',
    desc: 'Interactive computer stations and introductory coding modules develop logical computational thinking, problem-solving, and responsible digital habits early.',
    image: '/school-media/New Pages/Page 13/WhatsApp Image 2026-10-07 at 5.21.49 PM.jpeg'
  },
  {
    id: 'robotics-stem',
    title: 'Robotics & STEM Discovery Lab',
    tag: 'HANDS-ON INNOVATION',
    desc: 'Hands-on robotics kits, visual block coding, and early sensor integration nurture analytical problem-solving, mechanical logic, and inventive engineering creativity.',
    image: '/school-media/facilities/robotics_and_ai_lab.jpg'
  },
  {
    id: 'visual-design',
    title: 'Visual Arts & Sculpting Studio',
    tag: 'FINE ARTS & DESIGN',
    desc: 'Students experiment with diverse artistic mediums—acrylics, clay modeling, charcoal, and sketching—nurturing spatial awareness, fine motor skills, and unique personal style.',
    image: '/school-media/New Pages/Page 16/WhatsApp Image 2026-10-07 at 5.28.58 PM (1).jpeg'
  },
  {
    id: 'circle-time',
    title: 'Social-Emotional Circle Time',
    tag: 'LIFE SKILLS & WELLBEING',
    desc: 'Regular mentored circle discussions foster empathy, active listening, mindfulness, and conflict resolution, ensuring every child feels valued, supported, and confident.',
    image: '/school-media/New Pages/Page 17/WhatsApp Image 2026-10-07 at 5.29.02 PM (1).jpeg'
  },
  {
    id: 'cricket-athletics',
    title: 'Athletics & Cricket Academy',
    tag: 'OUTDOOR SPORTS',
    desc: 'Lush green outdoor athletic fields and turf cricket pitches provide structured sports training, building physical stamina, strategic thinking, and sportsmanship.',
    image: '/school-media/New Pages/Page 13/WhatsApp Image 2026-10-07 at 5.21.44 PM.jpeg'
  },
  {
    id: 'drama-expression',
    title: 'Dramatic Arts & Thematic Presentations',
    tag: 'STAGE EXPRESSION',
    desc: 'Guided stage expression, costume role-play, and annual thematic presentations develop storytelling, vocal projection, empathy, and collaborative performance skills.',
    image: '/school-media/New Pages/Page 13/WhatsApp Image 2026-10-07 at 5.21.50 PM (1).jpeg'
  }
];

export default function PrimaryWingPage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  const { englishDigitalLab } = useSchoolData();
  const [activeTabId, setActiveTabId] = useState('grade3');
  const [activeNavSection, setActiveNavSection] = useState('overview');
  const activeTab = primaryAcademicTabs.find((t) => t.id === activeTabId) || primaryAcademicTabs[0];

  const displayPrimaryCards = useMemo(() => {
    const list = [...primaryExperienceCards];
    if (englishDigitalLab?.enabled !== false && englishDigitalLab?.showInPrimary !== false) {
      const labCard = {
        id: 'english-digital-lab',
        title: englishDigitalLab?.title || 'Digital English Language Lab',
        tag: englishDigitalLab?.badge || 'PHONETICS & READING FLUENCY',
        desc: englishDigitalLab?.primaryDesc || 'Interactive language workstations with audio headsets, Lexile-graded Collins reading modules, phonics reinforcement, and vocabulary expansion software developing fluent reading comprehension and confident spoken expression.',
        image: englishDigitalLab?.image || '/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg'
      };
      const readingIdx = list.findIndex(c => c.id === 'reading-prog');
      if (readingIdx !== -1) {
        list.splice(readingIdx + 1, 0, labCard);
      } else {
        list.push(labCard);
      }
    }
    return list;
  }, [englishDigitalLab]);


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'academics', 'experience'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el && scrollPos >= el.offsetTop) {
          setActiveNavSection(sectionId);
          return;
        }
      }
      setActiveNavSection('overview');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveNavSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="primary-wing-page">
      {/* 1. Hero Collage Section (Page 13 of PDF 2) */}
      <section className="pw-hero-section">
        <div className="pw-hero-grid">
          {/* Collage Item 1: Cricket / Athletics */}
          <div className="pw-collage-img-wrap pw-img-cricket">
            <img
              src="/school-media/New Pages/Page 13/WhatsApp Image 2026-10-07 at 5.21.44 PM.jpeg"
              alt="Primary student playing cricket in Goenka sports arena"
              loading="eager"
            />
          </div>

          {/* Collage Item 2: Science & Mathematical balance */}
          <div className="pw-collage-img-wrap pw-img-science">
            <img
              src="/school-media/New Pages/Page 13/WhatsApp Image 2026-10-07 at 5.21.49 PM.jpeg"
              alt="Science and mathematical exploration in primary lab"
              loading="eager"
            />
          </div>

          {/* Center Card (Page 13 Title Card) */}
          <div className="pw-hero-center-card">
            <span className="pw-hero-tag">GD GOENKA PUBLIC SCHOOL AYODHYA</span>
            <h1 className="pw-hero-title">PRIMARY WING</h1>
            <p className="pw-hero-subtitle">Grades 3 – 5</p>

            <div className="pw-hero-pill-row">
              <span className="pw-pill">
                <Sparkles size={13} /> Active Exploration
              </span>
              <span className="pw-pill">
                <Users size={13} /> 1:15 Faculty Ratio
              </span>
              <span className="pw-pill">
                <Clock size={13} /> 8:10 AM – 1:20 PM
              </span>
            </div>

            <div className="wing-hero-actions">
              <button
                type="button"
                className="wing-hero-btn wing-hero-btn-secondary"
                onClick={() => scrollToSection('overview')}
              >
                Explore Overview
              </button>
              <button
                type="button"
                className="wing-hero-btn wing-hero-btn-primary"
                onClick={() => onOpenEnquiry && onOpenEnquiry('Primary Wing (Grades 3-5)')}
              >
                Inquire / Apply
              </button>
            </div>
          </div>

          {/* Collage Item 3: Drama & Performance */}
          <div className="pw-collage-img-wrap pw-img-drama">
            <img
              src="/school-media/New Pages/Page 13/WhatsApp Image 2026-10-07 at 5.21.50 PM (1).jpeg"
              alt="Theatre and drama costume performance"
              loading="lazy"
            />
          </div>

          {/* Collage Item 4: Indian Classical Music & Tablas */}
          <div className="pw-collage-img-wrap pw-img-music">
            <img
              src="/school-media/New Pages/Page 13/WhatsApp Image 2026-10-07 at 5.21.45 PM (1).jpeg"
              alt="Primary student playing Indian classical percussion instruments"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 2. Sticky Sub Navigation */}
      <nav className="pw-subnav-sticky" aria-label="Primary Wing In-Page Navigation">
        <div className="pw-subnav-container">
          <button 
            type="button"
            className={`pw-subnav-btn ${activeNavSection === 'overview' ? 'active' : ''}`} 
            onClick={() => scrollToSection('overview')}
          >
            OVERVIEW
          </button>
          <button 
            type="button"
            className={`pw-subnav-btn ${activeNavSection === 'academics' ? 'active' : ''}`} 
            onClick={() => scrollToSection('academics')}
          >
            ACADEMICS
          </button>
          <button 
            type="button"
            className={`pw-subnav-btn ${activeNavSection === 'experience' ? 'active' : ''}`} 
            onClick={() => scrollToSection('experience')}
          >
            INSPIRED SPACES
          </button>
        </div>
      </nav>

      {/* 3. Overview Section (Page 14 of PDF 2) */}
      <section id="overview" className="section-padding">
        <div className="container">
          <div className="pw-overview-grid">
            {/* Left Content */}
            <ScrollReveal direction="up">
              <div>
                <span className="pw-section-tag">Primary Wing • Grades 3 to 5</span>
                <h2 className="pw-overview-heading">
                  Deeper Understanding, Greater Confidence, Wider Possibilities
                </h2>

                <p className="pw-overview-lead">
                  The Primary Wing at GD Goenka School, Ayodhya, develops academic understanding and essential life skills through a curriculum shaped by inquiry and preparation for the future. Projects, storytelling, games, and collaborative activities strengthen core competencies in English, Hindi, Mathematics, and Environmental Studies.
                </p>

                <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--color-warm-gray-700)', marginBottom: '1.25rem' }}>
                  Our structured Reading Programme combines guided reading, phonics, and varied texts to strengthen literacy. Art, theatre, and sports encourage creativity and confidence, while digital literacy, introductory coding, and robotics develop computational thinking from an early age.
                </p>

                <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--color-warm-gray-700)', marginBottom: '1.5rem' }}>
                  Communication, teamwork, emotional intelligence, and digital readiness run throughout the learning experience, helping children become adaptable, empathetic, and confident global citizens.
                </p>

                <div className="pw-timing-box">
                  <Clock className="pw-timing-icon" />
                  <div>
                    <div className="pw-timing-label">School Timings</div>
                    <div className="pw-timing-val">8:10 AM to 1:20 PM</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Featured Image (Shooting Range / Sports) */}
            <ScrollReveal direction="left" delay={0.15}>
              <div className="pw-overview-img-wrap">
                <img
                  src="/school-media/New Pages/Page 14/primary_wing_landscape.jpg"
                  alt="GD Goenka Ayodhya Primary Wing Indoor Sports Arena and 10m Shooting Range"
                />
                <div className="pw-overview-badge">
                  <div className="pw-badge-title">Indoor Sports & Shooting Range</div>
                  <div className="pw-badge-sub">Precision, Focus & Athletic Development</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Academics Section (Pages 15, 16, 17 of PDF 2) */}
      <section id="academics" className="pw-academics-section section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem' }}>
            <span className="pw-section-tag">Curriculum Progression</span>
            <AnimatedText
              text="Calibrated to Inquiring Young Minds"
              className="section-title"
              style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)', marginBottom: '0.75rem' }}
            />
            <p style={{ color: 'var(--color-warm-gray-600)', fontSize: '1.05rem', margin: 0 }}>
              Explore how academic depth, creative problem-solving, and bilingual fluency expand across each primary grade.
            </p>
          </div>

          {/* Grade Selector Tabs */}
          <div className="pw-academics-tabs-nav">
            {primaryAcademicTabs.map((tab) => (
              <button
                key={tab.id}
                className={`pw-tab-btn ${activeTabId === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="pw-tab-content-grid">
            {/* Left Content */}
            <div key={activeTab.id} style={{ animation: 'fadeIn 0.35s ease' }}>
              <span className="pw-grade-badge">{activeTab.gradeBadge}</span>
              <h3 className="pw-tab-title">{activeTab.title}</h3>

              {activeTab.paragraphs.map((p, idx) => (
                <p key={idx} className="pw-tab-paragraph">
                  {p}
                </p>
              ))}

              <div style={{ marginTop: '1.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {activeTab.pillars.map((pillar, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'var(--color-warm-gray-100, #F3EFEA)',
                      color: 'var(--color-primary-dark, #123985)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    • {pillar}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '2rem' }}>
                <MagneticButton>
                  <button
                    className="btn btn-primary"
                    onClick={() => onOpenEnquiry && onOpenEnquiry(`Primary Wing - ${activeTab.label}`)}
                  >
                    <span>Apply for {activeTab.label}</span>
                    <ArrowRight size={16} />
                  </button>
                </MagneticButton>
              </div>
            </div>

            {/* Right Tab Image */}
            <div>
              <div className="pw-tab-img-card">
                <img src={activeTab.image} alt={activeTab.alt} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Spaces that Inspire Section */}
      <section className="pw-experience-section section-padding" id="experience">
        <div className="container">
          <div className="pw-section-header">
            <span className="pw-section-tag">INSPIRED SPACES</span>
            <h2 className="heading-section">Spaces that Inspire</h2>
            <p className="pw-exp-lead-subtitle">
              Where curiosity meets possibility.
            </p>
          </div>

          <div className="pw-experience-cards-grid">
            {displayPrimaryCards.map((card, idx) => (
              <ScrollReveal
                key={card.id}
                variant="fadeUp"
                delay={0.06 * (idx % 2)}
                className="pw-exp-card-wrap"
              >
                <div className="pw-exp-card">
                  <div className="pw-exp-visual">
                    <img
                      src={card.image}
                      alt={`${card.title} at GD Goenka Ayodhya`}
                      className="pw-exp-img"
                      loading="lazy"
                    />
                    <span className="pw-exp-tag">{card.tag}</span>
                  </div>

                  <div className="pw-exp-content">
                    <h3 className="pw-exp-title">{card.title}</h3>
                    <p className="pw-exp-desc">{card.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} />
    </div>
  );
}
