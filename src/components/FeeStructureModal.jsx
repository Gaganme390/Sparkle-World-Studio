import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Mail, Phone, FileSpreadsheet, Loader2, Check, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import './Modal.css';

export default function FeeStructureModal({ isOpen, onClose }) {
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
    targetGrade: 'Nursery / KG',
    deliveryMode: 'Email & WhatsApp',
    feeComponents: ['Tuition & Academic Fee', 'Transport Routes & Fee'],
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

  const handleComponentToggle = (component) => {
    setFormData((prev) => {
      const exists = prev.feeComponents.includes(component);
      const updated = exists 
        ? prev.feeComponents.filter((c) => c !== component)
        : [...prev.feeComponents, component];
      return { ...prev, feeComponents: updated };
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
      targetGrade: 'Nursery / KG',
      deliveryMode: 'Email & WhatsApp',
      feeComponents: ['Tuition & Academic Fee', 'Transport Routes & Fee'],
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
        data-lenis-prevent="true"
        style={{ overscrollBehavior: 'contain' }}
      >
        <motion.div 
          className="modal-content"
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Dark Navy Pass Header */}
          <div className="visit-modal-header">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-accent)', letterSpacing: '0.15em', marginBottom: '0.35rem' }}>
                <FileSpreadsheet size={14} /> TRANSPARENT FEE POLICY 2026-27
              </div>
              <h2 className="modal-title">Request Official Fee Schedule</h2>
              <p className="modal-subtitle">Receive itemized tuition fees, transport charges, and annual fee prospectus directly.</p>
            </div>
            <button className="btn-close-modal" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          {/* Success State */}
          {submitted ? (
            <div className="success-state">
              <div className="success-icon">
                <CheckCircle size={42} />
              </div>
              <h3 className="font-display" style={{ fontSize: '1.85rem', color: 'var(--color-primary-dark)' }}>
                Fee Schedule Dispatched!
              </h3>
              <p className="text-body" style={{ maxWidth: '460px', margin: '0 auto' }}>
                Thank you, <strong>{formData.parentName}</strong>. The official 2026-27 Fee Structure for <strong>{formData.targetGrade}</strong> has been sent to <strong>{formData.email}</strong> and via WhatsApp to <strong>{formData.phone}</strong>.
              </p>
              <div style={{ padding: '1.25rem', background: 'var(--color-warm-white)', borderRadius: 'var(--radius-md)', border: 'var(--border-thin)', width: '100%', maxWidth: '440px', textAlign: 'left', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-primary-dark)', fontWeight: '700', marginBottom: '0.5rem' }}>
                  <Download size={16} style={{ color: 'var(--color-accent)' }} /> Delivery Summary
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Requested Grade: {formData.targetGrade}<br />
                  Delivery Channel: {formData.deliveryMode}<br />
                  Itemized Components: {formData.feeComponents.join(', ')}
                </div>
              </div>
              <MagneticButton strength={4}>
                <button className="form-submit-btn" onClick={handleReset} style={{ marginTop: '1rem', width: 'auto', padding: '0.75rem 2rem' }}>
                  Close & Continue
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
                  <label className="form-label">Phone / WhatsApp Number *</label>
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
                  <label className="form-label">Email Address (for PDF Delivery) *</label>
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
                  <label className="form-label">Grade Interested In</label>
                  <select 
                    className="form-select"
                    value={formData.targetGrade}
                    onChange={(e) => setFormData({ ...formData, targetGrade: e.target.value })}
                  >
                    <option value="Pre-Nursery / Nursery / KG">Early Years (Pre-Nursery / Nursery / KG)</option>
                    <option value="Primary (Grade 1 - 5)">Primary Wing (Grades 1 - 5)</option>
                    <option value="Middle (Grade 6 - 8)">Middle Wing (Grades 6 - 8)</option>
                    <option value="Senior (Grade 9 - 11)">Senior Secondary (Grades 9 - 11)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Delivery Channel</label>
                  <select 
                    className="form-select"
                    value={formData.deliveryMode}
                    onChange={(e) => setFormData({ ...formData, deliveryMode: e.target.value })}
                  >
                    <option value="Email & WhatsApp">Email & WhatsApp (Recommended)</option>
                    <option value="Email Only">Email Only (PDF attachment)</option>
                    <option value="WhatsApp Only">WhatsApp Only</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1.25rem' }}>
                <label className="form-label">Breakdown Components Requested</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem', marginTop: '0.35rem' }}>
                  {['Tuition & Academic Fee', 'Transport Routes & Fee', 'One-Time Registration', 'Hostel / Boarding'].map((item) => {
                    const isActive = formData.feeComponents.includes(item);
                    return (
                      <div 
                        key={item} 
                        onClick={() => handleComponentToggle(item)}
                        className={`tour-interest-pill ${isActive ? 'active' : ''}`}
                      >
                        <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: isActive ? '1px solid var(--color-accent)' : '1px solid var(--color-warm-gray-300)', background: isActive ? 'var(--color-accent)' : '#FFFFFF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isActive && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="form-checkbox-group">
                <input 
                  type="checkbox" 
                  id="fee-consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                />
                <label htmlFor="fee-consent" className="form-checkbox-label">
                  I give consent to G.D. Goenka School, Ayodhya to share the official fee schedule via Email/WhatsApp.
                </label>
              </div>

              <MagneticButton strength={3}>
                <button type="submit" className="form-submit-btn" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="spin-icon" /> Generating Fee Schedule...
                    </>
                  ) : (
                    <>
                      Request Fee Breakdown Prospectus <FileSpreadsheet size={18} />
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
