import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './KineticFlair.css';

/**
 * KineticFlair - Interactive floating SVG flair elements (GSAP.com style).
 * Continuous rotation, floating parallax, and responsive mouse hover reactions.
 */
export default function KineticFlair({
  type = 'star',
  size = 28,
  color = 'var(--color-accent, #b39759)',
  className = '',
  style = {}
}) {
  const flairRef = useRef(null);

  useEffect(() => {
    const el = flairRef.current;
    if (!el) return;

    // Continuous floating and slow rotation
    const rotateTween = gsap.to(el, {
      rotation: 360,
      duration: 18,
      repeat: -1,
      ease: 'none'
    });

    const floatTween = gsap.to(el, {
      y: '-=8',
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    return () => {
      rotateTween.kill();
      floatTween.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    const el = flairRef.current;
    if (!el) return;

    // Playful quick spin & spring scale (GSAP.com character reaction)
    gsap.to(el, {
      scale: 1.35,
      rotation: '+=180',
      duration: 0.35,
      ease: 'back.out(2)',
      onComplete: () => {
        gsap.to(el, {
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1.2, 0.4)'
        });
      }
    });
  };

  const renderIcon = () => {
    switch (type) {
      case 'star': // 4-pointed sparkle star (signature GSAP flair)
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
            <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
          </svg>
        );
      case 'diamond': // Heritage diamond
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.5">
            <polygon points="12,2 22,12 12,22 2,12" />
          </svg>
        );
      case 'burst': // Energetic starburst
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} stroke={color} strokeWidth="2.2" strokeLinecap="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <line x1="1" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="4.22" x2="19.78" y2="19.78" />
            <line x1="4.22" y1="19.78" x2="19.78" y2="4.22" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={flairRef} 
      className={`kinetic-flair kinetic-flair-${type} ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      {renderIcon()}
    </div>
  );
}
