import React from 'react';
import { X, Download, FileText, ExternalLink } from 'lucide-react';

export const PdfViewerModal = ({ isOpen, onClose, pdfUrl = './assets/docs/aartis_jmaxi.pdf' }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="glass-card-gold" style={{
        width: '100%',
        maxWidth: '460px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(234, 179, 8, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(12, 10, 9, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="#EAB308" />
            <h3 style={{
              fontSize: '1.05rem',
              fontFamily: 'Rozha One, serif',
              color: '#FEF08A',
              margin: 0
            }}>
              Official Aarti Collection PDF
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFF',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content - Embed PDF Frame */}
        <div style={{
          flex: 1,
          minHeight: '380px',
          background: '#120E0C',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <iframe
            src={pdfUrl}
            title="Aarti PDF Viewer"
            style={{
              width: '100%',
              height: '100%',
              minHeight: '360px',
              border: 'none'
            }}
          />
        </div>

        {/* Modal Footer Actions */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(234, 179, 8, 0.3)',
          background: 'rgba(12, 10, 9, 0.9)',
          display: 'flex',
          gap: '12px'
        }}>
          <a
            href={pdfUrl}
            download="JMAXI_XLRI_Aarti_Collection.pdf"
            className="btn-gold"
            style={{
              flex: 1,
              textDecoration: 'none',
              fontSize: '0.85rem'
            }}
          >
            <Download size={16} /> Download PDF
          </a>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold"
            style={{
              textDecoration: 'none',
              fontSize: '0.85rem'
            }}
          >
            <ExternalLink size={16} /> Open Full
          </a>
        </div>
      </div>
    </div>
  );
};
