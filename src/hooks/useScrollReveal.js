import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP ScrollTrigger-based viewport reveals.
 * Returns a ref to attach to the container element.
 * 
 * @param {Object} config
 * @param {string} config.variant - 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'clipUp' | 'scaleIn'
 * @param {number} config.delay - delay in seconds (default 0)
 * @param {number} config.duration - animation duration (default 0.8)
 * @param {string} config.trigger - CSS selector for trigger override
 * @param {string} config.start - ScrollTrigger start position (default 'top 85%')
 * @param {boolean} config.stagger - if true, animates direct children with stagger
 * @param {number} config.staggerAmount - stagger delay between children (default 0.1)
 */
export default function useScrollReveal({
  variant = 'fadeUp',
  delay = 0,
  duration = 0.8,
  trigger,
  start = 'top 85%',
  stagger = false,
  staggerAmount = 0.1,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? el.children : el;

      // Set initial state based on variant
      const fromVars = getFromVars(variant);
      const toVars = {
        ...getToVars(variant),
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trigger ? document.querySelector(trigger) : el,
          start,
          toggleActions: 'play none none none',
        },
      };

      if (stagger && el.children.length > 0) {
        toVars.stagger = staggerAmount;
      }

      gsap.set(targets, fromVars);
      gsap.to(targets, toVars);
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration, trigger, start, stagger, staggerAmount]);

  return ref;
}

function getFromVars(variant) {
  switch (variant) {
    case 'fadeUp':
      return { opacity: 0, y: 40 };
    case 'fadeLeft':
      return { opacity: 0, x: -40 };
    case 'fadeRight':
      return { opacity: 0, x: 40 };
    case 'clipUp':
      return { opacity: 0, clipPath: 'inset(100% 0 0 0)' };
    case 'scaleIn':
      return { opacity: 0, scale: 0.92 };
    case 'fadeIn':
      return { opacity: 0 };
    default:
      return { opacity: 0, y: 40 };
  }
}

function getToVars(variant) {
  switch (variant) {
    case 'fadeUp':
      return { opacity: 1, y: 0 };
    case 'fadeLeft':
      return { opacity: 1, x: 0 };
    case 'fadeRight':
      return { opacity: 1, x: 0 };
    case 'clipUp':
      return { opacity: 1, clipPath: 'inset(0% 0 0 0)' };
    case 'scaleIn':
      return { opacity: 1, scale: 1 };
    case 'fadeIn':
      return { opacity: 1 };
    default:
      return { opacity: 1, y: 0 };
  }
}
