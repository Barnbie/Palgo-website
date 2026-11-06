import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleNav = (href) => {
    if (href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = href.replace('/#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const colTitle = { color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 16 };
  const colLink = {
    display: 'block', color: 'var(--footer-text)', fontSize: 14,
    marginBottom: 12, background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'inherit', textAlign: 'left', padding: 0, transition: 'color .2s',
  };

  return (
    <footer style={{ background: 'var(--footer-bg)', padding: '56px 24px 0' }}>
      <div style={{
        maxWidth: 1120, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 48, paddingBottom: 48,
      }}>
        {/* Brand */}
        <div>
          <button onClick={() => handleNav('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#1A56DB,#16A34A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>P</span>
            </div>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-.5px' }}>Palgo</span>
          </button>
          <p style={{ color: 'var(--footer-text)', fontSize: 14, lineHeight: 1.7, maxWidth: 220 }}>
            Your personal errand network. Request help on your terms, any time, anywhere.
          </p>
        </div>

        {/* Product */}
        <div>
          <p style={colTitle}>Product</p>
          {[['How it works','/#how-it-works'],['Features','/#features'],['FAQ','/#faq'],['Become a Runner','/#for-runners']].map(([label, href]) => (
            <button key={label} onClick={() => handleNav(href)} style={colLink}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text)'}
            >{label}</button>
          ))}
        </div>

        {/* Company */}
        <div>
          <p style={colTitle}>Company</p>
          {[['About us','/#about'],['Contact','/#contact']].map(([label, href]) => (
            <button key={label} onClick={() => handleNav(href)} style={colLink}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text)'}
            >{label}</button>
          ))}
        </div>

        {/* Legal */}
        <div>
          <p style={colTitle}>Legal</p>
          {[['Privacy policy','/privacy-policy'],['Terms of service','/terms-of-service'],['Cookie policy','/cookie-policy']].map(([label, href]) => (
            <button key={label} onClick={() => handleNav(href)} style={colLink}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--footer-text)'}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1120, margin: '0 auto',
        borderTop: '1px solid rgba(255,255,255,.07)',
        padding: '20px 0',
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', alignItems: 'center', gap: 12,
      }}>
        <p style={{ color: 'var(--footer-text)', fontSize: 13 }}>
          © {year} Palgo. All rights reserved.
        </p>
        <p style={{ color: 'var(--footer-text)', fontSize: 13 }}>
          Developed by <span style={{ color: '#94A3B8', fontWeight: 600 }}>Lumie Web Studios</span>
        </p>
      </div>
    </footer>
  );
}
