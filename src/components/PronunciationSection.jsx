import React from 'react';
import { PRONUNCIATION_DATA } from '../data/pronunciationData';
import { CheckCircle2, XCircle } from 'lucide-react';

export const PronunciationSection = () => {
  return (
    <section id="pronunciation" style={{ padding: '32px 0' }}>
      <div className="section-header">
        <div className="section-badge">Sahi Bol, Bappa Khush</div>
        <h3 className="section-title">Aarti Pronunciation Corrections</h3>
        <p className="section-desc">
          Common Aarti mispronunciations vs. correct Marathi meanings.
        </p>
      </div>

      {/* Mispronunciation Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {PRONUNCIATION_DATA.map((item) => (
          <div key={item.id} className="festive-card" style={{ padding: '18px 20px', background: '#FFFFFF' }}>
            <div style={{ marginBottom: '10px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#DC2626',
                fontSize: '0.92rem',
                fontWeight: 600,
                marginBottom: '6px',
                textDecoration: 'line-through'
              }}>
                <XCircle size={16} color="#DC2626" /> {item.incorrect}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#059669',
                fontSize: '1.05rem',
                fontWeight: 700,
                fontFamily: 'Noto Sans Devanagari, sans-serif'
              }}>
                <CheckCircle2 size={18} color="#059669" /> {item.correct}
              </div>
            </div>

            <div style={{
              fontSize: '0.82rem',
              color: '#D97706',
              fontStyle: 'italic',
              fontWeight: 600,
              marginBottom: '6px'
            }}>
              "{item.phonetic}"
            </div>

            <p style={{ fontSize: '0.82rem', color: '#57534E', lineHeight: 1.5, margin: 0 }}>
              {item.meaning}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
