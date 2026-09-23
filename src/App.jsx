import React, { useState, useEffect, lazy, Suspense } from 'react';

import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

// Lazy-load heavy overlays and non-critical pages to reduce initial JS bundle & TBT
const FullscreenMenu = lazy(() => import('./components/FullscreenMenu'));
const EnquiryModal = lazy(() => import('./components/EnquiryModal'));
const CampusVisitModal = lazy(() => import('./components/CampusVisitModal'));
const FeeStructureModal = lazy(() => import('./components/FeeStructureModal'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AcademicsPage = lazy(() => import('./pages/AcademicsPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage'));
const HappeningsPage = lazy(() => import('./pages/HappeningsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const MandatoryDisclosurePage = lazy(() => import('./pages/MandatoryDisclosurePage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'));

import BirthdayTickerBanner from './components/BirthdayTickerBanner';
import BirthdayCelebrationModal from './components/BirthdayCelebrationModal';
import UrgentNoticeBar from './components/UrgentNoticeBar';

import PageTransition, { animatePageTransition } from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import './styles/globals.css';
import './App.css';

export default function App() {
  const [currentRoute, setCurrentRouteState] = useState(window.location.pathname || '/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [isFeeOpen, setIsFeeOpen] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);

  // Track if overlay chunk has been loaded (lazy-load on first open, keep mounted for exit animation)
  const [menuMounted, setMenuMounted] = useState(false);
  const [enquiryMounted, setEnquiryMounted] = useState(false);
  const [visitMounted, setVisitMounted] = useState(false);
  const [feeMounted, setFeeMounted] = useState(false);

  // Transition-wrapped route updater
  const setCurrentRoute = (newRoute) => {
    if (newRoute === currentRoute) return;
    animatePageTransition(() => {
      setCurrentRouteState(newRoute);
      window.scrollTo(0, 0);
    });
  };

  useEffect(() => { if (isMenuOpen && !menuMounted) setMenuMounted(true); }, [isMenuOpen]);
  useEffect(() => { if (isEnquiryOpen && !enquiryMounted) setEnquiryMounted(true); }, [isEnquiryOpen]);
  useEffect(() => { if (isVisitOpen && !visitMounted) setVisitMounted(true); }, [isVisitOpen]);
  useEffect(() => { if (isFeeOpen && !feeMounted) setFeeMounted(true); }, [isFeeOpen]);

  // Check if admin is currently authenticated for floating quick badge
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('gd_goenka_admin_auth') === 'true';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdminAuth(sessionStorage.getItem('gd_goenka_admin_auth') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Initialize Lenis smooth scroll conditionally for Desktop only to avoid mobile TBT
  useEffect(() => {
    if (currentRoute === '/admin') return;

    const isDesktop = window.innerWidth >= 1024 && !('ontouchstart' in window);
    if (!isDesktop) return;

    let lenis;

    // Defer Lenis init to after first paint to keep TBT low
    const timeoutId = setTimeout(() => {
      import('lenis').then(({ default: Lenis }) => {
        lenis = new Lenis({
          duration: 1.0,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        });

        window.__lenis = lenis;

        // Sync Lenis scroll with GSAP ScrollTrigger position calculations
        lenis.on('scroll', ScrollTrigger.update);

        const updateLenis = (time) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        // Recalculate section trigger positions after Lenis initializes
        setTimeout(() => ScrollTrigger.refresh(), 200);

      });
    }, 500);

    // Refresh ScrollTrigger once full document & all images finish loading
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', handleLoad);
      if (lenis) {
        lenis.destroy();
        window.__lenis = null;
      }
    };
  }, [currentRoute]);

  // Pause Lenis smooth scroll and freeze document scroll when any modal or menu is open
  useEffect(() => {
    const isAnyModalOpen = isMenuOpen || isEnquiryOpen || isVisitOpen || isFeeOpen || isCelebrationOpen;
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      if (window.__lenis) window.__lenis.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      if (window.__lenis) window.__lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      if (window.__lenis) window.__lenis.start();
    };
  }, [isMenuOpen, isEnquiryOpen, isVisitOpen, isFeeOpen, isCelebrationOpen]);

  // Recalculate GSAP ScrollTrigger trigger points on every page route navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [currentRoute]);

  const renderCurrentPage = () => {
    const commonProps = {
      onOpenEnquiry: () => setIsEnquiryOpen(true),
      onOpenVisit: () => setIsVisitOpen(true),
      onOpenFeeModal: () => setIsFeeOpen(true),
      onOpenCelebration: () => setIsCelebrationOpen(true),
      setCurrentRoute
    };

    switch (currentRoute) {
      case '/':
      case '':
        return <HomePage {...commonProps} />;
      case '/about':
        return <AboutPage {...commonProps} />;
      case '/academics':
        return <AcademicsPage {...commonProps} />;
      case '/experience':
        return <ExperiencePage {...commonProps} />;
      case '/admissions':
        return <AdmissionsPage {...commonProps} />;
      case '/happenings':
        return <HappeningsPage {...commonProps} />;
      case '/gallery':
        return <GalleryPage {...commonProps} />;
      case '/careers':
        return <CareersPage {...commonProps} />;
      case '/contact':
        return <ContactPage {...commonProps} />;
      case '/mandatory-disclosure':
      case '/disclosure':
      case '/cbse-disclosure':
        return <MandatoryDisclosurePage {...commonProps} />;
      case '/privacy-policy':
      case '/privacy':
        return <PrivacyPolicyPage {...commonProps} />;
      case '/terms-and-conditions':
      case '/terms':
      case '/terms-conditions':
        return <TermsConditionsPage {...commonProps} />;
      case '/admin':
        return (
          <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0F1014' }} />}>
            <AdminPage setCurrentRoute={setCurrentRoute} />
          </Suspense>
        );
      default:
        return <NotFoundPage setCurrentRoute={setCurrentRoute} />;
    }
  };

  // If in Admin Panel route, render dedicated admin layout without public chrome
  if (currentRoute === '/admin') {
    return (
      <div className="app-root">
        <PageTransition />
        {renderCurrentPage()}
      </div>
    );
  }

  return (
    <div className="app-root">
      <ScrollProgress />
      <CustomCursor />
      <PageTransition />
      <Preloader />

      {/* Unified Top Header Stack with Sticky Pinning */}
      <header className="site-header-stack">
        <UrgentNoticeBar setCurrentRoute={setCurrentRoute} />
        <BirthdayTickerBanner onOpenCelebration={() => setIsCelebrationOpen(true)} />
        <Navbar 
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
        />
      </header>

      {/* Birthday Celebration Confetti Modal */}
      <BirthdayCelebrationModal 
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
      />

      {/* Lazy-loaded overlays */}
      <Suspense fallback={null}>
        {menuMounted && (
          <FullscreenMenu 
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            setCurrentRoute={setCurrentRoute}
            onOpenEnquiry={() => setIsEnquiryOpen(true)}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {enquiryMounted && (
          <EnquiryModal 
            isOpen={isEnquiryOpen}
            onClose={() => setIsEnquiryOpen(false)}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {visitMounted && (
          <CampusVisitModal 
            isOpen={isVisitOpen}
            onClose={() => setIsVisitOpen(false)}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {feeMounted && (
          <FeeStructureModal 
            isOpen={isFeeOpen}
            onClose={() => setIsFeeOpen(false)}
          />
        )}
      </Suspense>

      {renderCurrentPage()}

      <Footer setCurrentRoute={setCurrentRoute} onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <ScrollToTop />

      {/* Floating Admin Quick Switcher Pill (if logged in) */}
      {isAdminAuth && (
        <aside
          aria-label="Admin quick access"
          onClick={() => setCurrentRoute('/admin')}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 999,
            background: '#17181D',
            color: 'var(--color-accent)',
            border: '1px solid rgba(224, 145, 69, 0.4)',
            padding: '0.45rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} />
          Admin Mode • Go to Dashboard →
        </aside>
      )}
    </div>
  );
}
