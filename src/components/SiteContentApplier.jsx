import { useEffect } from 'react';
import { siteContent, applyOverrides } from '../utils/siteContent';

/**
 * Mounted once in App. Applies Admin-panel photo/text overrides to the live DOM
 * and keeps them applied as pages mount, animate or re-render.
 */
export default function SiteContentApplier() {
  useEffect(() => {
    let frame = 0;
    let applying = false;

    const run = () => {
      frame = 0;
      applying = true;
      if (!window.location.pathname.startsWith('/admin')) applyOverrides(document.body);
      applying = false;
    };
    const schedule = () => {
      if (applying || frame) return;
      frame = requestAnimationFrame(run);
    };

    run();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['src', 'style']
    });
    const unsub = siteContent.subscribe(schedule);

    return () => {
      observer.disconnect();
      unsub();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
