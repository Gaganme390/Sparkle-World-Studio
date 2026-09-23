import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X, Check, Image as ImageIcon } from 'lucide-react';

/**
 * Helper to auto-format Google Drive sharing URLs into direct image view URLs
 */
export function formatImageUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();
  
  // Google Drive file link: https://drive.google.com/file/d/FILE_ID/view...
  const gdriveMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${gdriveMatch[1]}&sz=w1200`;
  }

  // Google Drive id query link: id=FILE_ID
  const gdriveIdMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (trimmed.includes('drive.google.com') && gdriveIdMatch && gdriveIdMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${gdriveIdMatch[1]}&sz=w1200`;
  }

  return trimmed;
}

/**
 * Resizes an image file using an HTML5 Canvas to max 1200px width/height
 * and compresses it to a lightweight data URL (~80-150KB) to ensure rapid loading
 * and prevent exceeding localStorage quotas.
 */
function compressAndReadImage(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 1200;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to compressed jpeg data URL
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      callback(dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

export default function AdminImageUpload({ 
  value = '', 
  onChange, 
  label = 'Image', 
  aspectRatio = '16/9',
  helperText = 'Upload a photo from your computer/device, or paste an image URL.' 
}) {
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [urlInput, setUrlInput] = useState(value || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndReadImage(file, (dataUrl) => {
        onChange(dataUrl);
        setUrlInput('');
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      compressAndReadImage(file, (dataUrl) => {
        onChange(dataUrl);
        setUrlInput('');
      });
    }
  };

  const handleUrlApply = () => {
    if (!urlInput.trim()) return;
    const formatted = formatImageUrl(urlInput);
    onChange(formatted);
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label className="admin-input-label" style={{ margin: 0 }}>{label}</label>
        <div style={{ display: 'flex', gap: '0.25rem', background: '#1A1C23', padding: '2px', borderRadius: '6px' }}>
          <button
            type="button"
            onClick={() => setMode('upload')}
            style={{
              background: mode === 'upload' ? 'var(--color-accent)' : 'transparent',
              color: mode === 'upload' ? '#14151A' : '#94A3B8',
              border: 'none',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Upload size={12} /> Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            style={{
              background: mode === 'url' ? 'var(--color-accent)' : 'transparent',
              color: mode === 'url' ? '#14151A' : '#94A3B8',
              border: 'none',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <LinkIcon size={12} /> Web / GDrive URL
          </button>
        </div>
      </div>

      {/* Input area */}
      {mode === 'upload' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: isDragging ? '2px dashed var(--color-accent)' : '1px dashed rgba(255, 255, 255, 0.2)',
            background: isDragging ? 'rgba(224, 145, 69, 0.08)' : '#1A1C23',
            borderRadius: '8px',
            padding: '1.25rem 1rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          <Upload size={22} style={{ color: 'var(--color-accent)', margin: '0 auto 0.5rem auto' }} />
          <div style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 600 }}>
            Click to upload or drag photo here
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.25rem' }}>
            Supports JPG, PNG, WEBP • Automatically compressed & auto-adjusted
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            className="admin-input"
            placeholder="Paste direct image URL or Google Drive share link..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleUrlApply(); } }}
          />
          <button
            type="button"
            className="btn-admin-secondary"
            onClick={handleUrlApply}
            style={{ whiteSpace: 'nowrap' }}
          >
            Apply
          </button>
        </div>
      )}

      {/* Helper text */}
      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
        {helperText}
      </div>

      {/* Live Preview with Auto-Adjust formatting */}
      {value && (
        <div style={{ marginTop: '0.5rem', background: '#121318', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={13} /> Auto-Adjusted Format (Cover & Centered)
            </span>
            <button
              type="button"
              onClick={handleClear}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#F87171',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              <X size={12} /> Remove
            </button>
          </div>

          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: aspectRatio,
              maxHeight: '180px',
              borderRadius: '6px',
              overflow: 'hidden',
              background: '#0B0C10',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <img
              src={value}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Will display seamlessly on live cards & pages</span>
            <span style={{ color: 'var(--color-accent)' }}>object-fit: cover</span>
          </div>
        </div>
      )}
    </div>
  );
}
