import React, { useEffect, useState } from 'react';
import { X, Sparkles, Heart, Send, Crown, Cake, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSchoolData } from '../hooks/useSchoolData';
import './BirthdayCelebrationModal.css';

export default function BirthdayCelebrationModal({ isOpen, onClose }) {
  const { todaysBirthdays, birthdayWishesWall, store } = useSchoolData();

  const [wishForm, setWishForm] = useState({
    studentName: '',
    senderName: '',
    message: ''
  });
  const [wishSent, setWishSent] = useState(false);

  // Trigger confetti burst on open
  useEffect(() => {
    if (!isOpen) return;

    // Trigger dual cannon celebratory confetti
    try {
      const end = Date.now() + 1.2 * 1000;
      const colors = ['#E09145', '#FCD9B8', '#FFFFFF', '#FFD700', '#FF69B4'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch (err) {
      console.warn('Confetti error:', err);
    }

    // Default select first student in wish form
    if (todaysBirthdays.length > 0) {
      setWishForm((prev) => ({
        ...prev,
        studentName: prev.studentName || todaysBirthdays[0].name
      }));
    }

    // Stop Lenis scroll if active
    if (window.__lenis) window.__lenis.stop();
    document.body.style.overflow = 'hidden';

    return () => {
      if (window.__lenis) window.__lenis.start();
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, todaysBirthdays]);

  if (!isOpen) return null;

  const triggerExtraConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E09145', '#FCD9B8', '#FFD700', '#FFFFFF']
    });
  };

  const handleSendWish = (e) => {
    e.preventDefault();
    if (!wishForm.message.trim() || !wishForm.senderName.trim()) return;

    store.addBirthdayWish({
      studentName: wishForm.studentName || (todaysBirthdays[0]?.name || 'Goenkan Star'),
      senderName: wishForm.senderName,
      message: wishForm.message
    });

    triggerExtraConfetti();
    setWishSent(true);
    setWishForm((prev) => ({ ...prev, message: '' }));
    setTimeout(() => setWishSent(false), 3000);
  };

  return (
    <div 
      className="bday-modal-overlay" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      data-lenis-prevent="true"
    >
      <div 
        className="bday-modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Header */}
        <header className="bday-modal-header">
          <div className="bday-header-glow" />
          <button 
            type="button" 
            className="bday-modal-close-btn" 
            onClick={onClose}
            aria-label="Close celebration modal"
          >
            <X size={18} />
          </button>

          <div className="bday-crest-icon">
            <Cake size={26} />
          </div>

          <h2 className="bday-modal-title">Happy Birthday, Young Goenkans!</h2>
          <p className="bday-modal-subtitle">
            The entire GD Goenka Ayodhya family joins in celebrating our bright stars celebrating their birthday today.
          </p>
        </header>

        {/* Body Content */}
        <div className="bday-modal-body" data-lenis-prevent="true">
          {/* Celebrants Grid */}
          <div className="bday-cards-grid">
            {todaysBirthdays.length > 0 ? (
              todaysBirthdays.map((student) => (
                <div key={student.id} className="bday-child-card">
                  <div className="bday-crown-badge" title="Birthday Star">
                    <Crown size={16} />
                  </div>

                  <div className="bday-card-photo-wrapper">
                    {student.photo ? (
                      <img src={student.photo} alt={student.name} className="bday-card-photo" />
                    ) : (
                      <div className="bday-card-photo-fallback">
                        {student.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <h3 className="bday-card-name">{student.name}</h3>
                  <div className="bday-card-grade-pill">
                    {student.grade}{student.section ? ` - Sec ${student.section}` : ''}
                  </div>

                  <p className="bday-card-blessing">
                    "{student.wishes || 'May your journey be illuminated with curiosity, leadership, and boundless success!'}"
                  </p>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem 1rem', color: 'rgba(255,255,255,0.7)' }}>
                <PartyPopper size={36} style={{ color: 'var(--color-accent)', marginBottom: '0.75rem' }} />
                <p>No birthdays registered for today. Use the Admin Panel to import or simulate student birthdays.</p>
              </div>
            )}
          </div>

          {/* Interactive Wish Submission Section */}
          <section className="bday-wishes-section">
            <h4 className="bday-section-title">
              <Sparkles size={18} style={{ color: 'var(--color-accent)' }} />
              <span>Send a Birthday Blessing or Wish</span>
            </h4>

            <form onSubmit={handleSendWish} className="bday-wish-form">
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.35rem', color: 'rgba(255,255,255,0.7)' }}>
                  Student
                </label>
                <select 
                  className="bday-select"
                  value={wishForm.studentName}
                  onChange={(e) => setWishForm({ ...wishForm, studentName: e.target.value })}
                >
                  {todaysBirthdays.map((s) => (
                    <option key={s.id} value={s.name} style={{ background: '#17181D' }}>
                      {s.name} ({s.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.35rem', color: 'rgba(255,255,255,0.7)' }}>
                  Your Name (Teacher / Classmate / Parent)
                </label>
                <input 
                  type="text" 
                  className="bday-input"
                  placeholder="e.g. Mrs. Sharma or Class 4-A"
                  value={wishForm.senderName}
                  onChange={(e) => setWishForm({ ...wishForm, senderName: e.target.value })}
                  required
                />
              </div>

              <div className="bday-form-full">
                <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.35rem', color: 'rgba(255,255,255,0.7)' }}>
                  Your Birthday Message
                </label>
                <textarea 
                  className="bday-textarea"
                  placeholder="Write a warm, celebratory wish for the child..."
                  value={wishForm.message}
                  onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                  required
                />
              </div>

              <div className="bday-form-actions">
                <button 
                  type="button" 
                  className="btn-bday-confetti-burst"
                  onClick={triggerExtraConfetti}
                >
                  <PartyPopper size={16} />
                  <span>Burst Confetti</span>
                </button>

                <button type="submit" className="btn-send-wish">
                  <Send size={15} />
                  <span>{wishSent ? 'Wish Sent! 🎉' : 'Post Birthday Wish'}</span>
                </button>
              </div>
            </form>

            {/* Wishes Wall Feed */}
            {birthdayWishesWall && birthdayWishesWall.length > 0 && (
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-soft-accent)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Heart size={13} /> Recent Wishes from School Community
                </div>
                <div className="bday-wishes-feed">
                  {birthdayWishesWall.slice(0, 5).map((w) => (
                    <div key={w.id} className="bday-wish-item">
                      <div className="bday-wish-header">
                        <span className="bday-wish-for">For {w.studentName}</span>
                        <span className="bday-wish-from">— {w.senderName} ({w.timestamp})</span>
                      </div>
                      <div className="bday-wish-text">"{w.message}"</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
