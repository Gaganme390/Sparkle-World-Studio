import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import './LeadershipSection.css';

export default function LeadershipSection({ setCurrentRoute }) {

  const navigateToLeadership = (e, leaderId) => {
    e?.preventDefault();
    if (setCurrentRoute) {
      setCurrentRoute('/leadership');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="legacy-leadership-section" id="leadership" aria-label="Leadership and Heritage">
      <div className="container">
        <div className="legacy-grid-layout">
          
          {/* =========================================================================
              LEFT COLUMN: HEADINGS, EDITORIAL NARRATIVE & STATS (MATCHING SCREENSHOT)
              ========================================================================= */}
          <div className="legacy-left-content">
            <ScrollReveal variant="fadeUp">
              <span className="legacy-tag">
                THE LEGACY STARTS HERE – GD GOENKA GROUP &amp; AYODHYA
              </span>
            </ScrollReveal>

            <AnimatedText 
              as="h2"
              className="legacy-heading font-display"
              text="THE FLAGSHIP SCHOOL OF INDIA'S LEADING EDUCATION CONGLOMERATE."
              delay={0.1}
            />

            <ScrollReveal variant="fadeUp" delay={0.2} className="legacy-narrative">
              <p>
                More than three decades ago, our journey to be the best private school in South Delhi began with a single school in Vasant Kunj. Today, GD Goenka Group has grown into a nationwide network of over 160 K–12 schools across India.
              </p>
              <p>
                Offering CBSE curricula aligned with the progressive vision of NEP 2020, G.D. Goenka Public School Ayodhya delivers world-class infrastructure and future-ready education rooted in timeless cultural excellence.
              </p>
            </ScrollReveal>

            {/* Stats Row Matching Screenshot */}
            <ScrollReveal variant="fadeUp" delay={0.3} className="legacy-stats-row">
              <div className="legacy-stat-item">
                <div className="legacy-stat-number">18</div>
                <div className="legacy-stat-label">
                  States &amp;<br />Union Territories
                </div>
              </div>

              <div className="legacy-stat-item">
                <div className="legacy-stat-number">160+</div>
                <div className="legacy-stat-label">
                  K-12<br />Schools
                </div>
              </div>

              <div className="legacy-stat-item">
                <div className="legacy-stat-number">200K+</div>
                <div className="legacy-stat-label">
                  Alumni Across<br />the Globe
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: PORTRAIT LEADERSHIP CARDS (MATCHING SCREENSHOT)
              ========================================================================= */}
          <div className="legacy-right-cards">
            
            <ScrollReveal variant="fadeLeft" delay={0.2} className="legacy-cards-container">
              
              {/* Card 1: Mr. Madan Mohan Tripathi (School Chairman, with Navy Frame from Screenshot) */}
              <div 
                className="legacy-leader-card with-navy-frame"
                onClick={(e) => navigateToLeadership(e, 'ayodhya-chairman')}
                title="Click to view School Chairman Mr. Madan Mohan Tripathi and personal details"
                role="button"
                tabIndex={0}
                data-area-id="leadership-chairman"
              >
                <div className="legacy-photo-wrap">
                  <div className="legacy-photo-inner">
                    <img 
                      src="/school-media/Opening Photos/A/DSC_7282.JPG" 
                      alt="Mr. Madan Mohan Tripathi, School Chairman GD Goenka Ayodhya" 
                      loading="eager"
                      className="chairman-img"
                    />
                  </div>
                </div>

                <div className="legacy-leader-info">
                  <div className="legacy-leader-name">
                    <span>Mr. Madan Mohan Tripathi</span>
                    <ChevronRight size={16} className="legacy-arrow-icon" />
                  </div>
                  <div className="legacy-leader-role">School Chairman</div>
                  <div className="legacy-leader-org">GD Goenka Public School Ayodhya</div>
                </div>
              </div>

              {/* Card 2: Dr. Abin C. Raj (Campus Principal) */}
              <div 
                className="legacy-leader-card with-navy-frame"
                onClick={(e) => navigateToLeadership(e, 'ayodhya-principal')}
                title="Click to view Campus Principal Dr. Abin C. Raj and personal details"
                role="button"
                tabIndex={0}
                data-area-id="leadership-principal"
              >
                <div className="legacy-photo-wrap">
                  <div className="legacy-photo-inner">
                    <img 
                      src="/school-media/Digital Lab/1.jpeg" 
                      alt="Dr. Abin C. Raj, Campus Principal GD Goenka Ayodhya" 
                      loading="eager"
                      className="principal-img"
                    />
                  </div>
                </div>

                <div className="legacy-leader-info">
                  <div className="legacy-leader-name">
                    <span>Dr. Abin C. Raj</span>
                    <ChevronRight size={16} className="legacy-arrow-icon" />
                  </div>
                  <div className="legacy-leader-role">Campus Principal</div>
                  <div className="legacy-leader-org">GD Goenka Public School Ayodhya</div>
                </div>
              </div>

            </ScrollReveal>

            {/* Click to open full details page */}
            <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
              <button
                type="button"
                onClick={navigateToLeadership}
                className="btn-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-primary-dark, #123985)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: 0
                }}
              >
                <span>View Full Principal &amp; Chairman Profiles</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
