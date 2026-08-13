import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, Clock, MapPin, Loader2, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import './Modal.css';

export default function CampusVisitModal({ isOpen, onClose }) {
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

  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    childName: '',
    applyingGrade: 'Nursery',
    visitDate: '',
    timeSlot: '10:00 AM - 11:30 AM',
    interests: ['STEM & AI Suites', 'Classroom Tour'],
    consent: true
  });

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
    if (!formData.visitDate) errs.visitDate = 'Please select a preferred visit date';
    return errs;
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      const updated = exists 
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      parentName: '',
      phone: '',
      email: '',
      childName: '',
      applyingGrade: 'Nursery',
      visitDate: '',
      timeSlot: '10:00 AM - 11:30 AM',
      interests: ['STEM & AI Suites', 'Classroom Tour'],
      consent: true
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="modal-backdrop" 
        onClick={onClose}
        style={{ overscrollBehavior: 'contain' }}
      >
        <motion.div 
          className="modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-accent)', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                <Compass size={14} /> CAMPUS WALKTHROUGH & TOUR
              </div>
              <h2 className="modal-title">Book a Campus Visit</h2>
              <p className="modal-subtitle">Experience our classrooms, STEM suites, sports arenas, and leadership in person.</p>
            </div>
            <button className="btn-close-modal" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          {/* Success State */}
          {submitted ? (
            <div className="success-state">
              <div className="success-icon">
                <CheckCircle size={36} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.75rem', color: 'var(--color-primary-dark)' }}>
                Campus Walkthrough Requested!
              </h3>
              <p className="text-body" style={{ maxWidth: '440px', margin: '0 auto' }}>
                Thank you, <strong>{formData.parentName}</strong>. Your campus visit request for <strong>{formData.visitDate}</strong> ({formData.timeSlot}) has been logged. Our admissions desk will call you to confirm your slot.
              </p>
              <div style={{ padding: '1.25rem', background: 'var(--color-warm-white)', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)', width: '100%', maxWidth: '420px', textAlign: 'left', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-primary-dark)', fontWeight: '700', marginBottom: '0.5rem' }}>
                  <MapPin size={16} style={{ color: 'var(--color-accent)' }} /> G.D. Goenka School Ayodhya
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  NH-28 / Highway Corridor, Ayodhya, Uttar Pradesh 224001<br />
                  Admissions Desk: +91 98765 43210
                </div>
              </div>
              <MagneticButton strength={4}>
                <button className="form-submit-btn" onClick={handleReset} style={{ marginTop: '1rem', width: 'auto', padding: '0.75rem 2rem' }}>
                  Done
                </button>
              </MagneticButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
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
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-grid form-grid-2col" style={{ marginTop: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="rajesh@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Child's Name *</label>
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

              <div className="form-grid form-grid-2col" style={{ marginTop: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Applying Grade</label>
                  <select 
                    className="form-select"
                    value={formData.applyingGrade}
                    onChange={(e) => setFormData({ ...formData, applyingGrade: e.target.value })}
                  >
                    <option value="Nursery">Nursery / KG</option>
                    <option value="Grade 1-5">Primary (Grades 1-5)</option>
                    <option value="Grade 6-8">Middle (Grades 6-8)</option>
                    <option value="Grade 9-12">Senior Secondary (Grades 9-12)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Visit Date *</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  />
                  {errors.visitDate && <span className="form-error">{errors.visitDate}</span>}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1.25rem' }}>
                <label className="form-label">Preferred Time Slot</label>
                <select 
                  className="form-select"
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                >
                  <option value="10:00 AM - 11:30 AM">Morning Slot (10:00 AM - 11:30 AM)</option>
                  <option value="12:30 PM - 02:00 PM">Mid-day Slot (12:30 PM - 02:00 PM)</option>
                  <option value="02:30 PM - 04:00 PM">Afternoon Slot (02:30 PM - 04:00 PM)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginTop: '1.25rem' }}>
                <label className="form-label">Tour Interest Areas</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', marginTop: '0.35rem' }}>
                  {['STEM & AI Suites', 'Classroom Tour', 'Sports & Aquatic Pool', 'Meet Leadership'].map((item) => (
                    <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-primary-dark)', cursor: 'pointer', background: 'var(--color-warm-white)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: 'var(--border-thin)' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.interests.includes(item)}
                        onChange={() => handleInterestToggle(item)}
                        accentColor="var(--color-accent)"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <MagneticButton strength={3}>
                <button type="submit" className="form-submit-btn" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="spin-icon" /> Submitting Request...
                    </>
                  ) : (
                    <>
                      Confirm & Schedule Campus Walkthrough <Calendar size={18} />
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
