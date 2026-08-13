import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP ScrollTrigger-based viewport reveals.
 * Returns a ref to attach to the container element.
 */
export default function useScrollReveal({
  variant = 'fadeUp',
  delay = 0,
  duration = 0.8,
  trigger,
  start = 'top 90%',
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
      const targets = stagger ? Array.from(el.children) : el;
      if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

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
          onRefresh: (self) => {
            if (self.progress > 0) {
              self.animation.progress(1);
            }
          }
        },
      };

      if (stagger && Array.isArray(targets) && targets.length > 0) {
        toVars.stagger = staggerAmount;
      }

      gsap.fromTo(targets, fromVars, toVars);
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration, trigger, start, stagger, staggerAmount]);

  return ref;
}

function getFromVars(variant) {
  switch (variant) {
    case 'fadeUp':
      return { opacity: 0, y: 35 };
    case 'fadeLeft':
      return { opacity: 0, x: -35 };
    case 'fadeRight':
      return { opacity: 0, x: 35 };
    case 'clipUp':
      return { opacity: 0, clipPath: 'inset(100% 0 0 0)' };
    case 'scaleIn':
      return { opacity: 0, scale: 0.94 };
    case 'fadeIn':
      return { opacity: 0 };
    default:
      return { opacity: 0, y: 35 };
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
