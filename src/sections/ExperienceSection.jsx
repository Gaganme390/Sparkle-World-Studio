import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './SanctuariesCollage.css';

const IMG = {
  lab: ['/school-media/Digital Lab/language_lab_headset.jpg', 'Student engaged in computer and digital learning lab'],
  smart: ['/school-media/facilities/smart_classrooms.jpg', 'Teacher writing on interactive display in smart classroom'],
  library: ['/school-media/facilities/library.jpg', 'Children reading together in the school library'],
  math: ['/school-media/facilities/mathematics_exploration_lab.jpg', 'Hands-on math lab manipulatives'],
  class: ['/school-media/New Pages/Page 17/WhatsApp Image 2026-10-07 at 5.28.58 PM.jpeg', 'Students seated in a collaborative classroom'],
  science: ['/school-media/facilities/science_laboratories.jpg', 'Students examining specimens in the science lab'],
  robotics: ['/school-media/facilities/robotics_and_ai_lab.jpg', 'Students building and coding robotics hardware']
};

const Tile = ({ k, eager }) => (
  <div className="sanct-tile">
    <img src={IMG[k][0]} alt={IMG[k][1]} loading={eager ? 'eager' : 'lazy'} />
  </div>
);

export default function ExperienceSection({ setCurrentRoute }) {
  const go = (e) => {
    e?.preventDefault();
    if (setCurrentRoute) setCurrentRoute('/inspired-spaces');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="experience-section sanct-section" id="experience" aria-label="Sanctuaries of Discovery">
      <ScrollReveal variant="fadeUp">
        <a
          href="/inspired-spaces"
          onClick={go}
          className="sanct-collage"
          aria-label="Explore all Sanctuaries of Discovery"
        >
          <div className="sanct-tall"><Tile k="lab" eager /></div>

          <div className="sanct-mid">
            <div className="sanct-mid-top">
              <Tile k="smart" />
              <Tile k="library" />
            </div>

            <div className="sanct-card">
              <h2 className="sanct-title">SANCTUARIES OF DISCOVERY</h2>
              <p className="sanct-sub">Where curiosity meets possibility</p>
              <span className="sanct-cta">
                Explore all spaces <ArrowRight size={16} />
              </span>
            </div>

            <div className="sanct-mid-bottom">
              <Tile k="math" />
              <Tile k="class" />
              <Tile k="science" />
            </div>
          </div>

          <div className="sanct-tall"><Tile k="robotics" /></div>
        </a>
      </ScrollReveal>
    </section>
  );
}
