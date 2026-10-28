import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Image as ImageIcon, 
  FileText, 
  Search, 
  Upload, 
  RotateCcw, 
  Download, 
  Trash2, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Filter,
  Cloud,
  RefreshCw,
  Database,
  Plus
} from 'lucide-react';
import { siteContent, normKey, normText, CLEARED_PHOTO_PLACEHOLDER, isPhotoCleared } from '../utils/siteContent';
import { compressAndReadImage, formatImageUrl } from './AdminImageUpload';
import { SITE_VISUAL_AREAS } from '../data/siteVisualAreas';
import AdminConfirmModal, { AdminToast } from './AdminConfirmModal';

const ConfirmContext = React.createContext({
  requestConfirm: () => {},
  showToast: () => {}
});

// Deep dynamic scan for every other image file referenced across the entire codebase
const sourceModules = import.meta.glob('/src/**/*.{js,jsx}', { query: '?raw', import: 'default' });
const SKIP = /(AdminPage|AdminImageUpload|SiteContentManager|SiteContentApplier|siteContent|excelBirthdayParser|schoolStore|\/main\.jsx|\/hooks\/)/;
const IMG_RE = /(['"`])(\/[^'"`\n\\]+?\.(?:jpe?g|png|webp|gif|avif|svg))\1/gi;

const pageLabel = (path) => {
  const file = path.split('/').pop().replace(/\.(jsx|js)$/, '');
  const dir = path.includes('/data/') ? 'Data' : path.includes('/pages/') ? 'Page' : path.includes('/sections/') ? 'Section' : 'Component';
  return `${file} (${dir})`;
};

let scanCache = null;
async function scanAllMedia() {
  if (scanCache) return scanCache;
  const images = new Map();

  await Promise.all(
    Object.entries(sourceModules)
      .filter(([p]) => !SKIP.test(p))
      .map(async ([path, loader]) => {
        const code = await loader();
        const label = pageLabel(path);

        for (const m of code.matchAll(IMG_RE)) {
          if (m[2].includes('${')) continue;
          const k = normKey(m[2]);
          if (!images.has(k)) images.set(k, { src: m[2], pages: new Set() });
          images.get(k).pages.add(label);
        }
      })
  );

  scanCache = [...images.entries()].map(([key, v]) => ({
    key,
    src: v.src,
    pages: [...v.pages].sort()
  }));
  return scanCache;
}

function useSiteOverrides() {
  const [state, setState] = useState(() => siteContent.getState());
  useEffect(() => siteContent.subscribe((s) => setState({ ...s })), []);
  return state;
}

// Single Visual Area Card (Photo + Title + Subtitle + Description)
function VisualAreaCard({ area, overrides }) {
  const { requestConfirm, showToast } = React.useContext(ConfirmContext);
  const areaOverride = overrides.areas?.[area.id] || {};
  const imageOverride = overrides.images?.[normKey(area.image)];
  const titleOverride = overrides.texts?.[normText(area.title)];
  const subtitleOverride = overrides.texts?.[normText(area.subtitle)];
  const descOverride = overrides.texts?.[normText(area.desc)];

  const currentImage = areaOverride.image || imageOverride || area.image;
  const currentTitle = areaOverride.title !== undefined ? areaOverride.title : (titleOverride !== undefined ? titleOverride : area.title);
  const currentSubtitle = areaOverride.subtitle !== undefined ? areaOverride.subtitle : (subtitleOverride !== undefined ? subtitleOverride : area.subtitle);
  const currentDesc = areaOverride.desc !== undefined ? areaOverride.desc : (descOverride !== undefined ? descOverride : area.desc);

  const [formValues, setFormValues] = useState({
    image: currentImage,
    title: currentTitle,
    subtitle: currentSubtitle,
    desc: currentDesc
  });

  const [urlInput, setUrlInput] = useState('');
  const [savedTick, setSavedTick] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    setFormValues({
      image: currentImage,
      title: currentTitle,
      subtitle: currentSubtitle,
      desc: currentDesc
    });
  }, [currentImage, currentTitle, currentSubtitle, currentDesc]);

  const isModified = 
    formValues.image !== area.image || 
    formValues.title !== area.title || 
    formValues.subtitle !== area.subtitle || 
    formValues.desc !== area.desc;

  const isCleared = isPhotoCleared(currentImage) || isPhotoCleared(formValues.image);
  const hasCustomPhoto = !isCleared && (
    (formValues.image !== area.image && Boolean(formValues.image)) || 
    (Boolean(imageOverride) && !isPhotoCleared(imageOverride)) || 
    (Boolean(areaOverride.image) && !isPhotoCleared(areaOverride.image))
  );
  const isDefault = !hasCustomPhoto && !isCleared;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndReadImage(file, (dataUrl) => {
        siteContent.setImage(area.image, '');
        siteContent.setImage(area.image, dataUrl);
        setFormValues(prev => ({ ...prev, image: dataUrl }));
      }, 1200, 0.82);
    }
    e.target.value = '';
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    const formatted = formatImageUrl(urlInput);
    siteContent.setImage(area.image, '');
    siteContent.setImage(area.image, formatted);
    setFormValues(prev => ({ ...prev, image: formatted }));
    setUrlInput('');
  };

  const handleDeletePhoto = () => {
    // Case 1: Photo is currently deleted/cleared -> Prompt to restore default
    if (isCleared) {
      requestConfirm({
        title: "Restore Default School Photo?",
        subtitle: area.label,
        message: "This photo is currently deleted from the website.\n\nWould you like to restore the original default school photo?",
        confirmText: "Restore Photo",
        cancelText: "Keep Deleted",
        variant: "info",
        onConfirm: () => {
          siteContent.setImage(area.image, '');
          if (overrides.areas?.[area.id]) {
            const updatedArea = { ...overrides.areas[area.id] };
            delete updatedArea.image;
            siteContent.setArea(area.id, area, updatedArea);
          }
          setFormValues(prev => ({ ...prev, image: area.image }));
          setUrlInput('');
          if (fileRef.current) fileRef.current.value = '';
          showToast("Original default photo restored successfully.", "success");
        }
      });
      return;
    }

    // Case 2: Custom photo is active -> Confirm and delete custom photo
    if (hasCustomPhoto) {
      requestConfirm({
        title: "Delete Custom Photo?",
        subtitle: area.label,
        message: "Are you sure you want to delete this custom photo?\n\nThis will remove it from the cloud database and restore the original default school asset.",
        confirmText: "Delete Photo",
        cancelText: "Cancel",
        variant: "danger",
        onConfirm: () => {
          siteContent.setImage(area.image, '');
          if (overrides.areas?.[area.id]) {
            const updatedArea = { ...overrides.areas[area.id] };
            delete updatedArea.image;
            siteContent.setArea(area.id, area, updatedArea);
          }
          setFormValues(prev => ({ ...prev, image: area.image }));
          setUrlInput('');
          if (fileRef.current) fileRef.current.value = '';
          showToast("Custom photo deleted successfully. Restored to default school asset.", "success");
        }
      });
      return;
    }

    // Case 3: Default photo is active -> Confirm and DELETE DEFAULT PHOTO!
    requestConfirm({
      title: "Delete Default Photo from Website?",
      subtitle: area.label,
      message: "Are you sure you want to delete this default photo from the website?\n\nThis will remove the photo from the live website and display a neutral placeholder until you upload a new photo.",
      confirmText: "Delete from Website",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: () => {
        siteContent.setImage(area.image, CLEARED_PHOTO_PLACEHOLDER);
        siteContent.setArea(area.id, area, {
          image: CLEARED_PHOTO_PLACEHOLDER,
          title: formValues.title,
          subtitle: formValues.subtitle,
          desc: formValues.desc
        });
        setFormValues(prev => ({ ...prev, image: CLEARED_PHOTO_PLACEHOLDER }));
        setUrlInput('');
        if (fileRef.current) fileRef.current.value = '';
        showToast("Default photo deleted successfully from the website. It has been replaced with a clean placeholder.", "success");
      }
    });
  };

  const handleSave = () => {
    siteContent.setArea(area.id, area, {
      image: formValues.image,
      title: formValues.title,
      subtitle: formValues.subtitle,
      desc: formValues.desc
    });
    setSavedTick(true);
    setTimeout(() => setSavedTick(false), 2000);
  };

  const handleReset = () => {
    siteContent.resetArea(area.id, area);
    setFormValues({
      image: area.image,
      title: area.title,
      subtitle: area.subtitle,
      desc: area.desc
    });
  };

  return (
    <div style={{
      background: '#FFFFFF',
      border: isModified ? '1.5px solid var(--color-accent, #b39759)' : '1px solid rgba(18, 57, 133, 0.12)',
      borderRadius: '12px',
      padding: '1.25rem',
      boxShadow: isModified ? '0 8px 24px rgba(179, 151, 89, 0.15)' : '0 2px 10px rgba(18, 57, 133, 0.04)',
      display: 'grid',
      gridTemplateColumns: 'minmax(200px, 260px) 1fr',
      gap: '1.5rem',
      position: 'relative',
      alignItems: 'start'
    }}>
      {/* LEFT: PHOTO MANAGEMENT */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-primary-dark, #123985)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Photo Area
          </span>
          {isCleared ? (
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#FFFFFF', background: '#D97706', padding: '2px 8px', borderRadius: '99px' }}>
              PHOTO DELETED
            </span>
          ) : hasCustomPhoto ? (
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#FFFFFF', background: '#2E7D32', padding: '2px 8px', borderRadius: '99px' }}>
              CUSTOM PHOTO
            </span>
          ) : (
            <span style={{ fontSize: '0.68rem', color: '#6B7280', fontWeight: 600 }}>
              DEFAULT PHOTO
            </span>
          )}
        </div>

        {/* Thumbnail Preview */}
        <div style={{
          width: '100%',
          height: '160px',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#F3EFEA',
          border: '1px solid rgba(18, 57, 133, 0.1)',
          position: 'relative'
        }}>
          <img 
            src={formValues.image} 
            alt={formValues.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.style.opacity = '0.4'; }}
          />

          <button
            type="button"
            onClick={handleDeletePhoto}
            title={isCleared ? "Restore original default photo" : hasCustomPhoto ? "Delete custom photo" : "Delete default photo from website"}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: isCleared ? '#2563EB' : '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 9px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
              zIndex: 2
            }}
          >
            {isCleared ? <RotateCcw size={13} /> : <Trash2 size={13} />}
            {isCleared ? 'Restore Default' : hasCustomPhoto ? 'Delete Photo' : 'Delete Default Photo'}
          </button>
        </div>

        <div style={{ fontSize: '0.68rem', color: '#777777', marginTop: '0.35rem', wordBreak: 'break-all' }}>
          Original: {area.image.split('/').pop()}
        </div>

        {/* Photo Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.75rem' }}>
          <label 
            className="btn-admin-secondary" 
            style={{ cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', padding: '0.45rem 0.75rem' }}
          >
            <Upload size={14} /> Upload New Photo
            <input type="file" ref={fileRef} accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <input 
              type="text" 
              className="admin-input" 
              placeholder="Paste URL / GDrive..." 
              value={urlInput} 
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleApplyUrl(); } }}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}
            />
            <button 
              type="button" 
              className="btn-admin-secondary" 
              disabled={!urlInput.trim()} 
              onClick={handleApplyUrl}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              Apply
            </button>
          </div>

          <button 
            type="button" 
            onClick={handleDeletePhoto}
            style={{
              background: isCleared ? '#EFF6FF' : hasCustomPhoto ? '#FEE2E2' : '#FFF1F2',
              color: isCleared ? '#1D4ED8' : '#DC2626',
              border: `1.5px solid ${isCleared ? '#93C5FD' : '#FCA5A5'}`,
              borderRadius: '6px',
              padding: '0.5rem 0.75rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title={isCleared ? "Restore original default photo" : hasCustomPhoto ? "Delete custom photo" : "Delete default photo from website"}
          >
            {isCleared ? <RotateCcw size={14} /> : <Trash2 size={14} />}
            {isCleared ? 'Restore Original Default Photo' : hasCustomPhoto ? 'Delete Custom Photo (Restore Default)' : 'Delete Default Photo from Website'}
          </button>

          {isDefault && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '0.7rem', color: '#6B7280', padding: '0.1rem 0' }}>
              <Check size={12} color="#16A34A" /> Default school photo active
            </div>
          )}
          {isCleared && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '0.7rem', color: '#D97706', padding: '0.1rem 0' }}>
              Photo removed from website. Upload new photo or click Restore.
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: TEXT & CONTENT CONTROLS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-accent, #b39759)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {area.category}
          </div>
          <h3 style={{ margin: '0.15rem 0 0 0', fontSize: '1.05rem', color: 'var(--color-primary-dark, #123985)' }}>
            {area.label}
          </h3>
        </div>

        {/* Title Field */}
        <div>
          <label className="admin-input-label" style={{ fontSize: '0.78rem' }}>Heading / Title</label>
          <input 
            type="text" 
            className="admin-input" 
            value={formValues.title} 
            onChange={(e) => setFormValues(prev => ({ ...prev, title: e.target.value }))}
            style={{ fontWeight: 600 }}
          />
        </div>

        {/* Subtitle / Badge Field */}
        <div>
          <label className="admin-input-label" style={{ fontSize: '0.78rem' }}>Subtitle / Badge / Tag</label>
          <input 
            type="text" 
            className="admin-input" 
            value={formValues.subtitle} 
            onChange={(e) => setFormValues(prev => ({ ...prev, subtitle: e.target.value }))}
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="admin-input-label" style={{ fontSize: '0.78rem' }}>Description / Paragraph Content</label>
          <textarea 
            className="admin-input" 
            rows={3} 
            value={formValues.desc} 
            onChange={(e) => setFormValues(prev => ({ ...prev, desc: e.target.value }))}
            style={{ lineHeight: 1.55 }}
          />
        </div>

        {/* Save & Reset Action Bar */}
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', marginTop: '0.35rem' }}>
          <button 
            type="button" 
            className="btn-admin-primary" 
            onClick={handleSave}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', padding: '0.55rem 1.25rem' }}
          >
            {savedTick ? (
              <>
                <CheckCircle2 size={16} /> Saved to Live Website!
              </>
            ) : (
              <>
                <Check size={16} /> Save Changes
              </>
            )}
          </button>

          {isModified && (
            <button 
              type="button" 
              className="btn-admin-secondary" 
              onClick={handleReset}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '0.55rem 1rem' }}
            >
              <RotateCcw size={14} /> Reset to Original
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Standalone Scanner Item for any remaining photo detected in the codebase
function StandalonePhotoRow({ item, override }) {
  const { requestConfirm, showToast } = React.useContext(ConfirmContext);
  const [url, setUrl] = useState('');
  const isCleared = isPhotoCleared(override);
  const hasCustom = !isCleared && Boolean(override);
  const isDefault = !hasCustom && !isCleared;
  const effective = isCleared ? CLEARED_PHOTO_PLACEHOLDER : (override || item.src);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      compressAndReadImage(f, (data) => {
        siteContent.setImage(item.key, '');
        siteContent.setImage(item.key, data);
      }, 1200, 0.82);
    }
    e.target.value = '';
  };

  const handleDelete = () => {
    if (isCleared) {
      requestConfirm({
        title: "Restore Default Photo?",
        subtitle: item.src,
        message: "This photo is currently deleted from the website.\n\nWould you like to restore the original default school asset?",
        confirmText: "Restore Photo",
        cancelText: "Cancel",
        variant: "info",
        onConfirm: () => {
          siteContent.setImage(item.key, '');
          setUrl('');
          showToast("Original default photo restored.", "success");
        }
      });
      return;
    }

    if (hasCustom) {
      requestConfirm({
        title: "Delete Custom Photo?",
        subtitle: item.src,
        message: "Are you sure you want to delete this custom photo?\n\nClick Delete to remove it and restore the original default asset.",
        confirmText: "Delete Photo",
        cancelText: "Cancel",
        variant: "danger",
        onConfirm: () => {
          siteContent.setImage(item.key, '');
          setUrl('');
          showToast("Custom photo deleted successfully. Restored to default school asset.", "success");
        }
      });
      return;
    }

    requestConfirm({
      title: "Delete Default Photo from Website?",
      subtitle: item.src,
      message: "Are you sure you want to delete this default photo from the website?\n\nThis will remove the photo from the live website and display a neutral placeholder until you upload a new photo.",
      confirmText: "Delete from Website",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: () => {
        siteContent.setImage(item.key, CLEARED_PHOTO_PLACEHOLDER);
        setUrl('');
        showToast("Default photo deleted successfully from the website.", "success");
      }
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', padding: '0.9rem', background: '#FFFFFF', border: '1px solid rgba(18,57,133,0.1)', borderRadius: 10, alignItems: 'center' }}>
      <div style={{ width: 120, height: 80, borderRadius: 8, overflow: 'hidden', background: '#F3EFEA', position: 'relative' }}>
        <img src={effective} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.opacity = '0.4'; }} />
        <button
          type="button"
          onClick={handleDelete}
          title={isCleared ? "Restore original default photo" : hasCustom ? "Delete custom photo" : "Delete default photo from website"}
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            background: isCleared ? '#2563EB' : '#DC2626',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50%',
            width: 22,
            height: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            zIndex: 2
          }}
        >
          {isCleared ? <RotateCcw size={12} /> : <Trash2 size={12} />}
        </button>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <strong style={{ fontSize: '0.8rem', wordBreak: 'break-all' }}>{item.src.split('/').pop()}</strong>
          {isCleared ? (
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#FFFFFF', background: '#D97706', padding: '2px 8px', borderRadius: 99 }}>
              PHOTO DELETED
            </span>
          ) : hasCustom ? (
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#FFFFFF', background: '#2E7D32', padding: '2px 8px', borderRadius: 99 }}>
              CUSTOM PHOTO
            </span>
          ) : (
            <span style={{ fontSize: '0.68rem', color: '#6B7280' }}>Default Asset</span>
          )}
        </div>
        <div style={{ fontSize: '0.72rem', color: '#6b6b6b', margin: '0.2rem 0 0.5rem' }}>Used in: {item.pages.join(' • ')}</div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <label className="btn-admin-secondary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.78rem' }}>
            <Upload size={14} /> Upload photo
            <input type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
          </label>
          <input
            className="admin-input"
            style={{ flex: 1, minWidth: 180, fontSize: '0.78rem' }}
            placeholder="…or paste image URL / Google Drive link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && url.trim()) { siteContent.setImage(item.key, formatImageUrl(url)); setUrl(''); } }}
          />
          <button type="button" className="btn-admin-primary" disabled={!url.trim()} onClick={() => { siteContent.setImage(item.key, formatImageUrl(url)); setUrl(''); }} style={{ fontSize: '0.78rem' }}>
            Apply
          </button>
          <button 
            type="button" 
            onClick={handleDelete} 
            style={{
              background: isCleared ? '#EFF6FF' : hasCustom ? '#FEE2E2' : '#FFF1F2',
              color: isCleared ? '#1D4ED8' : '#DC2626',
              border: `1.5px solid ${isCleared ? '#93C5FD' : '#FCA5A5'}`,
              borderRadius: '6px',
              padding: '0.35rem 0.75rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
            title={isCleared ? "Restore original default photo" : hasCustom ? "Delete custom photo" : "Delete default photo from website"}
          >
            {isCleared ? <RotateCcw size={13} /> : <Trash2 size={13} />}
            {isCleared ? 'Restore Default' : hasCustom ? 'Delete Custom Photo' : 'Delete Default Photo'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SiteContentManager() {
  const overrides = useSiteOverrides();
  const [activeSubTab, setActiveSubTab] = useState('areas'); // 'areas' | 'all-media'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedMedia, setScannedMedia] = useState(null);
  const [cloudStatus, setCloudStatus] = useState('checking'); // 'connected' | 'standby' | 'checking'
  const [isSyncing, setIsSyncing] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);
  const [toast, setToast] = useState(null);

  const requestConfirm = ({
    title,
    subtitle,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    onConfirm
  }) => {
    setConfirmModal({
      title,
      subtitle,
      message,
      confirmText,
      cancelText,
      variant,
      onConfirm: () => {
        setConfirmModal(null);
        if (onConfirm) onConfirm();
      },
      onCancel: () => {
        setConfirmModal(null);
      }
    });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3800);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const checkCloudHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        if (data.details?.connected) {
          setCloudStatus('connected');
        } else {
          setCloudStatus('standby');
        }
      } else {
        setCloudStatus('standby');
      }
    } catch {
      setCloudStatus('standby');
    }
  };

  useEffect(() => {
    scanAllMedia().then(setScannedMedia);
    checkCloudHealth();
  }, []);

  const handleForceCloudSync = async () => {
    setIsSyncing(true);
    try {
      await siteContent.syncAllToCloud();
      await checkCloudHealth();
      showToast('Content successfully pushed and synchronized to PostgreSQL Cloud Database!', 'success');
    } catch (e) {
      showToast('Cloud synchronization request completed.', 'info');
    } finally {
      setIsSyncing(false);
    }
  };

  // Combine curated visual areas with any custom created areas in overrides.areas
  const allCuratedAreas = useMemo(() => {
    const baseIds = new Set(SITE_VISUAL_AREAS.map(a => a.id));
    const customAreas = [];
    if (overrides.areas) {
      Object.entries(overrides.areas).forEach(([id, custom]) => {
        if (!baseIds.has(id) && custom && custom.category) {
          customAreas.push({
            id,
            category: custom.category,
            label: custom.label || `Custom: ${id}`,
            image: custom.image || '/school-media/Opening Photos/campus_grand_exterior_banner.jpg',
            title: custom.title || 'THRIVE FOR LIFE',
            subtitle: custom.subtitle || '',
            desc: custom.desc || ''
          });
        }
      });
    }
    return [...SITE_VISUAL_AREAS, ...customAreas];
  }, [overrides.areas]);

  // Distinct categories from curated visual areas
  const categories = useMemo(() => {
    const set = new Set();
    allCuratedAreas.forEach(a => set.add(a.category));
    return [...set].sort();
  }, [allCuratedAreas]);

  // Filtered curated areas
  const filteredAreas = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allCuratedAreas.filter(area => {
      if (categoryFilter !== 'all' && area.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        area.label.toLowerCase().includes(q) ||
        area.title.toLowerCase().includes(q) ||
        area.desc.toLowerCase().includes(q) ||
        area.category.toLowerCase().includes(q) ||
        area.image.toLowerCase().includes(q)
      );
    });
  }, [allCuratedAreas, categoryFilter, searchQuery]);

  const handleAddHeroSlide = () => {
    const heroSlides = allCuratedAreas.filter(a => a.category === 'Homepage - Hero Slider' || a.id.startsWith('hero-slide-'));
    let maxId = 8;
    heroSlides.forEach(s => {
      const num = parseInt(s.id.replace('hero-slide-', ''), 10);
      if (!isNaN(num) && num > maxId) maxId = num;
    });
    const nextId = maxId + 1;
    const newSlideId = `hero-slide-${nextId}`;
    const newSlideArea = {
      id: newSlideId,
      category: 'Homepage - Hero Slider',
      label: `Hero Slide ${nextId}: Custom Slide`,
      image: '/school-media/Opening Photos/campus_grand_exterior_banner.jpg',
      title: 'THRIVE FOR LIFE',
      subtitle: `Hero Slide ${nextId}`,
      desc: 'Nurturing confident, curious minds ready to thrive in an ever-changing world.'
    };
    siteContent.setArea(newSlideId, newSlideArea, newSlideArea);
    showToast(`Hero Slide ${nextId} created! You can now customize its photo, headline, and narrative below.`, 'success');
  };

  // Filtered standalone media
  const filteredMedia = useMemo(() => {
    if (!scannedMedia) return [];
    const q = searchQuery.trim().toLowerCase();
    return scannedMedia.filter(item => {
      if (!q) return true;
      return item.src.toLowerCase().includes(q) || item.pages.join(' ').toLowerCase().includes(q);
    });
  }, [scannedMedia, searchQuery]);

  const totalCuratedEdited = Object.keys(overrides.areas || {}).length;
  const totalImagesEdited = Object.keys(overrides.images || {}).length;

  const exportBackup = () => {
    const blob = new Blob([siteContent.exportJSON()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `gd-goenka-ayodhya-content-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const success = siteContent.importJSON(evt.target.result);
        if (success) {
          showToast('Site content backup restored successfully!', 'success');
        } else {
          showToast('Invalid backup file. Please provide a valid JSON file.', 'error');
        }
      };
      reader.readAsText(file);
    }
    e.target.value = '';
  };

  return (
    <ConfirmContext.Provider value={{ requestConfirm, showToast }}>
      <div>
        {/* Header Section */}
        <div className="admin-section-header">
          <div className="admin-title-group">
            <h1>Website Photos & Content CMS</h1>
            <p>
              Every single area with a photo and content across the entire website is editable here. Upload photos, paste URLs, or edit headings and narratives with live instant preview.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button type="button" className="btn-admin-secondary" onClick={exportBackup} title="Export all custom photos & text as a JSON backup">
              <Download size={15} /> Backup Edits
            </button>

            <label className="btn-admin-secondary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Upload size={15} /> Restore Backup
              <input type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
            </label>

            <button 
              type="button" 
              className="btn-admin-secondary" 
              onClick={() => {
                requestConfirm({
                  title: 'Reset ALL Photos and Content?',
                  subtitle: 'Global Reset Action',
                  message: 'Are you sure you want to reset ALL custom photos and text back to original school defaults?\n\nThis will clear all changes and restore original defaults.',
                  confirmText: 'Reset Everything',
                  cancelText: 'Cancel',
                  variant: 'danger',
                  onConfirm: () => {
                    siteContent.resetAll();
                    showToast('All custom photos and text have been reset to defaults.', 'info');
                  }
                });
              }}
              style={{ color: '#D32F2F', borderColor: 'rgba(211, 47, 47, 0.3)' }}
            >
              <Trash2 size={15} /> Reset All to Default
            </button>
          </div>
        </div>

      {/* PostgreSQL Cloud DB Live Synchronization Status Bar */}
      <div 
        style={{
          background: cloudStatus === 'connected' 
            ? 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)' 
            : 'linear-gradient(135deg, #FEFCE8 0%, #FEF08A 100%)',
          border: `1.5px solid ${cloudStatus === 'connected' ? '#86EFAC' : '#FDE047'}`,
          borderRadius: '12px',
          padding: '0.9rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div 
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: cloudStatus === 'connected' ? '#16A34A' : '#CA8A04',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}
          >
            <Database size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: '0.92rem', color: cloudStatus === 'connected' ? '#14532D' : '#713F12' }}>
                {cloudStatus === 'connected' ? 'PostgreSQL Cloud Database: Connected & Live' : 'Cloud Sync Server: Active (Local / Standby)'}
              </span>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: 99,
                  background: cloudStatus === 'connected' ? '#22C55E' : '#EAB308',
                  color: '#FFFFFF'
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF', display: 'inline-block' }} />
                {cloudStatus === 'connected' ? 'Worldwide Instant Sync' : 'Standby Cache'}
              </span>
            </div>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: cloudStatus === 'connected' ? '#166534' : '#854D0E', lineHeight: 1.4 }}>
              {cloudStatus === 'connected'
                ? 'When you upload or replace any photo, it commits instantly to PostgreSQL and immediately updates for every parent, student, and visitor across the globe.'
                : 'Server is running with in-memory & local fallback. Provide DATABASE_URL (Render PostgreSQL, Supabase, Neon) to enable permanent multi-region persistence.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleForceCloudSync}
            disabled={isSyncing}
            style={{
              background: '#FFFFFF',
              border: `1.5px solid ${cloudStatus === 'connected' ? '#16A34A' : '#CA8A04'}`,
              color: cloudStatus === 'connected' ? '#15803D' : '#854D0E',
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: isSyncing ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}
          >
            <RefreshCw size={14} className={isSyncing ? 'spin-anim' : ''} />
            {isSyncing ? 'Pushing...' : 'Sync All To Cloud'}
          </button>
        </div>
      </div>

      {/* Primary Sub-Tabs */}
      <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(18, 57, 133, 0.12)', paddingBottom: '0.75rem' }}>
        <button
          type="button"
          onClick={() => setActiveSubTab('areas')}
          style={{
            background: activeSubTab === 'areas' ? 'var(--color-primary-dark, #123985)' : '#FFFFFF',
            color: activeSubTab === 'areas' ? '#FFFFFF' : 'var(--color-primary-dark, #123985)',
            border: '1px solid var(--color-primary-dark, #123985)',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Layers size={16} /> Curated Page Areas ({SITE_VISUAL_AREAS.length} Total Areas)
          {totalCuratedEdited > 0 && (
            <span style={{ background: 'var(--color-accent, #b39759)', color: '#FFFFFF', padding: '2px 8px', borderRadius: '100px', fontSize: '0.72rem' }}>
              {totalCuratedEdited} Edited
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('all-media')}
          style={{
            background: activeSubTab === 'all-media' ? 'var(--color-primary-dark, #123985)' : '#FFFFFF',
            color: activeSubTab === 'all-media' ? '#FFFFFF' : 'var(--color-primary-dark, #123985)',
            border: '1px solid var(--color-primary-dark, #123985)',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <ImageIcon size={16} /> All Codebase Photos ({scannedMedia ? scannedMedia.length : '...'})
          {totalImagesEdited > 0 && (
            <span style={{ background: 'var(--color-accent, #b39759)', color: '#FFFFFF', padding: '2px 8px', borderRadius: '100px', fontSize: '0.72rem' }}>
              {totalImagesEdited} Edited
            </span>
          )}
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem', background: '#FFFFFF', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(18, 57, 133, 0.08)' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: '#888888' }} />
          <input 
            className="admin-input" 
            style={{ paddingLeft: '34px' }} 
            placeholder="Search by area title, description, or image filename..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>

        {activeSubTab === 'areas' && (
          <select 
            className="admin-input" 
            style={{ maxWidth: '280px', fontWeight: 600 }} 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">📁 All Website Sections ({allCuratedAreas.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        )}
      </div>

      {/* CONTENT LIST */}
      {activeSubTab === 'areas' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {(categoryFilter === 'Homepage - Hero Slider' || categoryFilter === 'all') && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(18, 57, 133, 0.05) 0%, rgba(179, 151, 89, 0.12) 100%)',
              border: '1.5px dashed var(--color-accent, #b39759)',
              borderRadius: '12px',
              padding: '1rem 1.35rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              boxShadow: '0 2px 10px rgba(18, 57, 133, 0.04)'
            }}>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--color-primary-dark, #123985)', fontSize: '0.94rem' }}>
                  Homepage Hero Slider Management ({allCuratedAreas.filter(a => a.category === 'Homepage - Hero Slider').length} Configured Slides)
                </div>
                <div style={{ fontSize: '0.78rem', color: '#555555', marginTop: '3px' }}>
                  8 curated slides are ready. Upload photos, edit titles/narratives, or delete photos to omit slides from the live slider.
                </div>
              </div>
              <button
                type="button"
                className="btn-admin-primary"
                onClick={handleAddHeroSlide}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '0.55rem 1.1rem' }}
              >
                <Plus size={16} /> Add Another Hero Slide
              </button>
            </div>
          )}

          {filteredAreas.map(area => (
            <VisualAreaCard 
              key={area.id} 
              area={area} 
              overrides={overrides} 
            />
          ))}

          {filteredAreas.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', background: '#FFFFFF', borderRadius: '10px' }}>
              <p style={{ color: '#777777', margin: 0 }}>No matching website areas found for your search query.</p>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {!scannedMedia ? (
            <p>Scanning all codebase media...</p>
          ) : (
            <>
              {filteredMedia.map(item => (
                <StandalonePhotoRow 
                  key={item.key} 
                  item={item} 
                  override={overrides.images?.[item.key]} 
                />
              ))}

              {filteredMedia.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', background: '#FFFFFF', borderRadius: '10px' }}>
                  <p style={{ color: '#777777', margin: 0 }}>No photos match your search query.</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
      </div>

      {/* Luxury UI Confirmation Prompt Modal */}
      <AdminConfirmModal
        isOpen={Boolean(confirmModal)}
        {...confirmModal}
      />

      {/* Non-blocking Floating Toast Banner */}
      <AdminToast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </ConfirmContext.Provider>
  );
}
