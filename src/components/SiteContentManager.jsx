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
  Filter
} from 'lucide-react';
import { siteContent, normKey, normText } from '../utils/siteContent';
import { compressAndReadImage, formatImageUrl } from './AdminImageUpload';
import { SITE_VISUAL_AREAS } from '../data/siteVisualAreas';

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

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndReadImage(file, (dataUrl) => {
        setFormValues(prev => ({ ...prev, image: dataUrl }));
        siteContent.setImage(area.image, dataUrl);
      }, 1200, 0.82);
    }
    e.target.value = '';
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    const formatted = formatImageUrl(urlInput);
    setFormValues(prev => ({ ...prev, image: formatted }));
    siteContent.setImage(area.image, formatted);
    setUrlInput('');
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
          {isModified && (
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#FFFFFF', background: '#2E7D32', padding: '2px 8px', borderRadius: '99px' }}>
              CUSTOMIZED
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
  const [url, setUrl] = useState('');
  const effective = override || item.src;

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      compressAndReadImage(f, (data) => siteContent.setImage(item.key, data), 1200, 0.82);
    }
    e.target.value = '';
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', padding: '0.9rem', background: '#FFFFFF', border: '1px solid rgba(18,57,133,0.1)', borderRadius: 10, alignItems: 'center' }}>
      <div style={{ width: 120, height: 80, borderRadius: 8, overflow: 'hidden', background: '#F3EFEA' }}>
        <img src={effective} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <strong style={{ fontSize: '0.8rem', wordBreak: 'break-all' }}>{item.src.split('/').pop()}</strong>
          {override && <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#FFFFFF', background: '#2E7D32', padding: '2px 8px', borderRadius: 99 }}>CUSTOM PHOTO</span>}
        </div>
        <div style={{ fontSize: '0.72rem', color: '#6b6b6b', margin: '0.2rem 0 0.5rem' }}>Used in: {item.pages.join(' • ')}</div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
          {override && (
            <button type="button" className="btn-admin-secondary" onClick={() => siteContent.setImage(item.key, '')} style={{ fontSize: '0.78rem' }}>
              <RotateCcw size={14} /> Reset
            </button>
          )}
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

  useEffect(() => {
    scanAllMedia().then(setScannedMedia);
  }, []);

  // Distinct categories from curated visual areas
  const categories = useMemo(() => {
    const set = new Set();
    SITE_VISUAL_AREAS.forEach(a => set.add(a.category));
    return [...set].sort();
  }, []);

  // Filtered curated areas
  const filteredAreas = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SITE_VISUAL_AREAS.filter(area => {
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
  }, [categoryFilter, searchQuery]);

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
          alert('Site content backup restored successfully!');
        } else {
          alert('Invalid backup file. Please provide a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
    e.target.value = '';
  };

  return (
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
              if (window.confirm('Are you sure you want to reset ALL custom photos and text back to original school defaults?')) {
                siteContent.resetAll();
              }
            }}
            style={{ color: '#D32F2F', borderColor: 'rgba(211, 47, 47, 0.3)' }}
          >
            <Trash2 size={15} /> Reset All to Default
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
            <option value="all">📁 All Website Sections ({SITE_VISUAL_AREAS.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        )}
      </div>

      {/* CONTENT LIST */}
      {activeSubTab === 'areas' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
  );
}
