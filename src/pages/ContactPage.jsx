import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { contactDetails } from '../data/contact';
import FinalCTA from '../components/FinalCTA';

export default function ContactPage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <span className="tag-label">DIRECT CAMPUS CONNECT</span>
          <h1 className="heading-hero" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            CONTACT US.
          </h1>
          <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
            We welcome parents, guardians, and visitors to connect with our campus administration or visit us in Ayodhya.
          </p>
        </div>
      </section>

      {/* Details & Map Grid */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          <div className="editorial-grid" style={{ alignItems: 'flex-start' }}>
            {/* Contact Details Column */}
            <div className="col-12 col-md-5">
              <span className="tag-label">OFFICIAL DIRECTORY</span>
              <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
                Campus Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-soft-accent-subtle)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-display" style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Campus Address</h4>
                    <p className="text-body" style={{ fontSize: '0.92rem' }}>{contactDetails.campusAddress}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-soft-accent-subtle)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-display" style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Admissions Phone</h4>
                    <p className="text-body" style={{ fontSize: '0.92rem', color: 'var(--color-accent)', fontWeight: 700 }}>
                      {contactDetails.phoneNumbers.join(' / ')}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-soft-accent-subtle)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-display" style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Email Inquiries</h4>
                    <p className="text-body" style={{ fontSize: '0.92rem' }}>Admissions: {contactDetails.emails.admissions}</p>
                    <p className="text-body" style={{ fontSize: '0.92rem' }}>General: {contactDetails.emails.info}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-soft-accent-subtle)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 className="font-display" style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Visiting Hours</h4>
                    <p className="text-body" style={{ fontSize: '0.92rem' }}>{contactDetails.officeHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map & Quick Contact */}
            <div className="col-12 col-md-7">
              <div style={{ background: 'var(--color-warm-white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: 'var(--border-thin)', boxShadow: 'var(--shadow-subtle)' }}>
                <span className="tag-label">SCHEDULE VISIT</span>
                <h3 className="font-display" style={{ fontSize: '2rem', color: 'var(--color-primary-dark)', marginTop: '0.5rem', marginBottom: '1rem' }}>
                  Book Campus Walkthrough
                </h3>
                <p className="text-body" style={{ marginBottom: '2rem' }}>
                  Select a date and time to visit our classrooms, STEM suites, aquatic pool, and meet our academic leadership team.
                </p>

                <button className="btn-enquire" onClick={onOpenVisit || onOpenEnquiry} style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                  Book Campus Visit <ArrowRight size={18} />
                </button>


                {/* Map Frame Placeholder */}
                <div style={{ marginTop: '2.5rem', height: '280px', background: 'var(--color-primary-dark)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', textAlign: 'center', padding: '1.5rem' }}>
                  <MapPin size={36} style={{ color: 'var(--color-accent)', marginBottom: '0.75rem' }} />
                  <h4 className="font-display" style={{ fontSize: '1.4rem', color: '#FFFFFF' }}>GD GOENKA CAMPUS AYODHYA</h4>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
                    NH-28 / Highway Corridor, Ayodhya, UP 224001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
