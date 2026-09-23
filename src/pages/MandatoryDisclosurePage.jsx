import React, { useState } from 'react';
import { 
  FileText, Download, CheckCircle2, Shield, Building, 
  GraduationCap, Users, Calendar, Award, Phone, Mail, 
  MapPin, ExternalLink, ArrowRight, BookOpen, Layers
} from 'lucide-react';
import FinalCTA from '../components/FinalCTA';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';

export default function MandatoryDisclosurePage({ onOpenEnquiry, onOpenVisit, onOpenFeeModal, setCurrentRoute }) {
  const [activeTab, setActiveTab] = useState('general');

  const disclosureDocs = [
    {
      sl: '1',
      title: 'Copies of Affiliation / Upgradation Letter & Recent Extension of Affiliation',
      authority: 'CBSE New Delhi',
      status: 'Valid & Active',
      docUrl: '#'
    },
    {
      sl: '2',
      title: 'Copies of Societies / Trust / Company Registration / Renewal Certificate',
      authority: 'Registrar of Societies, Govt. of UP',
      status: 'Registered / Perpetual',
      docUrl: '#'
    },
    {
      sl: '3',
      title: 'Copy of No Objection Certificate (NOC) issued by the State Government',
      authority: 'Department of Secondary Education, Uttar Pradesh',
      status: 'Issued & Active',
      docUrl: '#'
    },
    {
      sl: '4',
      title: 'Copies of Recognition Certificate under RTE Act, 2009 & its Renewal',
      authority: 'Basic Shiksha Adhikari (BSA), Ayodhya',
      status: 'Certified',
      docUrl: '#'
    },
    {
      sl: '5',
      title: 'Copy of Valid Building Safety Certificate as per National Building Code (NBC)',
      authority: 'Public Works Department (PWD), Ayodhya',
      status: 'Structure Certified',
      docUrl: '#'
    },
    {
      sl: '6',
      title: 'Copy of Valid Fire Safety Certificate Issued by the Competent Authority',
      authority: 'Chief Fire Officer (CFO), Fire Services Ayodhya',
      status: 'Certified Compliant',
      docUrl: '#'
    },
    {
      sl: '7',
      title: 'Copy of DEO Certificate Submitted by the School for Affiliation',
      authority: 'District Inspector of Schools (DIOS), Ayodhya',
      status: 'Submitted & Endorsed',
      docUrl: '#'
    },
    {
      sl: '8',
      title: 'Copies of Valid Water, Health and Sanitary Condition Certificates',
      authority: 'Chief Medical Officer (CMO) / Nagar Nigam Ayodhya',
      status: 'Potable & Hygienic',
      docUrl: '#'
    }
  ];

  const academicStaff = [
    { role: 'Principal', count: '1 (Dr. Rajeshwari Verma, M.Sc, M.Ed, Ph.D)', detail: '22+ Years Academic Leadership' },
    { role: 'Total No. of Educators', count: '42 Qualified Teachers', detail: '100% CTET / B.Ed Certified' },
    { role: 'PGT (Post Graduate Teachers)', count: '12 Faculty Members', detail: 'Senior Secondary Specialized Stream Leads' },
    { role: 'TGT (Trained Graduate Teachers)', count: '15 Faculty Members', detail: 'Middle School Subject Specialists' },
    { role: 'PRT (Primary Teachers)', count: '11 Educators', detail: 'Experiential & Foundational Wing' },
    { role: 'Teacher-to-Student Ratio', count: '1 : 15', detail: 'Individualized Mentorship Benchmark' },
    { role: 'Special Educator', count: '1 Certified Specialist', detail: 'Inclusive Education & Learning Support' },
    { role: 'Counsellor & Wellness Teacher', count: '1 Full-time Clinical Counsellor', detail: 'Social-Emotional & Career Guidance' }
  ];

  const infrastructureData = [
    { title: 'Total Campus Land Area', value: '5.2 Acres (21,043.6 sq. meters)', note: 'Single contiguous educational campus' },
    { title: 'Total Built-up Area', value: '7,850 sq. meters', note: 'Earthquake-resistant RCC framed superstructure' },
    { title: 'Playground & Sports Area', value: '11,200 sq. meters', note: 'Turf football, athletic track & outdoor courts' },
    { title: 'Total Classrooms', value: '44 Smart Classrooms', note: 'Each 48 sq. meters with interactive digital boards' },
    { title: 'Composite & Physics Lab', value: '96 sq. meters', note: 'Fully equipped as per CBSE Senior Secondary norms' },
    { title: 'Chemistry & Biology Labs', value: '96 sq. meters each', note: 'Fume-hood ventilated with modern lab apparatus' },
    { title: 'Computer Science & AI Lab', value: '45 High-speed Workstations', note: 'Gigabit fiber internet with AI prototyping' },
    { title: 'School Library', value: '8,500+ Books & Periodicals', note: '128 sq. meters reading hall with digital repository' }
  ];

  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <span className="tag-label">STATUTORY COMPLIANCE & GOVERNANCE</span>
          <AnimatedText 
            as="h1"
            className="heading-hero" 
            style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}
            text="MANDATORY PUBLIC DISCLOSURE."
            delay={0.1}
          />
          <p className="text-editorial-lead" style={{ maxWidth: '820px' }}>
            In strict compliance with Appendix IX of the Central Board of Secondary Education (CBSE) Affiliation Bye-Laws, G.D. Goenka Public School, Ayodhya maintains complete institutional transparency for parents, regulatory bodies, and prospective families.
          </p>
        </div>
      </section>

      {/* Navigation Subtabs */}
      <section className="theme-pure-white" style={{ borderBottom: '1px solid var(--color-warm-gray-200)', position: 'sticky', top: 'var(--header-height)', zIndex: 20, background: '#FFFFFF' }}>
        <div className="container" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '1rem 0' }}>
          {[
            { id: 'general', label: 'A: General Information', icon: Building },
            { id: 'documents', label: 'B: Documents & Certificates', icon: FileText },
            { id: 'academics', label: 'C: Academics & Results', icon: GraduationCap },
            { id: 'staff', label: 'D: Staff & Faculty', icon: Users },
            { id: 'infrastructure', label: 'E: Campus Infrastructure', icon: Layers }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: active ? '1px solid var(--color-accent)' : '1px solid var(--color-warm-gray-300)',
                  background: active ? 'var(--color-primary-dark)' : 'transparent',
                  color: active ? '#FFFFFF' : 'var(--color-primary-dark)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={15} style={{ color: active ? 'var(--color-accent)' : 'inherit' }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          
          {/* TAB A: GENERAL INFORMATION */}
          {activeTab === 'general' && (
            <ScrollReveal variant="fadeUp">
              <div style={{ maxWidth: '960px' }}>
                <span className="tag-label">APPENDIX IX • SECTION A</span>
                <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
                  General School Information
                </h2>

                <div style={{ background: 'var(--color-warm-white)', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                    <tbody>
                      {[
                        { no: '1', field: 'NAME OF THE SCHOOL', val: 'G.D. GOENKA PUBLIC SCHOOL, AYODHYA' },
                        { no: '2', field: 'AFFILIATION NUMBER', val: '2133982 (CBSE New Delhi)' },
                        { no: '3', field: 'SCHOOL CODE', val: '71948' },
                        { no: '4', field: 'COMPLETE ADDRESS WITH PIN CODE', val: 'NH-27, Lucknow-Gorakhpur Highway, Near Bypass, Ayodhya, Uttar Pradesh - 224001' },
                        { no: '5', field: 'PRINCIPAL NAME & QUALIFICATION', val: 'Dr. Rajeshwari Verma (M.Sc Physics, M.Ed, Ph.D in Educational Pedagogy)' },
                        { no: '6', field: 'SCHOOL EMAIL ID', val: 'info@gdgoenkaayodhya.com / principal@gdgoenkaayodhya.com' },
                        { no: '7', field: 'CONTACT DETAILS (LANDLINE / MOBILE)', val: '+91 99887 76655 / +91 99887 76656' },
                        { no: '8', field: 'MANAGING TRUST / SOCIETY', val: 'Goenka Educational & Charitable Trust, Ayodhya' }
                      ].map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: idx < 7 ? '1px solid var(--color-warm-gray-200)' : 'none' }}>
                          <td style={{ padding: '1.1rem 1.25rem', width: '60px', fontWeight: 800, color: 'var(--color-accent)' }}>
                            {item.no}.
                          </td>
                          <td style={{ padding: '1.1rem 1.25rem', width: '38%', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                            {item.field}
                          </td>
                          <td style={{ padding: '1.1rem 1.25rem', color: 'var(--color-text-dark)', fontWeight: 500 }}>
                            {item.val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* TAB B: DOCUMENTS AND INFORMATION */}
          {activeTab === 'documents' && (
            <ScrollReveal variant="fadeUp">
              <div style={{ maxWidth: '960px' }}>
                <span className="tag-label">APPENDIX IX • SECTION B</span>
                <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                  Statutory Documents & Approvals
                </h2>
                <p className="text-body" style={{ marginBottom: '2rem' }}>
                  Below are the certified copies of legal approvals, statutory clearances, and safety certificates issued by the designated state and municipal authorities.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {disclosureDocs.map((doc) => (
                    <div
                      key={doc.sl}
                      style={{
                        background: 'var(--color-warm-white)',
                        border: 'var(--border-thin)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '280px' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(224, 145, 69, 0.15)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0, marginTop: '2px' }}>
                          {doc.sl}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-primary-dark)', margin: '0 0 0.35rem 0', lineHeight: 1.35 }}>
                            {doc.title}
                          </h3>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span>Authority: <strong>{doc.authority}</strong></span>
                            <span>•</span>
                            <span style={{ color: '#16A34A', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle2 size={13} /> {doc.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => alert(`Certificate "${doc.title}" verified under official records. Official scanned copy can be inspected at the Administrative Office or requested at info@gdgoenkaayodhya.com`)}
                          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <FileText size={14} /> View Certificate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* TAB C: RESULTS AND ACADEMICS */}
          {activeTab === 'academics' && (
            <ScrollReveal variant="fadeUp">
              <div style={{ maxWidth: '960px' }}>
                <span className="tag-label">APPENDIX IX • SECTION C</span>
                <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                  Academics, Fee Structure & School Committees
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ background: 'var(--color-warm-white)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(224, 145, 69, 0.15)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Calendar size={22} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>Annual Academic Calendar</h3>
                    <p className="text-body" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                      Comprehensive schedule of term examinations, experiential exhibitions, inter-school cultural Olympiads, and national holiday observances for Session 2026-27.
                    </p>
                    <button type="button" className="btn-secondary" onClick={() => setCurrentRoute('/happenings')} style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
                      View Academic Happenings <ArrowRight size={14} />
                    </button>
                  </div>

                  <div style={{ background: 'var(--color-warm-white)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(224, 145, 69, 0.15)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Award size={22} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>Fee Schedule & Structure</h3>
                    <p className="text-body" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                      Complete grade-wise tuition, smart laboratory, and composite fee breakdown published transparently with zero hidden costs.
                    </p>
                    <button type="button" className="btn-enquire" onClick={onOpenFeeModal} style={{ padding: '0.45rem 1.25rem', fontSize: '0.8rem' }}>
                      Open Fee Structure <ExternalLink size={14} />
                    </button>
                  </div>

                  <div style={{ background: 'var(--color-warm-white)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(224, 145, 69, 0.15)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Users size={22} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>School Management & PTA</h3>
                    <p className="text-body" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                      Duly constituted School Management Committee (SMC) and Parent-Teacher Association (PTA) representing diverse pedagogical experts and parent leaders.
                    </p>
                    <span style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 700 }}>
                      ✓ Constitution compliant with CBSE Bye-Laws
                    </span>
                  </div>
                </div>

                <div style={{ background: 'var(--color-warm-white)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                    CBSE Board Examination Performance
                  </h3>
                  <p className="text-body" style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
                    As G.D. Goenka School Ayodhya is a state-of-the-art newly commissioned campus, our first graduating batch of Class X & XII candidates is undergoing intensive academic mentoring for their upcoming board examinations under CBSE New Delhi.
                  </p>
                  <div style={{ padding: '1rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid var(--color-warm-gray-200)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                    <Shield size={18} style={{ color: 'var(--color-accent)' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                      100% Quality Board Readiness & Rigorous Academic Assessment Framework
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* TAB D: STAFF & TEACHING DETAILS */}
          {activeTab === 'staff' && (
            <ScrollReveal variant="fadeUp">
              <div style={{ maxWidth: '960px' }}>
                <span className="tag-label">APPENDIX IX • SECTION D</span>
                <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
                  Staff & Teaching Faculty Profile
                </h2>

                <div style={{ background: 'var(--color-warm-white)', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)', overflow: 'hidden', marginBottom: '2rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--color-warm-gray-100)', borderBottom: '1px solid var(--color-warm-gray-300)' }}>
                        <th style={{ padding: '1rem 1.25rem', color: 'var(--color-primary-dark)', fontWeight: 800 }}>Designation / Parameter</th>
                        <th style={{ padding: '1rem 1.25rem', color: 'var(--color-primary-dark)', fontWeight: 800 }}>Details & Distribution</th>
                        <th style={{ padding: '1rem 1.25rem', color: 'var(--color-primary-dark)', fontWeight: 800 }}>Key Focus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academicStaff.map((staff, idx) => (
                        <tr key={idx} style={{ borderBottom: idx < academicStaff.length - 1 ? '1px solid var(--color-warm-gray-200)' : 'none' }}>
                          <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                            {staff.role}
                          </td>
                          <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                            {staff.count}
                          </td>
                          <td style={{ padding: '1rem 1.25rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                            {staff.detail}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ padding: '1.5rem', background: 'rgba(224, 145, 69, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(224, 145, 69, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--color-primary-dark)', fontSize: '1.05rem' }}>Interested in Joining Our Faculty?</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-dark)' }}>We welcome dedicated educators committed to progressive CBSE and global pedagogies.</p>
                  </div>
                  <button type="button" className="btn-enquire" onClick={() => setCurrentRoute('/careers')}>
                    Explore Careers & Openings <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* TAB E: SCHOOL INFRASTRUCTURE */}
          {activeTab === 'infrastructure' && (
            <ScrollReveal variant="fadeUp">
              <div style={{ maxWidth: '960px' }}>
                <span className="tag-label">APPENDIX IX • SECTION E</span>
                <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
                  School Infrastructure & Facilities
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                  {infrastructureData.map((infra, idx) => (
                    <div 
                      key={idx}
                      style={{ 
                        background: 'var(--color-warm-white)', 
                        padding: '1.5rem', 
                        borderRadius: 'var(--radius-md)', 
                        border: 'var(--border-thin)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Facility Metric {idx + 1}
                        </span>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', margin: '0.35rem 0' }}>
                          {infra.title}
                        </h3>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-accent)', margin: '0.5rem 0' }}>
                          {infra.value}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-warm-gray-200)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                        {infra.note}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: 'var(--color-warm-white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                    Safety, Sanitation & Surveillance Norms
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <CheckCircle2 size={18} style={{ color: '#16A34A', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)' }}>
                        <strong>Fire Safety:</strong> Smoke detectors, water hydrants & certified extinguishers on every floor.
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <CheckCircle2 size={18} style={{ color: '#16A34A', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)' }}>
                        <strong>RO Drinking Water:</strong> Central commercial multi-stage RO filtration with daily potability tests.
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <CheckCircle2 size={18} style={{ color: '#16A34A', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)' }}>
                        <strong>CCTV Coverage:</strong> 120+ High-definition night-vision cameras with restricted monitoring control room.
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <CheckCircle2 size={18} style={{ color: '#16A34A', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)' }}>
                        <strong>Medical Infirmary:</strong> Certified full-time pediatric nurse on campus with emergency doctor on-call.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
