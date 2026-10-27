import React, { useState } from 'react';
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import FinalCTA from '../components/FinalCTA';
import './InspiredSpacesPage.css';

export const inspiredSpacesList = [
  {
    id: 'smart-classrooms',
    category: 'Classrooms',
    title: 'Smart Classrooms',
    motto: 'Where Ideas Come Alive',
    tag: 'GD Goenka School, Ayodhya • Nursery to Grade 12',
    image: '/school-media/facilities/smart_classrooms.jpg',
    alt: 'Teacher writing on interactive flat panel display in bright, spacious smart classroom',
    desc: 'Bright, spacious, air-conditioned classrooms create an inviting setting for learning. Interactive digital resources bring lessons to life, while discussion, collaboration, and independent work encourage students to question, understand, and express their ideas. Learning experiences evolve with each stage, from early discovery to deeper academic exploration in senior secondary classes.',
    highlights: [
      'BenQ 4K Interactive Flat Panels',
      'Centralised Air-Conditioning & HEPA Purifiers',
      'Flexible Ergonomic Collaborative Seating',
      'Campus-Wide High-Speed Wi-Fi'
    ]
  },
  {
    id: 'library',
    category: 'Library',
    title: 'Library',
    motto: 'Discover Worlds Beyond the Page',
    tag: 'GD Goenka School, Ayodhya • Nursery to Grade 12',
    image: '/school-media/facilities/library.jpg',
    alt: 'Children reading together inside the vibrant, sunlit school library',
    desc: 'A welcoming space for curious minds, our library connects students with stories, literature, science, history, and reference resources. Younger children discover the joy of reading, while older learners explore diverse perspectives and develop research skills. Guided reading and independent inquiry support academic growth and a lasting relationship with books.',
    highlights: [
      'Collins Big Cat Reading Series for Lexile Growth',
      'Rich Hindi Literature from Ektara & Pratham',
      '47,000+ Curated Titles & Digital E-Library',
      'Annual Reader of the Year Program'
    ]
  },
  {
    id: 'science-laboratories',
    category: 'Laboratories',
    title: 'Science Laboratories',
    motto: 'Explore the Evidence, Understand the World',
    tag: 'GD Goenka School, Ayodhya • Nursery to Grade 12',
    image: '/school-media/facilities/science_laboratories.jpg',
    alt: 'Students conducting chemistry and biology experiments in modern science lab',
    desc: 'Practical investigation brings scientific concepts into focus. Age-appropriate activities introduce younger learners to observation and experimentation, while advanced work in Physics, Chemistry, and Biology develops deeper understanding in higher classes. Guided experiments help students connect theory with evidence, analyse results, and apply scientific reasoning.',
    highlights: [
      'Three Dedicated Labs: Physics, Chemistry & Biology',
      '100% CBSE Safety Protocol Compliant',
      'Precision Balances, Microscopes & Reagents',
      'Faculty-Guided Empirical Research'
    ]
  },
  {
    id: 'digital-learning-lab',
    category: 'Digital Labs',
    title: 'Digital Learning Lab',
    motto: 'New Ways to Explore and Understand',
    tag: 'GD Goenka School, Ayodhya • Nursery to Grade 12',
    image: '/school-media/facilities/digital_learning_lab.jpg',
    alt: 'Students interacting with self-paced educational applications on tablets',
    desc: 'Interactive visuals and guided tablet activities make learning engaging and responsive to students\' needs. Early learners practise literacy, numeracy, and creative thinking through educational applications. As students progress, digital investigations, data collection, and analysis support increasingly complex learning across subjects.',
    highlights: [
      'Individual High-Res Learning Tablets',
      'Interactive 3D Visualisations & Simulations',
      'Adaptive Literacy & Numeracy Software',
      'Self-Paced Experimental Data Collection'
    ]
  },
  {
    id: 'mathematics-exploration-lab',
    category: 'Laboratories',
    title: 'Mathematics Exploration Lab',
    motto: 'Make Connections, Find Solutions',
    tag: 'GD Goenka School, Ayodhya • Nursery to Grade 12',
    image: '/school-media/facilities/mathematics_exploration_lab.jpg',
    alt: 'Tactile mathematical manipulatives and hands-on geometry models',
    desc: 'Hands-on exploration helps students see the meaning behind mathematical ideas. Visual aids, models, and practical tools support understanding of numbers, patterns, shapes, and relationships. Progressively challenging investigations encourage learners to reason carefully, compare methods, and apply concepts with confidence.',
    highlights: [
      'Concrete Manipulatives & Geometry Solids',
      'Convergent & Divergent Thinking Puzzles',
      'Algebraic Identity & Trigonometric Kits',
      'Visual Concept Modeling for All Grades'
    ]
  },
  {
    id: 'computer-digital-literacy',
    category: 'Digital Labs',
    title: 'Computer and Digital Literacy Centre',
    motto: 'Think Critically, Create Responsibly',
    tag: 'GD Goenka School, Ayodhya • Nursery to Grade 12',
    image: '/school-media/facilities/computer_and_digital_literacy_centre.jpg',
    alt: 'Students seated at workstations in the Information and Computer Centre',
    desc: 'Digital learning develops from basic computer operations and safe internet habits to coding, presentations, spreadsheets, and research. In higher classes, students deepen their understanding of computing and explore emerging technologies, including artificial intelligence. Throughout their journey, thoughtful technology use strengthens creativity, problem-solving, and responsible digital citizenship.',
    highlights: [
      'High-Speed Modern Computing Workstations',
      'Visual Coding, Python & Algorithmic Logic',
      'Digital Citizenship & Cyber Safety Tracks',
      'Emerging Tech & AI Literacy Modules'
    ]
  },
  {
    id: 'reggio-discovery-centre',
    category: 'Early Childhood',
    title: 'Reggio Discovery Centre',
    motto: 'Where Curiosity Finds Expression',
    tag: 'GD Goenka School, Ayodhya • Nursery to Grade 12',
    image: '/school-media/facilities/reggio_discovery_centre.jpg',
    alt: 'Reggio Discovery Centre natural exploration stations with tactile textures',
    desc: 'For our youngest learners, questions become starting points for hands-on discovery. Natural elements, recycled materials, and sensory resources invite children to investigate, create, and share their thinking. Our Reggio-inspired environment supports classroom learning while encouraging imagination and meaningful exploration.',
    highlights: [
      'Environment as the Third Teacher',
      'Natural & Recycled Sensory Textures',
      'Inquiry-Led Hands-on Exploration Stations',
      'Expressive Arts & Observation Easels'
    ]
  },
  {
    id: 'montessori-learning-centre',
    category: 'Early Childhood',
    title: 'Montessori Learning Centre',
    motto: 'Small Discoveries, Growing Independence',
    tag: 'GD Goenka School, Ayodhya • Nursery to Grade 12',
    image: '/school-media/facilities/montessori_learning_centre.jpg',
    alt: 'Montessori Learning Centre sensory apparatus and tactile materials',
    desc: 'Carefully designed materials help young children learn through touch, movement, and practical experience. Exploration at an individual pace develops concentration, coordination, fine motor skills, and early academic understanding. Each achievement encourages independence and builds confidence for future learning.',
    highlights: [
      'Self-Correcting Sensorial Apparatus',
      'Individual Pace & Self-Regulation',
      'Fine Motor Coordination & Tactile Touch',
      'Strong Foundational Literacy & Numeracy'
    ]
  },
  {
    id: 'robotics-and-ai-lab',
    category: 'Laboratories',
    title: 'Robotics and AI Lab',
    motto: 'Build with Imagination, Think with Intelligence',
    tag: 'GD Goenka School, Ayodhya • Nursery to Grade 12',
    image: '/school-media/facilities/robotics_and_ai_lab.jpg',
    alt: 'Students building and coding robotics hardware and 3D printing components',
    desc: 'Curiosity meets technology as students explore robotics, coding, and the foundations of artificial intelligence. Guided projects introduce sensors, automation, and intelligent systems, helping learners understand how machines respond to instructions and use information. From playful construction to progressively challenging design tasks, age-appropriate experiences develop logical thinking, creativity, and problem-solving. Students build, programme, test, and refine their ideas while learning to approach emerging technologies thoughtfully and responsibly.',
    highlights: [
      'Rapid Prototyping 3D Printers',
      'LEGO STEM Kits for Early Hands-On Mechanics',
      'Sensor Integration, Automation & Wireless Control',
      'Hands-On Algorithm Design & Hardware Coding'
    ]
  }
];

const categoryFilters = [
  { id: 'all', label: 'All 9 Spaces' },
  { id: 'Classrooms', label: 'Classrooms' },
  { id: 'Library', label: 'Library' },
  { id: 'Laboratories', label: 'Science & Math Labs' },
  { id: 'Digital Labs', label: 'Digital & Computing' },
  { id: 'Early Childhood', label: 'Early Learning Centres' }
];

export default function InspiredSpacesPage({ onOpenVisit, onOpenEnquiry, setCurrentRoute }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSpaces = activeCategory === 'all' 
    ? inspiredSpacesList 
    : inspiredSpacesList.filter(s => s.category === activeCategory);

  return (
    <main className="inspired-spaces-page" style={{ paddingTop: 'var(--header-height, 80px)' }}>
      
      {/* =========================================================================
          1. Editorial Header Banner (Matching PDF 2 Flagship Standard)
          ========================================================================= */}
      <section className="isp-editorial-hero">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <div className="isp-hero-tag-wrap">
              <span className="isp-hero-brand-tag">
                GD GOENKA AYODHYA • SANCTUARIES OF DISCOVERY
              </span>
            </div>
          </ScrollReveal>

          <AnimatedText 
            as="h1"
            className="isp-hero-main-title"
            text="INSPIRED SPACES FOR FUTURE-READY MINDS"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="isp-hero-main-lead">
              Step inside our 9 state-of-the-art academic sanctuaries. Designed in harmony with 
              the progressive vision of NEP 2020, each space transforms theoretical study into 
              hands-on experimentation, artistic joy, and empirical mastery.
            </p>

            {/* Quick Metrics Pills */}
            <div className="isp-hero-stats-row">
              <span className="isp-stat-pill">
                <Sparkles size={14} className="isp-stat-icon" /> 9 Specialized Learning Sanctuaries
              </span>
              <span className="isp-stat-pill">
                <CheckCircle2 size={14} className="isp-stat-icon" /> Nursery to Grade 12 Continuity
              </span>
              <span className="isp-stat-pill">
                <CheckCircle2 size={14} className="isp-stat-icon" /> Centralized Air-Purified Campus
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          2. Category Sticky Filter Tabs
          ========================================================================= */}
      <div className="isp-filter-sticky-bar">
        <div className="container">
          <div className="isp-filter-tabs">
            {categoryFilters.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`isp-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. The 9 Inspired Spaces List (Matching PDF 2 Design)
          ========================================================================= */}
      <section className="isp-spaces-container">
        <div className="container">
          <div className="isp-spaces-stack">
            {filteredSpaces.map((space, index) => {
              const isEven = index % 2 === 1;

              return (
                <article 
                  key={space.id} 
                  id={space.id}
                  className={`isp-space-article ${isEven ? 'reverse' : ''}`}
                >
                  {/* Photo Column */}
                  <div className="isp-space-media-col">
                    <ScrollReveal variant={isEven ? 'fadeLeft' : 'fadeRight'} delay={0.15}>
                      <div className="isp-space-image-card">
                        <img 
                          src={space.image} 
                          alt={space.alt} 
                          loading="lazy"
                          className="isp-space-img"
                        />
                        <div className="isp-space-badge-overlay">
                          <span className="isp-badge-number">{String(index + 1).padStart(2, '0')}</span>
                          <span className="isp-badge-category">{space.category}</span>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Narrative Column */}
                  <div className="isp-space-content-col">
                    <ScrollReveal variant="fadeUp" delay={0.1}>
                      <span className="isp-school-tag">
                        {space.tag}
                      </span>
                      
                      <h2 className="isp-space-heading">
                        {space.title}
                      </h2>
                      
                      <div className="isp-space-motto">
                        "{space.motto}"
                      </div>
                      
                      <p className="isp-space-text">
                        {space.desc}
                      </p>

                      {/* Capability Highlights */}
                      <div className="isp-highlights-grid">
                        {space.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="isp-highlight-item">
                            <CheckCircle2 size={16} className="isp-highlight-check" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Triggers */}
                      <div className="isp-space-actions">
                        <button
                          type="button"
                          onClick={onOpenVisit}
                          className="btn-enquire"
                          style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
                        >
                          <Compass size={16} /> Schedule Campus Walkthrough
                        </button>
                        <button
                          type="button"
                          onClick={onOpenEnquiry}
                          className="btn-outline-gold"
                          style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
                        >
                          Admission Enquiry <ArrowRight size={15} />
                        </button>
                      </div>

                    </ScrollReveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. Final Call To Action
          ========================================================================= */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} />

    </main>
  );
}
