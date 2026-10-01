'use client';
import { useState } from 'react';

const GALLERY_ITEMS = [
  {
    category: 'chamber',
    src: '/assets/office-chamber-unnao.jpg',
    alt: 'Advocate Achche Lal Gautam Office Chamber & Consultation Center',
    badge: 'Office Chamber',
    title: 'Office Chamber & Consultation Center',
    hindiTitle: 'कार्यालय एवं परामर्श केंद्र • अधिवक्ता चैंबर',
    desc: 'Official chamber of Advocate Achche Lal Gautam & Advocate Rakesh Singh Chauhan with legal records, consultation desk, and registration service facilities in Unnao.',
    tags: ['Chamber Entrance', 'Official Signboard', 'Client Meeting Desk'],
  },
  {
    category: 'chamber',
    src: '/assets/advocate-office-desk.jpg',
    alt: 'Advocate Achche Lal Gautam at his office desk',
    badge: 'Chamber Consultation',
    title: 'Chamber Consultation Desk',
    hindiTitle: 'चैंबर परामर्श डेस्क',
    desc: 'Advocate Achche Lal Gautam ready for direct client consultations and document reviews at his Unnao office desk.',
    tags: ['Client Desk', 'Case Review', 'Legal Advice'],
  },
  {
    category: 'honor',
    src: '/assets/felicitation-justice-irshad-ali.png',
    alt: 'माननीय न्यायमूर्ति इरशाद अली जी खंडपीठ लखनऊ को सम्मानित करते हुए',
    badge: 'Judicial Honor',
    title: 'High Court Judicial Felicitation',
    hindiTitle: 'माननीय न्यायमूर्ति इरशाद अली जी खंडपीठ लखनऊ को सम्मानित करते हुए',
    desc: "Advocate Achche Lal Gautam presenting ceremonial memento and shawl honoring Hon'ble High Court Justice Irshad Ali (Lucknow Bench) at the Oath Ceremony.",
    tags: ['Lucknow Bench', "Hon'ble Justice Irshad Ali", 'Oath Ceremony'],
  },
  {
    category: 'chamber',
    src: '/assets/gram-panchayat-legal-consultation.jpg',
    alt: 'Gram Panchayat Legal Consultation and Public Advisory Session',
    badge: 'Office Consultation',
    title: 'Client Consultation & Legal Advisory',
    hindiTitle: 'विधिक परामर्श एवं मुवक्किल सलाह',
    desc: 'Direct client consultation, case discussion, and legal document verification in progress.',
    tags: ['Client Advisory', 'Case Discussion', 'Document Verification'],
  },
  {
    category: 'chamber',
    src: '/assets/advocate-achche-lal-gautam.jpg',
    alt: 'Advocate Achche Lal Gautam - District Court Lawyer Unnao',
    badge: 'Lead Advocate',
    title: 'Advocate Achche Lal Gautam (LL.B.)',
    hindiTitle: 'अधिवक्ता अच्छे लाल गौतम • जिला न्यायालय उन्नाव',
    desc: 'Lead counsel handling criminal trials, land consolidation (चकबंदी), revenue appeals, and matrimonial cases with personalized guidance.',
    tags: ['Lead Advocate', 'District Court Unnao', 'Legal Counsel'],
  },
];

export default function AboutSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const visible = activeFilter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === activeFilter);
  const lb = lightboxIdx !== null ? visible[lightboxIdx] : null;

  return (
    <section id="about">
      <div className="wrap">
        <div className="about-grid">
          <div>
            <div className="eyebrow" style={{ color: '#b96818' }}>About the office</div>
            <h2>A focused legal practice in Unnao.</h2>
            <div className="office-signboard-badge">
              <div className="motto-tag">⚖ &quot;Your Rights • Our Responsibility&quot;</div>
              <div className="advocate-names">
                <span><strong>Achche Lal Gautam</strong> (LL.B.)</span>
                <span className="sep">•</span>
                <span><strong>Rakesh Singh Chauhan</strong> (LL.B.)</span>
              </div>
              <p className="office-loc-line">
                📍 Office Chamber: Near SDM Judicial Court Collectorate, Kachari Parisar, Unnao, Uttar Pradesh 209801
              </p>
              <div className="office-quick-contacts">
                <a href="tel:+919839781903" className="contact-chip" aria-label="Call Advocate Achche Lal Gautam">📞 +91 9839781903</a>
                <a href="tel:+919792220999" className="contact-chip" aria-label="Call Advocate Rakesh Singh Chauhan">📞 +91 9792220999</a>
                <a href="https://wa.me/919839781903" target="_blank" rel="noopener" className="contact-chip whatsapp" aria-label="WhatsApp Advocate Achche Lal Gautam">💬 WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="lead">
            <p>
              I work with clients who need practical legal guidance and representation in District Court matters.
              Every case is different, so the first step is to understand the facts, documents, timeline and legal issue.
            </p>
            <div className="cards">
              <div className="card">
                <div className="icon">▣</div>
                <h3>Case preparation</h3>
                <p>Organising facts, documents and the questions that matter to the proceeding.</p>
              </div>
              <div className="card">
                <div className="icon">⚖</div>
                <h3>Court representation</h3>
                <p>Representation and procedural assistance for applicable District Court matters.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="office-gallery-container">
          <div className="office-gallery-head">
            <div>
              <div className="eyebrow" style={{ color: '#b96818' }}>Office &amp; Practice Glimpses</div>
              <h3 className="gallery-title">Real Glimpses of Chamber, Court &amp; Public Service</h3>
              <p className="gallery-subtitle">
                Authentic moments from our Unnao chamber, High Court judicial felicitation, and grassroots legal consultations.
              </p>
            </div>
            <div className="gallery-filter-tabs">
              {[
                { key: 'all', label: `All Photos (${GALLERY_ITEMS.length})` },
                { key: 'chamber', label: 'Office & Chamber' },
                { key: 'honor', label: 'Judicial Honor' },
                { key: 'camp', label: 'Public Consultations' },
              ].map((f) => (
                <button
                  key={f.key}
                  className={`filter-tab${activeFilter === f.key ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="office-gallery-grid">
            {visible.map((item, i) => (
              <div
                key={item.src}
                className="office-photo-card"
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title} details`}
                onClick={() => setLightboxIdx(i)}
                onKeyDown={(e) => e.key === 'Enter' && setLightboxIdx(i)}
              >
                <div className="photo-img-wrap">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <span className="photo-badge">{item.badge}</span>
                  <div className="photo-overlay">
                    <span className="zoom-icon">🔍 View Fullscreen</span>
                  </div>
                </div>
                <div className="photo-meta">
                  <h4>{item.title}</h4>
                  <div className="hindi-meta">{item.hindiTitle}</div>
                  <p>{item.desc}</p>
                  <div className="photo-tags">
                    {item.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lb && (
        <div className="office-lightbox open" onClick={() => setLightboxIdx(null)} id="galleryLightbox">
          <div className="lightbox-backdrop" />
          <div className="lightbox-shell" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxIdx(null)}>×</button>
            <div className="lightbox-body">
              <div className="lightbox-image-pane">
                <img src={lb.src} alt={lb.alt} />
              </div>
              <div className="lightbox-info-pane">
                <span className="lightbox-badge">{lb.badge}</span>
                <h3>{lb.title}</h3>
                <div className="lightbox-hindi">{lb.hindiTitle}</div>
                <p>{lb.desc}</p>
                <div className="lightbox-tags">
                  {lb.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <div className="lightbox-actions">
                  <button
                    className="lightbox-btn"
                    onClick={() => setLightboxIdx((i) => i !== null && i > 0 ? i - 1 : visible.length - 1)}
                  >← Prev</button>
                  <span className="lightbox-counter">{lightboxIdx! + 1} / {visible.length}</span>
                  <button
                    className="lightbox-btn"
                    onClick={() => setLightboxIdx((i) => i !== null ? (i + 1) % visible.length : 0)}
                  >Next →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
