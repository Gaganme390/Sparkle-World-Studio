import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Quote, 
  CheckCircle2, 
  Calendar, 
  GraduationCap, 
  Compass,
  ArrowRight
} from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import FinalCTA from '../components/FinalCTA';
import './LeadershipPage.css';

const leaders = [
  {
    id: 'ayodhya-chairman',
    cohort: 'ayodhya',
    name: 'Mr. Madan Mohan Tripathi',
    role: 'School Chairman',
    org: 'G.D. Goenka Public School, Ayodhya',
    image: '/school-media/Opening Photos/A/DSC_7282.JPG',
    verified: 'Verified Official Chairman',
    quote: 'Our vision for the Ayodhya campus is to build an educational lighthouse where timeless cultural values, discipline, and human empathy seamlessly blend with modern pedagogical excellence, cutting-edge technology, and global leadership.',
    bio: [
      'Mr. Madan Mohan Tripathi is a distinguished philanthropist, visionary educationist, and founding pioneer of the G.D. Goenka Public School campus in Ayodhya. With a deep commitment to regional advancement and youth empowerment, he has spearheaded the creation of a world-class educational enclave in the sacred historic land of Ayodhya.',
      'Under his patronage, the school features Olympic-grade sports infrastructure, cutting-edge AI and robotics laboratories, central air-purification systems, and a CBSE-aligned pedagogy designed to mold young scholars into self-disciplined, confident leaders who remain firmly rooted in Indian heritage.'
    ],
    credentials: [
      { label: 'Role & Office', value: 'Chairman & Founding Patron' },
      { label: 'Campus Stewardship', value: 'Infrastructure, Governance & Safety' },
      { label: 'Secretariat Channel', value: 'chairman@gdgoenkaayodhya.com' },
      { label: 'Office Availability', value: 'By Prior Appointment via Admissions Desk' }
    ]
  },
  {
    id: 'ayodhya-principal',
    cohort: 'ayodhya',
    name: 'Dr. Abin C. Raj',
    role: 'Campus Principal',
    org: 'G.D. Goenka Public School, Ayodhya',
    image: '/school-media/Digital Lab/1.jpeg',
    verified: 'Verified Official Principal',
    quote: 'At G.D. Goenka Public School, Ayodhya, we believe education is not the filling of a vessel, but the ignition of a lifelong passion for learning. Through modern facilities like our Digital English Language Lab, athletic championships, and experiential learning, every child discovers their inner brilliance.',
    bio: [
      'Dr. Abin C. Raj brings over two decades of transformative educational leadership to the Ayodhya campus. An esteemed scholar holding a Ph.D. in Education alongside Master of Science and Bachelor of Education degrees, Dr. Raj has pioneered student-centric curriculum architecture and spoken-English phonetics fluency programs across premier national institutions.',
      'His administrative ethos is centered around academic rigour, individual child mentorship, faculty empowerment, and the cultivation of holistic sporting and cultural excellence. He maintains an active open-door policy for parents and students alike.'
    ],
    credentials: [
      { label: 'Academic Qualifications', value: 'Ph.D., M.Sc., B.Ed.' },
      { label: 'Leadership Experience', value: '20+ Years CBSE Institutional Governance' },
      { label: 'Specialization Areas', value: 'Digital Pedagogy, STEM & Language Labs' },
      { label: 'Principal Desk Email', value: 'principal@gdgoenkaayodhya.com' }
    ]
  },
  {
    id: 'group-chairman',
    cohort: 'group',
    name: 'Shri Anjani Kumar Goenka',
    role: 'Founder & Group Chairman',
    org: 'G.D. Goenka Group',
    image: '/school-media/leadership/anjani_kumar_goenka.jpg',
    verified: 'National Group Founder',
    quote: 'More than three decades ago, our journey began with a single school in Vasant Kunj with a vision to revolutionize Indian schooling through progressive education, world-class facilities, and human integrity.',
    bio: [
      'Shri Anjani Kumar Goenka is the visionary architect of the G.D. Goenka Group. In 1994, he laid the foundation of the very first G.D. Goenka School in Vasant Kunj, New Delhi, setting a revolutionary benchmark that redefined private schooling in India.',
      'Today, the group encompasses over 160 K–12 schools across 18 states and union territories, premier universities, pre-schools, and healthcare institutions. His vision for the Ayodhya campus brings this four-decade legacy of educational distinction directly to Uttar Pradesh.'
    ],
    credentials: [
      { label: 'Group Founding Year', value: '1994 (Vasant Kunj, New Delhi)' },
      { label: 'Institutional Network', value: '160+ Schools Nationwide' },
      { label: 'National Footprint', value: '18 States & Union Territories' },
      { label: 'Alumni Network', value: '200,000+ Worldwide' }
    ]
  },
  {
    id: 'group-vice-chairperson',
    cohort: 'group',
    name: 'Ms. Renu Goenka',
    role: 'Vice Chairperson',
    org: 'G.D. Goenka Group',
    image: '/school-media/leadership/renu_goenka.jpg',
    verified: 'National Group Co-Founder',
    quote: 'Education must touch the heart as deeply as it informs the intellect. When a school nurtures self-confidence, compassion, and artistic curiosity, students emerge as responsible world citizens.',
    bio: [
      'Ms. Renu Goenka has been the guiding inspiration behind the artistic, cultural, and pastoral ethos of the G.D. Goenka Group. Her focus has championed early childhood sensorial learning, inclusive classroom dynamics, and the integration of performing arts into everyday school life.',
      'Her progressive guidance ensures that every child within the Goenkan ecosystem enjoys a vibrant, secure, and inspiring environment that celebrates their individuality.'
    ],
    credentials: [
      { label: 'Core Focus', value: 'Early Childhood Sensorial Pedagogy' },
      { label: 'Program Architecture', value: 'Performing Arts & Child Wellbeing' },
      { label: 'National Initiative', value: 'Inclusive Learning & Cultural Pride' },
      { label: 'Leadership Role', value: 'Vice Chairperson, G.D. Goenka Group' }
    ]
  },
  {
    id: 'head-office-mentors',
    cohort: 'mentors',
    name: 'Ms. Rajni Jauhari & Ms. Yasmin Khan',
    role: 'Senior Executive Mentors',
    org: 'G.D. Goenka Group Head Office, New Delhi',
    image: '/school-media/Opening Photos/C/DSC00453.JPG',
    verified: 'Head Office Academic Audit & Oversight',
    quote: 'G.D. Goenka School, Ayodhya reflects the highest national benchmarks of the Goenkan legacy — empowering children with confidence, sportsmanship, and future-ready capabilities in every walk of life.',
    bio: [
      'Ms. Rajni Jauhari and Ms. Yasmin Khan lead the academic mentoring and faculty audit council at the G.D. Goenka Group Head Office in New Delhi. They oversee continuous curriculum innovation, teacher development colloquiums, and nationwide quality benchmarking.',
      'Their periodic campus visits and institutional audits ensure that G.D. Goenka Ayodhya strictly adheres to the highest national and international standards in scholastic delivery.'
    ],
    credentials: [
      { label: 'Headquarters', value: 'G.D. Goenka Group, New Delhi' },
      { label: 'Audit Scope', value: 'Curriculum, Pedagogy & Faculty Standards' },
      { label: 'Continuous Oversight', value: 'Quarterly Academic & Infrastructure Reviews' },
      { label: 'Affiliation Alignment', value: 'CBSE & NEP 2020 Frameworks' }
    ]
  }
];

export default function LeadershipPage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredLeaders = activeFilter === 'all' 
    ? leaders 
    : leaders.filter(l => l.cohort === activeFilter);

  return (
    <main className="leadership-page">
      {/* 1. Page Header */}
      <section className="leadership-hero">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <span className="leadership-page-tag">
              INSTITUTIONAL GOVERNANCE &amp; MENTORSHIP
            </span>
          </ScrollReveal>

          <AnimatedText
            as="h1"
            className="leadership-page-title"
            text="CHAIRMAN, PRINCIPAL & LEADERSHIP PROFILES"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="leadership-page-lead">
              Meet the educational pioneers, campus administrators, and national mentors steering G.D. Goenka Public School Ayodhya. Here you will find detailed biographies, official desk addresses, educational philosophies, and institutional credentials.
            </p>

            {/* Filter Tabs */}
            <div className="leadership-tabs-bar">
              <button
                type="button"
                className={`leadership-tab-pill ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Leadership ({leaders.length})
              </button>
              <button
                type="button"
                className={`leadership-tab-pill ${activeFilter === 'ayodhya' ? 'active' : ''}`}
                onClick={() => setActiveFilter('ayodhya')}
              >
                Ayodhya Chairman &amp; Principal
              </button>
              <button
                type="button"
                className={`leadership-tab-pill ${activeFilter === 'group' ? 'active' : ''}`}
                onClick={() => setActiveFilter('group')}
              >
                National Group Founders
              </button>
              <button
                type="button"
                className={`leadership-tab-pill ${activeFilter === 'mentors' ? 'active' : ''}`}
                onClick={() => setActiveFilter('mentors')}
              >
                Head Office Mentors
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Detailed Profiles */}
      <section className="leadership-profiles-container">
        <div className="container">
          {filteredLeaders.map((leader, idx) => (
            <ScrollReveal 
              key={leader.id} 
              variant="fadeUp" 
              delay={0.15 + (idx % 2) * 0.1}
              className="leader-detail-card"
              id={leader.id}
            >
              {/* Left Aside: Photo & Quick Credentials */}
              <div className="leader-card-aside">
                <div className="leader-portrait-wrap">
                  <img 
                    src={leader.image} 
                    alt={`${leader.name} - ${leader.role}`}
                    loading="lazy"
                  />
                </div>

                <h2 className="leader-aside-name">{leader.name}</h2>
                <div className="leader-aside-role">{leader.role}</div>
                <div className="leader-aside-org">{leader.org}</div>

                <div className="leader-verified-badge">
                  <ShieldCheck size={14} />
                  <span>{leader.verified}</span>
                </div>
              </div>

              {/* Right Body: Quote, Bio & Credentials Grid */}
              <div className="leader-card-body">
                <div className="leader-quote-block">
                  <p className="leader-quote-text">
                    "{leader.quote}"
                  </p>
                </div>

                <h3 className="leader-bio-title">Leadership Profile &amp; Educational Vision</h3>
                <div className="leader-bio-paragraphs">
                  {leader.bio.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Personal Credentials Grid */}
                <div className="leader-credentials-grid">
                  {leader.credentials.map((cred, cIdx) => (
                    <div key={cIdx} className="credential-item">
                      <span className="credential-label">{cred.label}</span>
                      <span className="credential-value">{cred.value}</span>
                    </div>
                  ))}
                </div>

                {/* Schedule Interaction CTA */}
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <MagneticButton strength={4}>
                    <button 
                      className="btn-enquire"
                      onClick={onOpenVisit}
                      style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem' }}
                    >
                      <Compass size={16} /> Schedule Campus Walkthrough
                    </button>
                  </MagneticButton>

                  <button 
                    className="btn-menu-trigger"
                    onClick={() => {
                      if (onOpenEnquiry) onOpenEnquiry(`Meeting with ${leader.role}`);
                    }}
                    style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem' }}
                  >
                    Request Interaction Desk <ArrowRight size={15} />
                  </button>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. Final CTA */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
