'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { BookCfg } from './BooksShowcase';

const BooksShowcase = dynamic(() => import('./BooksShowcase').then((m) => m.BooksShowcase), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 580,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontFamily: 'Arial',
        fontSize: 14,
        background: 'radial-gradient(circle at 50% 45%,#39291c,#17130f 58%)',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      Loading 3D viewer…
    </div>
  ),
});

// Procedural cover painters for each legal practice area
function paintCriminal(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Deep crimson gradient background
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#6b1a1a');
  bg.addColorStop(1, '#2d0808');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle grid pattern
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i < w; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
  for (let j = 0; j < h; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke(); }

  // Gold border
  ctx.strokeStyle = 'rgba(217,130,43,0.7)';
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 48, w - 96, h - 96);

  // Balance scale icon (simple)
  ctx.fillStyle = 'rgba(217,130,43,0.9)';
  ctx.font = '120px serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚖', w / 2, h * 0.32);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 88px Georgia';
  ctx.fillText('CRIMINAL', w / 2, h * 0.52);
  ctx.font = '700 80px Georgia';
  ctx.fillText('LAW', w / 2, h * 0.62);

  // Subtitle
  ctx.globalAlpha = 0.75;
  ctx.font = 'italic 40px Georgia';
  ctx.fillText('District Court • Unnao', w / 2, h * 0.73);
  ctx.globalAlpha = 1;

  // Thin gold line
  ctx.fillStyle = 'rgba(217,130,43,0.6)';
  ctx.fillRect(w / 2 - 120, h * 0.79, 240, 3);

  // Footer
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '700 28px Arial';
  ctx.letterSpacing = '4px';
  ctx.fillText('LEGAL PRACTICE', w / 2, h * 0.87);
}

function paintProperty(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#0f3828');
  bg.addColorStop(1, '#071e14');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i < w; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
  for (let j = 0; j < h; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke(); }

  ctx.strokeStyle = 'rgba(217,130,43,0.7)';
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 48, w - 96, h - 96);

  ctx.fillStyle = 'rgba(217,130,43,0.9)';
  ctx.font = '120px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏛', w / 2, h * 0.32);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 80px Georgia';
  ctx.fillText('LAND &', w / 2, h * 0.52);
  ctx.fillText('PROPERTY', w / 2, h * 0.62);

  ctx.globalAlpha = 0.75;
  ctx.font = 'italic 40px Georgia';
  ctx.fillText('Civil Matters • Unnao', w / 2, h * 0.73);
  ctx.globalAlpha = 1;

  ctx.fillStyle = 'rgba(217,130,43,0.6)';
  ctx.fillRect(w / 2 - 120, h * 0.79, 240, 3);

  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '700 28px Arial';
  ctx.fillText('LEGAL PRACTICE', w / 2, h * 0.87);
}

function paintFamily(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#3d1640');
  bg.addColorStop(1, '#1a0820');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i < w; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
  for (let j = 0; j < h; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke(); }

  ctx.strokeStyle = 'rgba(217,130,43,0.7)';
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 48, w - 96, h - 96);

  ctx.fillStyle = 'rgba(217,130,43,0.9)';
  ctx.font = '120px serif';
  ctx.textAlign = 'center';
  ctx.fillText('👨‍👩‍👧', w / 2, h * 0.32);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 80px Georgia';
  ctx.fillText('MARRIAGE', w / 2, h * 0.52);
  ctx.fillText('& FAMILY', w / 2, h * 0.62);

  ctx.globalAlpha = 0.75;
  ctx.font = 'italic 40px Georgia';
  ctx.fillText('Confidential Legal Support', w / 2, h * 0.73);
  ctx.globalAlpha = 1;

  ctx.fillStyle = 'rgba(217,130,43,0.6)';
  ctx.fillRect(w / 2 - 120, h * 0.79, 240, 3);

  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '700 28px Arial';
  ctx.fillText('LEGAL PRACTICE', w / 2, h * 0.87);
}

function paintCivil(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#122040');
  bg.addColorStop(1, '#060e20');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i < w; i += 60) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
  for (let j = 0; j < h; j += 60) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke(); }

  ctx.strokeStyle = 'rgba(217,130,43,0.7)';
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 48, w - 96, h - 96);

  ctx.fillStyle = 'rgba(217,130,43,0.9)';
  ctx.font = '120px serif';
  ctx.textAlign = 'center';
  ctx.fillText('📜', w / 2, h * 0.32);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 88px Georgia';
  ctx.fillText('CIVIL', w / 2, h * 0.52);
  ctx.font = '700 80px Georgia';
  ctx.fillText('DISPUTES', w / 2, h * 0.62);

  ctx.globalAlpha = 0.75;
  ctx.font = 'italic 40px Georgia';
  ctx.fillText('Representation • Unnao', w / 2, h * 0.73);
  ctx.globalAlpha = 1;

  ctx.fillStyle = 'rgba(217,130,43,0.6)';
  ctx.fillRect(w / 2 - 120, h * 0.79, 240, 3);

  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '700 28px Arial';
  ctx.fillText('LEGAL PRACTICE', w / 2, h * 0.87);
}

const PRACTICE_BOOKS: BookCfg[] = [
  {
    id: 'criminal',
    title: 'Criminal Law',
    author: 'Achche Lal Gautam',
    year: 'District Court · Unnao',
    stars: 5,
    desc: 'Representation and legal assistance in criminal matters, including case preparation, court appearances and procedural guidance.',
    front: paintCriminal,
    spineBg: '#57140f',
    backBg: '#57140f',
    spineInk: '#e4a15b',
    chapters: ['Overview', 'Case Preparation', 'Bail Applications', 'Trial Representation', 'Appeals', 'Final Arguments'],
  },
  {
    id: 'property',
    title: 'Land & Property',
    author: 'Achche Lal Gautam',
    year: 'Civil Matters · Unnao',
    stars: 5,
    desc: 'Legal support for land, property, possession, documentation and related civil disputes including chakbandi matters.',
    front: paintProperty,
    spineBg: '#17362e',
    backBg: '#17362e',
    spineInk: '#e4a15b',
    chapters: ['Overview', 'Title Disputes', 'Possession Matters', 'Chakbandi Appeals', 'Revenue Court', 'Documentation'],
  },
  {
    id: 'family',
    title: 'Marriage & Family',
    author: 'Achche Lal Gautam',
    year: 'Confidential Legal Support',
    stars: 5,
    desc: 'Assistance in matrimonial and family-law matters, with confidential consultation and representation in District Court.',
    front: paintFamily,
    spineBg: '#422637',
    backBg: '#422637',
    spineInk: '#e4a15b',
    chapters: ['Overview', 'Matrimonial Disputes', 'Divorce Proceedings', 'Maintenance', 'Child Custody', 'Settlement'],
  },
  {
    id: 'civil',
    title: 'Civil Disputes',
    author: 'Achche Lal Gautam',
    year: 'Representation · Unnao',
    stars: 5,
    desc: 'Consultation and representation for civil disputes, notices, pleadings and court proceedings at District Court level.',
    front: paintCivil,
    spineBg: '#1e2b48',
    backBg: '#1e2b48',
    spineInk: '#e4a15b',
    chapters: ['Overview', 'Civil Suits', 'Injunctions', 'Notices & Plaints', 'Court Proceedings', 'Appeals'],
  },
];

export default function PracticeAreasSection() {
  const [selected, setSelected] = useState<BookCfg | null>(null);

  return (
    <section id="services" className="dark">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Practice Areas</div>
            <h2>
              Legal matters,
              <br />
              presented clearly.
            </h2>
          </div>
          <p className="muted">
            Click any practice area book to explore it in 3D. Drag to rotate, click to open.
          </p>
        </div>

        <div
          style={{
            height: 580,
            borderRadius: 24,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'radial-gradient(circle at 50% 45%,#39291c,#17130f 58%)',
          }}
        >
          <BooksShowcase
            books={PRACTICE_BOOKS}
            heroTitle="Practice Areas"
            showNav={false}
            showDetailPanel={true}
            showCarousel={false}
            onBookSelect={setSelected}
            className="w-full h-full"
            themeColors={{
              navy: '#17130f',
              cream: '#f5f0e6',
              lav: '#e4a15b',
              peri: '#d9822b',
              bgDark: '#17130f',
            }}
          />
        </div>

        <div
          className="book-detail"
          style={{
            minHeight: 20,
            marginTop: 17,
            textAlign: 'center',
            font: '14px Arial',
            color: 'rgba(255,255,255,0.5)',
            transition: 'all 0.4s ease',
          }}
        >
          {selected ? (
            <>
              <strong style={{ color: '#e4a15b' }}>{selected.title}</strong> — {selected.desc}
            </>
          ) : (
            'Click a practice area book to view details.'
          )}
        </div>
      </div>
    </section>
  );
}
