import React from 'react';
import endingImg from '../../ending_image.png';

export const EndingImageSection = () => {
  return (
    <section id="ending-image" style={{
      padding: '36px 0 24px 0',
      borderTop: '1px solid rgba(217, 119, 6, 0.15)',
      textAlign: 'center'
    }}>
      {/* Clean Full-Width Wide Horizontal Image Only */}
      <div className="festive-card" style={{
        padding: '8px',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#FFFFFF',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)'
      }}>
        <img
          src={endingImg}
          alt="Ending Image"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '560px',
            objectFit: 'contain',
            borderRadius: '14px',
            display: 'block'
          }}
        />
      </div>
    </section>
  );
};
