import React, { useState, useEffect, lazy, Suspense } from 'react';

import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

// Lazy-load heavy overlays and non-critical pages to reduce initial JS bundle & TBT
const FullscreenMenu = lazy(() => import('./components/FullscreenMenu'));
const EnquiryModal = lazy(() => import('./components/EnquiryModal'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AcademicsPage = lazy(() => import('./pages/AcademicsPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage'));
const HappeningsPage = lazy(() => import('./pages/HappeningsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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
  // Track if overlay chunk has been loaded (lazy-load on first open, keep mounted for exit animation)
  const [menuMounted, setMenuMounted] = useState(false);
  const [enquiryMounted, setEnquiryMounted] = useState(false);

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


  // Initialize Lenis smooth scroll conditionally for Desktop only to avoid mobile TBT
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024 && !('ontouchstart' in window);
    if (!isDesktop) return;

    let lenis;
    let rafId;

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

        function raf(time) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // Recalculate section trigger positions after Lenis initializes
        setTimeout(() => ScrollTrigger.refresh(), 300);
      });
    }, 500);

    // Refresh ScrollTrigger once full document & all images finish loading
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', handleLoad);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        window.__lenis = null;
      }
    };
  }, []);


  // Pause Lenis smooth scroll when modal or menu is open to prevent background scrolling
  useEffect(() => {
    if (window.__lenis) {
      if (isMenuOpen || isEnquiryOpen) {
        window.__lenis.stop();
      } else {
        window.__lenis.start();
      }
    }
  }, [isMenuOpen, isEnquiryOpen]);


  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/':
      case '':
        return <HomePage onOpenEnquiry={() => setIsEnquiryOpen(true)} setCurrentRoute={setCurrentRoute} />;
      case '/about':
        return <AboutPage onOpenEnquiry={() => setIsEnquiryOpen(true)} setCurrentRoute={setCurrentRoute} />;
      case '/academics':
        return <AcademicsPage onOpenEnquiry={() => setIsEnquiryOpen(true)} setCurrentRoute={setCurrentRoute} />;
      case '/experience':
        return <ExperiencePage onOpenEnquiry={() => setIsEnquiryOpen(true)} setCurrentRoute={setCurrentRoute} />;
      case '/admissions':
        return <AdmissionsPage onOpenEnquiry={() => setIsEnquiryOpen(true)} setCurrentRoute={setCurrentRoute} />;
      case '/happenings':
        return <HappeningsPage onOpenEnquiry={() => setIsEnquiryOpen(true)} setCurrentRoute={setCurrentRoute} />;
      case '/gallery':
        return <GalleryPage onOpenEnquiry={() => setIsEnquiryOpen(true)} setCurrentRoute={setCurrentRoute} />;
      case '/careers':
        return <CareersPage onOpenEnquiry={() => setIsEnquiryOpen(true)} setCurrentRoute={setCurrentRoute} />;
      case '/contact':
        return <ContactPage onOpenEnquiry={() => setIsEnquiryOpen(true)} setCurrentRoute={setCurrentRoute} />;
      default:
        return <NotFoundPage setCurrentRoute={setCurrentRoute} />;
    }
  };

  return (
    <div className="app-root">
      <ScrollProgress />
      <CustomCursor />
      <PageTransition />
      <Preloader />

      <Navbar 
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />

      {/* Lazy-loaded overlays: chunk loads on first open, stays mounted for exit animation */}
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


      {/* Route pages: HomePage eagerly loaded, everything else lazy */}
      <Suspense fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '32px', height: '32px', border: '3px solid #E6E0D7', borderTopColor: '#E09145', borderRadius: '50%', animation: 'spin 600ms linear infinite' }}></div>
        </div>
      }>
        {renderCurrentPage()}
      </Suspense>

      <Footer 
        setCurrentRoute={setCurrentRoute}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      <ScrollToTop />
    </div>
  );
}
