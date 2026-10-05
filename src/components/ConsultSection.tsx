'use client';

import { useState, useRef, useEffect } from 'react';

type ConsultationRequest = {
  id: string;
  name: string;
  phone: string;
  practiceArea: string;
  message: string;
  createdAt: string;
};

const CONSULTATIONS_KEY = 'achcheLalConsultations';

export default function ConsultSection() {
  const [success, setSuccess] = useState('');
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [storageError, setStorageError] = useState('');
  const [requestsLoaded, setRequestsLoaded] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONSULTATIONS_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error('Stored consultation data is not a list.');
      const loaded = parsed.map((value, index): ConsultationRequest => {
        if (!value || typeof value !== 'object') throw new Error('Stored consultation data contains an invalid request.');
        const request = value as Record<string, unknown>;
        if (typeof request.name !== 'string' || typeof request.phone !== 'string' ||
            typeof request.practiceArea !== 'string' || typeof request.message !== 'string') {
          throw new Error('Stored consultation data contains an incomplete request.');
        }
        return {
          id: typeof request.id === 'string' ? request.id : `${request.createdAt || 'legacy'}-${index}`,
          name: request.name,
          phone: request.phone,
          practiceArea: request.practiceArea,
          message: request.message,
          createdAt: typeof request.createdAt === 'string' ? request.createdAt : new Date(0).toISOString(),
        };
      });
      setRequests(loaded);
    } catch (error) {
      console.error('Unable to load consultation requests.', error);
      setStorageError('Unable to load saved requests from this browser.');
    } finally {
      setRequestsLoaded(true);
    }
  }, []);

  function persistRequests(next: ConsultationRequest[]) {
    try {
      localStorage.setItem(CONSULTATIONS_KEY, JSON.stringify(next));
      setRequests(next);
      setStorageError('');
      return true;
    } catch (error) {
      console.error('Unable to update consultation requests.', error);
      setStorageError('Unable to update requests in this browser. Please check browser storage settings.');
      return false;
    }
  }

  function saveConsultation(data: Omit<ConsultationRequest, 'id' | 'createdAt'>) {
    if (!requestsLoaded || storageError) {
      setStorageError(storageError || 'Saved requests are still loading. Please try again.');
      return false;
    }
    const request: ConsultationRequest = {
      ...data,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      createdAt: new Date().toISOString(),
    };
    if (!persistRequests([request, ...requests])) return false;
    setSuccess('✓ Consultation request saved on this device.');
    setTimeout(() => setSuccess(''), 5000);
    return true;
  }

  function deleteConsultation(id: string) {
    const request = requests.find((item) => item.id === id);
    if (!request || !window.confirm(`Delete the consultation request from ${request.name}?`)) return;
    persistRequests(requests.filter((item) => item.id !== id));
  }

  function getFormMessage() {
    const form = formRef.current;
    if (!form) return null;
    if (!form.reportValidity()) return null;
    const formData = new FormData(form);
    const d = {
      name: String(formData.get('name') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      practiceArea: String(formData.get('practiceArea') ?? ''),
      message: String(formData.get('message') ?? ''),
    };
    if (!saveConsultation(d)) return null;
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
    const d = Object.fromEntries(new FormData(form));
    const name = String(d.name ?? '');
    const email = 'achchelalgautam@gmail.com';
    const subject = 'Legal Consultation Request - ' + name;
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

        <form id="consultForm" ref={formRef} onSubmit={(event) => event.preventDefault()}>
          {success && (
            <div className="success" style={{ display: 'block' }}>
              {success}
            </div>
          )}
          {storageError && <div className="success" role="alert" style={{ display: 'block', color: '#8a1c1c' }}>{storageError}</div>}
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
        <div style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ fontSize: 24, marginBottom: 16 }}>Saved consultation requests</h3>
          {!requestsLoaded ? (
            <p style={{ font: '14px/1.6 Arial', color: '#0009' }}>Loading saved requests…</p>
          ) : requests.length === 0 ? (
            <p style={{ font: '14px/1.6 Arial', color: '#0009' }}>No requests saved in this browser.</p>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {requests.map((request) => (
                <article key={request.id} style={{ padding: 20, border: '1px solid #0002', borderRadius: 18, background: '#fff9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 16, flexWrap: 'wrap' }}>
                    <div>
                      <strong>{request.name}</strong>
                      <div style={{ font: '13px/1.6 Arial', color: '#0009' }}>
                        {request.phone} · {request.practiceArea} · {new Date(request.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => deleteConsultation(request.id)}
                      aria-label={`Delete consultation request from ${request.name}`}
                    >
                      Delete
                    </button>
                  </div>
                  <p style={{ font: '14px/1.6 Arial', margin: '12px 0 0', whiteSpace: 'pre-wrap' }}>{request.message}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
