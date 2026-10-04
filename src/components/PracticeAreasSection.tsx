'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ThreeBooks: any;
    THREE: any;
    __threeBooksRetranslate?: () => void;
  }
}

const PRACTICE_BOOKS = [
  {
    title: 'CRIMINAL LAW',
    color: '#1a1a1a',
    desc: 'Comprehensive defense and representation in all criminal proceedings. From police station advisement and bail applications to trial litigation and appeals. We ensure your rights are protected at every step of the criminal justice system with rigorous evidence analysis and strategic courtroom advocacy.',
    chapters: ['Bail Applications', 'Trial Proceedings', 'Cross-Examination', 'Appeals & Revisions', 'FIR Quashing', 'White Collar Crimes'],
  },
  {
    title: 'LAND & PROPERTY',
    color: '#1a2a3a',
    desc: 'Expert legal counsel for complex property disputes, real estate transactions, and land rights. We handle title verification, boundary disputes, partition suits, and illegal possession cases. Secure your assets with thorough documentation and aggressive civil representation.',
    chapters: ['Title Disputes', 'Partition Suits', 'Illegal Possession', 'Lease & Tenancy', 'Registration & Deeds', 'Succession & Mutation'],
  },
  {
    title: 'MARRIAGE & FAMILY',
    color: '#3d1622',
    desc: 'Sensitive and confidential legal support for matrimonial disputes and family matters. We provide mediation and litigation services for contested divorces, mutual separation, child custody, alimony claims, and domestic violence protections, prioritizing your peace of mind.',
    chapters: ['Contested Divorce', 'Mutual Consent', 'Child Custody', 'Alimony & Maintenance', 'Domestic Violence', 'Restitution of Rights'],
  },
  {
    title: 'CIVIL DISPUTES',
    color: '#163521',
    desc: 'Strategic consultation and representation for a wide array of civil litigation. We draft robust legal notices, handle breach of contract claims, injunctions, and consumer protection cases. Dedicated to resolving disputes efficiently through negotiation or district court proceedings.',
    chapters: ['Breach of Contract', 'Injunctions', 'Consumer Cases', 'Legal Notices', 'Recovery Suits', 'Arbitration'],
  },
];

const READER_DATA: Record<string, { intro: string; services: string[]; details: string }> = {
  'CRIMINAL LAW': {
    intro: 'Legal assistance for criminal matters, including preparation, procedural guidance and representation in District Court proceedings.',
    services: ['Case preparation and document review', 'Court representation and procedural guidance', 'Bail and related criminal applications', 'Understanding notices, complaints and next legal steps'],
    details: 'Criminal matters can involve urgent deadlines and important procedural decisions. A consultation can help organize the facts, documents and immediate legal issues before action is taken.',
  },
  'LAND & PROPERTY': {
    intro: 'Legal support for land and property matters, possession issues, documentation and related civil disputes.',
    services: ['Land and property document review', 'Possession and boundary-related disputes', 'Property notices and civil proceedings', 'Guidance on available legal remedies and documentation'],
    details: 'Property disputes often depend on documents, possession history and the nature of the claim. The consultation focuses on understanding the available records and the dispute before deciding the appropriate legal route.',
  },
  'MARRIAGE & FAMILY': {
    intro: 'Confidential legal assistance for matrimonial and family-law matters, with practical guidance based on the facts of the matter.',
    services: ['Matrimonial and family-law consultations', 'Divorce and related proceedings guidance', 'Maintenance and family disputes', 'Representation and procedural guidance'],
    details: 'Family matters can involve sensitive personal circumstances. The consultation provides a structured way to explain the situation, identify relevant documents and discuss the legal process that may apply.',
  },
  'CIVIL DISPUTES': {
    intro: 'Consultation and representation for civil disputes, notices, pleadings and court proceedings.',
    services: ['Civil case consultation and preparation', 'Legal notice and reply guidance', 'Pleadings and document review', 'Court proceedings and procedural assistance'],
    details: 'Civil disputes may require careful review of agreements, notices, records and the chronology of events. The first consultation helps establish the facts and identify the documents relevant to the matter.',
  },
};

export default function PracticeAreasSection() {
  const [readerOpen, setReaderOpen] = useState(false);
  const [activeBookTitle, setActiveBookTitle] = useState<string>('CRIMINAL LAW');
  const [readerStep, setReaderStep] = useState<number>(0);
  const [coverOpened, setCoverOpened] = useState<boolean>(false);

  useEffect(() => {
    let instance: any = null;

    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(s);
      });
    };

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'),
      loadScript('/assets/three-books-v3.js'),
    ])
      .then(() => {
        if (window.ThreeBooks && document.getElementById('three-books-container')) {
          instance = new window.ThreeBooks('three-books-container', PRACTICE_BOOKS);
        }
      })
      .catch((err) => console.warn('ThreeBooks script load warning:', err));

    return () => {
      // cleanup if needed
    };
  }, []);

  const openReader = (bookTitle: string) => {
    setActiveBookTitle(bookTitle);
    setReaderStep(0);
    setCoverOpened(false);
    setReaderOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeReader = () => {
    setReaderOpen(false);
    setCoverOpened(false);
    document.body.style.overflow = '';
  };

  const goNext = () => {
    if (readerStep < 2) {
      setReaderStep((prev) => prev + 1);
      setCoverOpened(true);
    }
  };

  const goPrev = () => {
    if (readerStep > 0) {
      const nextStep = readerStep - 1;
      setReaderStep(nextStep);
      if (nextStep === 0) setCoverOpened(false);
    }
  };

  const currentData = READER_DATA[activeBookTitle] || READER_DATA['CIVIL DISPUTES'];

  return (
    <>
      <section id="services" style={{ padding: 0, margin: 0, background: '#fbf9f4', height: '100vh', minHeight: 800 }}>
        <div id="three-books-container" style={{ width: '100%', height: '100%' }} />
      </section>

      {/* Reader Modal */}
      <div className={`practice-reader${readerOpen ? ' open' : ''}`} id="practiceReader" aria-hidden={!readerOpen}>
        <div className="reader-shell">
          <button className="reader-close" id="readerClose" aria-label="Close" onClick={closeReader}>
            ×
          </button>
          <div className="reader-book" id="readerBook">
            <div className={`reader-cover${coverOpened ? ' opened' : ''}`} id="readerCover" onClick={goNext}>
              <div className="reader-cover-inner">
                <div className="cover-mark">⚖</div>
                <div className="reader-kicker">District Court • Unnao</div>
                <h2 id="readerCoverTitle">{activeBookTitle}</h2>
                <p>Interactive Practice Guide</p>
                <p style={{ marginTop: 24, fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Click the cover to open</p>
              </div>
            </div>
            <article className="reader-page">
              <div className="page-label">Practice Area</div>
              <h3 id="readerTitle">{activeBookTitle}</h3>
              <p id="readerIntro">{currentData.intro}</p>
              <h4>Services &amp; Assistance</h4>
              <ul id="readerServices">
                {currentData.services.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <div className="page-number">01</div>
            </article>
            <article className="reader-page">
              <div className="page-label">Legal Support</div>
              <h3 id="readerTitle2">What this covers</h3>
              <p id="readerDetails">{currentData.details}</p>
              <h4>How the consultation begins</h4>
              <p>Share the basic facts and available documents. The matter can then be reviewed so that the next practical legal steps can be discussed.</p>
              <h4>Confidential consultation</h4>
              <p>Case information is handled as consultation material and should be shared through the appropriate contact channel.</p>
              <div className="page-number">02</div>
            </article>
          </div>
          <div className="reader-actions">
            <button id="readerPrev" onClick={goPrev}>
              ← Previous
            </button>
            <span className="reader-counter" id="readerCounter">
              {readerStep === 0 ? 'Cover' : `Page ${readerStep} of 2`}
            </span>
            <button id="readerNext" onClick={goNext}>
              Next →
            </button>
            <button
              id="readerConsult"
              onClick={() => {
                closeReader();
                document.getElementById('consult')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
