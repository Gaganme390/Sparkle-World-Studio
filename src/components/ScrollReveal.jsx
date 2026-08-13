import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

/**
 * Wrapper component for scroll-triggered reveals.
 * Wraps children in a div that animates into view.
 *
 * @param {string} variant - 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'clipUp' | 'scaleIn' | 'fadeIn'
 * @param {number} delay - delay in seconds
 * @param {number} duration - animation duration in seconds
 * @param {boolean} stagger - animate direct children with stagger
 * @param {number} staggerAmount - stagger delay between items
 * @param {string} className - additional class names
 * @param {object} style - additional inline styles
 * @param {string} as - HTML element tag (default 'div')
 */
export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.8,
  stagger = false,
  staggerAmount = 0.1,
  className = '',
  style,
  as: Tag = 'div',
  ...rest
}) {
  const ref = useScrollReveal({ variant, delay, duration, stagger, staggerAmount });

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
