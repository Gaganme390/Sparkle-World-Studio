import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import './Modal.css';

export default function EnquiryModal({ isOpen, onClose }) {
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
    preferredDate: '',
    message: '',
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
    // Simulate server API interaction
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setSubmitting(false);
    setFormData({
      parentName: '',
      phone: '',
      email: '',
      childName: '',
      applyingGrade: 'Nursery',
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

          <div className="modal-header">
            <div>
              <span className="tag-label">ADMISSIONS 2026-27</span>
              <h2 className="modal-title">Online Admission Enquiry</h2>
              <p className="modal-subtitle">Begin your child’s educational journey at GD Goenka Ayodhya</p>
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
              <p className="text-body" style={{ maxWidth: '440px' }}>
                Thank you, <strong>{formData.parentName}</strong>. Our admissions directorate will contact you at <strong>{formData.phone}</strong> within 24 business hours with prospectus details.
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
                  <label className="form-label">Grade Applying For</label>
                  <select 
                    className="form-select"
                    value={formData.applyingGrade}
                    onChange={(e) => setFormData({ ...formData, applyingGrade: e.target.value })}
                  >
                    <option value="Pre-Nursery">Pre-Nursery</option>
                    <option value="Nursery">Nursery / KG</option>
                    <option value="Grade 1-5">Primary Wing (Grade 1 - 5)</option>
                    <option value="Grade 6-8">Middle Wing (Grade 6 - 8)</option>
                    <option value="Grade 9-11">Senior Wing (Grade 9 - 11)</option>
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

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label className="form-label">Specific Query or Message (Optional)</label>
                <textarea 
                  className="form-textarea"
                  rows="3"
                  placeholder="Ask about curriculum, transport routes, or sports facilities..."
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
