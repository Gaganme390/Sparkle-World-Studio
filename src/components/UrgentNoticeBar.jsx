import React, { useState } from 'react';
import { Megaphone, ArrowRight, X } from 'lucide-react';
import { useSchoolData } from '../hooks/useSchoolData';

export default function UrgentNoticeBar({ setCurrentRoute }) {
  const { urgentNotice } = useSchoolData();
  const [dismissed, setDismissed] = useState(false);

  if (!urgentNotice || !urgentNotice.enabled || dismissed) return null;

  const handleClick = (e) => {
    if (urgentNotice.link) {
      e.preventDefault();
      setCurrentRoute(urgentNotice.link);
    }
  };

  return (
    <div 
      style={{
        background: 'var(--color-primary-dark)',
        color: '#FFFFFF',
        fontSize: '0.82rem',
        padding: '0.45rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        zIndex: 98
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span 
          style={{
            background: 'var(--color-accent)',
            color: '#17181D',
            fontSize: '0.68rem',
            fontWeight: 800,
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}
        >
          {urgentNotice.badge || 'NOTICE'}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.92)' }}>{urgentNotice.text}</span>
        {urgentNotice.link && (
          <a 
            href={urgentNotice.link} 
            onClick={handleClick}
            style={{
              color: 'var(--color-soft-accent)',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              borderBottom: '1px dotted var(--color-soft-accent)'
            }}
          >
            {urgentNotice.linkText || 'Learn More'} <ArrowRight size={13} />
          </a>
        )}
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        style={{
          position: 'absolute',
          right: '1rem',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          padding: '0.2rem',
          display: 'flex',
          alignItems: 'center'
        }}
        aria-label="Dismiss notice"
      >
        <X size={14} />
      </button>
    </div>
  );
}
