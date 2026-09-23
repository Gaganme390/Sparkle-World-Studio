import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, BookOpen, ShieldCheck, CreditCard, Ban } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';

export default function TermsConditionsPage({ onOpenEnquiry, onOpenFeeModal, setCurrentRoute }) {
  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <span className="tag-label">INSTITUTIONAL REGULATIONS & POLICIES</span>
          <AnimatedText 
            as="h1"
            className="heading-hero" 
            style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}
            text="TERMS & CONDITIONS."
            delay={0.1}
          />
          <p className="text-editorial-lead" style={{ maxWidth: '820px' }}>
            Rules, regulatory frameworks, admissions terms, fee regulations, and code of conduct governing students, parents, and visitors of G.D. Goenka Public School, Ayodhya.
          </p>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
            Academic Session 2026–2027 • Approved by School Management Committee
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding theme-pure-white">
        <div className="container" style={{ maxWidth: '920px' }}>
          
          {/* Section 1: Acceptance */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              1. Acceptance of Terms & Regulations
            </h2>
            <p className="text-body" style={{ marginBottom: '1rem' }}>
              By accessing our website (<strong>gdgoenkaayodhya.com</strong>), submitting an online admission enquiry, scheduling a campus walkthrough, registering a student, or enrolling a child at G.D. Goenka Public School, Ayodhya, parents, legal guardians, and candidates agree to abide by these Terms & Conditions and all official school handbooks.
            </p>
            <p className="text-body">
              These guidelines are framed in alignment with the Central Board of Secondary Education (CBSE) guidelines, State Education Directives, and the Goenka Educational Trust charter.
            </p>
          </div>

          {/* Section 2: Admissions & Registration */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              2. Admissions & Document Verification
            </h2>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-text-dark)', lineHeight: 1.8, fontSize: '0.92rem' }}>
              <li><strong>Authenticity of Credentials:</strong> Admission offers are provisional and contingent upon original document verification (Birth Certificate, previous School Transfer Certificate / TC, mark sheets, and Aadhaar card). Submission of false, fabricated, or forged records will result in immediate disqualification and forfeiture of registration fees.</li>
              <li><strong>Age Eligibility:</strong> Candidates must satisfy the minimum age criteria established by the Department of Basic/Secondary Education for Pre-Primary and Grade 1 admissions as of 31st March of the academic year.</li>
              <li><strong>Principal's Discretion:</strong> The School Admissions Committee and the Principal reserve the prerogative regarding student section allotment, wing placement, and grade readiness.</li>
            </ul>
          </div>

          {/* Section 3: Fee Payment, Schedules & Refunds */}
          <div style={{ marginBottom: '3rem', background: 'var(--color-warm-white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
            <h2 className="heading-section" style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CreditCard size={22} style={{ color: 'var(--color-accent)' }} /> 3. Fee Policy & Financial Obligations
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--color-text-dark)', lineHeight: 1.7 }}>
              <p style={{ margin: 0 }}>
                <strong>Installment Deadlines:</strong> Tuition, smart classroom technology, and transportation fees must be discharged on or before the due date of each quarterly installment as specified in the annual Fee Schedule.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Late Fee Surcharge:</strong> Delayed fee remittances beyond the grace period incur a standard administrative late fee. Continued default may impact student examination clearance and transportation privileges.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Withdrawal & TC Application:</strong> Parents seeking student withdrawal must submit a formal written application 30 days prior to the commencement of the subsequent quarter. One-time admission registration charges are non-refundable once the child has attended classes.
              </p>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-warm-gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Detailed breakdown for all grades is available in our published Fee Matrix.
              </span>
              <button type="button" className="btn-secondary" onClick={onOpenFeeModal} style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}>
                Inspect Fee Structure
              </button>
            </div>
          </div>

          {/* Section 4: Student Code of Conduct */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              4. Student Discipline & Zero-Tolerance Policies
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1.25rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-warm-gray-300)' }}>
                <h4 style={{ color: 'var(--color-primary-dark)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={18} style={{ color: '#16A34A' }} /> Anti-Bullying Protocol
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Strict zero-tolerance policy against any form of bullying, harassment, intimidation, or discriminatory conduct. Monitored by the School Discipline & POCSO Committee.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-warm-gray-300)' }}>
                <h4 style={{ color: 'var(--color-primary-dark)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Ban size={18} style={{ color: '#DC2626' }} /> Prohibited Items
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Unauthorized personal mobile phones, smartwatches with calling, unauthorized electronic devices, and sharp objects are strictly barred inside classrooms and campus premises.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-warm-gray-300)' }}>
                <h4 style={{ color: 'var(--color-primary-dark)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={18} style={{ color: 'var(--color-accent)' }} /> 75% Mandatory Attendance
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  As mandated by CBSE examination bye-laws, a minimum of 75% attendance is required in each academic session to qualify for promotion and board examination clearance.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Campus Infrastructure & Property Care */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              5. Care of Smart Labs, Library & Campus Property
            </h2>
            <p className="text-body" style={{ marginBottom: '1rem' }}>
              Students are entrusted with world-class smart boards, STEM prototyping kits, musical instruments, robotics lab equipment, and sports facilities. Willful defacement or damage to school infrastructure will require the responsible student's guardians to cover full repair or replacement damages.
            </p>
          </div>

          {/* Section 6: Intellectual Property & Brand Crest */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="heading-section" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              6. Intellectual Property & Crest Trademark
            </h2>
            <p className="text-body">
              The 'G.D. Goenka' name, logo, academic insignia, uniform patterns, motto, and curriculum courseware are protected intellectual property. Unauthorized commercial use, reproduction, or misleading representation without written sanction from the Goenka Educational Trust is strictly prohibited under Indian trademark law.
            </p>
          </div>

          {/* Section 7: Jurisdiction */}
          <div style={{ background: 'var(--color-warm-white)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={20} style={{ color: 'var(--color-accent)' }} /> 7. Governing Law & Jurisdiction
            </h3>
            <p className="text-body" style={{ fontSize: '0.88rem', margin: 0 }}>
              Any claims, legal interpretations, or proceedings arising out of or in connection with the operations, admissions, or administrative decisions of G.D. Goenka Public School, Ayodhya shall be governed exclusively by the laws of the Republic of India and subject to the competent courts of <strong>Ayodhya / Lucknow, Uttar Pradesh</strong>.
            </p>
          </div>

        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
