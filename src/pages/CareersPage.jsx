import React, { useState } from 'react';
import { ArrowRight, Briefcase, CheckCircle2, Send, Clock, AlertCircle } from 'lucide-react';
import { useSchoolData } from '../hooks/useSchoolData';
import { careersData as fallbackCareers } from '../data/contact';
import JobApplicationModal from '../components/JobApplicationModal';
import FinalCTA from '../components/FinalCTA';

export default function CareersPage({ onOpenEnquiry, setCurrentRoute }) {
  const schoolData = useSchoolData();
  const openings = (schoolData.jobOpenings && schoolData.jobOpenings.length > 0)
    ? schoolData.jobOpenings
    : fallbackCareers;

  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const handleApply = (job) => {
    if (job.status === 'Closed') return;
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="tag-label">CURRENT OPPORTUNITIES</span>
              <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                Academic & Support Openings
              </h2>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Showing {openings.filter(j => j.status !== 'Closed').length} active open positions
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {openings.map((job) => {
              const isClosed = job.status === 'Closed';
              return (
                <div 
                  key={job.id} 
                  style={{ 
                    background: 'var(--color-warm-white)', 
                    padding: '2.25rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: isClosed ? '1px dashed var(--color-warm-gray-300)' : 'var(--border-thin)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    opacity: isClosed ? 0.75 : 1,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="badge-editorial">{job.wing}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-accent)' }}>{job.type}</span>
                        {isClosed ? (
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: '#fee2e2', color: '#b91c1c' }}>
                            Closed
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: '#dcfce7', color: '#15803d' }}>
                            Accepting Applications
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="font-display" style={{ fontSize: '1.45rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
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
                    {isClosed ? (
                      <button 
                        className="btn-enquire" 
                        disabled 
                        style={{ 
                          width: '100%', 
                          justifyContent: 'center', 
                          background: 'var(--color-warm-gray-300)', 
                          color: 'var(--color-text-muted)',
                          cursor: 'not-allowed',
                          boxShadow: 'none'
                        }}
                      >
                        Position Closed <AlertCircle size={15} />
                      </button>
                    ) : (
                      <button 
                        className="btn-enquire" 
                        onClick={() => handleApply(job)} 
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        Apply For Position <Send size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dedicated Job Application Modal */}
      <JobApplicationModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        selectedJob={selectedJob}
        jobOpenings={openings.filter(j => j.status !== 'Closed')}
      />

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
