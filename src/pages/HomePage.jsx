import React from 'react';
import HeroSection from '../sections/HeroSection';
import IntroductionSection from '../sections/IntroductionSection';
import PhilosophySection from '../sections/PhilosophySection';
import ParentsPerspectiveSection from '../sections/ParentsPerspectiveSection';
import HeritageFutureSection from '../sections/HeritageFutureSection';
import AcademicsSection from '../sections/AcademicsSection';
import ExperienceSection from '../sections/ExperienceSection';
import CampusSection from '../sections/CampusSection';
import StudentLifeSection from '../sections/StudentLifeSection';
import WhyGoenkaSection from '../sections/WhyGoenkaSection';
import LeadershipSection from '../sections/LeadershipSection';
import AchievementsSection from '../sections/AchievementsSection';
import HappeningsSection from '../sections/HappeningsSection';
import AlumniSection from '../sections/AlumniSection';
import AdmissionsSection from '../sections/AdmissionsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import FinalCTA from '../components/FinalCTA';

export default function HomePage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  return (
    <main>
      {/* HERO SLIDER (THRIVE FOR LIFE) */}
      <HeroSection onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />

      {/* SCHOOL PHILOSOPHY (THE GOENKA METHOD - SWAPPED PER PDF 1) */}
      <PhilosophySection />

      {/* WHAT THIS MEANS FOR OUR STUDENTS (PAGE 3 PER PDF 1) */}
      <IntroductionSection setCurrentRoute={setCurrentRoute} />

      {/* WHAT THIS MEANS FOR OUR PARENTS (PAGE 4 PER PDF 1) */}
      <ParentsPerspectiveSection onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} />

      {/* HERITAGE × FUTURE */}
      <HeritageFutureSection />

      {/* 05 ACADEMICS */}
      <AcademicsSection setCurrentRoute={setCurrentRoute} />

      {/* 06 EXPERIENCE GOENKA */}
      <ExperienceSection setCurrentRoute={setCurrentRoute} />

      {/* 07 CAMPUS ARCHITECTURE */}
      <CampusSection onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />

      {/* 08 STUDENT LIFE */}
      <StudentLifeSection />

      {/* 09 WHY GOENKA */}
      <WhyGoenkaSection />

      {/* 10 LEADERSHIP */}
      <LeadershipSection setCurrentRoute={setCurrentRoute} />

      {/* 11 ACHIEVEMENTS */}
      <AchievementsSection />

      {/* 12 HAPPENINGS / CAMPUS CHRONICLES */}
      <HappeningsSection setCurrentRoute={setCurrentRoute} />

      {/* 13 ALUMNI & COMMUNITY */}
      <AlumniSection />

      {/* 14 ADMISSIONS */}
      <AdmissionsSection onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />

      {/* 15 TESTIMONIALS */}
      <TestimonialsSection />

      {/* 16 FINAL CTA */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
