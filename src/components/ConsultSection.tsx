'use client';

import { useState, FormEvent, useRef } from 'react';

export default function ConsultSection() {
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  function saveConsultation(data: Record<string, string>) {
    data.createdAt = new Date().toISOString();
    const existing = JSON.parse(localStorage.getItem('achcheLalConsultations') || '[]');
    existing.push(data);
    localStorage.setItem('achcheLalConsultations', JSON.stringify(existing));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data: Record<string, string> = Object.fromEntries(new FormData(form) as any);
    saveConsultation(data);
    form.reset();
  }

  function getFormMessage() {
    const form = formRef.current;
    if (!form) return null;
    if (!form.reportValidity()) return null;
    const d = Object.fromEntries(new FormData(form) as any);
    saveConsultation(d);
    return `New Consultation Request\n\nName: ${d.name}\nPhone: ${d.phone}\nPractice Area: ${d.practiceArea}\n\nMessage:\n${d.message}`;
  }

  function sendToWhatsApp() {
    const text = getFormMessage();
    if (!text) return;
    const phone = '919839781903';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  }

  function sendToGmail() {
    const text = getFormMessage();
    if (!text) return;
    const form = formRef.current;
    if (!form) return;
    const d = Object.fromEntries(new FormData(form) as any);
    const email = 'achchelalgautam@gmail.com';
    const subject = 'Legal Consultation Request - ' + d.name;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`, '_blank');
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

        <form id="consultForm" ref={formRef} onSubmit={handleSubmit}>
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

          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <button className="btn gold" type="submit" style={{ background: '#17130f', color: 'white' }}>
              Save Consultation Request →
            </button>
            <button
              className="btn"
              type="button"
              onClick={sendToWhatsApp}
              style={{ background: '#25D366', color: 'white', border: 'none' }}
            >
              Send via WhatsApp
            </button>
            <button
              className="btn"
              type="button"
              onClick={sendToGmail}
              style={{ background: '#EA4335', color: 'white', border: 'none' }}
            >
              Send via Gmail
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
