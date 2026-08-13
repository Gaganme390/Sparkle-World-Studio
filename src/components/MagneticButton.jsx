import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * Desktop-only subtle magnetic button wrapper.
 * Moves button towards cursor position by up to ±6px.
 * Automatically disabled on touch devices or prefers-reduced-motion.
 *
 * @param {React.ReactNode} children - Button component or HTML element
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 * @param {number} strength - Maximum pixel displacement (default 6)
 */
export default function MagneticButton({
  children,
  className = '',
  style,
  strength = 6,
  as: Tag = 'div',
  ...rest
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    let bounds = el.getBoundingClientRect();

    const handleMouseMove = (e) => {
      bounds = el.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const deltaX = (e.clientX - centerX) / (bounds.width / 2);
      const deltaY = (e.clientY - centerY) / (bounds.height / 2);

      gsap.to(el, {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <Tag
      ref={containerRef}
      className={`magnetic-wrap ${className}`}
      style={{ display: 'inline-block', willChange: 'transform', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
