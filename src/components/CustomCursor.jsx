import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Desktop-only custom cursor component.
 * Features smooth lerp tracking, element hover detection (buttons/links/images),
 * and automatic disabling on touch/tablet/reduced-motion devices.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'hover' | 'view'
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!cursor || !dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Fast update for central dot
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // Smooth RAF lerp loop for outer ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      gsap.set(ring, { x: ringX, y: ringY });
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    const handleMouseOver = (e) => {
      const target = e.target;

      // Check if hovering interactive element or image
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .btn-enquire, .btn-menu-trigger');
      const isImage = target.closest('.hover-scale-img, .gallery-item, .lightbox-trigger');

      if (isImage) {
        setCursorState('view');
      } else if (isInteractive) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor is-${cursorState}`}
      aria-hidden="true"
    >
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        {cursorState === 'view' && <span className="cursor-label">VIEW</span>}
      </div>
    </div>
  );
}
