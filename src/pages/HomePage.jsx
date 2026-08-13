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
import AdmissionsSection from '../sections/AdmissionsSection';
import FinalCTA from '../components/FinalCTA';

export default function HomePage({ onOpenEnquiry, setCurrentRoute }) {
  return (
    <main>
      {/* 01 HERO */}
      <HeroSection onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />

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
      <CampusSection setCurrentRoute={setCurrentRoute} />

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

      {/* 14 ADMISSIONS */}
      <AdmissionsSection onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />

      {/* 15 FINAL CTA */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
