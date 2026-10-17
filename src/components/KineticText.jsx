import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './KineticText.css';

/**
 * KineticText - GSAP character bouncy typography component.
 * Words and characters are laid out with bulletproof inline-block formatting.
 * Character hover triggers an elastic squash-and-stretch bounce.
 */
export default function KineticText({
  text,
  className = '',
  accent = false,
  triggerKey = null,
  delay = 0,
  stagger = 0.025,
  as: Component = 'span'
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.bouncy-char');
    if (chars.length === 0) return;

    // 3D Staggered Entrance Animation (GSAP.com style)
    gsap.killTweensOf(chars);
    gsap.fromTo(chars, 
      {
        opacity: 0,
        y: 38,
        rotateX: -75,
        scale: 0.9,
        transformOrigin: '50% 100%'
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.75,
        delay: delay,
        stagger: {
          each: stagger,
          from: 'start'
        },
        ease: 'back.out(2)',
        clearProps: 'transform,opacity,transformOrigin'
      }
    );
  }, [text, triggerKey, delay, stagger]);

  // Interactive Cursor Physics on Letter Hover
  const handleCharMouseEnter = (e) => {
    const target = e.currentTarget;
    if (!target || target.dataset.animating === 'true') return;
    target.dataset.animating = 'true';

    const angle = (Math.random() - 0.5) * 16;

    gsap.killTweensOf(target);
    gsap.to(target, {
      y: -14,
      scaleY: 1.25,
      scaleX: 0.88,
      rotate: angle,
      duration: 0.16,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(target, {
          y: 0,
          scaleY: 1,
          scaleX: 1,
          rotate: 0,
          duration: 0.6,
          ease: 'elastic.out(1.2, 0.35)',
          clearProps: 'transform',
          onComplete: () => {
            delete target.dataset.animating;
          }
        });
      }
    });
  };

  const words = (text || '').split(' ');

  return (
    <Component 
      ref={containerRef} 
      className={`bouncy-text-wrap ${accent ? 'bouncy-accent' : ''} ${className}`}
      aria-label={text}
    >
      {words.map((word, wIdx) => (
        <span className="bouncy-word" key={`w-${wIdx}`}>
          {Array.from(word).map((char, cIdx) => (
            <span
              key={`c-${wIdx}-${cIdx}`}
              className="bouncy-char"
              aria-hidden="true"
              onMouseEnter={handleCharMouseEnter}
            >
              {char}
            </span>
          ))}
          {wIdx < words.length - 1 && (
            <span className="bouncy-space" aria-hidden="true">&nbsp;</span>
          )}
        </span>
      ))}
    </Component>
  );
}
