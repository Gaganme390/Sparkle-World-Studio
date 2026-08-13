import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Viewport-triggered editorial image reveal component.
 * Expands clip-path mask from inset(100% 0 0 0) to inset(0) and scales inner image from 1.08 to 1.
 *
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {string|number} width - Image width
 * @param {string|number} height - Image height
 * @param {string} className - Wrapper container CSS classes
 * @param {object} style - Inline styles for container
 * @param {number} delay - Animation delay
 * @param {string} loading - Eager or lazy (default lazy)
 * @param {string} fetchPriority - Priority hint
 */
export default function ImageReveal({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  delay = 0,
  loading = 'lazy',
  fetchPriority = 'auto',
  ...rest
}) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Set initial clip and scale
      gsap.set(container, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(img, { scale: 1.08 });

      const tl = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(container, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.0,
        ease: 'power3.inOut',
      }).to(
        img,
        {
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.8'
      );
    }, container);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className={`hover-scale-img ${className}`}
      style={{
        overflow: 'hidden',
        willChange: 'clip-path',
        ...style,
      }}
      {...rest}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
