import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2, AlertCircle, Mail, Phone, MapPin } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';

export default function PrivacyPolicyPage({ onOpenEnquiry, setCurrentRoute }) {
  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <span className="tag-label">LEGAL & PRIVACY SAFEGUARDS</span>
          <AnimatedText 
            as="h1"
            className="heading-hero" 
            style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}
            text="PRIVACY POLICY."
            delay={0.1}
          />
          <p className="text-editorial-lead" style={{ maxWidth: '820px' }}>
            G.D. Goenka Public School, Ayodhya is committed to safeguarding the privacy and personal data of our students, parents, guardians, educators, and website visitors in accordance with applicable Indian digital data protection standards.
          </p>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
            Effective Date: Academic Session 2026–2027 • Last Reviewed: September 2026
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding theme-pure-white">
        <div className="container" style={{ maxWidth: '920px' }}>
          
          {/* Section 1: Overview & Scope */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              1. Institutional Commitment & Scope
            </h2>
            <p className="text-body" style={{ marginBottom: '1rem' }}>
              This Privacy Policy applies to personal information gathered through our official school website (<strong>gdgoenkaayodhya.com</strong>), admissions enquiry portals, campus visit appointment systems, job recruitment dossiers, and on-campus administrative registers of G.D. Goenka Public School, Ayodhya.
            </p>
            <p className="text-body">
              We operate under the fundamental principle that educational records, student identifiers, and familial information entrusted to us must be treated with the utmost dignity, confidentiality, and technical protection.
            </p>
          </div>

          {/* Section 2: Information We Collect */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              2. Information We Collect
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ background: 'var(--color-warm-white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={18} style={{ color: 'var(--color-accent)' }} /> Prospective Students & Parents
                </h3>
                <p className="text-body" style={{ fontSize: '0.86rem' }}>
                  Parent full names, student date of birth, grade applied for, email addresses, phone/WhatsApp contact numbers, residential town, and admission preferences submitted via enquiry or walkthrough booking forms.
                </p>
              </div>

              <div style={{ background: 'var(--color-warm-white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={18} style={{ color: 'var(--color-accent)' }} /> Faculty & Staff Applicants
                </h3>
                <p className="text-body" style={{ fontSize: '0.86rem' }}>
                  Educational degrees, teaching certifications, years of experience, current school, curriculum vitae documents, and pedagogical cover statements transmitted through our Careers portal.
                </p>
              </div>

              <div style={{ background: 'var(--color-warm-white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={18} style={{ color: 'var(--color-accent)' }} /> Digital Logs & Analytics
                </h3>
                <p className="text-body" style={{ fontSize: '0.86rem' }}>
                  Anonymized IP addresses, browser types, session durations, and interaction heatmaps to optimize website responsiveness, load speeds, and user navigation across devices.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Use of Information */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              3. Purpose & Use of Data
            </h2>
            <p className="text-body" style={{ marginBottom: '1rem' }}>
              Information collected is exclusively utilized for legitimate educational and institutional activities, including:
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-text-dark)', lineHeight: 1.8, fontSize: '0.92rem' }}>
              <li>Processing student admissions, document verification, and academic placement.</li>
              <li>Scheduling campus tours, parent interactions, and principal counseling sessions.</li>
              <li>Emergency notifications, transport SMS broadcasts, and institutional announcements.</li>
              <li>Reviewing faculty credentials and coordinating teacher recruitment interviews.</li>
              <li>Maintaining statutory compliance with CBSE, Department of Education, and state authorities.</li>
            </ul>
          </div>

          {/* Section 4: Child Protection & Media Policy */}
          <div style={{ marginBottom: '3rem', background: 'rgba(224, 145, 69, 0.08)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(224, 145, 69, 0.3)' }}>
            <h2 className="heading-section" style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--color-primary-dark)' }}>
              4. Child Privacy, Photography & Media Consent
            </h2>
            <p className="text-body" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
              The protection of our students' dignity and safety is non-negotiable. G.D. Goenka School, Ayodhya adheres to the following strict child privacy guidelines:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: 'var(--color-text-dark)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: '#16A34A', flexShrink: 0, marginTop: '2px' }} />
                <span>Photographs and recordings of students during campus ceremonies, sports, or academic triumphs are published only with parental consent obtained during enrollment.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: '#16A34A', flexShrink: 0, marginTop: '2px' }} />
                <span>We never publish sensitive personal information such as residential addresses, parent financial data, or private contact details alongside student photographs.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: '#16A34A', flexShrink: 0, marginTop: '2px' }} />
                <span>Parents have the permanent right to request the redaction or removal of their ward's photo from public digital channels at any time.</span>
              </div>
            </div>
          </div>

          {/* Section 5: Data Security & Zero Third-Party Selling */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              5. Data Security & Zero Commercial Monetization
            </h2>
            <p className="text-body" style={{ marginBottom: '1rem' }}>
              <strong>We strictly do not sell, rent, trade, or monetize student or parent personal data to commercial advertisers or telemarketers.</strong>
            </p>
            <p className="text-body">
              All electronic records are guarded using modern cryptographic protocols (SSL/TLS encryption in transit, secure database hashing, and multi-factor authenticated administrative PIN access). Access to applicant dossiers is restricted exclusively to the School Admissions Committee and Principal's Office.
            </p>
          </div>

          {/* Section 6: Grievance Officer */}
          <div style={{ background: 'var(--color-warm-white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              6. Data Protection & Grievance Redressal
            </h3>
            <p className="text-body" style={{ fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              If you have any questions, correction requests, or concerns regarding your personal data or your ward's privacy, please contact our designated Grievance Officer:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ color: 'var(--color-primary-dark)' }}>Officer In-Charge:</strong>
                <div style={{ color: 'var(--color-text-muted)' }}>Administrative Office & Registrar</div>
              </div>
              <div>
                <strong style={{ color: 'var(--color-primary-dark)' }}>Email:</strong>
                <div style={{ color: 'var(--color-accent)', fontWeight: 600 }}>grievance@gdgoenkaayodhya.com</div>
              </div>
              <div>
                <strong style={{ color: 'var(--color-primary-dark)' }}>Campus Address:</strong>
                <div style={{ color: 'var(--color-text-muted)' }}>NH-27, Near Bypass, Ayodhya, UP - 224001</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
