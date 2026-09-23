import React, { useState, useEffect, useRef } from 'react';
import { 
  X, CheckCircle, Briefcase, Mail, Phone, GraduationCap, 
  Clock, FileText, Send, Loader2, Sparkles, Building, 
  Upload, Trash2, Paperclip, AlertCircle, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { schoolStore } from '../utils/schoolStore';
import MagneticButton from './MagneticButton';
import './Modal.css';

export default function JobApplicationModal({ isOpen, onClose, selectedJob = null, jobOpenings = [] }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      if (window.__lenis) window.__lenis.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      if (window.__lenis) window.__lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      if (window.__lenis) window.__lenis.start();
    };
  }, [isOpen]);

  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    positionApplied: '',
    wing: '',
    experienceYears: '',
    qualification: '',
    currentSchool: '',
    resumeUrl: '',
    coverNote: ''
  });

  const [resumeFile, setResumeFile] = useState(null); // { name, size, type, data }
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState('');

  // Update position if selectedJob changes
  useEffect(() => {
    if (selectedJob) {
      setFormData((prev) => ({
        ...prev,
        positionApplied: selectedJob.title || '',
        wing: selectedJob.wing || 'Academic Faculty'
      }));
    } else if (jobOpenings && jobOpenings.length > 0 && !formData.positionApplied) {
      setFormData((prev) => ({
        ...prev,
        positionApplied: jobOpenings[0].title || '',
        wing: jobOpenings[0].wing || 'Academic Faculty'
      }));
    }
  }, [selectedJob, jobOpenings]);

  const processResumeFile = (file) => {
    setFileError('');
    if (!file) return;

    // Allowed extensions
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      setFileError('Please attach a PDF or Word document (.pdf, .doc, .docx)');
      return;
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds 10MB limit. Please upload a smaller file or provide a cloud link.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setResumeFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.type || 'application/pdf',
        data: reader.result
      });
      if (errors.resume) {
        setErrors((prev) => ({ ...prev, resume: null }));
      }
    };
    reader.onerror = () => {
      setFileError('Failed to read file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processResumeFile(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.applicantName.trim()) errs.applicantName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid phone number is required';
    if (!formData.positionApplied.trim()) errs.positionApplied = 'Please select a position';
    if (!formData.experienceYears.trim()) errs.experienceYears = 'Experience duration is required';
    if (!formData.qualification.trim()) errs.qualification = 'Highest qualification is required';
    
    // Require either attached file or a resume URL
    if (!resumeFile && !formData.resumeUrl.trim()) {
      errs.resume = 'Please attach your Resume / CV file (PDF or Word) or provide a cloud link';
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);

    try {
      const newApp = schoolStore.addJobApplication({
        applicantName: formData.applicantName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        positionApplied: formData.positionApplied,
        wing: formData.wing || 'Academic Faculty',
        experienceYears: formData.experienceYears.trim(),
        qualification: formData.qualification.trim(),
        currentSchool: formData.currentSchool.trim(),
        resumeFileName: resumeFile ? resumeFile.name : null,
        resumeFileSize: resumeFile ? resumeFile.size : null,
        resumeFileData: resumeFile ? resumeFile.data : null,
        resumeUrl: formData.resumeUrl.trim(),
        coverNote: formData.coverNote.trim()
      });

      setSubmittedAppId(newApp.id);
    } catch (err) {
      console.error('Failed to submit job application:', err);
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      applicantName: '',
      email: '',
      phone: '',
      positionApplied: selectedJob ? selectedJob.title : '',
      wing: selectedJob ? selectedJob.wing : '',
      experienceYears: '',
      qualification: '',
      currentSchool: '',
      resumeUrl: '',
      coverNote: ''
    });
    setResumeFile(null);
    setFileError('');
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="modal-backdrop"
        onClick={handleReset}
        data-lenis-prevent="true"
        onWheel={(e) => {
          if (e.target === e.currentTarget) e.preventDefault();
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          backgroundColor: 'rgba(23, 24, 29, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          overscrollBehavior: 'contain',
          touchAction: 'none'
        }}
      >
        <motion.div
          className="modal-content"
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          style={{
            maxWidth: '680px',
            maxHeight: '88vh',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            position: 'relative',
            paddingTop: '2.5rem'
          }}
        >
          {/* Close button - explicitly pinned to the TOP-RIGHT corner */}
          <button
            className="btn-close-modal"
            onClick={handleReset}
            aria-label="Close Job Application Modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              zIndex: 30,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <X size={18} />
          </button>

          {!submitted ? (
            <div>
              <div className="modal-header" style={{ marginBottom: '1.25rem', paddingRight: '2.5rem' }}>
                <div>
                  <span className="badge-editorial" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
                    <Briefcase size={13} style={{ display: 'inline', marginRight: '4px' }} /> ACADEMIC & FACULTY RECRUITMENT
                  </span>
                  <h3 className="font-display" style={{ fontSize: '1.75rem', color: 'var(--color-primary-dark)', margin: '0.2rem 0' }}>
                    Faculty & Staff Application
                  </h3>
                  <p className="text-body" style={{ fontSize: '0.88rem', margin: 0 }}>
                    Join the distinguished educator community at G.D. Goenka School, Ayodhya.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Position selection banner */}
                <div style={{ background: 'rgba(224, 145, 69, 0.08)', border: '1px solid rgba(224, 145, 69, 0.25)', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                    Applying For Position *
                  </label>
                  <select
                    className="form-input"
                    value={formData.positionApplied}
                    onChange={(e) => {
                      const pos = e.target.value;
                      const matched = jobOpenings.find((j) => j.title === pos);
                      setFormData({
                        ...formData,
                        positionApplied: pos,
                        wing: matched ? matched.wing : formData.wing
                      });
                      if (errors.positionApplied) setErrors({ ...errors, positionApplied: null });
                    }}
                    style={{ background: '#FFFFFF', fontWeight: 600 }}
                  >
                    {jobOpenings && jobOpenings.length > 0 ? (
                      jobOpenings.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title} ({job.wing}) {job.status === 'Closed' ? '— [Closed]' : ''}
                        </option>
                      ))
                    ) : (
                      <option value={formData.positionApplied || 'Academic Faculty'}>
                        {formData.positionApplied || 'Academic Faculty Position'}
                      </option>
                    )}
                  </select>
                  {errors.positionApplied && <span className="form-error">{errors.positionApplied}</span>}
                </div>

                <div className="form-grid">
                  {/* Full Name */}
                  <div className="form-group">
                    <label className="form-label">Candidate Full Name *</label>
                    <input
                      type="text"
                      className={`form-input ${errors.applicantName ? 'has-error' : ''}`}
                      placeholder="e.g. Dr. Rajeshwari Verma"
                      value={formData.applicantName}
                      onChange={(e) => {
                        setFormData({ ...formData, applicantName: e.target.value });
                        if (errors.applicantName) setErrors({ ...errors, applicantName: null });
                      }}
                    />
                    {errors.applicantName && <span className="form-error">{errors.applicantName}</span>}
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label className="form-label">Contact Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      className={`form-input ${errors.phone ? 'has-error' : ''}`}
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: null });
                      }}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className={`form-input ${errors.email ? 'has-error' : ''}`}
                      placeholder="teacher.name@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  {/* Experience */}
                  <div className="form-group">
                    <label className="form-label">Relevant Teaching Experience *</label>
                    <input
                      type="text"
                      className={`form-input ${errors.experienceYears ? 'has-error' : ''}`}
                      placeholder="e.g. 4 Years (CBSE / ICSE)"
                      value={formData.experienceYears}
                      onChange={(e) => {
                        setFormData({ ...formData, experienceYears: e.target.value });
                        if (errors.experienceYears) setErrors({ ...errors, experienceYears: null });
                      }}
                    />
                    {errors.experienceYears && <span className="form-error">{errors.experienceYears}</span>}
                  </div>

                  {/* Qualification */}
                  <div className="form-group">
                    <label className="form-label">Highest Academic Qualification *</label>
                    <input
                      type="text"
                      className={`form-input ${errors.qualification ? 'has-error' : ''}`}
                      placeholder="e.g. M.Sc Physics + B.Ed / CTET"
                      value={formData.qualification}
                      onChange={(e) => {
                        setFormData({ ...formData, qualification: e.target.value });
                        if (errors.qualification) setErrors({ ...errors, qualification: null });
                      }}
                    />
                    {errors.qualification && <span className="form-error">{errors.qualification}</span>}
                  </div>

                  {/* Current Institution */}
                  <div className="form-group">
                    <label className="form-label">Current / Most Recent School</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Modern Academy / St. Marys"
                      value={formData.currentSchool}
                      onChange={(e) => setFormData({ ...formData, currentSchool: e.target.value })}
                    />
                  </div>

                  {/* RESUME FILE ATTACHMENT AREA */}
                  <div className="form-group form-group-full">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label className="form-label" style={{ margin: 0 }}>
                        Attach Resume / Curriculum Vitae *
                      </label>
                      <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                        PDF, DOC, DOCX (Max 10MB)
                      </span>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      style={{ display: 'none' }}
                    />

                    {!resumeFile ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            processResumeFile(e.dataTransfer.files[0]);
                          }
                        }}
                        style={{
                          border: errors.resume ? '2px dashed #EF4444' : '2px dashed var(--color-warm-gray-300)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.5rem 1.25rem',
                          textAlign: 'center',
                          background: errors.resume ? 'rgba(239, 68, 68, 0.04)' : 'var(--color-warm-white)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(224, 145, 69, 0.12)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Upload size={20} />
                        </div>
                        <div>
                          <span style={{ fontWeight: 700, color: 'var(--color-primary-dark)', fontSize: '0.92rem' }}>
                            Click to browse & attach resume
                          </span>
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}> or drag and drop file</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          Supports direct document attachment: PDF, DOC, DOCX
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          border: '1px solid #86EFAC',
                          borderRadius: 'var(--radius-md)',
                          padding: '0.85rem 1.15rem',
                          background: '#F0FDF4',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                          <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <FileText size={20} />
                          </div>
                          <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontWeight: 700, color: '#14532D', fontSize: '0.9rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                              {resumeFile.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>{resumeFile.size}</span>
                              <span>•</span>
                              <span style={{ fontWeight: 600, color: '#15803D' }}>Attached & Ready</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setResumeFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#991B1B',
                            cursor: 'pointer',
                            padding: '0.35rem 0.5rem',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.78rem',
                            fontWeight: 600
                          }}
                          title="Remove attached file"
                        >
                          <Trash2 size={15} /> Remove
                        </button>
                      </div>
                    )}

                    {fileError && <span className="form-error">{fileError}</span>}
                    {errors.resume && <span className="form-error">{errors.resume}</span>}

                    {/* Optional Cloud/LinkedIn Link */}
                    <div style={{ marginTop: '0.75rem' }}>
                      <label className="form-label" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>
                        Or / Additionally: Google Drive / LinkedIn Portfolio URL (Optional)
                      </label>
                      <input
                        type="url"
                        className="form-input"
                        placeholder="https://drive.google.com/... or LinkedIn URL"
                        value={formData.resumeUrl}
                        onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                        style={{ fontSize: '0.88rem', padding: '0.65rem 0.85rem' }}
                      />
                    </div>
                  </div>

                  {/* Cover Note */}
                  <div className="form-group form-group-full">
                    <label className="form-label">Pedagogical Statement / Cover Note</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      placeholder="Tell us about your teaching philosophy, classroom leadership, or co-curricular contributions..."
                      value={formData.coverNote}
                      onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button type="button" className="btn-secondary" onClick={handleReset} style={{ padding: '0.75rem 1.5rem' }}>
                    Cancel
                  </button>
                  <MagneticButton strength={3}>
                    <button type="submit" className="btn-enquire" disabled={submitting} style={{ padding: '0.75rem 2rem' }}>
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit Job Application <Send size={16} />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(224, 145, 69, 0.15)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <CheckCircle size={36} />
              </div>
              <span className="badge-editorial" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                APPLICATION TRANSMITTED
              </span>
              <h3 className="font-display" style={{ fontSize: '2rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
                Thank You, {formData.applicantName}!
              </h3>
              <p className="text-body" style={{ maxWidth: '480px', margin: '0 auto 1.25rem auto' }}>
                Your application for <strong>{formData.positionApplied}</strong> has been logged in our recruitment portal under reference ID:
              </p>
              <div style={{ display: 'inline-block', background: 'var(--color-warm-gray-100)', padding: '0.5rem 1.25rem', borderRadius: '8px', fontWeight: 800, color: 'var(--color-accent)', letterSpacing: '0.05em', marginBottom: '1.5rem', border: '1px solid var(--color-warm-gray-200)' }}>
                {submittedAppId}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Our Principal and Academic Screening Committee will review your credentials and contact shortlisted applicants via email & phone for preliminary interviews.
              </p>
              <button className="btn-enquire" onClick={handleReset} style={{ margin: '0 auto' }}>
                Return to Careers Page
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

