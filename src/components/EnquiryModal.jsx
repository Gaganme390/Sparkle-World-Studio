import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Loader2, Sparkles, BookOpen, Award, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { schoolStore } from '../utils/schoolStore';
import MagneticButton from './MagneticButton';
import './Modal.css';

export const GRADE_OPTIONS = [
  { value: 'Pre-Nursery / Nursery', label: 'Pre-Nursery / Nursery (Age 3-4)' },
  { value: 'KG / Prep', label: 'KG / Prep (Age 4-5)' },
  { value: 'Grades I to V (Primary Wing)', label: 'Grades I to V (Primary Wing)' },
  { value: 'Grades VI to VIII (Middle Wing)', label: 'Grades VI to VIII (Middle Wing)' },
  { value: 'Grades IX & XI (Senior Wing)', label: 'Grades IX & XI (Senior Wing)' }
];

export const SENIOR_WING_STREAMS = {
  'Science Stream': [
    'Physics & Chemistry',
    'Mathematics / Biology',
    'Computer Science / Artificial Intelligence',
    'Physical Education',
    'JEE & NEET Integrated Guidance'
  ],
  'Commerce Stream': [
    'Accountancy & Business Studies',
    'Economics & Financial Markets',
    'Applied Mathematics / Informatics Practices',
    'Entrepreneurship & Case Studies',
    'CUET, CA-Foundation & IPMAT Mentorship'
  ],
  'Humanities & Liberal Arts': [
    'Political Science & International Relations',
    'Psychology & Sociology',
    'History & Economics',
    'Legal Studies & Fine Arts',
    'CLAT, Civil Services & Liberal Arts Orientation'
  ],
  'Robotics & STEM Hub': [
    'Robotics & AI Innovation Lab',
    'Autonomous Systems & Microcontrollers',
    'Artificial Intelligence & ML Logic',
    'Olympiads & Hackathon Mentorship',
    'Rapid Prototyping & 3D Lab'
  ],
  'Competitive Prep & Admissions Cell': [
    'JEE / NEET Integrated Foundation',
    'CUET / IPMAT / CA Foundation Mentorship',
    'CLAT & Civil Services Orientation',
    'SAT & Global University Admissions Cell'
  ]
};

export const SENIOR_CLASS_OPTIONS = [
  'Grade 9 (Pre-Senior Secondary)',
  'Grade 10 (Secondary Board Year)',
  'Grade 11 (Senior Secondary Stream Entry)',
  'Grade 12 (Senior Board & Competitive Focus)'
];

export const CAREER_GOAL_OPTIONS = [
  'Engineering / Tech (JEE / B.Tech / CS)',
  'Medical / Life Sciences (NEET / MBBS)',
  'Commerce, Finance & Management (CUET / IPMAT / CA)',
  'Law, Policy & Public Administration (CLAT / UPSC)',
  'Design, AI & Creative Media',
  'Overseas Higher Education (SAT / Global Admissions)',
  'CBSE Senior Secondary Board Distinction'
];

export const normalizeGrade = (grade) => {
  if (!grade) return 'Pre-Nursery / Nursery';
  const g = String(grade).trim();
  const lower = g.toLowerCase();

  const direct = GRADE_OPTIONS.find(opt => opt.value.toLowerCase() === lower);
  if (direct) return direct.value;

  if (lower === 'pre-nursery' || (lower.includes('nursery') && !lower.includes('kg'))) {
    return 'Pre-Nursery / Nursery';
  }
  if (lower.includes('kg') || lower.includes('prep') || lower.includes('kindergarten')) {
    return 'KG / Prep';
  }
  if (lower.includes('primary') || lower.includes('i to v') || lower.includes('1 to 5') || lower.includes('grade 1-5') || lower.includes('grade 1 - 5')) {
    return 'Grades I to V (Primary Wing)';
  }
  if (lower.includes('middle') || lower.includes('vi to viii') || lower.includes('6 to 8') || lower.includes('grade 6-8') || lower.includes('grade 6 - 8')) {
    return 'Grades VI to VIII (Middle Wing)';
  }
  if (lower.includes('senior') || lower.includes('ix & xi') || lower.includes('ix') || lower.includes('xi') || lower.includes('grade 9-11') || lower.includes('grade 9 - 11') || lower.includes('science') || lower.includes('commerce') || lower.includes('humanities') || lower.includes('robotics')) {
    return 'Grades IX & XI (Senior Wing)';
  }

  return g;
};

export default function EnquiryModal({ isOpen, onClose, initialGrade, initialData }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (window.__lenis) window.__lenis.stop();
    } else {
      document.body.style.overflow = 'auto';
      if (window.__lenis) window.__lenis.start();
    }
    return () => {
      document.body.style.overflow = 'auto';
      if (window.__lenis) window.__lenis.start();
    };
  }, [isOpen]);

  const defaultGrade = normalizeGrade(initialData?.grade || initialGrade);
  const isSeniorByDefault = defaultGrade === 'Grades IX & XI (Senior Wing)';

  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    childName: '',
    applyingGrade: defaultGrade,
    targetSeniorGrade: initialData?.targetSeniorGrade || 'Grade 11 (Senior Secondary Stream Entry)',
    stream: initialData?.stream || (isSeniorByDefault ? 'Science Stream' : ''),
    subjectTrack: initialData?.subject || '',
    careerGoal: initialData?.careerGoal || '',
    preferredDate: '',
    message: '',
    consent: true
  });

  // Track if a specific subject was targeted when opened
  const [activeSubjectPrompt, setActiveSubjectPrompt] = useState(initialData?.subject || '');

  useEffect(() => {
    if (isOpen) {
      const targetGrade = normalizeGrade(initialData?.grade || initialGrade);
      const isSenior = targetGrade === 'Grades IX & XI (Senior Wing)' || !!initialData?.stream;

      const matchedStream = initialData?.stream || (isSenior ? 'Science Stream' : '');
      const availableSubjects = SENIOR_WING_STREAMS[matchedStream] || [];
      const matchedSubject = initialData?.subject || (isSenior ? (availableSubjects[0] || 'All Stream Core Subjects') : '');

      setFormData((prev) => ({
        ...prev,
        applyingGrade: targetGrade,
        stream: matchedStream,
        subjectTrack: matchedSubject,
        targetSeniorGrade: initialData?.targetSeniorGrade || prev.targetSeniorGrade || 'Grade 11 (Senior Secondary Stream Entry)',
        careerGoal: initialData?.careerGoal || prev.careerGoal || ''
      }));

      setActiveSubjectPrompt(initialData?.subject || '');
    }
  }, [isOpen, initialGrade, initialData]);

  const isSeniorWing = formData.applyingGrade === 'Grades IX & XI (Senior Wing)';

  // Handle stream change
  const handleStreamChange = (newStream) => {
    const subjects = SENIOR_WING_STREAMS[newStream] || [];
    setFormData((prev) => ({
      ...prev,
      stream: newStream,
      subjectTrack: subjects[0] || `All ${newStream} Subjects`
    }));
  };

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.parentName.trim()) errs.parentName = 'Parent name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/\s+/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.childName.trim()) errs.childName = "Child's name is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // Save enriched enquiry to schoolStore
    schoolStore.addEnquiry({
      parentName: formData.parentName,
      phone: formData.phone,
      email: formData.email,
      childName: formData.childName,
      applyingGrade: formData.applyingGrade,
      stream: isSeniorWing ? (formData.stream || 'Science Stream') : '',
      subjectTrack: isSeniorWing ? (formData.subjectTrack || 'All Core Stream Subjects') : '',
      targetSeniorGrade: isSeniorWing ? formData.targetSeniorGrade : '',
      careerGoal: isSeniorWing ? formData.careerGoal : '',
      preferredDate: formData.preferredDate,
      message: formData.message
    });

    // Simulate server response
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setSubmitting(false);
    setActiveSubjectPrompt('');
    setFormData({
      parentName: '',
      phone: '',
      email: '',
      childName: '',
      applyingGrade: normalizeGrade(initialGrade),
      targetSeniorGrade: 'Grade 11 (Senior Secondary Stream Entry)',
      stream: '',
      subjectTrack: '',
      careerGoal: '',
      preferredDate: '',
      message: '',
      consent: true
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={resetAndClose} data-lenis-prevent="true">
        <motion.div 
          className="modal-content"
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* Dark Navy Header */}
          <div className="visit-modal-header">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-accent)', letterSpacing: '0.15em', marginBottom: '0.35rem' }}>
                <Sparkles size={14} /> ADMISSIONS 2026-27
              </div>
              <h2 className="modal-title">Online Admission Enquiry</h2>
              <p className="modal-subtitle">
                {isSeniorWing 
                  ? 'Senior Wing Academic Stream & Subject Specialization Enquiry' 
                  : 'Begin your child’s educational journey at GD Goenka Ayodhya.'}
              </p>
            </div>
            <button className="btn-close-modal" onClick={resetAndClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="success-state">
              <div className="success-icon">
                <CheckCircle size={36} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.75rem' }}>Enquiry Submitted Successfully</h3>
              <p className="text-body" style={{ maxWidth: '480px', lineHeight: 1.6 }}>
                Thank you, <strong>{formData.parentName}</strong>. We have logged your enquiry for <strong>{formData.childName}</strong>
                {isSeniorWing && formData.subjectTrack && (
                  <> focusing on <strong>{formData.stream} • {formData.subjectTrack}</strong></>
                )}. Our admissions directorate will contact you at <strong>{formData.phone}</strong> within 24 business hours.
              </p>
              <button 
                className="btn-enquire" 
                onClick={resetAndClose}
                style={{ marginTop: '1rem' }}
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              
              {/* Optional Active Specific Subject Banner */}
              {isSeniorWing && activeSubjectPrompt && (
                <div className="senior-active-subject-alert">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={16} color="var(--color-accent, #b39759)" />
                    <span>
                      Inquiring for: <strong>{formData.stream}</strong> • <strong style={{ color: 'var(--color-primary-dark)' }}>{activeSubjectPrompt}</strong>
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', background: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    Senior Wing Focus
                  </span>
                </div>
              )}

              <div className="form-grid form-grid-2col">
                <div className="form-group">
                  <label className="form-label">Parent / Guardian Name *</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  />
                  {errors.parentName && <span className="form-error">{errors.parentName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    className="form-input"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-grid form-grid-2col" style={{ marginTop: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    className="form-input"
                    placeholder="parent@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Child's Full Name *</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="e.g. Aarav Sharma"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  />
                  {errors.childName && <span className="form-error">{errors.childName}</span>}
                </div>
              </div>

              <div className="form-grid form-grid-2col" style={{ marginTop: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Grade / Wing Applying For</label>
                  <select 
                    className="form-select"
                    value={formData.applyingGrade}
                    onChange={(e) => {
                      const newGrade = e.target.value;
                      const senior = newGrade === 'Grades IX & XI (Senior Wing)';
                      setFormData({ 
                        ...formData, 
                        applyingGrade: newGrade,
                        stream: senior ? (formData.stream || 'Science Stream') : '',
                        subjectTrack: senior ? (formData.subjectTrack || 'Physics & Chemistry') : ''
                      });
                    }}
                  >
                    {GRADE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                    {!GRADE_OPTIONS.some(o => o.value === formData.applyingGrade) && formData.applyingGrade && (
                      <option value={formData.applyingGrade}>{formData.applyingGrade}</option>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Visit Date (Optional)</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>
              </div>

              {/* SENIOR WING PARTICULAR SUBJECT & STREAM CUSTOMIZATION BLOCK */}
              {isSeniorWing && (
                <div className="senior-spec-card">
                  <div className="senior-spec-header">
                    <div className="senior-spec-title">
                      <Award size={15} color="var(--color-accent, #b39759)" />
                      <span>Senior Wing Academic Specialization</span>
                    </div>
                    <span className="senior-spec-badge">Grades 9 – 12 Track</span>
                  </div>

                  <div className="form-grid form-grid-2col">
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700 }}>
                        Target Senior Class *
                      </label>
                      <select
                        className="form-select"
                        value={formData.targetSeniorGrade}
                        onChange={(e) => setFormData({ ...formData, targetSeniorGrade: e.target.value })}
                      >
                        {SENIOR_CLASS_OPTIONS.map((cls) => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700 }}>
                        Academic Stream *
                      </label>
                      <select
                        className="form-select"
                        value={formData.stream || 'Science Stream'}
                        onChange={(e) => handleStreamChange(e.target.value)}
                      >
                        {Object.keys(SENIOR_WING_STREAMS).map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-grid form-grid-2col" style={{ marginTop: '0.85rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700 }}>
                        Specific Subject / Elective Focus *
                      </label>
                      <select
                        className="form-select"
                        value={formData.subjectTrack}
                        onChange={(e) => setFormData({ ...formData, subjectTrack: e.target.value })}
                      >
                        <option value={`All ${formData.stream || 'Stream'} Core & Elective Subjects`}>
                          All {formData.stream || 'Stream'} Core & Elective Subjects
                        </option>
                        {(SENIOR_WING_STREAMS[formData.stream] || SENIOR_WING_STREAMS['Science Stream']).map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Career / Competitive Exam Focus (Optional)
                      </label>
                      <select
                        className="form-select"
                        value={formData.careerGoal}
                        onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                      >
                        <option value="">Select primary aspiration (optional)</option>
                        {CAREER_GOAL_OPTIONS.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label className="form-label">Specific Query or Message (Optional)</label>
                <textarea 
                  className="form-textarea"
                  rows="3"
                  placeholder={isSeniorWing 
                    ? "Mention any specific subject combination, laboratory queries, entrance preparation needs, or transport requirements..."
                    : "Ask about curriculum, transport routes, or sports facilities..."}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <div className="form-checkbox-group">
                <input 
                  type="checkbox" 
                  id="enquiry-consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                />
                <label htmlFor="enquiry-consent" className="form-checkbox-label">
                  I give consent to G.D. Goenka School, Ayodhya to contact me via Call, SMS, or WhatsApp regarding admissions.
                </label>
              </div>

              <MagneticButton strength={4} style={{ width: '100%' }}>
                <button 
                  type="submit" 
                  className="form-submit-btn"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      Submit Enquiry <Send size={16} />
                    </>
                  )}
                </button>
              </MagneticButton>

            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
