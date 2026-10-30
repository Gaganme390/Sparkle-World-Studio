import React, { useState, useEffect, useMemo } from 'react';
import { useSchoolData } from '../hooks/useSchoolData';
import { ArrowRight, Clock, Users, Sparkles, Atom, TrendingUp, Landmark, Award, BookOpen, Cpu, CheckCircle2 } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import FinalCTA from '../components/FinalCTA';
import './SeniorWingPage.css';

// Academic Streams for Senior Secondary (Grades 11 & 12)
const academicStreams = [
  {
    id: 'science',
    title: 'Science Stream',
    icon: Atom,
    desc: 'Cultivating analytical rigour, empirical investigation, and future-forward innovation for careers in engineering, medicine, and fundamental research.',
    subjects: ['Physics & Chemistry', 'Mathematics / Biology', 'Computer Science / Artificial Intelligence', 'Physical Education', 'JEE & NEET Integrated Guidance']
  },
  {
    id: 'commerce',
    title: 'Commerce Stream',
    icon: TrendingUp,
    desc: 'Empowering future business leaders, entrepreneurs, and economists with financial literacy, market acumen, and quantitative problem-solving.',
    subjects: ['Accountancy & Business Studies', 'Economics & Financial Markets', 'Applied Mathematics / Informatics Practices', 'Entrepreneurship & Case Studies', 'CUET, CA-Foundation & IPMAT Mentorship']
  },
  {
    id: 'humanities',
    title: 'Humanities & Liberal Arts',
    icon: Landmark,
    desc: 'Nurturing critical thinkers, policymakers, and creative communicators through profound inquiry into human society, law, and history.',
    subjects: ['Political Science & International Relations', 'Psychology & Sociology', 'History & Economics', 'Legal Studies & Fine Arts', 'CLAT, Civil Services & Liberal Arts Orientation']
  }
];

// Inspired Spaces & Advanced Laboratories for Senior Secondary Scholars (Exclusively Grades 9-12)
const inspiredSpaces = [
  {
    id: 'smart-classrooms',
    pageBadge: 'TECH-ENABLED LEARNING',
    title: 'Smart Classrooms',
    motto: 'Where Ideas Come Alive',
    desc: 'Bright, acoustically treated, centralized air-conditioned classrooms equipped with BenQ 4K interactive flat panels. Flexible collaborative seating arrangements encourage analytical debate, Socratic dialogues, and peer problem-solving across all senior secondary disciplines.',
    image: '/school-media/senior-wing/smart_classrooms.jpg'
  },
  {
    id: 'senior-library',
    pageBadge: 'RESEARCH & ARCHIVE',
    title: 'Senior Library & Archive',
    motto: 'Discover Worlds Beyond the Page',
    desc: 'A sophisticated academic sanctuary housing over 47,000 titles, national archives, and digital e-library databases. Senior scholars engage in independent research, literary criticism, university preparatory reading, and scholarly inquiry under dedicated faculty librarians.',
    image: '/school-media/senior-wing/senior_library.jpg'
  },
  {
    id: 'science-laboratories',
    pageBadge: 'ADVANCED SCIENCES',
    title: 'Science Laboratories',
    motto: 'Explore the Evidence, Understand the World',
    desc: 'Three purpose-built, CBSE-standard Physics, Chemistry, and Biology laboratories equipped with research-grade instruments, digital probes, and precision apparatus. Guided practicals develop rigorous scientific reasoning and empirical mastery essential for Board examinations and national entrance tests.',
    image: '/school-media/senior-wing/science_laboratories.jpg'
  },
  {
    id: 'mathematics-lab',
    pageBadge: 'MATHEMATICS EXPLORATION',
    title: 'Mathematics Exploration Lab',
    motto: 'Make Connections, Find Solutions',
    desc: 'Advanced visual manipulatives, computational algebra software, and geometric modeling apparatus help senior scholars bridge concrete theorems with abstract calculus, coordinate geometry, vectors, and statistical analysis.',
    image: '/school-media/senior-wing/mathematics_lab.jpg'
  },
  {
    id: 'computer-digital-centre',
    pageBadge: 'CODING & DIGITAL LITERACY',
    title: 'Computer & Digital Literacy Centre',
    motto: 'Think Critically, Create Responsibly',
    desc: 'High-speed computing lab equipped with modern multi-core workstations and high-speed fiber connectivity. Senior students master programming algorithms in Python and C++, relational databases, and responsible data science under experienced IT mentors.',
    image: '/school-media/senior-wing/computer_digital_centre.jpg'
  },
  {
    id: 'robotics-ai-lab',
    pageBadge: 'ROBOTICS & AI INNOVATION',
    title: 'Robotics and AI Lab',
    motto: 'Build with Imagination, Think with Intelligence',
    desc: 'Dedicated rapid prototyping and intelligent automation hub. Senior scholars design custom mechanisms with 3D printers, integrate microcontrollers, train neural models, and build autonomous systems for national competitions and STEM Olympiads.',
    image: '/school-media/senior-wing/robotics_ai_lab.jpg'
  }
];

export default function SeniorWingPage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  const { englishDigitalLab } = useSchoolData();
  const [activeNavSection, setActiveNavSection] = useState('overview');

  const displayInspiredSpaces = useMemo(() => {
    const list = [...inspiredSpaces];
    if (englishDigitalLab?.enabled !== false && englishDigitalLab?.showInSenior !== false) {
      const labCard = {
        id: 'english-digital-lab',
        pageBadge: englishDigitalLab?.badge || 'AI-POWERED LINGUISTICS & ORATORY',
        title: englishDigitalLab?.title || 'Digital English Language Lab',
        motto: englishDigitalLab?.motto || 'Phonetics, Fluent Oratory & Global Articulation',
        desc: englishDigitalLab?.seniorDesc || 'State-of-the-art multimedia phonetic booths, automated voice-modulation software, and oratory analysis suites preparing senior scholars for national debates, MUNs, IELTS/TOEFL, and global university interviews.',
        image: englishDigitalLab?.image || '/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg'
      };
      const mathIdx = list.findIndex(c => c.id === 'mathematics-lab');
      if (mathIdx !== -1) {
        list.splice(mathIdx + 1, 0, labCard);
      } else {
        list.push(labCard);
      }
    }
    return list;
  }, [englishDigitalLab]);


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'streams', 'robotics', 'spaces', 'prep'];
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
    <div className="senior-wing-page">
      {/* 1. Hero Collage Section (Page 23 of PDF 2) */}
      <section className="sw-hero-section">
        <div className="sw-hero-grid">
          {/* Collage Item 1: Science Lab */}
          <div className="sw-collage-img-wrap sw-img-lab">
            <img
              src="/school-media/senior-wing/science_laboratories.jpg"
              alt="Advanced science laboratory at GD Goenka Ayodhya"
              loading="eager"
            />
          </div>

          {/* Collage Item 2: Smart Classrooms */}
          <div className="sw-collage-img-wrap sw-img-classroom">
            <img
              src="/school-media/senior-wing/smart_classrooms.jpg"
              alt="Interactive smart classrooms for senior students"
              loading="eager"
            />
          </div>

          {/* Center Card (Page 23 Title Card) */}
          <div className="sw-hero-center-card">
            <span className="sw-hero-tag">GD GOENKA PUBLIC SCHOOL AYODHYA</span>
            <h1 className="sw-hero-title">SENIOR WING</h1>
            <p className="sw-hero-subtitle">Grades 9 – 12 & Inspired Spaces</p>

            <div className="sw-hero-pill-row">
              <span className="sw-pill">
                <Sparkles size={13} /> CBSE Senior Secondary
              </span>
              <span className="sw-pill">
                <Award size={13} /> Competitive Prep
              </span>
              <span className="sw-pill">
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
                onClick={() => onOpenEnquiry && onOpenEnquiry({
                  grade: 'Grades IX & XI (Senior Wing)',
                  stream: 'Science Stream',
                  subject: 'Senior Wing Admission Enquiry'
                })}
              >
                Inquire / Apply
              </button>
            </div>
          </div>

          {/* Collage Item 3: Senior Library */}
          <div className="sw-collage-img-wrap sw-img-library">
            <img
              src="/school-media/senior-wing/senior_library.jpg"
              alt="Senior research library and reading space"
              loading="lazy"
            />
          </div>

          {/* Collage Item 4: Robotics & AI Hub */}
          <div className="sw-collage-img-wrap sw-img-robotics">
            <img
              src="/school-media/senior-wing/robotics_ai_lab.jpg"
              alt="Robotics and AI innovation lab"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 2. Sticky Sub Navigation */}
      <nav className="sw-subnav-sticky" aria-label="Senior Wing In-Page Navigation">
        <div className="sw-subnav-container">
          <button 
            type="button"
            className={`sw-subnav-btn ${activeNavSection === 'overview' ? 'active' : ''}`} 
            onClick={() => scrollToSection('overview')}
          >
            OVERVIEW
          </button>
          <button 
            type="button"
            className={`sw-subnav-btn ${activeNavSection === 'streams' ? 'active' : ''}`} 
            onClick={() => scrollToSection('streams')}
          >
            ACADEMIC STREAMS
          </button>
          <button 
            type="button"
            className={`sw-subnav-btn ${activeNavSection === 'robotics' ? 'active' : ''}`} 
            onClick={() => scrollToSection('robotics')}
          >
            ROBOTICS & AI LAB
          </button>
          <button 
            type="button"
            className={`sw-subnav-btn ${activeNavSection === 'spaces' ? 'active' : ''}`} 
            onClick={() => scrollToSection('spaces')}
          >
            INSPIRED SPACES
          </button>
          <button 
            type="button"
            className={`sw-subnav-btn ${activeNavSection === 'prep' ? 'active' : ''}`} 
            onClick={() => scrollToSection('prep')}
          >
            COMPETITIVE PREP
          </button>
        </div>
      </nav>

      {/* 3. Overview Section */}
      <section id="overview" className="section-padding">
        <div className="container">
          <div className="sw-overview-grid">
            {/* Left Content */}
            <ScrollReveal direction="up">
              <div>
                <span className="sw-section-tag">Senior Wing • Grades 9 to 12</span>
                <h2 className="sw-overview-heading">
                  Intellectual Rigour, Leadership & Future Pathways
                </h2>

                <p className="sw-overview-lead">
                  The Senior Wing at GD Goenka School, Ayodhya, prepares young adults for leadership in higher education, research, and enterprise. Guided by the Central Board of Secondary Education (CBSE) curriculum and enriched with global pedagogical standards, our students cultivate critical analytical capability, intellectual discipline, and moral resilience.
                </p>

                <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--color-warm-gray-700)', marginBottom: '1.25rem' }}>
                  With specialized academic streams in Science, Commerce, and Humanities, cutting-edge laboratory infrastructure, and faculty mentors with proven track records in Board examinations and national entrance tests, our seniors are empowered to achieve their personal best.
                </p>

                <p style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--color-warm-gray-700)', marginBottom: '1.5rem' }}>
                  Dedicated university counseling, SAT/ACT orientation, CUET/JEE/NEET foundation modules, and extensive portfolio mentorship ensure each graduate steps confidently into premier Indian and international universities.
                </p>

                <div className="sw-timing-box">
                  <Clock className="sw-timing-icon" />
                  <div>
                    <div className="sw-timing-label">School Timings</div>
                    <div className="sw-timing-val">8:10 AM to 2:20 PM (Mentorship up to 3:30 PM)</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Featured Image */}
            <ScrollReveal direction="left" delay={0.15}>
              <div className="sw-overview-img-wrap">
                <img
                  src="/school-media/senior-wing/science_laboratories.jpg"
                  alt="GD Goenka Ayodhya Senior Science Laboratories"
                />
                <div className="sw-overview-badge">
                  <div className="sw-badge-title">Scientific Inquiry & Research</div>
                  <div className="sw-badge-sub">CBSE Senior Secondary Laboratory Excellence</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Academic Streams Section (Grades 11 & 12) */}
      <section id="streams" className="sw-streams-section section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
            <span className="sw-section-tag">Senior Secondary Specializations</span>
            <AnimatedText
              text="Academic Streams Calibrated for Distinction"
              className="section-title"
              style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)', marginBottom: '0.75rem' }}
            />
            <p style={{ color: 'var(--color-warm-gray-600)', fontSize: '1.05rem', margin: 0 }}>
              Tailored curriculum frameworks designed for academic mastery, university admissions, and national competitive examinations. Click any individual subject to inquire directly.
            </p>
          </div>

          <div className="sw-streams-grid">
            {academicStreams.map((stream) => {
              const IconComp = stream.icon;
              return (
                <div key={stream.id} className="sw-stream-card">
                  <div className="sw-stream-icon-box">
                    <IconComp size={26} />
                  </div>
                  <h3 className="sw-stream-title">{stream.title}</h3>
                  <p className="sw-stream-desc">{stream.desc}</p>

                  <div className="sw-stream-sublist-label">
                    <span>Subject Tracks & Electives:</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-accent, #b39759)' }}>Click to Inquire</span>
                  </div>

                  <ul className="sw-stream-sublist">
                    {stream.subjects.map((sub, i) => (
                      <li key={i} className="sw-stream-subitem-wrap">
                        <button
                          type="button"
                          className="sw-stream-subitem-btn"
                          onClick={() => onOpenEnquiry && onOpenEnquiry({
                            grade: 'Grades IX & XI (Senior Wing)',
                            stream: stream.title,
                            subject: sub
                          })}
                          title={`Inquire specifically for ${sub} (${stream.title})`}
                        >
                          <span className="sw-subitem-left">
                            <span className="sw-subitem-icon">✓</span>
                            <span>{sub}</span>
                          </span>
                          <span className="sw-subitem-action">Inquire →</span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: 'auto' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => onOpenEnquiry && onOpenEnquiry({
                        grade: 'Grades IX & XI (Senior Wing)',
                        stream: stream.title,
                        subject: `All ${stream.title} Core & Elective Subjects`
                      })}
                    >
                      <span>Inquire Full {stream.title}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4b. Robotics, AI & Advanced STEM Spotlight */}
      <section id="robotics" className="sw-robotics-section section-padding">
        <div className="container">
          <div className="sw-robotics-grid">
            <ScrollReveal direction="up">
              <div>
                <span className="sw-section-tag">FLAGSHIP INNOVATION HUB • GRADES 9 TO 12</span>
                <h2 className="sw-robotics-heading">
                  Robotics, Artificial Intelligence & Advanced STEM Innovation
                </h2>

                <p className="sw-robotics-lead">
                  Empowering senior scholars with real-world engineering, intelligent automation, and computational problem-solving.
                </p>

                <p className="sw-robotics-desc">
                  Our Senior School Robotics and AI Hub bridges CBSE conceptual curriculum with applied engineering. Scholars explore microcontroller architectures, sensor integration, Python and C++ algorithms, machine learning fundamentals, and computer vision—preparing them to lead in engineering olympiads, national hackathons, and premier global universities.
                </p>

                <div className="sw-robotics-highlights">
                  <div className="sw-robotics-hl-item">
                    <div className="sw-robotics-hl-title">
                      <Cpu size={16} color="var(--color-accent, #b39759)" /> Autonomous Systems & Microcontrollers
                    </div>
                    <p className="sw-robotics-hl-desc">
                      Arduino, Raspberry Pi, sensor integration, and intelligent circuit design.
                    </p>
                  </div>

                  <div className="sw-robotics-hl-item">
                    <div className="sw-robotics-hl-title">
                      <Sparkles size={16} color="var(--color-accent, #b39759)" /> Artificial Intelligence & ML Logic
                    </div>
                    <p className="sw-robotics-hl-desc">
                      Python coding, neural structures, data science, and responsible AI ethics.
                    </p>
                  </div>

                  <div className="sw-robotics-hl-item">
                    <div className="sw-robotics-hl-title">
                      <Award size={16} color="var(--color-accent, #b39759)" /> Olympiads & Hackathon Mentorship
                    </div>
                    <p className="sw-robotics-hl-desc">
                      Guided project incubation for national robotics leagues and STEM challenges.
                    </p>
                  </div>

                  <div className="sw-robotics-hl-item">
                    <div className="sw-robotics-hl-title">
                      <CheckCircle2 size={16} color="var(--color-accent, #b39759)" /> Rapid Prototyping & 3D Lab
                    </div>
                    <p className="sw-robotics-hl-desc">
                      Design thinking, CAD modeling, mechanical fabrication, and rapid iterations.
                    </p>
                  </div>
                </div>

                <MagneticButton>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onOpenEnquiry && onOpenEnquiry({
                      grade: 'Grades IX & XI (Senior Wing)',
                      stream: 'Robotics & STEM Hub',
                      subject: 'Robotics, AI & Advanced STEM Innovation'
                    })}
                  >
                    <span>Enquire About Robotics & AI</span>
                    <ArrowRight size={16} />
                  </button>
                </MagneticButton>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.15}>
              <div className="sw-robotics-img-wrap">
                <img
                  src="/school-media/facilities/robotics_and_ai_lab.jpg"
                  alt="GD Goenka Ayodhya Advanced Robotics and AI Innovation Lab"
                />
                <div className="sw-robotics-badge">
                  <div className="sw-robotics-badge-title">Robotics & AI Innovation Hub</div>
                  <div className="sw-robotics-badge-sub">Future Engineers & Technology Leaders</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Inspired Spaces Section (Pages 24 to 32 of PDF 2) */}
      <section id="spaces" className="sw-spaces-section section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
            <span className="sw-section-tag">INSPIRED SPACES</span>
            <AnimatedText
              text="World-Class Laboratories & Learning Environments"
              className="section-title"
              style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)', marginBottom: '0.75rem' }}
            />
            <p style={{ color: 'var(--color-warm-gray-600)', fontSize: '1.05rem', margin: 0 }}>
              Where curiosity meets possibility • Dedicated laboratories and learning environments.
            </p>
          </div>

          <div className="sw-spaces-grid">
            {displayInspiredSpaces.map((space) => (
              <div key={space.id} className="sw-space-card">
                <div className="sw-space-img-wrap">
                  <img src={space.image} alt={space.title} loading="lazy" />
                  <span className="sw-space-tag">{space.pageBadge}</span>
                </div>
                <div className="sw-space-body">
                  <h4 className="sw-space-title">{space.title}</h4>
                  <div className="sw-space-motto">{space.motto}</div>
                  <p className="sw-space-desc">{space.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Career Guidance & University Admissions Hub */}
      <section id="prep" className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, #0b1a38 0%, #123985 100%)',
              borderRadius: '20px',
              padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem)',
              color: '#FFFFFF',
              boxShadow: '0 24px 64px rgba(11, 26, 56, 0.25)'
            }}
          >
            <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
              <span
                style={{
                  display: 'inline-block',
                  color: 'var(--color-accent, #b39759)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                Career Readiness & Global Admissions
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display, "Polymath", serif)',
                  fontSize: 'clamp(2rem, 3.2vw, 2.85rem)',
                  fontWeight: 700,
                  marginBottom: '1.25rem',
                  color: '#FFFFFF',
                  lineHeight: 1.2
                }}
              >
                Paving the Path to Premier Global & Indian Universities
              </h2>
              <p
                style={{
                  fontSize: '1.08rem',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.88)',
                  marginBottom: '2rem'
                }}
              >
                Our Senior School academic ecosystem pairs subject mastery with structured preparation for national entrance examinations (JEE, NEET, CUET, CLAT) and international admissions (SAT, APs, profile mentoring).
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  justifyContent: 'center',
                  marginBottom: '2.5rem'
                }}
              >
                {[
                  '100% CBSE Pass Record across Goenka Network',
                  'Dedicated University Counseling Cell',
                  'Foundation Modules for JEE / NEET / CUET',
                  'Alumni Placements in Top Global Universities'
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--color-accent, #b39759)" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onOpenEnquiry && onOpenEnquiry({
                    grade: 'Grades IX & XI (Senior Wing)',
                    stream: 'Competitive Prep & Admissions Cell',
                    subject: 'JEE / NEET / CUET Foundation & Mentorship'
                  })}
                  style={{
                    backgroundColor: 'var(--color-accent, #b39759)',
                    color: '#0b1a38',
                    fontWeight: 700,
                    border: 'none',
                    padding: '0.85rem 2rem'
                  }}
                >
                  <span>Apply for Senior Secondary</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onOpenVisit && onOpenVisit()}
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    color: '#FFFFFF',
                    padding: '0.85rem 2rem'
                  }}
                >
                  Schedule Campus Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} />
    </div>
  );
}
