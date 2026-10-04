'use client';

import { useEffect } from 'react';

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

export default function PracticeAreasSection() {
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

  return (
    <section id="services" style={{ padding: 0, margin: 0, background: '#fbf9f4', height: '100vh', minHeight: 800 }}>
      <div id="three-books-container" style={{ width: '100%', height: '100%' }} />
    </section>
  );
}
