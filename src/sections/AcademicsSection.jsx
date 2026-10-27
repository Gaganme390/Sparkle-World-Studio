import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import './AcademicsSection.css';

export const wingsData = [
  {
    id: 'junior-wing',
    route: '/junior-wing',
    title: 'JUNIOR WING',
    grades: 'Nursery – Grade 2',
    image: '/school-media/academics/junior_wing_card.jpg',
    alt: 'Junior Wing students engaged in joyful foundational learning at GD Goenka Ayodhya'
  },
  {
    id: 'primary-wing',
    route: '/primary-wing',
    title: 'PRIMARY WING',
    grades: 'Grades 3–5',
    image: '/school-media/academics/primary_wing_card.jpg',
    alt: 'Primary Wing student discovering literature in the Ayodhya campus library'
  },
  {
    id: 'middle-wing',
    route: '/middle-wing',
    title: 'MIDDLE WING',
    grades: 'Grades 6–8',
    image: '/school-media/academics/middle_wing_card.jpg',
    alt: 'Middle Wing student mastering computational fluency and digital language lab'
  },
  {
    id: 'senior-wing',
    route: '/senior-wing',
    title: 'SENIOR WING',
    grades: 'Grades 9–12',
    image: '/school-media/academics/senior_wing_card.jpg',
    alt: 'Senior Wing student preparing for CBSE board mastery and competitive excellence'
  }
];

export default function AcademicsSection({ setCurrentRoute }) {
  const handleWingClick = (route) => {
    if (setCurrentRoute) {
      setCurrentRoute(route);
    } else if (typeof window !== 'undefined') {
      window.location.href = route;
    }
  };

  return (
    <section className="academics-v2-section" id="academics">
      <div className="academics-v2-container">
        
        {/* 4 Wing Cards Side-by-Side (Left Block) */}
        <div className="academics-v2-cards-grid">
          {wingsData.map((wing, idx) => (
            <ScrollReveal 
              key={wing.id} 
              variant="fadeUp" 
              delay={0.1 + idx * 0.08}
              className="academics-v2-card-wrap"
            >
              <div 
                className="academics-v2-card"
                onClick={() => handleWingClick(wing.route)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleWingClick(wing.route); }}
                aria-label={`Explore ${wing.title} (${wing.grades})`}
              >
                <div className="academics-v2-img-container">
                  <img 
                    src={wing.image} 
                    alt={wing.alt} 
                    className="academics-v2-img"
                    loading="lazy"
                  />
                  <div className="academics-v2-card-overlay" />
                </div>
                
                <div className="academics-v2-card-footer">
                  <h3 className="academics-v2-card-title">{wing.title}</h3>
                  <span className="academics-v2-card-grades">{wing.grades}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Section Headline & Overview (Right Block) */}
        <ScrollReveal variant="fadeLeft" delay={0.2} className="academics-v2-heading-block">
          <span className="academics-v2-tag">ACADEMICS</span>
          <h2 className="academics-v2-title">
            A CURRICULUM CALIBRATED TO EACH STAGE OF GROWTH.
          </h2>
          <p className="academics-v2-desc">
            A continuous pedagogical progression tailored to every developmental stage—from early childhood sensory discovery in our Junior Wing to secondary board mastery in our Senior Wing.
          </p>

          <MagneticButton strength={4}>
            <button 
              className="academics-v2-explore-btn"
              onClick={() => handleWingClick('/junior-wing')}
            >
              Explore Junior Wing <ArrowRight size={16} />
            </button>
          </MagneticButton>
        </ScrollReveal>

      </div>
    </section>
  );
}
