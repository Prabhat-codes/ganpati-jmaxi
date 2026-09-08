import React, { useState, useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';

export const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-09-14T10:45:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{
      padding: '24px 0 16px 0',
      position: 'relative',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Main Title */}
      <h2 style={{
        fontFamily: 'Marcellus, serif',
        fontSize: '2.6rem',
        lineHeight: '1.2',
        color: '#1C1917',
        marginBottom: '4px'
      }}>
        Ganpati Utsav
      </h2>

      <p style={{
        fontSize: '0.95rem',
        color: '#D97706',
        fontWeight: 700,
        marginBottom: '18px',
        letterSpacing: '0.5px'
      }}>
        Jai Maharashtra Association of XLRI
      </p>

      {/* Marathi Invitation Banner */}
      <div className="festive-card" style={{
        width: '100%',
        padding: '20px 16px',
        marginBottom: '20px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.95)'
      }}>
        <div style={{
          fontSize: '1.15rem',
          fontFamily: 'Noto Sans Devanagari, sans-serif',
          color: '#92400E',
          marginBottom: '12px',
          lineHeight: 1.5,
          fontWeight: 700
        }}>
          "बाप्पाच्या आगमनाची लागली आहे आस,<br />
          XL मध्ये लवकरच रंगणार उत्सव खास!"
        </div>

        <p style={{ fontSize: '0.88rem', color: '#57534E', lineHeight: 1.5, marginBottom: '14px', maxWidth: '600px', margin: '0 auto 14px auto' }}>
          JMAXI warmly invites the entire XLRI campus community to welcome Bappa to our campus with devotion, dhol-tasha, and joy!
        </p>

        {/* Date and Venue in SINGLE horizontal row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '12px',
          fontSize: '0.82rem',
          color: '#92400E',
          flexWrap: 'nowrap'
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(217, 119, 6, 0.08)',
            padding: '6px 14px',
            borderRadius: '16px',
            border: '1px solid rgba(217, 119, 6, 0.25)',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}>
            <Calendar size={14} color="#D97706" /> 14 - 15 September
          </span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(217, 119, 6, 0.08)',
            padding: '6px 14px',
            borderRadius: '16px',
            border: '1px solid rgba(217, 119, 6, 0.25)',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}>
            <MapPin size={14} color="#D97706" /> NH Mess Common Area
          </span>
        </div>
      </div>

      {/* Countdown Ticker */}
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <span style={{
          fontSize: '0.72rem',
          color: '#78716C',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          fontWeight: 700,
          display: 'block',
          marginBottom: '10px'
        }}>
          Countdown to Agaman
        </span>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px'
        }}>
          {[
            { label: 'DAYS', val: timeLeft.days },
            { label: 'HOURS', val: timeLeft.hours },
            { label: 'MINUTES', val: timeLeft.minutes },
            { label: 'SECONDS', val: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} className="festive-card" style={{
              padding: '12px 6px',
              textAlign: 'center',
              background: '#FFFFFF'
            }}>
              <span style={{
                display: 'block',
                fontSize: '1.5rem',
                fontWeight: 700,
                fontFamily: 'Marcellus, serif',
                color: '#D97706'
              }}>
                {String(item.val).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.62rem', color: '#78716C', fontWeight: 600 }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
