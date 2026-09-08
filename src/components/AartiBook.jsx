import React, { useState, useEffect, useRef } from 'react';
import { AARTIS_DATA } from '../data/aartisData';
import { Play, Pause, ZoomIn, ZoomOut, FileText } from 'lucide-react';
import { PdfViewerModal } from './PdfViewerModal';

export const AartiBook = () => {
  const [selectedAartiId, setSelectedAartiId] = useState(AARTIS_DATA[0].id);
  const [fontSize, setFontSize] = useState(1.15); // rem
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const textContainerRef = useRef(null);
  const selectedAarti = AARTIS_DATA.find(a => a.id === selectedAartiId) || AARTIS_DATA[0];

  useEffect(() => {
    let interval = null;
    if (isAutoScrolling && textContainerRef.current) {
      interval = setInterval(() => {
        if (textContainerRef.current) {
          textContainerRef.current.scrollTop += 1;
        }
      }, 50);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  return (
    <section id="aartis" style={{ padding: '24px 0' }}>
      <div className="section-header">
        <h3 className="section-title">आरती संग्रह (Aarti Collection)</h3>
      </div>

      {/* Compact Single Horizontal Row for PDF Booklet */}
      <div className="festive-card" style={{
        padding: '12px 18px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        background: '#FFFFFF'
      }}>
        <span style={{
          fontSize: '0.92rem',
          fontFamily: 'Marcellus, serif',
          color: '#1C1917',
          fontWeight: 700
        }}>
          Official Printable Aarti Booklet (PDF)
        </span>

        {/* Compact PDF icon button next to text in same row */}
        <button
          onClick={() => setIsPdfOpen(true)}
          className="btn-primary"
          title="Open Aarti PDF"
          style={{
            padding: '6px 14px',
            fontSize: '0.82rem',
            borderRadius: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <FileText size={16} /> PDF
        </button>
      </div>

      {/* Aarti Selector Tabs */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '10px',
        marginBottom: '16px',
        paddingBottom: '6px'
      }}>
        {AARTIS_DATA.map((art) => (
          <button
            key={art.id}
            onClick={() => setSelectedAartiId(art.id)}
            style={{
              padding: '10px 16px',
              borderRadius: '20px',
              border: selectedAartiId === art.id ? '1px solid #D97706' : '1px solid rgba(217, 119, 6, 0.2)',
              background: selectedAartiId === art.id ? 'rgba(217, 119, 6, 0.12)' : '#FFFFFF',
              color: selectedAartiId === art.id ? '#D97706' : '#57534E',
              fontSize: '0.85rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {art.title.split('(')[0]}
          </button>
        ))}
      </div>

      {/* Reader Card */}
      <div className="festive-card" style={{ padding: '20px', background: '#FFFFFF' }}>
        {/* Controls Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(217, 119, 6, 0.15)',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {/* Font Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setFontSize(Math.max(0.95, fontSize - 0.1))}
              title="Decrease Font Size"
              style={{
                background: 'rgba(217, 119, 6, 0.08)',
                border: '1px solid rgba(217, 119, 6, 0.2)',
                color: '#1C1917',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <ZoomOut size={16} />
            </button>
            <span style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 600 }}>
              {Math.round(fontSize * 100)}%
            </span>
            <button
              onClick={() => setFontSize(Math.min(1.6, fontSize + 0.1))}
              title="Increase Font Size"
              style={{
                background: 'rgba(217, 119, 6, 0.08)',
                border: '1px solid rgba(217, 119, 6, 0.2)',
                color: '#1C1917',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <ZoomIn size={16} />
            </button>
          </div>

          {/* Controls: Transliteration & Auto-Scroll */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowTransliteration(!showTransliteration)}
              style={{
                background: showTransliteration ? 'rgba(217, 119, 6, 0.15)' : 'rgba(0,0,0,0.04)',
                border: '1px solid rgba(217, 119, 6, 0.2)',
                color: '#D97706',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {showTransliteration ? 'Devanagari' : 'English'}
            </button>

            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              style={{
                background: isAutoScrolling ? '#D97706' : 'rgba(0,0,0,0.04)',
                color: isAutoScrolling ? '#FFFFFF' : '#D97706',
                border: '1px solid rgba(217, 119, 6, 0.2)',
                padding: '6px 14px',
                borderRadius: '16px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {isAutoScrolling ? <Pause size={12} /> : <Play size={12} />}
              {isAutoScrolling ? 'Pause' : 'Auto-Scroll'}
            </button>
          </div>
        </div>

        {/* Text Container */}
        <div
          ref={textContainerRef}
          style={{
            maxHeight: '380px',
            overflowY: 'auto',
            paddingRight: '8px'
          }}
        >
          <h4 style={{
            fontFamily: 'Marcellus, serif',
            fontSize: '1.35rem',
            color: '#1C1917',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {selectedAarti.title}
          </h4>

          <pre style={{
            fontFamily: showTransliteration ? 'Outfit, sans-serif' : 'Noto Sans Devanagari, sans-serif',
            fontSize: `${fontSize}rem`,
            lineHeight: 1.9,
            color: '#292524',
            whiteSpace: 'pre-wrap',
            textAlign: 'center',
            margin: '0 0 20px 0'
          }}>
            {showTransliteration ? selectedAarti.transliteration : selectedAarti.marathiText}
          </pre>

          <div style={{
            padding: '14px',
            background: 'rgba(250, 247, 242, 0.9)',
            borderRadius: '12px',
            border: '1px dashed rgba(217, 119, 6, 0.3)',
            fontSize: '0.82rem',
            color: '#57534E',
            textAlign: 'center'
          }}>
            <strong style={{ color: '#D97706' }}>Meaning: </strong>
            {selectedAarti.meaning}
          </div>
        </div>
      </div>

      <PdfViewerModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl="./assets/docs/aartis_jmaxi.pdf"
      />
    </section>
  );
};
