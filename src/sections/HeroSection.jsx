import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import KineticText from '../components/KineticText';
import KineticFlair from '../components/KineticFlair';
import { siteContent, isPhotoCleared, normKey, normText } from '../utils/siteContent';
import './HeroSection.css';

export const DEFAULT_HERO_SLIDES = [
  {
    id: 1,
    areaId: 'hero-slide-1',
    title: 'THRIVE FOR LIFE',
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'Nurturing confident, curious minds ready to thrive in an ever-changing world.',
    image: '/school-media/Opening Photos/campus_grand_exterior_banner.jpg',
    imageAlt: 'G.D. Goenka Public School Ayodhya Grand Campus Front View Architecture',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
  },
  {
    id: 2,
    areaId: 'hero-slide-2',
    title: 'THRIVE FOR LIFE',
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'State-of-the-art multimedia workstations, phonetic listening booths, and digital coding labs empowering students with 21st-century fluency.',
    image: '/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg',
    objectPosition: 'center bottom',
    imageAlt: 'Modern Digital Language & Computer Science Laboratory at G.D. Goenka Ayodhya',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
  },
  {
    id: 3,
    areaId: 'hero-slide-3',
    title: 'THRIVE FOR LIFE',
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'From Indian classical dance and theatrical storytelling to inter-house music ensembles, student creativity takes center stage in Ayodhya.',
    image: '/school-media/Cultural Celebration/cultural_fest_dandiya_banner.jpg',
    imageAlt: 'Vibrant cultural and performing arts celebrations at G.D. Goenka School Ayodhya',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
  },
  {
    id: 4,
    areaId: 'hero-slide-4',
    title: 'THRIVE FOR LIFE',
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'Sensory color immersion, phonetic literacy picnics, and colorful indoor play zones designed for gentle social-emotional growth and exploration.',
    image: '/school-media/Play Station/kindergarten_ball_pool_landscape.jpg',
    imageAlt: 'Joyful toddler in the indoor kindergarten play station ball pit',
    ctaPrimary: { text: 'Apply for Pre-Nursery →', type: 'route', route: '/admissions' }
  },
  {
    id: 5,
    areaId: 'hero-slide-5',
    title: 'THRIVE FOR LIFE',
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'From thematic color immersion days and balloon spectacles to district championship victories, joyful experiential growth flourishes in Ayodhya.',
    image: '/school-media/Blue Day/blue_day_celebration_banner.jpg',
    imageAlt: 'Joyful students celebrating experiential thematic learning day with blue balloons',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
  },
  {
    id: 6,
    areaId: 'hero-slide-6',
    title: 'THRIVE FOR LIFE',
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'Championship-grade athletic tracks, sports pavilions, and Olympic-inspired coaching fostering teamwork, stamina, and resilience in every Goenkan.',
    image: '/school-media/facilities/athletics_track_and_football_field.jpg',
    imageAlt: 'Championship athletic track and sports complex at G.D. Goenka Ayodhya',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
  },
  {
    id: 7,
    areaId: 'hero-slide-7',
    title: 'THRIVE FOR LIFE',
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'Hands-on robotics kits, algorithm design workshops, and AI discovery modules empowering young innovators to solve real-world challenges.',
    image: '/school-media/facilities/robotics_and_ai_lab.jpg',
    imageAlt: 'Advanced STEM Robotics and Artificial Intelligence Innovation Lab',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
  },
  {
    id: 8,
    areaId: 'hero-slide-8',
    title: 'THRIVE FOR LIFE',
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'Harmonizing timeless values of Maryada and humility with global-standard CBSE education on an expansive, secure eco-campus.',
    image: '/school-media/Heritage/rooted_ayodhya_heritage.jpg',
    imageAlt: 'Spiritual heritage and modern holistic education in sacred Ayodhya',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
  }
];

function parseHeroTitle(rawTitle) {
  const str = String(rawTitle || 'THRIVE FOR LIFE').trim();
  if (str.toUpperCase() === 'THRIVE FOR LIFE') {
    return { titleLine1: 'THRIVE', titleLine2: 'FOR LIFE' };
  }
  if (str.includes('\n')) {
    const parts = str.split('\n');
    return { titleLine1: parts[0].trim(), titleLine2: parts.slice(1).join(' ').trim() };
  }
  if (str.includes(' / ')) {
    const parts = str.split(' / ');
    return { titleLine1: parts[0].trim(), titleLine2: parts[1].trim() };
  }
  const words = str.split(/\s+/);
  if (words.length <= 1) {
    return { titleLine1: words[0] || 'THRIVE', titleLine2: 'FOR LIFE' };
  }
  const mid = Math.ceil(words.length / 2);
  return {
    titleLine1: words.slice(0, mid).join(' '),
    titleLine2: words.slice(mid).join(' ')
  };
}

const AUTO_SLIDE_INTERVAL = 6500; // 6.5s automated slide interval

export default function HeroSection({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [overrides, setOverrides] = useState(() => siteContent.getState());
  const timerRef = useRef(null);

  useEffect(() => {
    return siteContent.subscribe((s) => setOverrides({ ...s }));
  }, []);

  // Compute active slides dynamically from 8 defaults + any custom hero-slide areas in siteContent
  const activeSlides = useMemo(() => {
    const areas = overrides.areas || {};
    const images = overrides.images || {};
    const texts = overrides.texts || {};

    const allSlideMap = new Map();
    DEFAULT_HERO_SLIDES.forEach((s) => allSlideMap.set(s.areaId, { ...s }));

    // Check for any dynamically added hero slides in areas (e.g. hero-slide-9, hero-slide-10)
    Object.keys(areas).forEach((areaId) => {
      if (areaId.startsWith('hero-slide-') && !allSlideMap.has(areaId)) {
        const customArea = areas[areaId] || {};
        const slideNum = parseInt(areaId.replace('hero-slide-', ''), 10) || (allSlideMap.size + 1);
        allSlideMap.set(areaId, {
          id: slideNum,
          areaId,
          title: customArea.title || 'THRIVE FOR LIFE',
          leadText: customArea.desc || 'Excellence in holistic education in Ayodhya.',
          image: customArea.image || '/school-media/Opening Photos/campus_grand_exterior_banner.jpg',
          imageAlt: customArea.title || `G.D. Goenka School Ayodhya Slide ${slideNum}`,
          ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
        });
      }
    });

    const list = Array.from(allSlideMap.values()).sort((a, b) => a.id - b.id);

    return list
      .map((slide) => {
        const areaOverride = areas[slide.areaId] || {};
        const imageOverride = images[normKey(slide.image)];
        const effectiveImg = areaOverride.image !== undefined ? areaOverride.image : (imageOverride || slide.image);

        // If the photo is deleted/cleared in admin panel, slide is omitted from active rotation
        if (isPhotoCleared(effectiveImg)) return null;

        const effectiveTitle = areaOverride.title !== undefined 
          ? areaOverride.title 
          : (texts[normText(slide.title)] || slide.title);

        const effectiveDesc = areaOverride.desc !== undefined 
          ? areaOverride.desc 
          : (texts[normText(slide.desc || slide.leadText)] || slide.leadText);

        const { titleLine1, titleLine2 } = parseHeroTitle(effectiveTitle);

        return {
          ...slide,
          image: effectiveImg,
          leadText: effectiveDesc,
          titleLine1,
          titleLine2
        };
      })
      .filter(Boolean);
  }, [overrides]);

  const slides = activeSlides.length > 0 ? activeSlides : DEFAULT_HERO_SLIDES;
  const totalSlides = slides.length;

  // Ensure currentSlide is within bounds when slides count changes
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [currentSlide, totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Automated slideshow timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, currentSlide]);

  // Preload all active banner images immediately
  useEffect(() => {
    slides.forEach((s) => {
      if (s.image && !isPhotoCleared(s.image)) {
        const img = new window.Image();
        img.src = s.image;
      }
    });
  }, [slides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const scrollToExplore = () => {
    const el = document.getElementById('introduction');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCtaClick = (cta) => {
    if (cta.type === 'route' && cta.route) {
      if (setCurrentRoute) {
        setCurrentRoute(cta.route);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (cta.type === 'enquiry') {
      if (setCurrentRoute) {
        setCurrentRoute('/admissions');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (onOpenEnquiry) {
        onOpenEnquiry();
      }
    } else if (cta.type === 'visit') {
      if (onOpenVisit) onOpenVisit();
    } else if (cta.type === 'explore') {
      scrollToExplore();
    }
  };

  const slide = slides[currentSlide] || slides[0];

  return (
    <section 
      className="hero-slider-section" 
      id="hero"
      aria-label="Campus Highlights Hero Slider"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides Stack */}
      <div className="hero-slider-bg-container">
        {slides.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div 
              key={s.areaId || s.id || idx} 
              className={`hero-slide-bg-item ${isActive ? 'active' : ''}`}
              aria-hidden={!isActive}
            >
              <img 
                src={s.image} 
                alt={s.imageAlt}
                className="hero-slide-bg-img"
                style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined}
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                decoding="async"
              />
              <div className="hero-slide-gradient-overlay" />
            </div>
          );
        })}
      </div>

      {/* Main Content Overlay */}
      <div className="container hero-slider-content-container">
        <div className="hero-slider-inner-content" key={slide.areaId || slide.id}>
          {/* Headline with Gold Accent & GSAP Character Bouncing */}
          <h1 className="hero-slider-title">
            <span className="hero-title-block">
              <KineticText 
                text={slide.titleLine1} 
                triggerKey={`${slide.id}-1`} 
                delay={0.06} 
                stagger={0.024}
              />
            </span>
            <span className="hero-title-block hero-title-accent">
              <KineticText 
                text={slide.titleLine2} 
                accent={true} 
                triggerKey={`${slide.id}-2`} 
                delay={0.22} 
                stagger={0.024}
              />
              <KineticFlair 
                type="star" 
                size={30} 
                className="hero-kinetic-star-flair"
                style={{ marginLeft: '0.75rem', verticalAlign: 'middle', display: 'inline-flex' }}
              />
            </span>
          </h1>

          {/* Description */}
          <p className="hero-slider-lead animate-hero-fade-delay">
            {slide.leadText}
          </p>

          {/* Action CTA */}
          <div className="hero-slider-cta-row animate-hero-slide-up-delay">
            <MagneticButton strength={5}>
              <button 
                className="btn-enquire hero-cta-btn-primary" 
                onClick={() => handleCtaClick(slide.ctaPrimary)}
                aria-label={slide.ctaPrimary.text}
              >
                {slide.ctaPrimary.text}
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Slider Controls: Arrow Nav & Slide Pagination (Fixed safely above bottom edge) */}
      <div className="hero-slider-bottom-bar-wrapper">
        <div className="container hero-slider-bottom-bar">
          {/* Arrows */}
          <div className="hero-nav-arrows">
            <button 
              className="hero-arrow-btn" 
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="hero-arrow-btn" 
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Pagination Indicators with Elapsed Progress Bar */}
          <div className="hero-pagination-track">
            {slides.map((s, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.areaId || s.id || idx}
                  className={`hero-pagination-item ${isActive ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span className="hero-pagination-number">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="hero-pagination-bar">
                    <span 
                      className={`hero-pagination-fill ${isActive ? 'filling' : ''}`} 
                      style={{ animationDuration: `${AUTO_SLIDE_INTERVAL}ms` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll Down Cue */}
          <div 
            className="hero-scroll-cue"
            onClick={scrollToExplore}
            role="button"
            aria-label="Scroll to introduction section"
          >
            <span>SCROLL</span>
            <ChevronDown size={15} className="scroll-arrow" />
          </div>
        </div>
      </div>
    </section>
  );
}
