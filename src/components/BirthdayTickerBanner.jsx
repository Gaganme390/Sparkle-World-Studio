import React, { useState } from 'react';
import { Cake, Sparkles, X, ChevronRight, Users } from 'lucide-react';
import { useSchoolData } from '../hooks/useSchoolData';
import './BirthdayTickerBanner.css';

export default function BirthdayTickerBanner({ onOpenCelebration }) {
  const { bannerConfig, todaysBirthdays } = useSchoolData();
  const [dismissed, setDismissed] = useState(false);

  // If banner is disabled in admin or no birthdays today or user dismissed it
  if (!bannerConfig.enabled || todaysBirthdays.length === 0 || dismissed) {
    return null;
  }

  const isMany = todaysBirthdays.length > 2;

  return (
    <aside className="bday-banner-root" role="region" aria-label="Student Birthday Recognition Banner">
      <div className="bday-banner-glow" />
      <div className="container bday-banner-container">
        {/* Left: Badge & Today's Celebrants */}
        <div className="bday-banner-left">
          <div className="bday-badge-tag" onClick={onOpenCelebration} style={{ cursor: 'pointer' }}>
            <Cake size={15} className="bday-tag-icon" />
            <span>Today's Goenkan Birthdays</span>
            {todaysBirthdays.length > 1 && (
              <span className="bday-badge-count">({todaysBirthdays.length})</span>
            )}
          </div>

          <div className="bday-students-stream">
            <div className={`bday-stream-track ${isMany ? 'is-marquee' : ''}`}>
              {/* Primary list */}
              {todaysBirthdays.map((student) => (
                <div 
                  key={student.id} 
                  className="bday-student-chip"
                  onClick={onOpenCelebration}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: 'pointer' }}
                  title={`Wish ${student.name} Happy Birthday!`}
                >
                  {student.photo ? (
                    <img src={student.photo} alt={student.name} className="bday-chip-avatar" />
                  ) : (
                    <div className="bday-chip-avatar-fallback">
                      {student.name.charAt(0)}
                    </div>
                  )}
                  <span className="bday-chip-name">{student.name}</span>
                  <span className="bday-chip-grade">{student.grade}{student.section ? `-${student.section}` : ''}</span>
                </div>
              ))}

              {/* Seamless loop duplicate when scrolling */}
              {isMany && todaysBirthdays.map((student) => (
                <div 
                  key={`dup-${student.id}`} 
                  className="bday-student-chip"
                  onClick={onOpenCelebration}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: 'pointer' }}
                  title={`Wish ${student.name} Happy Birthday!`}
                  aria-hidden="true"
                >
                  {student.photo ? (
                    <img src={student.photo} alt={student.name} className="bday-chip-avatar" />
                  ) : (
                    <div className="bday-chip-avatar-fallback">
                      {student.name.charAt(0)}
                    </div>
                  )}
                  <span className="bday-chip-name">{student.name}</span>
                  <span className="bday-chip-grade">{student.grade}{student.section ? `-${student.section}` : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Trigger Celebration & Dismiss */}
        <div className="bday-banner-actions">
          {todaysBirthdays.length > 3 && (
            <button 
              type="button" 
              className="bday-more-pill"
              onClick={onOpenCelebration}
              title={`View all ${todaysBirthdays.length} birthday celebrants`}
            >
              <Users size={12} />
              <span>+{todaysBirthdays.length} Stars</span>
            </button>
          )}

          <button 
            type="button" 
            className="btn-bday-celebrate"
            onClick={onOpenCelebration}
            aria-label="Celebrate student birthdays"
          >
            <Sparkles size={14} style={{ color: 'var(--color-accent)' }} />
            <span>Celebrate Them</span>
            <ChevronRight size={14} />
          </button>

          <button 
            type="button" 
            className="btn-bday-close"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss birthday announcement"
            title="Dismiss"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
