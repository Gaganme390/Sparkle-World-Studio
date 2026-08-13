import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Line-by-line text reveal using clip-path masks.
 * Wraps each line in an overflow-hidden container and clips it upward.
 *
 * @param {string} text - The text to animate (or use children)
 * @param {string} as - HTML tag (default 'h2')
 * @param {string} className - Additional CSS classes
 * @param {object} style - Additional inline styles
 * @param {number} delay - Delay before animation starts
 * @param {number} stagger - Delay between lines (default 0.12)
 */
export default function AnimatedText({
  children,
  text,
  as: Tag = 'h2',
  className = '',
  style,
  delay = 0,
  stagger = 0.12,
  ...rest
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll('.anim-line');
      if (lines.length === 0) return;

      gsap.set(lines, { 
        y: '110%',
        opacity: 0,
      });

      gsap.to(lines, {
        y: '0%',
        opacity: 1,
        duration: 0.9,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger]);

  // If text prop is provided, split on <br> or newlines
  const content = text || (typeof children === 'string' ? children : null);

  if (content) {
    const lines = content.split(/\n|<br\s*\/?>/gi).filter(Boolean);
    return (
      <Tag ref={containerRef} className={className} style={style} {...rest}>
        {lines.map((line, i) => (
          <span key={i} className="anim-line-mask" style={{ display: 'block', overflow: 'hidden' }}>
            <span className="anim-line" style={{ display: 'block' }}
              dangerouslySetInnerHTML={{ __html: line.trim() }}
            />
          </span>
        ))}
      </Tag>
    );
  }

  // For JSX children, wrap each child in a mask
  const childArray = React.Children.toArray(children);
  return (
    <Tag ref={containerRef} className={className} style={style} {...rest}>
      {childArray.map((child, i) => (
        <span key={i} className="anim-line-mask" style={{ display: 'block', overflow: 'hidden' }}>
          <span className="anim-line" style={{ display: 'block' }}>
            {child}
          </span>
        </span>
      ))}
    </Tag>
  );
}
