import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * Editorial page transition overlay component.
 * Uses a charcoal #17181D panel with amber accent line that slides across the screen
 * during route navigation.
 * 
 * Provides a helper function `triggerTransition(onPeakComplete)` to initiate navigation.
 */

let globalTriggerTransition = null;

export function animatePageTransition(onPeak) {
  if (globalTriggerTransition) {
    globalTriggerTransition(onPeak);
  } else {
    onPeak();
  }
}

export default function PageTransition() {
  const panelRef = useRef(null);
  const accentRef = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const panel = panelRef.current;
    const accent = accentRef.current;
    if (!panel || !accent) return;

    globalTriggerTransition = (onPeak) => {
      if (isAnimating.current) {
        onPeak();
        return;
      }

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        onPeak();
        return;
      }

      isAnimating.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(panel, { y: '100%' });
          gsap.set(accent, { scaleX: 0 });
          isAnimating.current = false;
        },
      });

      // Reset initial position
      gsap.set(panel, { y: '100%' });
      gsap.set(accent, { scaleX: 0 });

      // Stage 1: Panel slides up from bottom
      tl.to(panel, {
        y: '0%',
        duration: 0.35,
        ease: 'power3.in',
      })
      // Stage 2: Amber accent line draws across top edge
      .to(accent, {
        scaleX: 1,
        duration: 0.15,
        ease: 'power2.out',
      })
      // Peak coverage: Change route and scroll to top
      .call(() => {
        if (onPeak) onPeak();
      })
      // Stage 3: Panel slides up and off top of screen
      .to(panel, {
        y: '-100%',
        duration: 0.4,
        ease: 'power3.out',
      }, '+=0.05');
    };

    return () => {
      globalTriggerTransition = null;
    };
  }, []);

  return (
    <div ref={panelRef} className="page-transition-panel" aria-hidden="true">
      <div ref={accentRef} className="transition-accent" />
    </div>
  );
}
