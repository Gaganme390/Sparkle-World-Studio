import React, { useEffect } from 'react';
import { 
  AlertTriangle, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  Info, 
  X 
} from 'lucide-react';

/**
 * AdminConfirmModal - Premium UI confirmation prompt dialog for admin actions.
 * Replaces native browser/chrome confirm() popups with a school-branded luxury interface.
 */
export default function AdminConfirmModal({
  isOpen,
  title = 'Are you sure?',
  subtitle = '',
  message = '',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // 'danger' | 'warning' | 'info' | 'success'
  onConfirm,
  onCancel
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel?.();
      } else if (e.key === 'Enter') {
        onConfirm?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onConfirm, onCancel]);

  if (!isOpen) return null;

  // Icon & color styling by variant
  const variantStyles = {
    danger: {
      iconBg: '#FEE2E2',
      iconBorder: '#FECACA',
      iconColor: '#DC2626',
      Icon: Trash2,
      confirmBg: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
      confirmShadow: '0 4px 14px rgba(220, 38, 38, 0.35)',
      confirmHoverBg: '#991B1B'
    },
    warning: {
      iconBg: '#FEF3C7',
      iconBorder: '#FDE68A',
      iconColor: '#D97706',
      Icon: AlertTriangle,
      confirmBg: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
      confirmShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
      confirmHoverBg: '#92400E'
    },
    info: {
      iconBg: '#EFF6FF',
      iconBorder: '#BFDBFE',
      iconColor: '#2563EB',
      Icon: RotateCcw,
      confirmBg: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
      confirmShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
      confirmHoverBg: '#1E40AF'
    },
    success: {
      iconBg: '#ECFDF5',
      iconBorder: '#A7F3D0',
      iconColor: '#059669',
      Icon: CheckCircle2,
      confirmBg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      confirmShadow: '0 4px 14px rgba(5, 150, 105, 0.35)',
      confirmHoverBg: '#065F46'
    }
  };

  const current = variantStyles[variant] || variantStyles.danger;
  const ModalIcon = current.Icon;

  return (
    <div 
      className="admin-modal-overlay"
      onClick={onCancel}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(11, 26, 56, 0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeInOverlay 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div 
        className="admin-modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '0 25px 60px -12px rgba(11, 26, 56, 0.4), 0 0 0 1px rgba(11, 26, 56, 0.08)',
          width: '100%',
          maxWidth: 480,
          overflow: 'hidden',
          position: 'relative',
          animation: 'scaleUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Subtle Top Accent Ribbon */}
        <div 
          style={{
            height: 4,
            width: '100%',
            background: current.confirmBg
          }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748B',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E2E8F0';
            e.currentTarget.style.color = '#0F172A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F1F5F9';
            e.currentTarget.style.color = '#64748B';
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Body */}
        <div style={{ padding: '2rem 1.75rem 1.5rem 1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
            <div 
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: current.iconBg,
                border: `1.5px solid ${current.iconBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: current.iconColor,
                flexShrink: 0
              }}
            >
              <ModalIcon size={24} />
            </div>

            <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
              {subtitle && (
                <div 
                  style={{
                    display: 'inline-block',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: 6,
                    padding: '2px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#64748B',
                    letterSpacing: '0.02em',
                    marginBottom: 6,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {subtitle}
                </div>
              )}
              <h3 
                style={{
                  margin: 0,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#0F172A',
                  lineHeight: 1.3
                }}
              >
                {title}
              </h3>
            </div>
          </div>

          <div 
            style={{
              color: '#475569',
              fontSize: '0.925rem',
              lineHeight: 1.55,
              marginBottom: '1.75rem',
              whiteSpace: 'pre-line'
            }}
          >
            {message}
          </div>

          {/* Action Buttons */}
          <div 
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: 10,
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#334155',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.borderColor = '#94A3B8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = '#CBD5E1';
              }}
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: 10,
                border: 'none',
                background: current.confirmBg,
                color: '#FFFFFF',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: current.confirmShadow,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.08)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * AdminToast - Non-blocking, modern floating notification banner.
 */
export function AdminToast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 99999,
        background: '#FFFFFF',
        borderRadius: 14,
        padding: '0.9rem 1.25rem',
        boxShadow: '0 12px 36px -4px rgba(11, 26, 56, 0.22), 0 0 0 1px rgba(11, 26, 56, 0.08)',
        borderLeft: `4px solid ${isSuccess ? '#10B981' : isError ? '#EF4444' : '#2563EB'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        maxWidth: 420,
        animation: 'slideUpToast 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div 
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: isSuccess ? '#ECFDF5' : isError ? '#FEF2F2' : '#EFF6FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isSuccess ? '#059669' : isError ? '#DC2626' : '#2563EB',
          flexShrink: 0
        }}
      >
        {isSuccess ? <CheckCircle2 size={18} /> : isError ? <AlertTriangle size={18} /> : <Info size={18} />}
      </div>

      <div style={{ flex: 1, minWidth: 0, fontSize: '0.875rem', fontWeight: 500, color: '#1E293B', lineHeight: 1.45 }}>
        {toast.message}
      </div>

      <button
        type="button"
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#94A3B8',
          cursor: 'pointer',
          padding: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
