'use client';
import { useState, FormEvent } from 'react';

export default function ConsultSection() {
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data: Record<string, string> = Object.fromEntries(new FormData(form) as any);
    data.createdAt = new Date().toISOString();
    const existing = JSON.parse(localStorage.getItem('achcheLalConsultations') || '[]');
    existing.push(data);
    localStorage.setItem('achcheLalConsultations', JSON.stringify(existing));
    setSuccess(true);
    form.reset();
    setTimeout(() => setSuccess(false), 5000);
  }

  return (
    <section id="consult">
      <div className="wrap contact-grid">
        <div>
          <div className="eyebrow" style={{ color: '#b96818' }}>Consultation</div>
          <h2>Tell us about your matter.</h2>
          <p className="lead">
            Submit a consultation request. Requests are saved in this browser and work without a server.
          </p>
          <div style={{ font: '14px/2 Arial', color: '#0009', marginTop: 28 }}>
            ◷ By appointment
            <br />
            ⌖{' '}
            <a
              href="https://maps.app.goo.gl/FH5DcM2fofRoXT566?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'underline' }}
            >
              Near SDM Judicial Court Collectorate, Kachari Parisar, Unnao, Uttar Pradesh 209801
            </a>
            <br />
            ☎{' '}
            <a href="tel:+919839781903" style={{ color: 'inherit', fontWeight: 'bold' }}>
              +91 9839781903
            </a>{' '}
            /{' '}
            <a href="tel:+919792220999" style={{ color: 'inherit', fontWeight: 'bold' }}>
              +91 9792220999
            </a>{' '}
            (Chamber Helpline)
          </div>
        </div>

        <form id="consultForm" onSubmit={handleSubmit}>
          {success && (
            <div className="success" style={{ display: 'block' }}>
              ✓ Consultation request saved on this device.
            </div>
          )}
          <div className="two">
            <label>
              Name
              <input required name="name" placeholder="Your name" />
            </label>
            <label>
              Phone
              <input required name="phone" placeholder="Phone number" />
            </label>
          </div>
          <label>
            Practice area
            <select name="practiceArea">
              <option>Criminal Law</option>
              <option>Land &amp; Property</option>
              <option>Marriage &amp; Family</option>
              <option>Civil Disputes</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Brief message
            <textarea required name="message" rows={5} placeholder="Briefly describe your matter" />
          </label>
          <button className="btn gold" type="submit">
            Save Consultation Request →
          </button>
        </form>
      </div>
    </section>
  );
}
