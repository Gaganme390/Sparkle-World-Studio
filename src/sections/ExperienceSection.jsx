import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './SanctuariesCollage.css';

export default function ExperienceSection({ setCurrentRoute }) {
  const goToSpaces = (e) => {
    e?.preventDefault();
    if (setCurrentRoute) setCurrentRoute('/inspired-spaces');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="experience-section sanct-section" id="experience" aria-label="Thoughtfully Designed Spaces">
      <div className="sanct-container">
        
        {/* =========================================================================
            THE HERO SPLIT FOCUS BANNER (MATCHING SCREENSHOT)
            ========================================================================= */}
        <ScrollReveal variant="fadeUp">
          <a
            href="/inspired-spaces"
            onClick={goToSpaces}
            className="sanct-split-card"
            aria-label="Explore Thoughtfully Designed Spaces"
          >
            {/* Left Content Area (Navy Blue) */}
            <div className="sanct-split-left">
              <h2 className="sanct-split-title">
                THOUGHTFULLY<br />DESIGNED SPACES
              </h2>
              <p className="sanct-split-sub">Where curiosity meets possibility</p>
              <span className="sanct-split-cta">
                EXPLORE ALL SPACES <ArrowRight size={16} />
              </span>
            </div>

            {/* Right 2x2 Photo Grid */}
            <div className="sanct-split-right">
              <div className="sanct-split-tile">
                <img 
                  src="/school-media/facilities/smart_classrooms.jpg" 
                  alt="Educator and students engaged in collaborative smart classroom" 
                  loading="eager" 
                />
              </div>
              <div className="sanct-split-tile">
                <img 
                  src="/school-media/facilities/library.jpg" 
                  alt="Scholar exploring literature and research stacks in the library" 
                  loading="eager" 
                />
              </div>
              <div className="sanct-split-tile">
                <img 
                  src="/school-media/facilities/mathematics_exploration_lab.jpg" 
                  alt="Young learners exploring tactile mathematics and geometry manipulatives" 
                  loading="lazy" 
                />
              </div>
              <div className="sanct-split-tile">
                <img 
                  src="/school-media/facilities/robotics_and_ai_lab.jpg" 
                  alt="Students engineering and assembling robotics and STEM kits" 
                  loading="lazy" 
                />
              </div>
            </div>
          </a>
        </ScrollReveal>

      </div>
    </section>
  );
}
