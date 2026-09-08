import React from 'react';
import { MEMORIES_DATA } from '../data/memoriesData';

export const MemoriesCarousel = () => {
  return (
    <section id="memories" style={{ padding: '24px 0' }}>
      <div className="section-header">
        <h3 className="section-title">Previous JMAXI Celebrations</h3>
      </div>

      {/* Pure Horizontal Scroll Images */}
      <div className="horizontal-scroll-container" style={{ marginBottom: '12px' }}>
        {MEMORIES_DATA.map((item, idx) => (
          <div key={idx} className="festive-card horizontal-scroll-item" style={{
            padding: 0,
            overflow: 'hidden',
            borderRadius: '20px',
            background: '#FFFFFF',
            flex: '0 0 85%',
            maxWidth: '340px'
          }}>
            <img
              src={item.image}
              alt={`Previous JMAXI Celebration ${idx + 1}`}
              style={{
                width: '100%',
                height: '220px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        ))}
      </div>

      {/* Dot Dot Dot indicator below images for multiple uploads */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        alignItems: 'center'
      }}>
        {MEMORIES_DATA.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: idx === 0 ? '18px' : '6px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: idx === 0 ? '#D97706' : 'rgba(217, 119, 6, 0.25)',
              display: 'inline-block'
            }}
          />
        ))}
        <span style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 700, marginLeft: '4px' }}>...</span>
      </div>
    </section>
  );
};
