import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import FinalCTA from '../components/FinalCTA';
import './JuniorWingPage.css';

// Academics tab data directly from PDF 2 (Pages 4, 10, 11, 12)
const academicTabs = [
  {
    id: 'nursery',
    label: 'Nursery',
    gradeBadge: 'NURSERY PROGRAMME • AGE 3+',
    image: '/school-media/New Pages/Page 4/DSC00064.JPG',
    alt: 'Nursery child developing fine motor skills through purposeful wooden block play',
    title: 'Joyful & Meaningful First Step into Learning',
    paragraphs: [
      'At GD Goenka School, Ayodhya, our Nursery programme makes a child’s first experience of school joyful and meaningful. Through purposeful play, creative activities, and guided discovery, children develop the confidence to ask questions, express ideas, and explore the world around them.',
      'Phonics, picture books, and storytelling nurture early English language skills, while Hindi rhymes, songs, and conversations encourage children to listen and speak with confidence. Counting games, sorting, patterns, and hands-on activities introduce mathematical thinking through everyday experiences.',
      'Environmental learning invites children to discover nature, recognise their surroundings, and develop caring habits. Thoughtfully integrated technology enriches classroom experiences, alongside opportunities to create, move, share, and make friends—building a balanced foundation for future learning.'
    ],
    pillars: ['Purposeful Play & Exploration', 'Early Phonics & Storytelling', 'Mathematical Thinking Games', 'Environmental & Sensory Discovery']
  },
  {
    id: 'kindergarten',
    label: 'Kindergarten',
    gradeBadge: 'KINDERGARTEN PROGRAMME • AGE 4+',
    image: '/school-media/New Pages/Page 10/IMG20260916111422.jpg.jpeg',
    alt: 'Kindergarten children reading storybooks together at GD Goenka Ayodhya',
    title: 'Immersive Experiences & Purposeful Technology',
    paragraphs: [
      'Learning in Kindergarten at GD Goenka School, Ayodhya, combines immersive experiences with purposeful technology to develop language, literacy, numeracy, and environmental awareness. Each experience encourages children to think, imagine, and discover.',
      'Phonics, vocabulary, sentence formation, and early writing help children develop their English skills. Hands-on counting, comparison, and simple mathematical operations strengthen logical reasoning, while Environmental Studies encourages children to observe their surroundings and learn through discovery.',
      'Hindi activities introduce स्वर recognition and expand vocabulary, helping children express their thoughts with growing clarity and confidence in speaking and writing.'
    ],
    pillars: ['Immersive Literacy & Writing', 'Logical Reasoning & Numeracy', 'Bilingual Expression (English & Hindi)', 'Purposeful Educational Technology']
  },
  {
    id: 'grade1',
    label: 'Grade 1',
    gradeBadge: 'GRADE 1 CURRICULUM • AGE 5-6',
    image: '/school-media/New Pages/Page 11/IMG20260918101331.jpg.jpeg',
    alt: 'Grade 1 student engaged in writing and inquiry in bright classroom',
    title: 'Growing Independence & Inquiry Depth',
    paragraphs: [
      'Growing independence shapes the Grade 1 experience at GD Goenka School, Ayodhya. Number games and practical activities deepen children’s understanding of addition, subtraction, measurement, and other mathematical concepts while developing critical thinking and confident problem-solving.',
      'Experiments and inquiry bring the natural world into focus, encouraging students to ask questions, investigate, and learn from their discoveries.',
      'Hindi learning develops vocabulary, sentence formation, and expression through reading, writing, and speaking. In English, students strengthen fluency and their understanding of grammar, while storytelling, role-play, and public speaking help them communicate confidently.'
    ],
    pillars: ['Conceptual Problem Solving', 'Hands-on Scientific Experiments', 'Grammar & Fluency Mastery', 'Storytelling & Oratory Confidence']
  },
  {
    id: 'grade2',
    label: 'Grade 2',
    gradeBadge: 'GRADE 2 CURRICULUM • AGE 6-7',
    image: '/school-media/New Pages/Page 12/WhatsApp Image 2026-10-07 at 5.21.45 PM.jpeg',
    alt: 'Grade 2 students collaborating on creative paper craft and logic projects',
    title: 'Imagination, Originality & Global Citizenship',
    paragraphs: [
      'Story creation and writing give Grade 2 students at GD Goenka School, Ayodhya, opportunities to develop imagination, originality, and personal expression. Exploring fiction and non-fiction strengthens understanding, while continued grammar practice builds language proficiency.',
      'Mathematical learning involves solving problems, investigating questions, and interpreting and analysing data. Mental maths practice develops accuracy, speed, and critical thinking.',
      'Hindi activities strengthen comprehension, grammar, reading, and writing through sequencing and story composition. Hands-on Environmental Studies projects deepen students’ understanding of sustainability and conservation, encouraging them to become responsible global citizens.'
    ],
    pillars: ['Original Story Creation', 'Mental Maths & Data Interpretation', 'Bilingual Literature Sequencing', 'Sustainability & Global Citizenship']
  }
];

// 17 Sanctuaries of Discovery / Pedagogical Spaces for Junior Wing
const experienceCards = [
  {
    id: 'classroom',
    title: 'Classroom',
    tag: 'LEARNING ENVIRONMENT',
    desc: 'At GD Goenka School, Ayodhya, bright classrooms equipped with smart boards bring lessons to life, encouraging children to explore ideas, think creatively, and enjoy learning.',
    image: '/school-media/New Pages/Page 5/smart_classrooms_framed.jpg'
  },
  {
    id: 'library',
    title: 'Library',
    tag: 'READING CULTURE',
    desc: 'Our library helps children grow as readers through engaging stories, guided reading, and Hindi literature, strengthening language skills while introducing diverse perspectives and cultures.',
    image: '/school-media/New Pages/Page 5/library_framed.jpg'
  },
  {
    id: 'computer-center',
    title: 'Information and Computer Center',
    tag: 'DIGITAL LITERACY',
    desc: 'Students in Grades 1 and 2 discover computer basics, explore introductory coding, and develop safe digital habits through interactive activities suited to their age.',
    image: '/school-media/New Pages/Page 6/computer_literacy_framed.jpg'
  },
  {
    id: 'robotics',
    title: 'Robotics & STEM Discovery',
    tag: 'HANDS-ON INNOVATION',
    desc: 'Hands-on building and robotics activities introduce young learners to science, technology, engineering, and mathematics while developing early coding, logical thinking, and creative problem-solving.',
    image: '/school-media/facilities/robotics_and_ai_lab.jpg'
  },
  {
    id: 'tab-lab',
    title: 'Tab Lab',
    tag: 'EARLY TECH FLUENCY',
    desc: 'For Nursery and Kindergarten, guided tablet activities and phonics applications make early literacy and numeracy engaging, with opportunities to practise creative thinking and solve simple problems.',
    image: '/school-media/New Pages/Page 6/DSC07306.JPG'
  },
  {
    id: 'reggio',
    title: 'Reggio Learning Center',
    tag: 'SENSORY INQUIRY',
    desc: 'Inspired by the Reggio Emilia approach, our learning centre invites children to investigate, create, and express their ideas through natural materials, recycled resources, and rich sensory experiences.',
    image: '/school-media/New Pages/Page 6/reggio_discovery_framed.jpg'
  },
  {
    id: 'montessori',
    title: 'Montessori Learning Center',
    tag: 'SELF-PACED MASTERY',
    desc: 'Montessori Learning Centre encourages children to learn at their own pace through hands-on exploration. Carefully chosen materials and practical activities develop concentration, coordination, independence, and early language and number skills.',
    image: '/school-media/New Pages/Page 7/reggio_montessori_framed.jpg'
  },
  {
    id: 'dance',
    title: 'Dance',
    tag: 'EXPRESSION & RHYTHM',
    desc: 'At GD Goenka School, Ayodhya, dance gives children the freedom to express ideas and emotions through movement. Guided practice in different dance styles develops rhythm, coordination, creativity, and confidence, while group performances encourage teamwork.',
    image: '/school-media/New Pages/Page 7/DSC09769.JPG'
  },
  {
    id: 'music',
    title: 'Music',
    tag: 'MELODY & HARMONY',
    desc: 'Melody and rhythm through singing, instruments, and Indian and Western music. Listening, practising, and performing together develop musical expression, concentration, and teamwork, helping each child find confidence in their own sound.',
    image: '/school-media/New Pages/Page 8/DSC_3697.JPG'
  },
  {
    id: 'visual-arts',
    title: 'Visual Arts',
    tag: 'CREATIVE DISCOVERY',
    desc: 'Children explore drawing, painting, craft, and design as ways to express their own ideas. Experimenting with colours, textures, and materials develops observation, fine motor skills, and creative confidence.',
    image: '/school-media/New Pages/Page 8/DSC_3744.JPG'
  },
  {
    id: 'theatre',
    title: 'Theatre',
    tag: 'DRAMATIC CONFIDENCE',
    desc: 'Guided stage expression, role-play, and annual thematic presentations develop storytelling, vocal projection, empathy, and collaborative performance skills on grand auditoriums.',
    image: '/school-media/New Pages/Page 8/DSC_3859.JPG'
  },
  {
    id: 'wholesome-menu',
    title: 'Wholesome Dining & Nutrition',
    tag: 'NUTRITION & HYGIENE',
    desc: 'Healthy habits begin with everyday choices. Children learn to wash their hands before meals, handle food hygienically, and recognise nutritious options. Shared mealtimes encourage mindful eating, good table manners, and independence.',
    image: '/school-media/New Pages/Page 8/DSC_4798.JPG'
  },
  {
    id: 'transport',
    title: 'Transport',
    tag: 'SAFE & COMFORTABLE TRANSIT',
    desc: 'A comfortable journey sets the tone for a happy school day. Our air-conditioned transport at GD Goenka School, Ayodhya, combines planned routes with organised boarding and dispersal, helping children travel to and from school with ease.',
    image: '/school-media/New Pages/Page 9/full_IMG20260911103308.jpg'
  },
  {
    id: 'friday-fun',
    title: 'Friday Fun Assessment',
    tag: 'POSITIVE FORMATIVE EVALUATION',
    desc: 'Fridays bring a playful opportunity for children to share what they have learned. Through games, quizzes, storytelling, and hands-on tasks, teachers recognise each child’s progress and identify where further support is needed, making assessment an encouraging part of learning.',
    image: '/school-media/New Pages/Page 9/IMG20260911103308_assessment_framed.jpg'
  },
  {
    id: 'indoor-sports',
    title: 'Junior Indoor Sports Arena',
    tag: 'ACTIVE PLAY & COORDINATION',
    desc: 'Active play gives young children room to discover what they can do. Age-appropriate games in our Junior Indoor Sports Area build balance, coordination, and physical confidence while encouraging turn-taking and teamwork.',
    image: '/school-media/New Pages/Page 9/IMG20260916110800_sports_framed.jpg'
  },
  {
    id: 'gymnastics',
    title: 'Gymnastics and Movement Centre',
    tag: 'FLEXIBILITY & DISCIPLINE',
    desc: 'Strength, flexibility, and stamina develop through regular, guided activity. Our gymnasium encourages students to practise age-appropriate exercises, improve coordination, and build lasting fitness habits while learning discipline and physical wellbeing.',
    image: '/school-media/New Pages/Page 9/full_IMG20260916110800.jpg'
  },
  {
    id: 'public-speaking',
    title: 'Public Speaking Arena',
    tag: 'ORATORY CONFIDENCE',
    desc: 'Every child has something worth saying. Through storytelling, short speeches, and presentations, students at GD Goenka School, Ayodhya, learn to organise their thoughts, speak clearly, and connect with an audience with confidence.',
    image: '/school-media/New Pages/Page 9/IMG20260916111006_speech_framed.jpg'
  }
];

export default function JuniorWingPage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  const [activeTab, setActiveTab] = useState('nursery');
  const [activeNavSection, setActiveNavSection] = useState('overview');

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

  const scrollToSection = (sectionId) => {
    setActiveNavSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentAcademic = academicTabs.find(t => t.id === activeTab) || academicTabs[0];




  return (
    <main className="junior-wing-page" style={{ paddingTop: 'var(--header-height)' }}>
      
      {/* 1. Hero Collage Header (Page 2 of PDF 2) */}
      <section className="jw-hero-section">
        <div className="jw-hero-grid">
          {/* Collage Item 1: School Building */}
          <div className="jw-collage-img-wrap jw-img-building">
            <img 
              src="/school-media/New Pages/Page 2/DSC_2140.JPG" 
              alt="GD Goenka Public School Ayodhya campus architectural entrance" 
            />
          </div>

          {/* Collage Item 2: Play Center */}
          <div className="jw-collage-img-wrap jw-img-play">
            <img 
              src="/school-media/New Pages/Page 2/DSC00067.JPG" 
              alt="Kindergarten activity and discovery classroom" 
            />
          </div>

          {/* Collage Item 3: Stage Performance */}
          <div className="jw-collage-img-wrap jw-img-stage">
            <img 
              src="/school-media/New Pages/Page 2/DSC_2588.JPG" 
              alt="Junior children performing on annual theatre stage" 
            />
          </div>

          {/* Center Title Badge */}
          <div className="jw-hero-center-card">
            <span className="jw-hero-tag">FOUNDATIONAL EARLY YEARS</span>
            <h1 className="jw-hero-title">JUNIOR WING</h1>
            <p className="jw-hero-subtitle">Nursery – Grade 2</p>
            <div className="jw-hero-pill-row">
              <span className="jw-pill"><Clock size={14} /> 8:10 AM – 1:20 PM</span>
              <span className="jw-pill"><Users size={14} /> 1:10 Faculty Ratio</span>
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
                onClick={() => onOpenEnquiry && onOpenEnquiry('Junior Wing (Nursery-Grade 2)')}
              >
                Inquire / Apply
              </button>
            </div>
          </div>

          {/* Collage Item 4: Panda Play Area */}
          <div className="jw-collage-img-wrap jw-img-panda">
            <img 
              src="/school-media/New Pages/Page 2/DSC00051.JPG" 
              alt="Playful kindergarten comfort zone" 
            />
          </div>

          {/* Collage Item 5: Graduation Ceremony */}
          <div className="jw-collage-img-wrap jw-img-grad">
            <img 
              src="/school-media/New Pages/Page 2/DSC_2695.JPG" 
              alt="Junior Graduation and celebration ceremony" 
            />
          </div>

          {/* Collage Item 6: Krishna / Traditional Cultural Celebration */}
          <div className="jw-collage-img-wrap jw-img-krishna">
            <img 
              src="/school-media/New Pages/Page 2/DSC09774.JPG" 
              alt="Traditional values and cultural celebration at Ayodhya campus" 
            />
          </div>
        </div>
      </section>

      {/* 2. Sticky In-Page Sub Navigation */}
      <nav className="jw-subnav-sticky" aria-label="Junior Wing Sections">
        <div className="container jw-subnav-container">
          <button 
            className={`jw-subnav-btn ${activeNavSection === 'overview' ? 'active' : ''}`}
            onClick={() => scrollToSection('overview')}
          >
            OVERVIEW
          </button>
          <button 
            className={`jw-subnav-btn ${activeNavSection === 'academics' ? 'active' : ''}`}
            onClick={() => scrollToSection('academics')}
          >
            ACADEMICS
          </button>
          <button 
            className={`jw-subnav-btn ${activeNavSection === 'experience' ? 'active' : ''}`}
            onClick={() => scrollToSection('experience')}
          >
            INSPIRED SPACES
          </button>
        </div>
      </nav>

      {/* 3. Overview Section (Page 3 of PDF 2) */}
      <section className="jw-overview-section section-padding" id="overview">
        <div className="container">
          <div className="jw-overview-grid">
            
            <ScrollReveal variant="fadeRight" delay={0.1} className="jw-overview-text">
              <span className="jw-section-tag">JUNIOR WING OVERVIEW</span>
              <h2 className="jw-overview-heading">
                Where Joyful Explorations Form the Bedrock of Lifelong Learning
              </h2>
              
              <p className="jw-overview-lead">
                Our Junior Wing offers a nurturing, air-purified, compact nuclear campus with naturally-lit, tech-enabled classrooms and a 1:10 faculty-student ratio.
              </p>

              <p className="text-body" style={{ marginBottom: '1.25rem' }}>
                At GD Goenka Ayodhya, we focus on building strong foundations in reading, numeracy, and fitness through experiential, inquiry-led learning, while nurturing socio-emotional growth, confidence, and creativity. Annual shows inspired by timeless literature spark self-expression and a love for learning.
              </p>

              <p className="text-body" style={{ marginBottom: '2rem' }}>
                The campus is supported by GPS-tracked, exclusive junior school buses and wholesome, balanced meals served daily. At the heart of our primary education is the belief that every child deserves a joyful, enriching, and inspiring start to their learning journey.
              </p>

              <div className="jw-timing-box">
                <span className="jw-timing-icon"><Clock size={20} /></span>
                <div>
                  <strong style={{ display: 'block', color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>School Timings:</strong>
                  <span style={{ color: 'var(--color-warm-gray-800)', fontSize: '0.92rem' }}>8:10 AM to 1:20 PM</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" delay={0.2} className="jw-overview-media">
              <div className="jw-overview-img-frame">
                <img 
                  src="/school-media/New Pages/Page 3/DSC00046.JPG" 
                  alt="Child joyfully immersed in playful sensorial discovery at GD Goenka Ayodhya" 
                  className="jw-overview-img"
                />
                <span className="jw-media-badge">EXPERIENTIAL PLAY</span>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 4. Academics Tabbed Section (Pages 4, 10, 11, 12 of PDF 2) */}
      <section className="jw-academics-section section-padding theme-warm-soft" id="academics">
        <div className="container">
          <div className="jw-section-header">
            <span className="jw-section-tag">CURRICULUM BY STAGE</span>
            <h2 className="heading-section">Academics</h2>
            <p className="text-body" style={{ maxWidth: '640px', margin: '0.5rem auto 0' }}>
              GD Goenka Ayodhya foundational curriculum calibrated to Nursery, Kindergarten, Grade 1, and Grade 2 developmental milestones.
            </p>
          </div>

          {/* Grade Tabs */}
          <div className="jw-tabs-bar">
            {academicTabs.map(tab => (
              <button
                key={tab.id}
                className={`jw-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Content Display (Unified with Primary & Middle Wing Architecture) */}
          <div className="jw-tab-content-grid">
            {/* Left Content */}
            <div key={currentAcademic.id} style={{ animation: 'fadeIn 0.35s ease' }}>
              <span className="jw-grade-badge">{currentAcademic.gradeBadge}</span>
              <h3 className="jw-tab-title">{currentAcademic.title}</h3>
              
              {currentAcademic.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="jw-tab-paragraph">{p}</p>
              ))}

              <div style={{ marginTop: '1.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {currentAcademic.pillars && currentAcademic.pillars.map((pillar, i) => (
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
                    onClick={() => onOpenEnquiry && onOpenEnquiry(`Junior Wing - ${currentAcademic.label}`)}
                  >
                    <span>Apply for {currentAcademic.label}</span>
                    <ArrowRight size={16} />
                  </button>
                </MagneticButton>
              </div>
            </div>

            {/* Right Tab Image Card */}
            <div>
              <div className="jw-tab-img-card">
                <img 
                  src={currentAcademic.image} 
                  alt={currentAcademic.alt} 
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Spaces that Inspire Section */}
      <section className="jw-experience-section section-padding" id="experience">
        <div className="container">
          <div className="jw-section-header">
            <span className="jw-section-tag">INSPIRED SPACES</span>
            <h2 className="heading-section">Spaces that Inspire</h2>
            <p className="jw-exp-lead-subtitle">
              Where curiosity meets possibility.
            </p>
          </div>

          <div className="jw-experience-cards-grid">
            {experienceCards.map((card, idx) => (
              <ScrollReveal 
                key={card.id} 
                variant="fadeUp" 
                delay={0.06 * (idx % 3)}
                className="jw-exp-card-wrap"
              >
                <div className="jw-exp-card">
                  <div className="jw-exp-visual">
                    <img 
                      src={card.image} 
                      alt={`${card.title} at GD Goenka Ayodhya`} 
                      className="jw-exp-img"
                      loading="lazy"
                    />
                    <span className="jw-exp-tag">{card.tag}</span>
                  </div>

                  <div className="jw-exp-content">
                    <h3 className="jw-exp-title">{card.title}</h3>
                    <p className="jw-exp-desc">{card.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />

    </main>
  );
}
