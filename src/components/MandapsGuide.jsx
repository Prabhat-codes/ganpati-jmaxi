import React, { useState } from 'react';
import { MANDAPS_DATA } from '../data/mandapsData';
import { MapPin, Navigation } from 'lucide-react';

export const MandapsGuide = () => {
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredMandaps = selectedCity === 'All'
    ? MANDAPS_DATA
    : MANDAPS_DATA.filter(m => m.city.toLowerCase() === selectedCity.toLowerCase());

  return (
    <section id="mandaps" style={{ padding: '24px 0' }}>
      <div className="section-header">
        <h3 className="section-title">Iconic Mandaps Guide (Mumbai & Pune)</h3>
      </div>

      {/* City Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
        maxWidth: '300px'
      }}>
        {['All', 'Mumbai', 'Pune'].map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '16px',
              border: selectedCity === city ? '1px solid #D97706' : '1px solid rgba(217, 119, 6, 0.2)',
              background: selectedCity === city ? 'linear-gradient(135deg, #F59E0B, #D97706)' : '#FFFFFF',
              color: selectedCity === city ? '#FFFFFF' : '#57534E',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
              boxShadow: selectedCity === city ? '0 2px 8px rgba(217, 119, 6, 0.25)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Horizontal Scroll Snap Container */}
      <div className="horizontal-scroll-container">
        {filteredMandaps.map((mandap) => (
          <div key={mandap.id} className="festive-card horizontal-scroll-item" style={{ padding: 0, overflow: 'hidden', background: '#FFFFFF' }}>
            {/* Header Image */}
            <div style={{
              height: '160px',
              position: 'relative',
              backgroundImage: `url(${mandap.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.95) 100%)'
              }} />

              {/* City Tag */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: mandap.city === 'Mumbai' ? '#2563EB' : '#E11D48',
                color: '#FFF',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: 700
              }}>
                {mandap.city}
              </div>

              {/* Established Tag */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                color: '#D97706',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: 700,
                border: '1px solid rgba(217, 119, 6, 0.3)'
              }}>
                Estd. {mandap.established}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '16px' }}>
              <h4 style={{
                fontFamily: 'Marcellus, serif',
                fontSize: '1.15rem',
                color: '#1C1917',
                marginBottom: '4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {mandap.name}
              </h4>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.78rem',
                color: '#78716C',
                marginBottom: '10px'
              }}>
                <MapPin size={13} color="#D97706" /> {mandap.location}
              </div>

              <p style={{
                fontSize: '0.8rem',
                color: '#57534E',
                lineHeight: 1.45,
                height: '52px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                marginBottom: '12px'
              }}>
                {mandap.description}
              </p>

              <a
                href={mandap.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  width: '100%',
                  fontSize: '0.78rem',
                  padding: '8px 12px',
                  borderRadius: '14px',
                  textDecoration: 'none'
                }}
              >
                <Navigation size={13} /> View on Google Maps
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
