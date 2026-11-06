import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../App';

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const productLinks = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Become a Runner', href: '/#for-runners' },
];
const companyLinks = [
  { label: 'About us', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

function DropdownMenu({ items, onNavigate }) {
  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 4px)', left: 0,
      background: 'var(--card-bg)', borderRadius: 12,
      boxShadow: 'var(--shadow-md)', minWidth: 190,
      padding: '6px', zIndex: 300,
    }}>
      {items.map(item => (
        <button key={item.label} onClick={() => onNavigate(item.href)} style={{
          display: 'block', width: '100%', textAlign: 'left',
          padding: '10px 14px', borderRadius: 8, border: 'none',
          background: 'none', cursor: 'pointer', fontFamily: 'inherit',
          fontSize: 14, fontWeight: 500, color: 'var(--text2)',
          transition: 'background .15s, color .15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg2)'; e.currentTarget.style.color = 'var(--blue)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text2)'; }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const closeTimer = useRef(null);

  const handleNavEnter = (name) => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };
  const handleNavLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const handleNavigate = (href) => {
    setActiveDropdown(null);
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = href.replace('/#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(href);
    }
  };

  const navItemStyle = {
    position: 'relative', display: 'inline-block',
  };
  const navBtnStyle = {
    background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
    color: 'var(--text2)', padding: '8px 12px', borderRadius: 8,
    display: 'flex', alignItems: 'center', gap: 5,
    transition: 'background .2s, color .2s',
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: 'var(--nav-bg)', backdropFilter: 'blur(14px)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        maxWidth: 1120, margin: '0 auto', padding: '0 24px',
        height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 16,
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--blue), var(--green))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>P</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, color: 'var(--text)', letterSpacing: '-.5px' }}>Palgo</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {/* Product dropdown */}
          <div style={navItemStyle}
            onMouseEnter={() => handleNavEnter('product')}
            onMouseLeave={handleNavLeave}
          >
            <button style={navBtnStyle}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg2)'; e.currentTarget.style.color = 'var(--blue)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text2)'; }}
            >
              Product <ChevronDown />
            </button>
            {activeDropdown === 'product' && (
              <DropdownMenu items={productLinks} onNavigate={handleNavigate} />
            )}
          </div>
          {/* Company dropdown */}
          <div style={navItemStyle}
            onMouseEnter={() => handleNavEnter('company')}
            onMouseLeave={handleNavLeave}
          >
            <button style={navBtnStyle}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg2)'; e.currentTarget.style.color = 'var(--blue)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text2)'; }}
            >
              Company <ChevronDown />
            </button>
            {activeDropdown === 'company' && (
              <DropdownMenu items={companyLinks} onNavigate={handleNavigate} />
            )}
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{
            background: 'var(--bg2)', border: 'none', cursor: 'pointer',
            width: 38, height: 38, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text2)', boxShadow: 'var(--shadow-sm)', transition: 'color .2s',
          }}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button onClick={() => handleNavigate('/#waitlist')} style={{
            background: 'var(--blue)', color: '#fff', fontWeight: 600,
            fontSize: 14, padding: '10px 20px', borderRadius: 8, border: 'none',
            cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
            transition: 'background .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}
            className="desktop-cta"
          >
            Join Waitlist
          </button>
          {/* Hamburger */}
          <button onClick={() => setMobileOpen(o => !o)} aria-label="Menu" style={{
            background: 'var(--bg2)', border: 'none', cursor: 'pointer',
            width: 38, height: 38, borderRadius: 10,
            display: 'none', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text)', boxShadow: 'var(--shadow-sm)',
          }} className="hamburger">
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          background: 'var(--nav-bg)', backdropFilter: 'blur(14px)',
          boxShadow: 'var(--shadow-md)', padding: '10px 16px 16px',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text3)', padding: '12px 8px 4px' }}>Product</span>
          {productLinks.map(l => (
            <button key={l.label} onClick={() => handleNavigate(l.href)} style={{
              background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 15, fontWeight: 500, color: 'var(--text2)', padding: '12px 10px',
              borderRadius: 8, textAlign: 'left', transition: 'background .2s, color .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg2)'; e.currentTarget.style.color = 'var(--blue)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text2)'; }}
            >{l.label}</button>
          ))}
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text3)', padding: '12px 8px 4px' }}>Company</span>
          {companyLinks.map(l => (
            <button key={l.label} onClick={() => handleNavigate(l.href)} style={{
              background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 15, fontWeight: 500, color: 'var(--text2)', padding: '12px 10px',
              borderRadius: 8, textAlign: 'left', transition: 'background .2s, color .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg2)'; e.currentTarget.style.color = 'var(--blue)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text2)'; }}
            >{l.label}</button>
          ))}
          <button onClick={() => handleNavigate('/#waitlist')} style={{
            marginTop: 10, background: 'var(--blue)', color: '#fff',
            fontWeight: 700, fontSize: 15, padding: 13, borderRadius: 10,
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Join Waitlist
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (max-width: 640px) {
          .runner-banner { flex-direction: column !important; padding: 0 !important; border-radius: 20px !important; overflow: hidden !important; }
          .runner-banner-img { width: 100% !important; min-height: 200px !important; margin: 0 !important; border-radius: 0 !important; }
          .runner-banner-text { padding: 32px 24px !important; }
        }
      `}</style>
    </nav>
  );
}
