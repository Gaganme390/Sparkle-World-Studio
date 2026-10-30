import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Compass, 
  ChevronDown, 
  CheckCircle, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  Loader2, 
  Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { admissionSteps, eligibilityGrades, requiredDocuments, admissionFaqs } from '../data/admissions';
import { schoolStore } from '../utils/schoolStore';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import KineticFlair from '../components/KineticFlair';
import FinalCTA from '../components/FinalCTA';
import '../sections/AdmissionsSection.css';
import './AdmissionsPage.css';

const GRADE_OPTIONS = [
  { value: 'Pre-Nursery / Nursery', label: 'Pre-Nursery / Nursery (Age 3-4 Years)' },
  { value: 'KG / Prep', label: 'KG / Prep (Age 4-5 Years)' },
  { value: 'Grades I to V (Primary Wing)', label: 'Grades I to V (Primary Wing)' },
  { value: 'Grades VI to VIII (Middle Wing)', label: 'Grades VI to VIII (Middle Wing)' },
  { value: 'Grades IX & XI (Senior Wing)', label: 'Grades IX & XI (Senior Wing)' }
];

export default function AdmissionsPage({ onOpenEnquiry, onOpenVisit, onOpenFeeModal, setCurrentRoute }) {
  const [openFaq, setOpenFaq] = useState(null);
  const formRef = useRef(null);
  const studentNameInputRef = useRef(null);

  // Embedded Admission Form State
  const [formData, setFormData] = useState({
    childName: '',
    parentName: '',
    phone: '',
    email: '',
    applyingGrade: 'Pre-Nursery / Nursery',
    preferredDate: '',
    message: '',
    consent: true
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scrollToForm = (preselectedGrade = null) => {
    if (preselectedGrade) {
      setFormData(prev => ({ ...prev, applyingGrade: preselectedGrade }));
    }
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        if (studentNameInputRef.current) {
          studentNameInputRef.current.focus();
        }
      }, 500);
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.childName.trim()) {
      errs.childName = "Child / Student's name is required";
    }
    if (!formData.parentName.trim()) {
      errs.parentName = "Parent / Guardian's name is required";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Contact phone number is required";
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.consent) {
      errs.consent = "Please authorize GD Goenka to contact you";
    }
    return errs;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    const refId = `AYO-${Date.now().toString().slice(-6)}`;
    setSubmissionRef(refId);

    // Save to centralized schoolStore
    schoolStore.addEnquiry({
      referenceId: refId,
      childName: formData.childName.trim(),
      parentName: formData.parentName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      applyingGrade: formData.applyingGrade,
      preferredDate: formData.preferredDate || 'Earliest Available',
      message: formData.message.trim(),
      source: 'Admissions Page Embedded Form'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      childName: '',
      parentName: '',
      phone: '',
      email: '',
      applyingGrade: 'Pre-Nursery / Nursery',
      preferredDate: '',
      message: '',
      consent: true
    });
  };

  return (
    <main className="admissions-page">
      {/* 01: ADMISSIONS HERO & CHILD'S JOURNEY HEADER */}
      <section className="admissions-hero-section" id="hero">
        <div className="container">
          <div style={{ maxWidth: '920px' }}>
            <ScrollReveal variant="fadeUp">
              <span className="tag-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                <Sparkles size={14} /> ADMISSIONS 2026-27
                <KineticFlair type="diamond" size={15} />
              </span>
            </ScrollReveal>

            <AnimatedText 
              as="h1"
              className="heading-hero" 
              style={{ marginTop: '0.85rem', marginBottom: '1.25rem' }}
              text="YOUR CHILD'S JOURNEY STARTS HERE."
              delay={0.1}
            />

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-editorial-lead" style={{ maxWidth: '820px' }}>
                A seamless, transparent 5-step admission pathway designed to welcome your family to the Goenkan educational culture in Ayodhya. Follow our pathway below and complete the online admission enquiry to begin your child’s enrollment for Academic Session 2026-27.
              </p>

              <div className="admissions-hero-ctas">
                <MagneticButton strength={6}>
                  <button 
                    className="btn-enquire" 
                    onClick={() => scrollToForm()}
                    style={{ padding: '0.95rem 2rem', fontSize: '1rem' }}
                  >
                    Fill Admission Form ↓
                  </button>
                </MagneticButton>

                <MagneticButton strength={6}>
                  <button 
                    className="btn-menu-trigger" 
                    onClick={onOpenVisit} 
                    style={{ padding: '0.95rem 2rem', fontSize: '1rem' }}
                  >
                    <Compass size={18} /> Schedule Campus Walkthrough
                  </button>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 02: THE 5-STEP CHILD JOURNEY PATHWAY */}
      <section className="child-journey-section" id="journey">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', mdDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <ScrollReveal variant="fadeUp">
                <span className="tag-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  STEP-BY-STEP ADMISSION ROADMAP
                  <KineticFlair type="star" size={14} />
                </span>
              </ScrollReveal>

              <AnimatedText 
                as="h2"
                className="heading-section" 
                style={{ marginTop: '0.5rem' }}
                text="The 5-Step Goenkan Pathway"
                delay={0.1}
              />

              <ScrollReveal variant="fadeUp" delay={0.2}>
                <p className="text-body" style={{ maxWidth: '640px', marginTop: '0.75rem' }}>
                  From initial digital enquiry to the first day of classes, our admission procedure ensures complete clarity, warmth, and guidance for parents.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* 5 Pathway Step Cards */}
          <ScrollReveal className="admissions-steps-grid" stagger staggerAmount={0.1} variant="fadeUp" delay={0.25}>
            {admissionSteps.map((step) => {
              const isVisitStep = step.step === '02' || step.step === '04';
              return (
                <div 
                  key={step.step} 
                  className="step-card hover-lift"
                  style={{ cursor: 'pointer' }}
                  onClick={() => (isVisitStep ? onOpenVisit() : scrollToForm())}
                  title={isVisitStep ? "Click to Book Campus Visit" : "Click to Fill Admission Form"}
                >
                  <h3 className="step-title">{step.title}</h3>
                  <span className="step-sub">{step.subtitle}</span>
                  <p className="step-desc">{step.desc}</p>
                  
                  <span className="journey-step-interactive-badge">
                    {isVisitStep ? (
                      <>Book Walkthrough <ArrowRight size={13} /></>
                    ) : (
                      <>Jump to Form <ArrowRight size={13} /></>
                    )}
                  </span>
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* 03: EMBEDDED ADMISSION ENQUIRY FORM & COUNSELOR DESK */}
      <section className="admission-form-section" id="admission-form" ref={formRef}>
        <div className="container">
          <div className="admission-form-layout">
            
            {/* Left: The Official Interactive Admission Form */}
            <ScrollReveal variant="fadeUp" delay={0.1} className="admission-form-card">
              <div className="admission-form-header">
                <span className="tag-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={14} /> SESSION 2026-27 ADMISSION DESK
                </span>
                <h2 className="admission-form-title">
                  Online Admission Enquiry Form
                </h2>
                <p className="admission-form-lead">
                  Please complete the details below. Our Admissions Dean and Academic Counsellors will review your application and contact you within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="admission-success-card">
                  <div className="success-badge-icon">
                    <CheckCircle size={38} />
                  </div>
                  <h3 className="success-title">Enquiry Submitted Successfully!</h3>
                  <div className="success-ref-pill">
                    Application Reference No: #{submissionRef}
                  </div>
                  <p className="success-desc">
                    Thank you, <strong>{formData.parentName}</strong>. We have received your admission enquiry for <strong>{formData.childName}</strong> applying for <strong>{formData.applyingGrade}</strong>. Our admissions counselor will contact you at <strong>{formData.phone}</strong> shortly.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button 
                      className="btn-enquire" 
                      onClick={handleResetForm}
                      style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
                    >
                      Submit Another Enquiry
                    </button>
                    <button 
                      className="btn-menu-trigger" 
                      onClick={onOpenVisit}
                      style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
                    >
                      <Compass size={16} /> Schedule Campus Visit
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate>
                  <div className="form-grid form-grid-2col" style={{ marginBottom: '1.25rem' }}>
                    
                    {/* Student Name */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="field-childName">
                        Child / Student's Full Name *
                      </label>
                      <input
                        id="field-childName"
                        ref={studentNameInputRef}
                        type="text"
                        className={`form-input ${formErrors.childName ? 'has-error' : ''}`}
                        placeholder="e.g. Aarav Sharma"
                        value={formData.childName}
                        onChange={(e) => handleInputChange('childName', e.target.value)}
                      />
                      {formErrors.childName && (
                        <span className="form-field-error">{formErrors.childName}</span>
                      )}
                    </div>

                    {/* Parent Name */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="field-parentName">
                        Parent / Guardian's Full Name *
                      </label>
                      <input
                        id="field-parentName"
                        type="text"
                        className={`form-input ${formErrors.parentName ? 'has-error' : ''}`}
                        placeholder="e.g. Rajesh Sharma"
                        value={formData.parentName}
                        onChange={(e) => handleInputChange('parentName', e.target.value)}
                      />
                      {formErrors.parentName && (
                        <span className="form-field-error">{formErrors.parentName}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-grid form-grid-2col" style={{ marginBottom: '1.25rem' }}>
                    {/* Phone Number */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="field-phone">
                        Contact Mobile Number *
                      </label>
                      <input
                        id="field-phone"
                        type="tel"
                        className={`form-input ${formErrors.phone ? 'has-error' : ''}`}
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                      {formErrors.phone && (
                        <span className="form-field-error">{formErrors.phone}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="field-email">
                        Email Address *
                      </label>
                      <input
                        id="field-email"
                        type="email"
                        className={`form-input ${formErrors.email ? 'has-error' : ''}`}
                        placeholder="e.g. rajesh@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                      {formErrors.email && (
                        <span className="form-field-error">{formErrors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-grid form-grid-2col" style={{ marginBottom: '1.25rem' }}>
                    {/* Grade Applying For */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="field-applyingGrade">
                        Grade Applying For (Session 2026-27) *
                      </label>
                      <select
                        id="field-applyingGrade"
                        className="form-select"
                        value={formData.applyingGrade}
                        onChange={(e) => handleInputChange('applyingGrade', e.target.value)}
                      >
                        {GRADE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Visit Date */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="field-preferredDate">
                        Preferred Date for Campus Interaction (Optional)
                      </label>
                      <input
                        id="field-preferredDate"
                        type="date"
                        className="form-input"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Message / Query */}
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label" htmlFor="field-message">
                      Any Specific Queries or Notes (Optional)
                    </label>
                    <textarea
                      id="field-message"
                      rows={3}
                      className="form-textarea"
                      placeholder="Mention any specific transport route queries, co-curricular interests, or questions for our academic team..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label className="form-consent-row">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => handleInputChange('consent', e.target.checked)}
                      />
                      <span>
                        I authorize G.D. Goenka Public School Ayodhya to contact me via Call, SMS, WhatsApp, and Email regarding admission updates and school prospectus.
                      </span>
                    </label>
                    {formErrors.consent && (
                      <span className="form-field-error" style={{ display: 'block', marginTop: '0.4rem' }}>
                        {formErrors.consent}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="admission-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Submitting Your Enquiry...
                      </>
                    ) : (
                      <>
                        Submit Admission Enquiry <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </ScrollReveal>

            {/* Right: Admissions Helpline & Campus Office Sidebar */}
            <ScrollReveal variant="fadeLeft" delay={0.2} className="admissions-sidebar-card">
              <span className="sidebar-brand-tag">
                <Sparkles size={14} /> ADMISSIONS DIRECTORY
              </span>
              <h3 className="sidebar-title">
                Admissions Desk & Support
              </h3>

              <ul className="sidebar-contact-list">
                <li className="sidebar-contact-item">
                  <Phone size={20} className="sidebar-contact-icon" />
                  <div>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                      Primary Admission Helplines
                    </span>
                    <a href="tel:+917311125185" className="sidebar-contact-link">
                      +91 73111 25185
                    </a>
                    <a href="tel:+917311125186" className="sidebar-contact-link" style={{ marginTop: '0.2rem' }}>
                      +91 73111 25186
                    </a>
                  </div>
                </li>

                <li className="sidebar-contact-item">
                  <Mail size={20} className="sidebar-contact-icon" />
                  <div>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                      Admissions Email
                    </span>
                    <a href="mailto:info@gdgoenkaayodhya.com" className="sidebar-contact-link">
                      info@gdgoenkaayodhya.com
                    </a>
                  </div>
                </li>

                <li className="sidebar-contact-item">
                  <MapPin size={20} className="sidebar-contact-icon" />
                  <div>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                      Campus Location
                    </span>
                    <span>NH-27 Bypass, Near Ram Ki Paidi Corridor, Ayodhya, UP - 224001</span>
                  </div>
                </li>

                <li className="sidebar-contact-item">
                  <Clock size={20} className="sidebar-contact-icon" />
                  <div>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', display: 'block' }}>
                      Admissions Office Timings
                    </span>
                    <span>Monday – Saturday: 8:30 AM – 4:30 PM</span>
                  </div>
                </li>
              </ul>

              <div className="sidebar-highlights">
                <div className="sidebar-highlights-title">Why Ayodhya Chooses Goenka</div>
                <ul className="sidebar-highlights-list">
                  <li className="sidebar-highlights-item">
                    <Check size={16} /> 10-Acre Safe, Green & Digitally-Enabled Campus
                  </li>
                  <li className="sidebar-highlights-item">
                    <Check size={16} /> Optimal 1:15 Early Childhood Student-Teacher Ratio
                  </li>
                  <li className="sidebar-highlights-item">
                    <Check size={16} /> 100% AC, GPS & Camera-Monitored School Fleet
                  </li>
                  <li className="sidebar-highlights-item">
                    <Check size={16} /> National CBSE Curriculum with Global Leadership
                  </li>
                </ul>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 04: GRADE-WISE ELIGIBILITY CRITERIA TABLE */}
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
                      <button 
                        className="btn-enquire" 
                        onClick={() => scrollToForm(g.grade)} 
                        style={{ padding: '0.45rem 1.15rem', fontSize: '0.82rem' }}
                      >
                        Apply for Grade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollReveal>
        </div>
      </section>

      {/* 05: DOCUMENT CHECKLIST & TRANSPARENT FEE POLICY */}
      <section className="section-padding theme-pure-white" id="documents">
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
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
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
                  <button className="btn-cta-primary" onClick={onOpenFeeModal || (() => scrollToForm())} style={{ width: '100%', justifyContent: 'center' }}>
                    Request Fee Structure Breakdown <ArrowRight size={16} />
                  </button>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 06: PARENT FREQUENT QUESTIONS ACCORDION */}
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

      {/* 07: FINAL CTA */}
      <FinalCTA onOpenEnquiry={() => scrollToForm()} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
