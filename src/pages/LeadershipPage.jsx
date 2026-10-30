import React from 'react';
import { 
  ShieldCheck, 
  Quote, 
  Compass,
  ArrowRight
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import FinalCTA from '../components/FinalCTA';
import './LeadershipPage.css';

const leaders = [
  {
    id: 'ayodhya-chairman',
    cohort: 'chairman',
    sectionKicker: 'SCHOOL CHAIRMAN',
    sectionTitle: "Chairman's Message & Vision",
    name: 'Mr. Madan Mohan Tripathi',
    role: 'School Chairman',
    org: 'G.D. Goenka Public School, Ayodhya',
    image: '/school-media/Opening Photos/A/DSC_7282.JPG',
    imageClass: 'chairman-img',
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
    cohort: 'principal',
    sectionKicker: 'CAMPUS PRINCIPAL',
    sectionTitle: "Principal's Desk & Academic Vision",
    name: 'Dr. Abin C. Raj',
    role: 'Campus Principal',
    org: 'G.D. Goenka Public School, Ayodhya',
    image: '/school-media/Digital Lab/1.jpeg',
    imageClass: 'principal-img',
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
  }
];

export default function LeadershipPage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  return (
    <main className="leadership-page">
      {/* Messages & Detailed Profiles */}
      <section className="leadership-profiles-container">
        <div className="container">
          {leaders.map((leader, idx) => (
            <ScrollReveal 
              key={leader.id} 
              variant="fadeUp" 
              delay={0.15 + (idx % 2) * 0.1}
              className="leader-detail-card"
              id={leader.id}
            >
              {/* Left Aside: Large Portrait Photo & Quick Credentials */}
              <div className="leader-card-aside">
                <div className="leader-portrait-wrap">
                  <img 
                    src={leader.image} 
                    alt={`${leader.name} - ${leader.role}`}
                    className={leader.imageClass}
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

              {/* Right Body: Quote, Message, Bio & Credentials Grid */}
              <div className="leader-card-body">
                <div className="leader-header-bar">
                  <span className="leader-kicker-tag">{leader.sectionKicker}</span>
                  <h2 className="leader-message-heading">{leader.sectionTitle}</h2>
                </div>

                <div className="leader-quote-block">
                  <Quote size={22} className="leader-quote-icon" />
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
                <div className="leader-card-actions">
                  <MagneticButton strength={4}>
                    <button 
                      className="btn-enquire"
                      onClick={onOpenVisit}
                      style={{ padding: '0.85rem 1.75rem', fontSize: '0.92rem' }}
                    >
                      <Compass size={16} /> Schedule Campus Walkthrough
                    </button>
                  </MagneticButton>

                  <button 
                    className="btn-menu-trigger"
                    onClick={() => {
                      if (onOpenEnquiry) onOpenEnquiry(`Meeting with ${leader.role}`);
                    }}
                    style={{ padding: '0.85rem 1.75rem', fontSize: '0.92rem' }}
                  >
                    Request Interaction Desk <ArrowRight size={15} />
                  </button>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
