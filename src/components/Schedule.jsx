import React, { useState } from 'react';
import { SCHEDULE_DATA } from '../data/scheduleData';
import { Clock } from 'lucide-react';

export const Schedule = ({ activeEventId, onSelectEvent }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <section id="schedule" style={{ padding: '24px 0' }}>
      <div className="section-header">
        <h3 className="section-title">Utsav Schedule & Dress Code</h3>
      </div>

      {/* Day Selector Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        maxWidth: '360px'
      }}>
        {SCHEDULE_DATA.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDay(idx)}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '20px',
              border: selectedDay === idx ? '1px solid #D97706' : '1px solid rgba(217, 119, 6, 0.2)',
              background: selectedDay === idx ? 'linear-gradient(135deg, #F59E0B, #D97706)' : '#FFFFFF',
              color: selectedDay === idx ? '#FFFFFF' : '#57534E',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: selectedDay === idx ? '0 4px 14px rgba(217, 119, 6, 0.3)' : '0 2px 6px rgba(0,0,0,0.03)',
              transition: 'all 0.25s ease'
            }}
          >
            {day.date}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {SCHEDULE_DATA[selectedDay].events.map((evt) => {
          const isSelected = activeEventId === evt.id;

          return (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="festive-card"
              style={{
                padding: '20px',
                cursor: 'pointer',
                borderWidth: isSelected ? '1.5px' : '1px',
                borderColor: isSelected ? evt.theme.accent : 'rgba(217, 119, 6, 0.2)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '10px',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <h4 style={{
                    fontFamily: 'Marcellus, serif',
                    fontSize: '1.3rem',
                    color: '#1C1917',
                    margin: 0
                  }}>
                    {evt.title}
                  </h4>

                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '0.84rem',
                    color: '#57534E',
                    marginTop: '6px'
                  }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} color="#D97706" /> {evt.time}
                    </span>
                  </div>
                </div>

                {/* Dress Code Color Tiles */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(250, 247, 242, 0.8)',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid rgba(217, 119, 6, 0.18)'
                }}>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#78716C',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Dress Code:
                  </span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {evt.dressCodeTiles.map((tile, tIdx) => (
                      <span
                        key={tIdx}
                        className="color-tile"
                        title={tile.name}
                        style={{ backgroundColor: tile.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
