import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ── ICONS ── */
const Icon = ({ d, size = 24, fill = 'none', stroke = 'currentColor' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

/* ── COLORED PLAY STORE ICON ── */
const PlayStoreIcon = () => (
  <svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M48 32C27.2 32 10 49.2 10 70v372c0 20.8 17.2 38 38 38l246-246L48 32z" fill="#00C4FF"/>
    <path d="M438 218l-70-40-78 78 78 78 71-41c20-11.5 20-63.5-1-75z" fill="#FFBC00"/>
    <path d="M48 480c6.8 0 13.2-1.8 18.8-4.8L296 234 48 32c-5.6-3-12-4.8-18.8-4.8C9.2 27.2 0 36.4 0 70v372c0 20.8 17.2 38 38 38z" fill="#00F076"/>
    <path d="M48 32l248 202-70 70L48 32z" fill="#008950" opacity=".6"/>
    <path d="M18.8 475.2L296 278l-70-44L18.8 475.2z" fill="#00A3CC" opacity=".5"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

/* ── REUSABLE REVEAL HOOK ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ── STEP ROW ── */
function StepRow({ num, color, title, text, line, lineColor }) {
  return (
    <div style={{ display: 'flex', gap: 20, paddingBottom: line ? 28 : 0 }}>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>{num}</div>
        {line && <div style={{ width: 2, flex: 1, minHeight: 28, marginTop: 6, background: `linear-gradient(to bottom, ${lineColor}, transparent)` }} />}
      </div>
      <div style={{ paddingTop: 8 }}>
        <h3 style={{ fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 6 }}>{title}</h3>
        <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.6 }}>{text}</p>
      </div>
    </div>
  );
}

/* ── FEAT CARD ── */
function FeatCard({ iconPath, iconBg, iconColor, title, text }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background: 'var(--card-bg)', borderRadius: 16, padding: 28,
      boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hovered ? 'translateY(-3px)' : 'none',
      transition: 'box-shadow .2s, transform .2s',
    }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{iconPath}</svg>
      </div>
      <h3 style={{ fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 8 }}>{title}</h3>
      <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

/* ── FAQ ITEM ── */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: 'var(--card-bg)', borderRadius: 14, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        padding: '20px 22px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 16, textAlign: 'left', fontFamily: 'inherit',
      }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4 }}>{question}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, transition: 'transform .3s', transform: open ? 'rotate(45deg)' : 'none' }}>
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height .35s ease' }}>
        <p style={{ padding: '0 22px 20px', fontSize: 15, color: 'var(--text2)', lineHeight: 1.7 }}>{answer}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleJoin = (role) => {
    if (!name.trim() || !email.trim()) { alert('Please enter your name and email.'); return; }
    if (!email.includes('@')) { alert('Please enter a valid email.'); return; }
    setSubmitted(true);
    setName(''); setEmail('');
  };

  const errands = [
    { icon: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>, label: 'Grocery runs', blue: true },
    { icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>, label: 'Home repairs', blue: false },
    { icon: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>, label: 'Deliveries', blue: true },
    { icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>, label: 'Cleaning', blue: false },
    { icon: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>, label: 'Pickup & drop-off', blue: true },
    { icon: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>, label: 'Shopping runs', blue: false },
    { icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>, label: 'Bill payments', blue: true },
    { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, label: 'Queue & wait in line', blue: false },
  ];

  const features = [
    { iconPath: <polygon points="3 11 22 2 13 21 11 13 3 11"/>, iconBg: 'var(--blue-light)', iconColor: 'var(--blue)', title: 'Live GPS tracking', text: 'Watch your runner move in real time on the map. No more wondering — you always know exactly where your errand is.' },
    { iconPath: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>, iconBg: 'var(--green-light)', iconColor: 'var(--green)', title: 'Price negotiation', text: 'You name a price, runners can accept or counter. No fixed rates — just a fair deal both sides agree on.' },
    { iconPath: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>, iconBg: 'var(--blue-light)', iconColor: 'var(--blue)', title: 'Runner wallet', text: 'Earnings land in your Palgo wallet the moment a job is confirmed. Withdraw to your bank account whenever you want.' },
    { iconPath: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>, iconBg: 'var(--green-light)', iconColor: 'var(--green)', title: 'Dual confirmation', text: 'Both the requester and runner confirm when the job is done. Payment only moves when both sides agree.' },
    { iconPath: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>, iconBg: 'var(--blue-light)', iconColor: 'var(--blue)', title: 'Instant notifications', text: 'Runners get alerted the moment a request is posted. Requesters hear back fast — no long waiting.' },
    { iconPath: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>, iconBg: 'var(--green-light)', iconColor: 'var(--green)', title: 'Secure payments', text: 'Payments go through verified account numbers tied to runner wallets. No cash risk, no loss.' },
  ];

  const faqs = [
    { q: 'What kind of errands can I request?', a: 'Almost anything — grocery shopping, home repairs, cleaning, deliveries, bill payments, pickups, and more. If you can describe it, you can post it on Palgo.' },
    { q: 'How do I pay for an errand?', a: 'Once both parties confirm completion, you send payment directly to the runner\'s verified account number, linked to their Palgo wallet.' },
    { q: 'Can I negotiate the price?', a: 'Yes — you set your price when you post the errand. Runners can accept or send a counteroffer. You choose which offer works before anything is confirmed.' },
    { q: 'How do I track my runner?', a: 'Palgo has a built-in live map. Once a runner accepts your errand, you can watch their location update in real time until the job is done.' },
    { q: 'How do runners get paid?', a: 'Payment goes directly to your Palgo wallet after both parties confirm completion. Withdraw to your bank account any time from within the app.' },
    { q: 'When will Palgo be available?', a: 'We\'re currently in the early access phase. Join the waitlist and you\'ll be among the first to know when Palgo launches in your area.' },
  ];

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 10, fontSize: 15,
    fontFamily: 'inherit', outline: 'none', background: 'var(--bg2)',
    color: 'var(--text)', border: '2px solid transparent',
    boxShadow: 'var(--shadow-sm)', transition: 'border-color .2s',
  };

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #050d2e 0%, #0a1854 40%, #0d2680 70%, #1a3fa3 100%)',
        padding: '100px 24px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow orbs like AirLume */}
        <div style={{ position: 'absolute', top: '-80px', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,163,74,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: '#fff', padding: '8px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 28, border: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
            Now accepting early users
          </div>

          <h1 style={{ fontSize: 'clamp(38px,6vw,66px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5, color: '#ffffff', marginBottom: 20 }}>
            Request Help.<br />
            <span style={{ background: 'linear-gradient(90deg, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Your Price, Your Terms.
            </span>
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: 520, margin: '0 auto 40px' }}>
            Palgo lets you request any errand — groceries, repairs, deliveries, anything — name what you'll pay, and choose your runner. Done.
          </p>

          {/* Store buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 48 }}>
            <a href="#waitlist" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '13px 24px', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', transition: 'all .2s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none'; }}>
              <AppleIcon />
              <div style={{ textAlign: 'left' }}>
                <small style={{ display: 'block', fontSize: 10, opacity: .7, lineHeight: 1, marginBottom: 2 }}>Download on the</small>
                <strong style={{ fontSize: 16, fontWeight: 700 }}>App Store</strong>
              </div>
            </a>
            <a href="#waitlist" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '13px 24px', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', transition: 'all .2s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'none'; }}>
              <PlayStoreIcon />
              <div style={{ textAlign: 'left' }}>
                <small style={{ display: 'block', fontSize: 10, opacity: .7, lineHeight: 1, marginBottom: 2 }}>Get it on</small>
                <strong style={{ fontSize: 16, fontWeight: 700 }}>Google Play</strong>
              </div>
            </a>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', marginBottom: 60 }}>
            {[
              { icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>, text: 'Secure payments' },
              { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, text: 'Live GPS tracking' },
              { icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>, text: 'You set the price' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Hero image placeholder — wide, prominent like diet app */}
        <div style={{ maxWidth: 1000, margin: '0 auto', borderRadius: '24px 24px 0 0', overflow: 'hidden', boxShadow: '0 -8px 60px rgba(99,102,241,0.3), 0 20px 60px rgba(0,0,0,0.5)', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '100%', height: 480,
            background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(99,102,241,0.15) 50%, rgba(16,163,74,0.08) 100%)',
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '.02em' }}>Replace with your app mockup / banner image</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>Recommended size: 1000 × 480px</p>
          </div>
        </div>
      </section>

      {/* ── ERRANDS ── */}
      <section style={{ background: 'var(--bg)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', textAlign: 'center' }}>
          <Reveal><span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 12, display: 'block' }}>Any errand. Really.</span></Reveal>
          <Reveal delay={100}><h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, letterSpacing: '-.5px', color: 'var(--text)', marginBottom: 40 }}>If you can think it, someone can do it</h2></Reveal>
          <Reveal delay={150}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 16, maxWidth: 960, margin: '0 auto' }}>
              {errands.map(({ icon, label, blue }) => (
                <div key={label} style={{
                  borderRadius: 14, padding: '22px 14px', textAlign: 'center',
                  background: blue ? 'var(--blue-light)' : 'var(--green-light)',
                  boxShadow: 'var(--shadow-sm)', cursor: 'default',
                  transition: 'box-shadow .2s, transform .2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={blue ? 'var(--blue)' : 'var(--green-dark)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 10px', display: 'block' }}>
                    {icon}
                  </svg>
                  <p style={{ fontWeight: 600, fontSize: 13, color: blue ? 'var(--blue-dark)' : 'var(--green-dark)' }}>{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background: 'var(--bg2)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 12, display: 'block' }}>The process</span>
              <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, letterSpacing: '-.5px', color: 'var(--text)' }}>How Palgo works</h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 48 }}>
            <Reveal delay={100}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--blue-light)', color: 'var(--blue)', padding: '8px 16px', borderRadius: 999, fontWeight: 700, fontSize: 13, marginBottom: 28 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                For you — the requester
              </div>
              <StepRow num="1" color="var(--blue)" title="Post your errand" text="Describe what you need done and name the price you're willing to pay. No categories, no forms — just plain words." line lineColor="#BFDBFE" />
              <StepRow num="2" color="var(--blue)" title="Pick your runner" text="Runners reply with their offer. Compare prices and profiles, then choose the one that works for you." line lineColor="#BFDBFE" />
              <StepRow num="3" color="var(--green)" title="Track & confirm" text="Watch your runner on the live map. Once done and both sides confirm, send payment to the runner's account." />
            </Reveal>
            <Reveal delay={200}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--green-light)', color: 'var(--green-dark)', padding: '8px 16px', borderRadius: 999, fontWeight: 700, fontSize: 13, marginBottom: 28 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4v16M6 12l7-8 7 8"/></svg>
                For errand runners
              </div>
              <StepRow num="1" color="var(--green)" title="See live requests" text="Browse open errands near you in real time. See the client's offered price before you decide to respond." line lineColor="#BBF7D0" />
              <StepRow num="2" color="var(--green)" title="Make your offer" text="Accept the client's price or counter with your own. You're always in control of what you earn." line lineColor="#BBF7D0" />
              <StepRow num="3" color="var(--blue)" title="Complete & get paid" text="Finish the job, confirm completion, and receive payment straight to your Palgo wallet. Withdraw anytime." />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background: 'var(--bg)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 12, display: 'block' }}>Features</span>
              <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, letterSpacing: '-.5px', color: 'var(--text)' }}>Built to make errands effortless</h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <FeatCard {...f} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RUNNER CTA — Mutmiz-style banner ── */}
      <section id="for-runners" style={{ background: 'var(--bg)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <Reveal>
            <div style={{
              background: 'linear-gradient(135deg, #1e0a4a 0%, #2d1b6b 40%, #3b2a8a 70%, #1a56db 100%)',
              borderRadius: 24,
              padding: '0 60px 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              overflow: 'visible',
              position: 'relative',
              minHeight: 340,
              boxShadow: '0 20px 60px rgba(45,27,107,0.4)',
            }}>
              {/* Glow orbs inside banner */}
              <div style={{ position: 'absolute', top: -40, right: '30%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.3) 0%,transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: -20, right: '10%', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(22,163,74,0.2) 0%,transparent 70%)', pointerEvents: 'none' }} />

              {/* Image breaking out on the left */}
              <div style={{
                flexShrink: 0,
                width: 320,
                minHeight: 380,
                marginTop: -40,
                marginBottom: -40,
                borderRadius: 16,
                overflow: 'hidden',
                background: 'linear-gradient(160deg, rgba(99,102,241,0.2), rgba(16,163,74,0.15))',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                position: 'relative',
                zIndex: 2,
                flexShrink: 0,
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '0 16px' }}>Add runner image here</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', textAlign: 'center' }}>320 × 380px</p>
              </div>

              {/* Text content */}
              <div style={{ flex: 1, padding: '48px 0 48px 48px', position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#86EFAC', marginBottom: 14, display: 'block' }}>Errand runners</span>
                <h2 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 800, letterSpacing: -1, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
                  Turn your free time<br />into income
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: 400, marginBottom: 32 }}>
                  Set your own schedule, choose the jobs you want, negotiate your price. Palgo works around you — not the other way round.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <a href="#waitlist" style={{ background: 'var(--green)', color: '#fff', fontWeight: 700, fontSize: 15, padding: '13px 26px', borderRadius: 10, textDecoration: 'none', transition: 'background .2s, transform .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--green-dark)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = 'none'; }}>
                    Join as a Runner
                  </a>
                  <a href="#waitlist" style={{ color: '#fff', fontWeight: 600, fontSize: 15, padding: '13px 26px', borderRadius: 10, textDecoration: 'none', boxShadow: '0 0 0 1.5px rgba(255,255,255,.3)', transition: 'box-shadow .2s' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 0 1.5px rgba(255,255,255,.7)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 1.5px rgba(255,255,255,.3)'}>
                    Request an errand
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ background: 'var(--bg2)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 12, display: 'block' }}>FAQ</span>
              <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, letterSpacing: '-.5px', color: 'var(--text)' }}>Frequently asked questions</h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}><FaqItem question={f.q} answer={f.a} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" style={{ background: 'var(--bg)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', textAlign: 'center' }}>
          <Reveal><span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 12, display: 'block' }}>Early access</span></Reveal>
          <Reveal delay={100}><h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, letterSpacing: '-.5px', color: 'var(--text)', marginBottom: 16 }}>Be first when Palgo launches</h2></Reveal>
          <Reveal delay={150}><p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.7, marginBottom: 36, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>Drop your email and we'll reach out with early access the moment Palgo goes live in your area.</p></Reveal>
          <Reveal delay={200}>
            <div style={{ background: 'var(--card-bg)', borderRadius: 20, padding: 36, boxShadow: 'var(--shadow-md)', maxWidth: 560, margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input style={inputStyle} type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} onFocus={e => e.target.style.borderColor = 'var(--blue)'} onBlur={e => e.target.style.borderColor = 'transparent'} />
                <input style={inputStyle} type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} onFocus={e => e.target.style.borderColor = 'var(--blue)'} onBlur={e => e.target.style.borderColor = 'transparent'} />
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button onClick={() => handleJoin('requester')} style={{ flex: 1, minWidth: 140, padding: 14, borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: 'var(--blue)', color: '#fff', transition: 'background .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dark)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}>I need errands done</button>
                  <button onClick={() => handleJoin('runner')} style={{ flex: 1, minWidth: 140, padding: 14, borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: 'var(--green)', color: '#fff', transition: 'background .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--green-dark)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--green)'}>I want to run errands</button>
                </div>
                {submitted && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--green-light)', borderRadius: 10, padding: 16, color: 'var(--green-dark)', fontWeight: 600, fontSize: 15 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    You're on the list! We'll be in touch soon.
                  </div>
                )}
              </div>
            </div>
          </Reveal>
          <p style={{ color: 'var(--text3)', fontSize: 13, marginTop: 16 }}>No spam. No pressure. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: 'var(--bg2)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 12, display: 'block' }}>About Palgo</span>
              <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, letterSpacing: '-.5px', color: 'var(--text)', marginBottom: 16 }}>Built on a simple idea</h2>
              <p style={{ color: 'var(--text2)', fontSize: 17, lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>Everyone needs help sometimes. And a lot of people have time and hustle to offer. Palgo brings both sides together — simply, fairly, and on your terms.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
            {[
              { iconBg: 'var(--blue-light)', iconColor: 'var(--blue)', iconPath: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>, title: 'Community first', text: 'Palgo connects real people in the same community. No corporate middlemen — just humans helping humans.' },
              { iconBg: 'var(--green-light)', iconColor: 'var(--green)', iconPath: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>, title: 'Fair earnings', text: 'Runners set their own rates and negotiate every job. No hidden deductions — you keep what you earn.' },
              { iconBg: 'var(--blue-light)', iconColor: 'var(--blue)', iconPath: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, title: 'Built for trust', text: 'Every transaction requires dual confirmation. Payment only moves when both sides are satisfied.' },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}><FeatCard {...c} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: 'var(--bg)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 12, display: 'block' }}>Get in touch</span>
              <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, letterSpacing: '-.5px', color: 'var(--text)', marginBottom: 12 }}>We'd love to hear from you</h2>
              <p style={{ color: 'var(--text2)', fontSize: 16 }}>Have a question, partnership idea, or just want to say hi?</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
            {[
              { iconBg: 'var(--blue-light)', iconColor: 'var(--blue)', iconPath: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, title: 'Email us', sub: 'hello@palgo.app' },
              { iconBg: 'var(--green-light)', iconColor: 'var(--green)', iconPath: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>, title: 'Support', sub: 'support@palgo.app' },
              { iconBg: 'var(--blue-light)', iconColor: 'var(--blue)', iconPath: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, title: 'Location', sub: 'Lagos, Nigeria' },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div style={{ background: 'var(--card-bg)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: c.iconBg, color: c.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{c.iconPath}</svg>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>{c.title}</h3>
                    <p style={{ color: 'var(--text2)', fontSize: 14 }}>{c.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
