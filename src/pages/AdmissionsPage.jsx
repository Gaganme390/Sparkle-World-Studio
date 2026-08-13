import React, { useState } from 'react';
import { ArrowRight, FileText, Compass, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { admissionSteps, eligibilityGrades, requiredDocuments, admissionFaqs } from '../data/admissions';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import FinalCTA from '../components/FinalCTA';
import '../sections/AdmissionsSection.css';

export default function AdmissionsPage({ onOpenEnquiry, onOpenVisit, onOpenFeeModal, setCurrentRoute }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Page Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">ADMISSIONS 2026-27</span>
          </ScrollReveal>

          <AnimatedText 
            as="h1"
            className="heading-hero" 
            style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}
            text="ADMISSIONS JOURNEY."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
              Join the Goenkan community in Ayodhya. Explore eligibility, document requirements, transparent processes, and book your campus visit.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <MagneticButton strength={6}>
                <button className="btn-enquire" onClick={onOpenEnquiry} style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                  Fill Online Enquiry Form <ArrowRight size={18} />
                </button>
              </MagneticButton>

              <MagneticButton strength={6}>
                <button className="btn-menu-trigger" onClick={onOpenVisit} style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                  <Compass size={18} /> Schedule Campus Walkthrough
                </button>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5 Steps Section */}
      <section className="section-padding theme-pure-white" id="process">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">TRANSPARENT PROCEDURE</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem', marginBottom: '3rem' }}
            text="Five Steps to Admission"
            delay={0.1}
          />

          <ScrollReveal className="admissions-steps-grid" stagger staggerAmount={0.1} variant="fadeUp" delay={0.2}>
            {admissionSteps.map((step) => (
              <div 
                key={step.step} 
                className="step-card hover-lift"
                style={{ cursor: 'pointer' }}
                onClick={() => (step.step === '02' || step.step === '04' ? onOpenVisit() : onOpenEnquiry())}
              >
                <span className="step-num">{step.step}</span>
                <h3 className="step-title">{step.title}</h3>
                <span className="step-sub">{step.subtitle}</span>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Eligibility Table */}
      <section className="section-padding theme-warm-white" id="eligibility">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">CRITERIA & AGE MARGINS</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}
            text="Grade-Wise Eligibility (2026-27)"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2} style={{ overflowX: 'auto' }}>
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
          </ScrollReveal>
        </div>
      </section>

      {/* Document Checklist */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          <div className="editorial-grid" style={{ alignItems: 'center' }}>
            <ScrollReveal variant="fadeRight" delay={0.1} className="col-12 col-md-6">
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
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" delay={0.2} className="col-12 col-md-6">
              <div style={{ padding: '2.5rem', background: 'var(--color-primary-dark)', color: '#FFFFFF', borderRadius: 'var(--radius-lg)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-accent)', letterSpacing: '0.15em' }}>TRANSPARENT FEE POLICY</span>
                <h3 className="font-display" style={{ fontSize: '2rem', color: '#FFFFFF', marginTop: '0.5rem', marginBottom: '1rem' }}>
                  Fee Structure Request
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  In accordance with school policy, exact grade-wise fee schedules are provided transparently during campus visits or sent via official email upon receiving an online enquiry.
                </p>
                <MagneticButton strength={4} style={{ width: '100%' }}>
                  <button className="btn-cta-primary" onClick={onOpenFeeModal || onOpenEnquiry} style={{ width: '100%', justifyContent: 'center' }}>
                    Request Fee Structure Breakdown <ArrowRight size={16} />
                  </button>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQs with Smooth Accordion Animation */}
      <section className="section-padding theme-warm-white" id="faqs">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">PARENTS FREQUENT QUESTIONS</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}
            text="Frequently Asked Questions"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '900px' }}>
            {admissionFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="hover-lift"
                style={{ background: '#FFFFFF', border: 'var(--border-thin)', borderRadius: 'var(--radius-md)', padding: '1.5rem 2rem', cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => toggleFaq(idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <h3 className="font-display" style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: 0 }}>{faq.q}</h3>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                  >
                    <ChevronDown size={20} style={{ color: 'var(--color-accent)' }} />
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="text-body" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-warm-gray-200)', lineHeight: 1.6 }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
