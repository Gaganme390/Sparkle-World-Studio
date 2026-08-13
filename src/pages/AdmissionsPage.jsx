import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, HelpCircle, FileText, Calendar } from 'lucide-react';
import { admissionSteps, eligibilityGrades, requiredDocuments, admissionFaqs } from '../data/admissions';
import FinalCTA from '../components/FinalCTA';

export default function AdmissionsPage({ onOpenEnquiry, setCurrentRoute }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Page Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <span className="tag-label">ADMISSIONS 2026-27</span>
          <h1 className="heading-hero" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            ADMISSIONS JOURNEY.
          </h1>
          <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
            Join the Goenkan community in Ayodhya. Explore eligibility, document requirements, transparent processes, and book your campus visit.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <button className="btn-enquire" onClick={onOpenEnquiry} style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
              Fill Online Enquiry Form <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 5 Steps Section */}
      <section className="section-padding theme-pure-white" id="process">
        <div className="container">
          <span className="tag-label">TRANSPARENT PROCEDURE</span>
          <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '3rem' }}>
            Five Steps to Admission
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {admissionSteps.map((step) => (
              <div key={step.step} style={{ padding: '2rem 1.5rem', background: 'var(--color-warm-white)', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', color: 'var(--color-accent)' }}>{step.step}</span>
                <h3 className="font-display" style={{ fontSize: '1.35rem', marginTop: '0.35rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-warm-gray-600)', marginBottom: '0.75rem' }}>{step.subtitle}</p>
                <p className="text-body" style={{ fontSize: '0.88rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Table */}
      <section className="section-padding theme-warm-white" id="eligibility">
        <div className="container">
          <span className="tag-label">CRITERIA & AGE MARGINS</span>
          <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>
            Grade-Wise Eligibility (2026-27)
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#FFFFFF', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: 'var(--border-thin)' }}>
              <thead>
                <tr style={{ background: 'var(--color-primary-dark)', color: '#FFFFFF', textAlign: 'left' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Grade / Level</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Age Requirement</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Status</th>
                  <th style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {eligibilityGrades.map((g, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--color-warm-gray-200)' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700', color: 'var(--color-primary-dark)' }}>{g.grade}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)' }}>{g.age}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span className="badge-editorial">{g.status}</span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                      <button className="btn-enquire" onClick={onOpenEnquiry} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                        Apply Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Document Checklist */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          <div className="editorial-grid" style={{ alignItems: 'center' }}>
            <div className="col-12 col-md-6">
              <span className="tag-label">DOCUMENTATION</span>
              <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                Required Document Checklist
              </h2>
              <p className="text-body" style={{ marginBottom: '1.5rem' }}>
                Please have soft copies or physical originals of the following documents ready at the time of formal registration:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {requiredDocuments.map((doc, dIdx) => (
                  <li key={dIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>
                    <FileText size={18} style={{ color: 'var(--color-accent)' }} /> {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-12 col-md-6">
              <div style={{ padding: '2.5rem', background: 'var(--color-primary-dark)', color: '#FFFFFF', borderRadius: 'var(--radius-lg)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-accent)', letterSpacing: '0.15em' }}>TRANSPARENT FEE POLICY</span>
                <h3 className="font-display" style={{ fontSize: '2rem', color: '#FFFFFF', marginTop: '0.5rem', marginBottom: '1rem' }}>
                  Fee Structure Request
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  In accordance with school policy, exact grade-wise fee schedules are provided transparently during campus visits or sent via official email upon receiving an online enquiry.
                </p>
                <button className="btn-cta-primary" onClick={onOpenEnquiry} style={{ width: '100%', justifyContent: 'center' }}>
                  Request Fee Structure Breakdown <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding theme-warm-white" id="faqs">
        <div className="container">
          <span className="tag-label">PARENTS FREQUENT QUESTIONS</span>
          <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '900px' }}>
            {admissionFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                style={{ background: '#FFFFFF', border: 'var(--border-thin)', borderRadius: 'var(--radius-md)', padding: '1.5rem 2rem', cursor: 'pointer' }}
                onClick={() => toggleFaq(idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="font-display" style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)' }}>{faq.q}</h3>
                  <HelpCircle size={20} style={{ color: 'var(--color-accent)' }} />
                </div>
                {openFaq === idx && (
                  <p className="text-body" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-warm-gray-200)' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
