import React from 'react';
import { Trophy, Music, Compass, Cpu, Mic, Palette } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import KineticFlair from '../components/KineticFlair';
import './StudentLifeSection.css';

const activities = [
  {
    id: 'athletics',
    tag: '11 DISTRICT MEDALS',
    title: 'Athletic & Martial Arts',
    desc: 'Competitive track and field athletics, annual sports meets, and district-champion Taekwondo training fostering physical stamina, character, and perseverance.',
    image: '/school-media/Taekwando/Taekwondo Winners.jpg',
    icon: Trophy,
    alt: 'GD Goenka Ayodhya Taekwondo & Athletic Champions'
  },
  {
    id: 'arts',
    tag: 'PERFORMING ARTS',
    title: 'Cultural & Performing Arts',
    desc: 'From vibrant Dandiya Night and Dussehra celebrations to Inter-House Rangoli championships, students explore musical rhythms, classical dance, and folk arts.',
    image: '/school-media/Cultural Celebration/classical_dance_performance.jpg',
    icon: Music,
    alt: 'Classical Dance & Cultural Performing Arts at GD Goenka Ayodhya'
  },
  {
    id: 'outreach',
    tag: 'EMPATHY IN ACTION',
    title: 'Community & Social Outreach',
    desc: 'Compassionate initiatives like "One for Me, One for You" with Muskan Rehabilitation Centre, World AIDS Day assemblies, and UKG E-Waste upcycling projects.',
    image: '/school-media/Disability Day/IMG_1673.JPG',
    icon: Compass,
    alt: 'Social Outreach at GD Goenka Ayodhya'
  },
  {
    id: 'stem',
    tag: 'ROBOTICS & INNOVATION',
    title: 'STEM & Robotics Guild',
    desc: 'Autonomous engineering, 3D rapid prototyping, AI hackathons, and inter-school robotics tournaments fostering innovative algorithmic minds and scientific problem-solving.',
    image: '/school-media/facilities/robotics_and_ai_lab.jpg',
    icon: Cpu,
    alt: 'Robotics and STEM Innovation Guild at GD Goenka Ayodhya'
  },
  {
    id: 'oratory',
    tag: 'LEADERSHIP & MUN',
    title: 'Debate, MUN & Literary Forum',
    desc: 'Parliamentary debates, Model United Nations conferences, creative anthology writing, and poetry slams honing articulate voices, negotiation skills, and global outlook.',
    image: '/school-media/Digital Lab/language_lab_headset.jpg',
    icon: Mic,
    alt: 'Student oratory and language development at GD Goenka Ayodhya'
  },
  {
    id: 'visual-arts',
    tag: 'FINE ARTS & CRAFT',
    title: 'Visual Arts & Clay Craft Studio',
    desc: 'Pottery wheels, watercolor exploration, canvas painting, and environmental upcycling encouraging creative individual expression and spatial aesthetic design.',
    image: '/school-media/New Pages/Page 12/WhatsApp Image 2026-10-07 at 5.21.45 PM.jpeg',
    icon: Palette,
    alt: 'Fine arts and paper craft studio work at GD Goenka Ayodhya'
  }
];

export default function StudentLifeSection({ onOpenEnquiry }) {
  return (
    <section className="studentlife-section section-padding" id="studentlife">
      <div className="container">
        <div>
          <ScrollReveal variant="fadeUp">
            <span className="tag-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              STUDENT LIFE & CO-CURRICULARS
              <KineticFlair type="star" size={15} />
            </span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem' }}
            text="LIFE BEYOND THE TIMETABLE"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ maxWidth: '720px', marginTop: '0.75rem' }}>
              Co-curricular clubs, competitive athletics, Model UN debate forums, musical orchestras, 
              and community initiatives enrich every student’s daily school journey, helping them 
              discover passions that last a lifetime.
            </p>
          </ScrollReveal>
        </div>

        <div className="studentlife-grid">
          {activities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal 
                key={item.id} 
                variant="fadeUp" 
                delay={0.08 * (idx % 3)}
              >
                <div className="studentlife-card hover-lift">
                  <div className="studentlife-card-image-wrap">
                    <img 
                      src={item.image} 
                      alt={item.alt} 
                      className="studentlife-card-img"
                      loading="lazy"
                    />
                    <span className="studentlife-card-tag">{item.tag}</span>
                  </div>
                  <div className="studentlife-card-content">
                    <div className="studentlife-icon-box">
                      <Icon size={24} />
                    </div>
                    <h3 className="studentlife-title">{item.title}</h3>
                    <p className="studentlife-desc">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
