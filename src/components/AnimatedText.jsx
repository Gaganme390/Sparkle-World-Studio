import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './KineticText.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedText - Line-by-line reveal with GSAP interactive character bouncing.
 * Renders pure React character spans that survive re-renders from async hooks (useSchoolData).
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
  const content = text || (typeof children === 'string' ? children : null);

  const handleCharBounce = (e) => {
    const target = e.currentTarget;
    if (!target) return;
    target.style.opacity = '1';
    if (target.dataset.animating === 'true') return;
    target.dataset.animating = 'true';

    const angle = (Math.random() - 0.5) * 16;
    gsap.killTweensOf(target);
    gsap.to(target, {
      y: -12,
      scaleY: 1.2,
      scaleX: 0.9,
      rotate: angle,
      duration: 0.16,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(target, {
          y: 0,
          scaleY: 1,
          scaleX: 1,
          rotate: 0,
          duration: 0.5,
          ease: 'elastic.out(1.2, 0.35)',
          clearProps: 'transform',
          onComplete: () => {
            target.style.opacity = '1';
            delete target.dataset.animating;
          }
        });
      }
    });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const chars = el.querySelectorAll('.bouncy-char');
    if (chars.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(chars,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay: delay,
          stagger: {
            each: 0.015,
            from: 'start'
          },
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true
          },
          onComplete: () => {
            chars.forEach((c) => {
              c.style.opacity = '1';
              c.style.transform = '';
            });
          }
        }
      );
    }, el);

    return () => {
      ctx.revert();
      chars.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = '';
      });
    };
  }, [content, delay, stagger]);

  if (!content) {
    return (
      <Tag ref={containerRef} className={className} style={style} {...rest}>
        {children}
      </Tag>
    );
  }

  // Split lines on <br>
  const rawLines = content.split(/<br\s*\/?>/gi).filter(Boolean);

  const renderWords = (str) => {
    const words = str.trim().split(/\s+/).filter(Boolean);
    return words.map((word, wIdx) => (
      <React.Fragment key={wIdx}>
        <span className="bouncy-word">
          {Array.from(word).map((char, cIdx) => (
            <span
              key={cIdx}
              className="bouncy-char"
              aria-hidden="true"
              onMouseEnter={handleCharBounce}
            >
              {char}
            </span>
          ))}
        </span>
        {wIdx < words.length - 1 && (
          <span className="bouncy-space">&nbsp;</span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Tag 
      ref={containerRef} 
      className={`bouncy-text-wrap ${className}`} 
      style={style} 
      aria-label={content.replace(/<[^>]+>/g, ' ')} 
      {...rest}
    >
      {rawLines.map((rawLine, lIdx) => {
        const trimmed = rawLine.trim();
        const isSpan = /^<span[^>]*>(.*?)<\/span>$/i.test(trimmed);
        if (isSpan) {
          const innerText = trimmed.replace(/^<span[^>]*>|<\/span>$/gi, '');
          return (
            <span key={lIdx} className="bouncy-line intro-accent-line" style={{ display: 'block' }}>
              {renderWords(innerText)}
            </span>
          );
        }
        return (
          <span key={lIdx} className="bouncy-line" style={{ display: 'block' }}>
            {renderWords(trimmed)}
          </span>
        );
      })}
    </Tag>
  );
}
