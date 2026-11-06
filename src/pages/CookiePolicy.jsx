import React from 'react';
import LegalLayout from '../components/LegalLayout';

const h2 = { fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: '40px 0 12px' };
const p = { color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, marginBottom: 16 };
const ul = { color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, paddingLeft: 20, marginBottom: 16 };

export default function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" updated="January 1, 2026">
      <h2 style={h2}>1. What are cookies?</h2>
      <p style={p}>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how you interact with them.</p>
      <h2 style={h2}>2. How Palgo uses cookies</h2>
      <p style={p}>We use cookies to keep you logged in, remember your preferences (such as dark mode), understand platform usage, and improve our services.</p>
      <h2 style={h2}>3. Types of cookies we use</h2>
      <ul style={ul}>
        <li><strong>Essential cookies:</strong> Required for the platform to function. Cannot be disabled.</li>
        <li><strong>Preference cookies:</strong> Remember your settings, such as theme or language.</li>
        <li><strong>Analytics cookies:</strong> Help us understand how users interact with Palgo.</li>
      </ul>
      <h2 style={h2}>4. Managing cookies</h2>
      <p style={p}>You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of the Palgo platform.</p>
      <h2 style={h2}>5. Contact</h2>
      <p style={p}>For questions about our use of cookies, email privacy@palgo.app.</p>
    </LegalLayout>
  );
}
