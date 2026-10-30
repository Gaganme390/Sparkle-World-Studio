import React from 'react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import FinalCTA from '../components/FinalCTA';
import './InspiredSpacesPage.css';

export const inspiredSpacesList = [
  {
    id: 'smart-classrooms',
    category: 'Classrooms',
    title: 'Smart Classrooms',
    motto: 'Where Ideas Come Alive',
    tag: 'GD Goenka School, Ayodhya | Nursery to Grade 12',
    image: '/school-media/facilities/smart_classrooms.jpg',
    alt: 'Teacher writing on interactive flat panel display in bright, spacious smart classroom',
    desc: 'Bright, spacious, air-conditioned classrooms create an inviting setting for learning. Interactive digital resources bring lessons to life, while discussion, collaboration, and independent work encourage students to question, understand, and express their ideas. Learning experiences evolve with each stage, from early discovery to deeper academic exploration in senior secondary classes.'
  },
  {
    id: 'library',
    category: 'Library',
    title: 'Library',
    motto: 'Discover Worlds Beyond the Page',
    tag: 'GD Goenka School, Ayodhya | Nursery to Grade 12',
    image: '/school-media/facilities/library.jpg',
    alt: 'Children reading together inside the vibrant, sunlit school library',
    desc: 'A welcoming space for curious minds, our library connects students with stories, literature, science, history, and reference resources. Younger children discover the joy of reading, while older learners explore diverse perspectives and develop research skills. Guided reading and independent inquiry support academic growth and a lasting relationship with books.'
  },
  {
    id: 'science-laboratories',
    category: 'Laboratories',
    title: 'Science Laboratories',
    motto: 'Explore the Evidence, Understand the World',
    tag: 'GD Goenka School, Ayodhya | Nursery to Grade 12',
    image: '/school-media/facilities/science_laboratories.jpg',
    alt: 'Students conducting chemistry and biology experiments in modern science lab',
    desc: 'Practical investigation brings scientific concepts into focus. Age-appropriate activities introduce younger learners to observation and experimentation, while advanced work in Physics, Chemistry, and Biology develops deeper understanding in higher classes. Guided experiments help students connect theory with evidence, analyse results, and apply scientific reasoning.'
  },
  {
    id: 'digital-learning-lab',
    category: 'Digital Labs',
    title: 'Digital Learning Lab (Tab Lab)',
    motto: 'New Ways to Explore and Understand',
    tag: 'GD Goenka Junior Wing | Nursery to Grade 2',
    image: '/school-media/facilities/digital_learning_lab.jpg',
    alt: 'Students interacting with self-paced educational applications on tablets',
    desc: "Interactive visuals and guided tablet activities make learning engaging and responsive to students' needs. Early learners practise literacy, numeracy, and creative thinking through educational applications. As students progress, digital investigations, data collection, and analysis support increasingly complex learning across subjects."
  },
  {
    id: 'mathematics-exploration-lab',
    category: 'Laboratories',
    title: 'Mathematics Exploration Lab',
    motto: 'Make Connections, Find Solutions',
    tag: 'GD Goenka School, Ayodhya | Nursery to Grade 12',
    image: '/school-media/facilities/mathematics_exploration_lab.jpg',
    alt: 'Tactile mathematical manipulatives and hands-on geometry models',
    desc: 'Hands-on exploration helps students see the meaning behind mathematical ideas. Visual aids, models, and practical tools support understanding of numbers, patterns, shapes, and relationships. Progressively challenging investigations encourage learners to reason carefully, compare methods, and apply concepts with confidence.'
  },
  {
    id: 'computer-digital-literacy',
    category: 'Digital Labs',
    title: 'Computer and Digital Literacy Centre',
    motto: 'Think Critically, Create Responsibly',
    tag: 'GD Goenka School, Ayodhya | Nursery to Grade 12',
    image: '/school-media/facilities/computer_and_digital_literacy_centre.jpg',
    alt: 'Students seated at workstations in the Information and Computer Centre',
    desc: 'From foundational computer skills to thoughtful digital inquiry, learners develop confidence with modern tools. Practical experience with research, presentation software, and coding concepts encourages analytical thinking, collaborative work, and responsible digital citizenship across all stages of learning.'
  },
  {
    id: 'robotics-and-ai-lab',
    category: 'Laboratories',
    title: 'Robotics and STEM Discovery Lab',
    motto: 'Build, Code, and Innovate',
    tag: 'GD Goenka School, Ayodhya | Nursery to Grade 12',
    image: '/school-media/facilities/robotics_and_ai_lab.jpg',
    alt: 'Students building and coding robotics hardware and 3D printing components',
    desc: 'A dynamic innovation laboratory equipped with rapid-prototyping 3D printers, sensor automation rigs, and versatile robotics assembly kits. Students journey from foundational LEGO mechanics to algorithm scripting, wireless telemetry, and real-world engineering problem solving.'
  },
  {
    id: 'reggio-discovery-centre',
    category: 'Early Childhood',
    title: 'Reggio Discovery Centre',
    motto: 'Where Curiosity Finds Expression',
    tag: 'GD Goenka Junior Wing | Early Childhood Discovery',
    image: '/school-media/facilities/reggio_discovery_centre.jpg',
    alt: 'Reggio Discovery Centre natural exploration stations with tactile textures',
    desc: 'For our youngest learners, questions become starting points for hands-on discovery. Natural elements, recycled materials, and sensory resources invite children to investigate, create, and share their thinking. Our Reggio-inspired environment supports classroom learning while encouraging imagination and meaningful exploration.'
  },
  {
    id: 'montessori-learning-centre',
    category: 'Early Childhood',
    title: 'Montessori Learning Centre',
    motto: 'Small Discoveries, Growing Independence',
    tag: 'GD Goenka Junior Wing | Foundational Years',
    image: '/school-media/facilities/montessori_learning_centre.jpg',
    alt: 'Montessori Learning Centre sensory apparatus and tactile materials',
    desc: 'Carefully designed materials help young children learn through touch, movement, and practical experience. Exploration at an individual pace develops concentration, coordination, fine motor skills, and early academic understanding. Each achievement encourages independence and builds confidence for future learning.'
  },
  {
    id: 'indoor-sports-complex',
    category: 'Sports & Athletics',
    title: 'Indoor Sports Arena & Activities Room',
    motto: 'Focus, Discipline & Physical Agility',
    tag: 'GD Goenka School, Ayodhya | All-Weather Facilities (Grades 1 to 12)',
    image: '/school-media/facilities/indoor_sports_complex.jpg',
    alt: 'Comprehensive multi-sport indoor sports arena and activity rooms',
    desc: 'Our indoor sports arena offers a climate-controlled, professional setting for year-round fitness and athletic mastery. Featuring an Olympic-standard 10m shooting range, regulation badminton and table tennis courts, specialized gymnastics apparatus, and dedicated yoga suites, students cultivate motor agility, concentration, and enduring sporting values.'
  },
  {
    id: 'outdoor-sports-complex',
    category: 'Sports & Athletics',
    title: 'Outdoor Championship Sports Complex',
    motto: 'Endurance, Teamwork & Champion Spirit',
    tag: 'GD Goenka School, Ayodhya | International Spec (Grades 1 to 12)',
    image: '/school-media/sports/sports_ground_drone_aerial.jpg',
    alt: 'Aerial drone view of championship outdoor synthetic courts and sports outfield',
    desc: 'Captured via aerial drone perspective, our championship outdoor complex features international-standard synthetic courts, a regulation FIBA basketball arena, dual tennis courts, an all-weather running track, and expansive turf cricket and football outfields. Certified physical trainers coach students in competitive tournament techniques, stamina, and exemplary sportsmanship.'
  }
];

export default function InspiredSpacesPage({ onOpenVisit, onOpenEnquiry, setCurrentRoute }) {
  return (
    <main className="inspired-spaces-page" style={{ paddingTop: 'var(--header-height)' }}>
      {/* Sequence of Thoughtfully Designed Spaces (Faithfully Matching Design Screenshot) */}
      <div className="isp-spaces-wrapper">
        {inspiredSpacesList.map((space) => (
          <section key={space.id} id={space.id} className="isp-space-section">
            <div className="container">
              {/* Centered Editorial Header: Title / Motto Subtitle / School Grade Tag */}
              <div className="isp-section-header">
                <ScrollReveal variant="fadeUp">
                  <h2 className="isp-section-title">{space.title}</h2>
                  <p className="isp-section-subtitle">{space.motto}</p>
                  <p className="isp-section-subtext">{space.tag}</p>
                </ScrollReveal>
              </div>

              {/* Two-Column Side-by-Side: White Text Box (Left) + Landscape Photo (Right) */}
              <div className="isp-section-row">
                <ScrollReveal variant="fadeUp" delay={0.1} className="isp-text-box-reveal">
                  <div className="isp-text-card">
                    <p className="isp-text-content">{space.desc}</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="fadeUp" delay={0.15} className="isp-media-box-reveal">
                  <div className="isp-media-card">
                    <img 
                      src={space.image} 
                      alt={space.alt || space.title} 
                      loading="lazy" 
                      className="isp-media-img"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Final Call to Action */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
