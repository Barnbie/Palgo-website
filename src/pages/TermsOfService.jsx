import React from 'react';
import LegalLayout from '../components/LegalLayout';

const h2 = { fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: '40px 0 12px' };
const p = { color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, marginBottom: 16 };
const ul = { color: 'var(--text2)', fontSize: 15, lineHeight: 1.8, paddingLeft: 20, marginBottom: 16 };

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" updated="January 1, 2026">
      <h2 style={h2}>1. Acceptance of terms</h2>
      <p style={p}>By downloading or using Palgo, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
      <h2 style={h2}>2. Description of service</h2>
      <p style={p}>Palgo is a platform that connects people who need errands done (Requesters) with people willing to do them (Runners). Palgo facilitates this connection but is not a party to any agreement between Requesters and Runners.</p>
      <h2 style={h2}>3. User accounts</h2>
      <p style={p}>You must create an account to use Palgo. You are responsible for keeping your account credentials secure and for all activity that occurs under your account.</p>
      <h2 style={h2}>4. Pricing & payments</h2>
      <p style={p}>Requesters set their own price when posting an errand. Runners may accept or counter. A binding agreement is formed only when both parties confirm and the Requester selects a Runner.</p>
      <h2 style={h2}>5. Prohibited conduct</h2>
      <ul style={ul}>
        <li>Using the platform for illegal activities</li>
        <li>Submitting false or misleading errand requests</li>
        <li>Harassing or threatening other users</li>
        <li>Attempting to circumvent the platform to avoid service fees</li>
      </ul>
      <h2 style={h2}>6. Limitation of liability</h2>
      <p style={p}>Palgo is not responsible for the actions of any Requester or Runner. We do not guarantee the quality, safety, or legality of any errand. Use of the platform is at your own risk.</p>
      <h2 style={h2}>7. Contact</h2>
      <p style={p}>For questions about these Terms, contact legal@palgo.app.</p>
    </LegalLayout>
  );
}
