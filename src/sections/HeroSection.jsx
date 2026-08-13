import React, { useRef, useEffect } from 'react';
import { ArrowRight, Award, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onOpenEnquiry, setCurrentRoute }) {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const leadTextRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const imageFrameRef = useRef(null);
  const imgRef = useRef(null);
  const floatingCardRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const scrollToExplore = () => {
    const el = document.getElementById('introduction');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial hidden states for staged reveal
      gsap.set(badgeRef.current, { opacity: 0, y: 20 });
      gsap.set(titleLine1Ref.current, { opacity: 0, y: '100%' });
      gsap.set(titleLine2Ref.current, { opacity: 0, y: '100%' });
      gsap.set(leadTextRef.current, { opacity: 0, y: 24 });
      gsap.set(ctaGroupRef.current?.children || [], { opacity: 0, y: 20 });
      gsap.set(imageFrameRef.current, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(imgRef.current, { scale: 1.12 });
      gsap.set(floatingCardRef.current, { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 15 });

      // Staged entrance timeline (delayed slightly for preloader reveal)
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(imageFrameRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.1,
        ease: 'power3.inOut',
      })
      .to(imgRef.current, {
        scale: 1,
        duration: 1.4,
        ease: 'power2.out',
      }, '-=0.9')
      .to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=1.0')
      .to([titleLine1Ref.current, titleLine2Ref.current], {
        opacity: 1,
        y: '0%',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }, '-=0.5')
      .to(leadTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')
      .to(ctaGroupRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.4')
      .to(floatingCardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.4)',
      }, '-=0.3')
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.2');

      // 2. Parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 3. Desktop mouse interaction (subtle ±5px parallax)
      const isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
      if (!isTouch) {
        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const xPos = (clientX / window.innerWidth - 0.5) * 2;
          const yPos = (clientY / window.innerHeight - 0.5) * 2;

          gsap.to(imgRef.current, {
            x: xPos * 6,
            y: yPos * 6,
            duration: 0.8,
            ease: 'power1.out',
          });

          gsap.to(floatingCardRef.current, {
            x: xPos * -10,
            y: yPos * -10,
            duration: 0.8,
            ease: 'power1.out',
          });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Hero Content Column */}
          <div className="hero-content-col">
            <div ref={badgeRef} className="badge-editorial hero-meta-tag">
              <span className="dot"></span> G.D. GOENKA SCHOOL — AYODHYA
            </div>

            <h1 className="hero-title-main">
              <span className="hero-line-mask" style={{ display: 'block', overflow: 'hidden' }}>
                <span ref={titleLine1Ref} style={{ display: 'block' }}>WHERE HERITAGE</span>
              </span>
              <span className="hero-line-mask" style={{ display: 'block', overflow: 'hidden' }}>
                <span ref={titleLine2Ref} style={{ display: 'block' }}>
                  <span>INSPIRES</span> THE FUTURE.
                </span>
              </span>
            </h1>

            <p ref={leadTextRef} className="hero-lead-text">
              A future-ready learning environment where curiosity, character, creativity and confidence grow together in the cultural heartland of Ayodhya.
            </p>

            <div ref={ctaGroupRef} className="hero-cta-group">
              <MagneticButton strength={6}>
                <button 
                  className="btn-enquire" 
                  onClick={scrollToExplore} 
                  style={{ padding: '0.9rem 1.85rem', fontSize: '0.95rem' }}
                  aria-label="Explore Our School Sections"
                >
                  Explore Our School <ArrowRight size={18} />
                </button>
              </MagneticButton>

              <MagneticButton strength={6}>
                <button 
                  className="btn-menu-trigger" 
                  onClick={onOpenEnquiry}
                  style={{ padding: '0.9rem 1.85rem', fontSize: '0.95rem' }}
                  aria-label="Open Admissions Form 2026-27"
                >
                  Admissions 2026-27 →
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Hero Visual Composition Column */}
          <div className="hero-visual-col">
            <div ref={imageFrameRef} className="hero-image-frame">
              <img 
                ref={imgRef}
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" 
                alt="G.D. Goenka School Ayodhya Campus Architectural Exterior" 
                width="800"
                height="550"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div ref={floatingCardRef} className="hero-floating-card">
              <div className="hero-floating-icon">
                <Award size={22} />
              </div>
              <div>
                <h4 className="hero-floating-title">CBSE Curriculum</h4>
                <p className="hero-floating-sub">STEM, Leadership & Values Integration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div 
          ref={scrollIndicatorRef} 
          className="hero-scroll-indicator"
          onClick={scrollToExplore}
          role="button"
          aria-label="Scroll to introduction section"
        >
          <span className="scroll-text">01 / SCROLL</span>
          <ChevronDown size={16} className="scroll-arrow" />
        </div>
      </div>
    </section>
  );
}
