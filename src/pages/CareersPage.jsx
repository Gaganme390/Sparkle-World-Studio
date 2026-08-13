import React from 'react';
import { ArrowRight, Briefcase, CheckCircle2, Send } from 'lucide-react';
import { careersData } from '../data/contact';
import FinalCTA from '../components/FinalCTA';

export default function CareersPage({ onOpenEnquiry, setCurrentRoute }) {
  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <span className="tag-label">JOIN OUR EDUCATIONAL FAMILY</span>
          <h1 className="heading-hero" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            WORK WITH US.
          </h1>
          <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
            Build the future of learning with G.D. Goenka School, Ayodhya. We invite passionate educators and administrative professionals to shape young minds.
          </p>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          <span className="tag-label">CURRENT OPPORTUNITIES</span>
          <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '3rem' }}>
            Academic & Support Openings
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {careersData.map((job) => (
              <div 
                key={job.id} 
                style={{ background: 'var(--color-warm-white)', padding: '2.25rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="badge-editorial">{job.wing}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-accent)' }}>{job.type}</span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
                    {job.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-primary-dark)', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Experience: {job.experience}
                  </p>
                  <p className="text-body" style={{ fontSize: '0.88rem' }}>
                    Qualification: {job.qualification}
                  </p>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-warm-gray-200)' }}>
                  <button className="btn-enquire" onClick={onOpenEnquiry} style={{ width: '100%', justifyContent: 'center' }}>
                    Apply For Position <Send size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
