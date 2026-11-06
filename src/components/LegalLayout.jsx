import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);

export default function LegalLayout({ title, updated, children }) {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <section style={{ background: 'linear-gradient(135deg,var(--blue-light) 0%,var(--green-light) 100%)', padding: '64px 24px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <button onClick={() => { navigate('/'); window.scrollTo(0,0); }} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'var(--blue)', fontSize: 14, fontWeight: 600,
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', marginBottom: 24,
          }}>
            <ArrowLeft /> Back to home
          </button>
          <h1 style={{ fontSize: 'clamp(30px,4vw,48px)', fontWeight: 800, letterSpacing: -1, color: 'var(--text)', marginBottom: 12 }}>{title}</h1>
          <p style={{ color: 'var(--text2)', fontSize: 15 }}>Last updated: {updated}</p>
        </div>
      </section>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 80px' }}>
        {children}
      </div>
      <Footer />
    </>
  );
}
