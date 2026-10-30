import React, { useState, useEffect, useMemo } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { ArrowRight, Clock, Users, Sparkles, Globe2, Cpu, Trophy, Mic2, Compass, Layers } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import FinalCTA from '../components/FinalCTA';
import './MiddleWingPage.css';

// Academics tab data directly from PDF 2 (Pages 20, 21, 22)
const middleAcademicTabs = [
  {
    id: 'grade6',
    label: 'Grade 6',
    gradeBadge: 'GRADE 6 • EXPANDING HORIZONS',
    image: '/school-media/New Pages/Page 20/WhatsApp Image 2026-10-07 at 5.28.59 PM.jpeg',
    alt: 'Grade 6 students conducting scientific experiments and data recording in Ayodhya modern laboratory',
    title: 'Deeper Subject Exploration & Multiple Intelligences',
    paragraphs: [
      'Grade 6 at GD Goenka School, Ayodhya, opens new opportunities to explore subjects in greater depth and connect learning with life beyond the classroom. Arithmetic, algebra, and geometry help students apply Mathematics to everyday problems. Practical experiments introduce concepts in Life Sciences, Physics, and Chemistry. Storytelling, public speaking, and discussions of literature strengthen English communication, while projects and debates explore ancient civilisations, geography, and civic life in Social Studies.',
      'Designed to accommodate multiple intelligences and varied learning styles, the curriculum offers different ways to engage and express understanding. From writing scripts in language lessons to investigating environmental concerns in Science, students recognise connections, develop independent thinking, and communicate their ideas confidently.'
    ],
    pillars: ['Life Sciences & Physics Experiments', 'Algebra & Geometry Foundations', 'Literary Debates & Script Writing', 'Multiple Intelligence Modules']
  },
  {
    id: 'grade7',
    label: 'Grade 7',
    gradeBadge: 'GRADE 7 • CRITICAL INQUIRY',
    image: '/school-media/New Pages/Page 21/WhatsApp Image 2026-10-07 at 5.30..jpeg',
    alt: 'Grade 7 student engaged in collaborative project research and analysis',
    title: 'Critical Examination & Interdisciplinary Inquiry',
    paragraphs: [
      'Deeper inquiry, practical application, and connections between subjects shape Grade 7 learning at GD Goenka School, Ayodhya. Creative writing, group discussions, dramatisation, and purposeful reading strengthen English comprehension and expression. Algebra, geometry, and data handling develop mathematical understanding through everyday problem-solving.',
      'Laboratory experiments and field studies connect scientific theory with the physical world. Social Science develops understanding of history, geography, and civic structures, encouraging students to examine events and patterns critically.',
      'Classroom instruction combines with practical activities, field trips, collaborative projects, and integrated technology to make learning active, relevant, and driven by curiosity. Physical Education, art, music, and value education support discipline, a broader perspective, and balanced development.'
    ],
    pillars: ['Scientific Field Studies & Labs', 'Data Handling & Problem Solving', 'Civic Structures & World History', 'Dramatisation & Creative Writing']
  },
  {
    id: 'grade8',
    label: 'Grade 8',
    gradeBadge: 'GRADE 8 • SENIOR TRANSITION',
    image: '/school-media/middle-wing/grade8_photo.jpg',
    alt: 'Grade 8 students in technology and advanced learning session preparing for senior curriculum',
    title: 'Bridge to Senior School & Clear Conceptual Mastery',
    paragraphs: [
      'Grade 8 at GD Goenka School, Ayodhya, prepares learners for the transition to senior school and its more demanding academic expectations.',
      'English and Hindi are compulsory, alongside a third-language choice of Spanish, French, German, or Sanskrit. Mathematics, Science, Social Science, and Computer Studies focus on building clear and secure conceptual understanding.',
      'A structured approach works alongside inquiry, encouraging students to question, analyse, collaborate, and explore beyond their textbooks. Spoken English practice and group discussions develop clear expression and confidence.',
      'Integrated technology, competency-focused activities, and project-based learning strengthen adaptability, independence, and problem-solving, creating a solid foundation for senior school and future learning.'
    ],
    pillars: ['Third Language Choice (French/German/Sanskrit)', 'Rigorous Conceptual Preparation', 'Project-Based Competency Learning', 'Senior Secondary Bridge Seminars']
  }
];

// Middle Wing Experience Goenka Cards (Pages 18 to 22 of PDF 2)
const middleExperienceCards = [
  {
    id: 'mun',
    title: 'Model United Nations (MUN)',
    tag: 'GLOBAL DIPLOMACY',
    desc: 'Simulated diplomatic assemblies train middle school delegates in international relations, parliamentary debate, treaty drafting, and global crisis management.',
    image: '/school-media/New Pages/Page 18/WhatsApp Image 2026-10-07 at 5.29.00 PM (1).jpeg'
  },
  {
    id: 'ai-robotics',
    title: 'Artificial Intelligence & Robotics',
    tag: 'FUTURE TECH & AUTOMATION',
    desc: 'Structured hands-on modules in Python fundamentals, microcontroller programming, sensor integration, and intelligent automation cultivate true engineering curiosity.',
    image: '/school-media/New Pages/Page 18/WhatsApp Image 2026-10-07 at 5.29.01 PM (1).jpeg'
  },
  {
    id: 'sports-academy',
    title: 'Competitive Sports & Aquatics',
    tag: 'ATHLETIC EXCELLENCE',
    desc: 'Semi-Olympic swimming pool, taekwondo, badminton courts, turf cricket pitches, and professional coaches develop physical endurance, discipline, and sportsmanship.',
    image: '/school-media/New Pages/Page 18/WhatsApp Image 2026-10-07 at 5.28.55 PM (1).jpeg'
  },
  {
    id: 'visual-media',
    title: 'Design Studio & Visual Arts Gallery',
    tag: 'CREATIVE MASTERY',
    desc: 'Mastery over canvas painting, printmaking, digital graphic design, and sculpting encourages students to express unique perspectives and build rich creative portfolios.',
    image: '/school-media/New Pages/Page 18/WhatsApp Image 2026-10-07 at 5.28.55 PM.jpeg'
  },
  {
    id: 'debating',
    title: 'Oratory & Rhetoric Society',
    tag: 'PUBLIC SPEAKING',
    desc: 'Regular inter-house parliamentary debates, extempore speech festivals, and literary symposiums hone persuasive rhetoric and articulate public speaking.',
    image: '/school-media/New Pages/Page 19/WhatsApp Image 2026-10-07 at 5.28.56 PM (1).jpeg'
  },
  {
    id: 'stem-expeditions',
    title: 'STEM Expeditions & Science Olympiads',
    tag: 'EXPERIMENTAL SCIENCE',
    desc: 'Mentored preparation for national science olympiads, environmental field excursions, and collaborative research exhibitions foster a scientific temperament.',
    image: '/school-media/New Pages/Page 20/WhatsApp Image 2026-10-07 at 5.29.02 PM.jpeg'
  },
  {
    id: 'digital-centre',
    title: 'Computer & Digital Literacy Centre',
    tag: 'DIGITAL CITIZENSHIP',
    desc: 'State-of-the-art computer workstations and high-speed fiber connectivity support structured modules in web development, spreadsheets, presentations, and cyber hygiene.',
    image: '/school-media/facilities/computer_and_digital_literacy_centre.jpg'
  },
  {
    id: 'martial-arts',
    title: 'Martial Arts & Taekwondo Arena',
    tag: 'DISCIPLINE & DEFENSE',
    desc: 'Dedicated dojo with expert martial arts senseis developing physical self-defense, internal poise, flexibility, and unwavering mental focus.',
    image: '/school-media/New Pages/Page 19/middle_wing_landscape.jpg'
  }
];

export default function MiddleWingPage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  const { englishDigitalLab } = useSchoolData();
  const [activeTabId, setActiveTabId] = useState('grade6');
  const [activeNavSection, setActiveNavSection] = useState('overview');
  const activeTab = middleAcademicTabs.find((t) => t.id === activeTabId) || middleAcademicTabs[0];

  const displayMiddleCards = useMemo(() => {
    const list = [...middleExperienceCards];
    if (englishDigitalLab?.enabled !== false && englishDigitalLab?.showInMiddle !== false) {
      const labCard = {
        id: 'english-digital-lab',
        title: englishDigitalLab?.title || 'Digital English Language Lab',
        tag: englishDigitalLab?.badge || 'ORATORY & COMMUNICATIVE FLUENCY',
        desc: englishDigitalLab?.middleDesc || 'Interactive language workstations with audio headsets, Lexile-graded comprehension, vocabulary expansion, and simulated debate modules developing persuasive public speaking and bilingual fluency.',
        image: englishDigitalLab?.image || '/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg'
      };
      const debatingIdx = list.findIndex(c => c.id === 'debating');
      if (debatingIdx !== -1) {
        list.splice(debatingIdx, 0, labCard);
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
    <div className="middle-wing-page">
      {/* 1. Hero Collage Section (Page 18 of PDF 2) */}
      <section className="mw-hero-section">
        <div className="mw-hero-grid">
          {/* Collage Item 1: Swimming & Sports */}
          <div className="mw-collage-img-wrap mw-img-swim">
            <img
              src="/school-media/New Pages/Page 18/WhatsApp Image 2026-10-07 at 5.28.55 PM (1).jpeg"
              alt="Middle wing swimming and competitive sports"
              loading="eager"
            />
          </div>

          {/* Collage Item 2: Technology & Language Lab */}
          <div className="mw-collage-img-wrap mw-img-tech">
            <img
              src="/school-media/New Pages/Page 18/WhatsApp Image 2026-10-07 at 5.29.00 PM (1).jpeg"
              alt="Middle wing computer lab and multimedia workstation"
              loading="eager"
            />
          </div>

          {/* Center Card (Page 18 Title Card) */}
          <div className="mw-hero-center-card">
            <span className="mw-hero-tag">GD GOENKA PUBLIC SCHOOL AYODHYA</span>
            <h1 className="mw-hero-title">MIDDLE WING</h1>
            <p className="mw-hero-subtitle">Grades 6 – 8</p>

            <div className="mw-hero-pill-row">
              <span className="mw-pill">
                <Sparkles size={13} /> Discovering Strengths
              </span>
              <span className="mw-pill">
                <Users size={13} /> 1:18 Faculty Ratio
              </span>
              <span className="mw-pill">
                <Clock size={13} /> 8:10 AM – 2:20 PM
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
                onClick={() => onOpenEnquiry && onOpenEnquiry('Middle Wing (Grades 6-8)')}
              >
                Inquire / Apply
              </button>
            </div>
          </div>

          {/* Collage Item 3: Visual Arts & Gallery */}
          <div className="mw-collage-img-wrap mw-img-art">
            <img
              src="/school-media/New Pages/Page 18/WhatsApp Image 2026-10-07 at 5.28.55 PM.jpeg"
              alt="Visual arts and painting studio"
              loading="lazy"
            />
          </div>

          {/* Collage Item 4: Robotics & Coding Workstation */}
          <div className="mw-collage-img-wrap mw-img-robotics">
            <img
              src="/school-media/New Pages/Page 18/WhatsApp Image 2026-10-07 at 5.29.01 PM (1).jpeg"
              alt="Middle school student coding robotics modules"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 2. Sticky Sub Navigation */}
      <nav className="mw-subnav-sticky" aria-label="Middle Wing In-Page Navigation">
        <div className="mw-subnav-container">
          <button 
            type="button"
            className={`mw-subnav-btn ${activeNavSection === 'overview' ? 'active' : ''}`} 
            onClick={() => scrollToSection('overview')}
          >
            OVERVIEW
          </button>
          <button 
            type="button"
            className={`mw-subnav-btn ${activeNavSection === 'academics' ? 'active' : ''}`} 
            onClick={() => scrollToSection('academics')}
          >
            ACADEMICS
          </button>
          <button 
            type="button"
            className={`mw-subnav-btn ${activeNavSection === 'experience' ? 'active' : ''}`} 
            onClick={() => scrollToSection('experience')}
          >
            INSPIRED SPACES
          </button>
        </div>
      </nav>

      {/* 3. Overview Section (Page 19 of PDF 2) */}
      <section id="overview" className="section-padding">
        <div className="container">
          <div className="mw-overview-grid">
            {/* Left Content */}
            <ScrollReveal direction="up">
              <div>
                <span className="mw-section-tag">Middle Wing • Grades 6 to 8</span>
                <h2 className="mw-overview-heading">
                  Discovering Strengths, Developing Identity
                </h2>

                <p className="mw-overview-lead">
                  The Middle Wing at GD Goenka School, Ayodhya, deepens core understanding through interactive lessons, connections across subjects, and project work. Students learn to question thoughtfully, think critically, and work effectively with others.
                </p>

                <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--color-warm-gray-700)', marginBottom: '1.25rem' }}>
                  Structured modules in coding, design thinking, artificial intelligence concepts, and robotics develop technological understanding while encouraging innovation and problem-solving. Clubs, leadership opportunities, and electives such as Model UN, STEM clubs, and social science expeditions support personal growth and teamwork.
                </p>

                <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--color-warm-gray-700)', marginBottom: '1.5rem' }}>
                  Theatre, art, music, and sports remain central to school life, giving students opportunities to discover their interests and develop their individual strengths.
                </p>

                <div className="mw-timing-box">
                  <Clock className="mw-timing-icon" />
                  <div>
                    <div className="mw-timing-label">School Timings</div>
                    <div className="mw-timing-val">8:10 AM to 2:20 PM</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Featured Image */}
            <ScrollReveal direction="left" delay={0.15}>
              <div className="mw-overview-img-wrap">
                <img
                  src="/school-media/New Pages/Page 19/middle_wing_landscape.jpg"
                  alt="GD Goenka Ayodhya Middle Wing Students in collaborative campus activity"
                />
                <div className="mw-overview-badge">
                  <div className="mw-badge-title">Empowered Learners</div>
                  <div className="mw-badge-sub">Critical Inquiry & Identity Formation</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Academics Section (Pages 20, 21, 22 of PDF 2) */}
      <section id="academics" className="mw-academics-section section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem' }}>
            <span className="mw-section-tag">Middle School Academic Curriculum</span>
            <AnimatedText
              text="From Knowledge Acquisition to Intellectual Inquiry"
              className="section-title"
              style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)', marginBottom: '0.75rem' }}
            />
            <p style={{ color: 'var(--color-warm-gray-600)', fontSize: '1.05rem', margin: 0 }}>
              Discover how Grades 6, 7, and 8 connect conceptual theory with laboratory investigation and cross-disciplinary projects.
            </p>
          </div>

          {/* Grade Selector Tabs */}
          <div className="mw-academics-tabs-nav">
            {middleAcademicTabs.map((tab) => (
              <button
                key={tab.id}
                className={`mw-tab-btn ${activeTabId === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="mw-tab-content-grid">
            {/* Left Content */}
            <div key={activeTab.id} style={{ animation: 'fadeIn 0.35s ease' }}>
              <span className="mw-grade-badge">{activeTab.gradeBadge}</span>
              <h3 className="mw-tab-title">{activeTab.title}</h3>

              {activeTab.paragraphs.map((p, idx) => (
                <p key={idx} className="mw-tab-paragraph">
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
                    onClick={() => onOpenEnquiry && onOpenEnquiry(`Middle Wing - ${activeTab.label}`)}
                  >
                    <span>Apply for {activeTab.label}</span>
                    <ArrowRight size={16} />
                  </button>
                </MagneticButton>
              </div>
            </div>

            {/* Right Tab Image */}
            <div>
              <div className="mw-tab-img-card">
                <img src={activeTab.image} alt={activeTab.alt} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Spaces that Inspire Section */}
      <section className="mw-experience-section section-padding" id="experience">
        <div className="container">
          <div className="mw-section-header">
            <span className="mw-section-tag">INSPIRED SPACES</span>
            <h2 className="heading-section">Spaces that Inspire</h2>
            <p className="mw-exp-lead-subtitle">
              Where curiosity meets possibility.
            </p>
          </div>

          <div className="mw-experience-cards-grid">
            {displayMiddleCards.map((card, idx) => (
              <ScrollReveal
                key={card.id}
                variant="fadeUp"
                delay={0.06 * (idx % 2)}
                className="mw-exp-card-wrap"
              >
                <div className="mw-exp-card">
                  <div className="mw-exp-visual">
                    <img
                      src={card.image}
                      alt={`${card.title} at GD Goenka Ayodhya`}
                      className="mw-exp-img"
                      loading="lazy"
                    />
                    <span className="mw-exp-tag">{card.tag}</span>
                  </div>

                  <div className="mw-exp-content">
                    <h3 className="mw-exp-title">{card.title}</h3>
                    <p className="mw-exp-desc">{card.desc}</p>
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
