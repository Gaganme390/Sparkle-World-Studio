import React from 'react';
import HeroSection from '../sections/HeroSection';
import IntroductionSection from '../sections/IntroductionSection';
import PhilosophySection from '../sections/PhilosophySection';
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
import TestimonialsSection from '../sections/TestimonialsSection';
import AdmissionsSection from '../sections/AdmissionsSection';
import FinalCTA from '../components/FinalCTA';

export default function HomePage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  return (
    <main>
      {/* 01 HERO */}
      <HeroSection onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />

      {/* 02 INTRODUCTION */}
      <IntroductionSection setCurrentRoute={setCurrentRoute} />

      {/* 03 SCHOOL PHILOSOPHY */}
      <PhilosophySection />

      {/* 04 HERITAGE × FUTURE */}
      <HeritageFutureSection />

      {/* 05 ACADEMICS */}
      <AcademicsSection setCurrentRoute={setCurrentRoute} />

      {/* 06 EXPERIENCE GOENKA */}
      <ExperienceSection setCurrentRoute={setCurrentRoute} />

      {/* 07 CAMPUS */}
      <CampusSection onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />

      {/* 08 STUDENT LIFE */}
      <StudentLifeSection />

      {/* 09 WHY GOENKA */}
      <WhyGoenkaSection />

      {/* 10 LEADERSHIP */}
      <LeadershipSection setCurrentRoute={setCurrentRoute} />

      {/* 11 ACHIEVEMENTS */}
      <AchievementsSection />

      {/* 12 HAPPENINGS */}
      <HappeningsSection setCurrentRoute={setCurrentRoute} />

      {/* 13 ALUMNI & COMMUNITY */}
      <AlumniSection />

      {/* 14 TESTIMONIALS */}
      <TestimonialsSection />

      {/* 15 ADMISSIONS */}
      <AdmissionsSection onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />

      {/* 16 FINAL CTA */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
