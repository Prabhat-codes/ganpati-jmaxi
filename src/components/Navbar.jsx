import React from 'react';

export const Navbar = () => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(250, 247, 242, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(217, 119, 6, 0.18)',
      padding: '14px 0',
      marginBottom: '8px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo with Ganesha Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(217, 119, 6, 0.25)'
          }}>
            {/* Elegant Ganesha Silhouette SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Crown Mukut */}
              <path d="M12 2.5L14.2 6.5H9.8L12 2.5Z" fill="#FFFFFF" />
              {/* Tilak / Trishul forehead mark */}
              <path d="M12 7V10M10.5 8H13.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
              {/* Ganesha Trunk (Sond) */}
              <path d="M12 10.5C9 10.5 7 12.5 7 15C7 17.5 9 19 11 19C13 19 13.5 20.5 12.5 21.5C11.8 22.2 10 22.5 8.5 22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              {/* Big Ear Left */}
              <path d="M7 11.5C5 11.5 4 13.5 5 15.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
              {/* Big Ear Right */}
              <path d="M17 11.5C19 11.5 20 13.5 19 15.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h1 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            fontFamily: 'Marcellus, serif',
            color: '#1C1917',
            margin: 0,
            letterSpacing: '0.5px'
          }}>
            JMAXI
          </h1>
        </div>

        {/* Clean Nav Links */}
        <nav style={{ display: 'flex', gap: '18px', fontSize: '0.85rem', fontWeight: 600 }}>
          <a href="#schedule" style={{ color: '#57534E', textDecoration: 'none' }}>Schedule</a>
          <a href="#aartis" style={{ color: '#57534E', textDecoration: 'none' }}>Aartis</a>
          <a href="#mandaps" style={{ color: '#57534E', textDecoration: 'none' }}>Mandaps</a>
          <a href="#memories" style={{ color: '#57534E', textDecoration: 'none' }}>Memories</a>
        </nav>
      </div>
    </header>
  );
};
