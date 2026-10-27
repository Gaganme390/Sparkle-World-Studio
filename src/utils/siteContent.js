// Universal Reactive Content & Photo Management System for GD Goenka Ayodhya
// Supports instant photo uploads, URL/Google Drive links, text edits, and live DOM synchronization.

const STORAGE_KEY = 'gd_goenka_site_content_v2';
const listeners = new Set();

const emptyState = () => ({
  images: {},
  texts: {},
  areas: {}
});

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('gd_goenka_site_content_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        images: parsed.images || {},
        texts: parsed.texts || {},
        areas: parsed.areas || {}
      };
    }
  } catch (err) {
    console.warn('Failed to parse site content overrides:', err);
  }
  return emptyState();
};

let state = loadState();

export const safeDecode = (s) => {
  try { return decodeURI(s); } catch { return s; }
};

export const normKey = (s) => safeDecode(String(s || '').trim());
export const normText = (s) => String(s || '').replace(/\s+/g, ' ').trim();

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    alert('Browser storage capacity reached. Please paste an image URL or Google Drive link instead of uploading raw large files.');
    return false;
  }
  listeners.forEach((fn) => fn(state));
  return true;
};

export const siteContent = {
  getState: () => state,
  subscribe: (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  setImage: (origSrc, newSrc) => {
    if (!origSrc) return;
    const k = normKey(origSrc);
    const prev = state;
    state = { ...state, images: { ...state.images } };
    if (newSrc && normKey(newSrc) !== k) {
      state.images[k] = newSrc;
    } else {
      delete state.images[k];
    }
    if (!persist()) state = prev;
  },

  setText: (origText, newText) => {
    if (!origText) return;
    const k = normText(origText);
    state = { ...state, texts: { ...state.texts } };
    if (newText && normText(newText) !== k) {
      state.texts[k] = newText;
    } else {
      delete state.texts[k];
    }
    persist();
  },

  setArea: (areaId, origData, overrides) => {
    state = { ...state, areas: { ...state.areas, [areaId]: overrides } };

    // Also link image and text keys so they automatically cascade everywhere
    if (overrides.image !== undefined) {
      siteContent.setImage(origData.image, overrides.image);
    }
    if (overrides.title !== undefined) {
      siteContent.setText(origData.title, overrides.title);
    }
    if (overrides.subtitle !== undefined) {
      siteContent.setText(origData.subtitle, overrides.subtitle);
    }
    if (overrides.desc !== undefined) {
      siteContent.setText(origData.desc, overrides.desc);
    }
  },

  resetArea: (areaId, origData) => {
    const nextAreas = { ...state.areas };
    delete nextAreas[areaId];
    state = { ...state, areas: nextAreas };

    if (origData.image) siteContent.setImage(origData.image, '');
    if (origData.title) siteContent.setText(origData.title, '');
    if (origData.subtitle) siteContent.setText(origData.subtitle, '');
    if (origData.desc) siteContent.setText(origData.desc, '');
    persist();
  },

  resetAll: () => {
    state = emptyState();
    persist();
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('gd_goenka_site_content_v1');
    } catch (e) {}
  },

  exportJSON: () => JSON.stringify(state, null, 2),

  importJSON: (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      state = {
        images: parsed.images || {},
        texts: parsed.texts || {},
        areas: parsed.areas || {}
      };
      return persist();
    } catch {
      return false;
    }
  }
};

const URL_RE = /url\((['"]?)(.*?)\1\)/;

/**
 * Universal DOM Applier: Searches every image and text block in the DOM
 * and replaces matching originals with custom administrative edits.
 */
export function applyOverrides(root = document.body) {
  if (!root) return;
  const { images, texts } = state;
  const hasImages = Object.keys(images).length > 0;
  const hasTexts = Object.keys(texts).length > 0;

  // 1. Image Replacement (img elements & style backgrounds)
  if (root.querySelectorAll) {
    root.querySelectorAll('img').forEach((img) => {
      const orig = img.getAttribute('data-orig-src') || img.getAttribute('src');
      if (!orig) return;
      const over = images[normKey(orig)];
      if (over) {
        if (img.getAttribute('src') !== over) {
          if (!img.hasAttribute('data-orig-src')) img.setAttribute('data-orig-src', orig);
          img.removeAttribute('srcset');
          img.setAttribute('src', over);
        }
      } else if (img.hasAttribute('data-orig-src')) {
        img.setAttribute('src', img.getAttribute('data-orig-src'));
        img.removeAttribute('data-orig-src');
      }
    });

    root.querySelectorAll('[style*="url("]').forEach((el) => {
      const m = (el.getAttribute('style') || '').match(URL_RE);
      if (!m) return;
      const over = images[normKey(m[2])];
      if (over) {
        if (!el.hasAttribute('data-orig-bg')) el.setAttribute('data-orig-bg', m[2]);
        el.style.backgroundImage = `url("${over}")`;
      } else if (el.hasAttribute('data-orig-bg')) {
        el.style.backgroundImage = `url("${el.getAttribute('data-orig-bg')}")`;
        el.removeAttribute('data-orig-bg');
      }
    });
  }

  // 2. Text Replacement (TreeWalker on text nodes + Leaf element textContent)
  if (hasTexts) {
    if (document.createTreeWalker) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => {
          const p = n.parentNode;
          if (!p || /^(SCRIPT|STYLE|TEXTAREA|INPUT|NOSCRIPT)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
          return n.nodeValue && n.nodeValue.trim().length > 2 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((n) => {
        const over = texts[normText(n.nodeValue)];
        if (over !== undefined && n.nodeValue !== over) {
          n.nodeValue = over;
        }
      });
    }

    // Direct element check for headings and lead paragraphs with nested markup
    if (root.querySelectorAll) {
      root.querySelectorAll('h1, h2, h3, h4, p, span.sp-lead-summary, span.sp-item-desc, p.exp-desc, p.achieve-desc').forEach((el) => {
        if (el.children.length <= 1) {
          const text = normText(el.textContent);
          const over = texts[text];
          if (over !== undefined && el.textContent !== over) {
            el.textContent = over;
          }
        }
      });
    }
  }
}
