import React from 'react';
import HeroSection from '../sections/HeroSection';
import IntroductionSection from '../sections/IntroductionSection';
import PhilosophySection from '../sections/PhilosophySection';
import LeadershipSection from '../sections/LeadershipSection';
import ParentsPerspectiveSection from '../sections/ParentsPerspectiveSection';
import HeritageFutureSection from '../sections/HeritageFutureSection';
import AcademicsSection from '../sections/AcademicsSection';
import ExperienceSection from '../sections/ExperienceSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import FinalCTA from '../components/FinalCTA';

export default function HomePage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  return (
    <main>
      {/* HERO SLIDER (THRIVE FOR LIFE) */}
      <HeroSection onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />

      {/* LEADERSHIP & CHAIRMAN SECTION (MATCHING SCREENSHOT) */}
      <LeadershipSection setCurrentRoute={setCurrentRoute} />

      {/* SCHOOL PHILOSOPHY / THRIVE (THE GOENKA METHOD) */}
      <PhilosophySection setCurrentRoute={setCurrentRoute} />

      {/* WHAT THIS MEANS FOR OUR STUDENTS */}
      <IntroductionSection setCurrentRoute={setCurrentRoute} />

      {/* WHAT THIS MEANS FOR OUR PARENTS (PAGE 4 PER PDF 1) */}
      <ParentsPerspectiveSection onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} />

      {/* 05 ACADEMICS */}
      <AcademicsSection setCurrentRoute={setCurrentRoute} />

      {/* 06 EXPERIENCE GOENKA */}
      <ExperienceSection 
        setCurrentRoute={setCurrentRoute} 
        onOpenEnquiry={onOpenEnquiry}
        onOpenVisit={onOpenVisit}
      />

      {/* 08 TESTIMONIALS */}
      <TestimonialsSection />

      {/* ROOTED HERE, READY FOR TOMORROW (HERITAGE × FUTURE) */}
      <HeritageFutureSection />

      {/* 11 FINAL CTA: COME SEE WHERE THE JOURNEY BEGINS */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
