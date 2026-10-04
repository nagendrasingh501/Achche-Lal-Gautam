'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const eyesRef = useRef<HTMLSpanElement | null>(null);
  const pLRef = useRef<HTMLSpanElement | null>(null);
  const pRRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    function movePupils(clientX: number, clientY: number) {
      const eyes = eyesRef.current;
      const pL = pLRef.current;
      const pR = pRRef.current;
      if (!eyes || !pL || !pR) return;

      const r = eyes.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const angle = Math.atan2(-dy, dx) + Math.PI / 2;
      const dist = Math.hypot(dx, dy);
      const maxX = 180;
      const maxY = 75;
      const x = (Math.sin(angle) * Math.min(dist, maxX)) / maxX;
      const y = (Math.cos(angle) * Math.min(dist, maxY)) / maxY;
      const tx = `translate(calc(-50% + ${x * 50}%), calc(-50% + ${y * 50}%))`;
      pL.style.transform = tx;
      pR.style.transform = tx;
    }

    const handleMouseMove = (e: MouseEvent) => {
      movePupils(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        movePupils(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div>
        <div className="pill">⌖ District Unnao, Uttar Pradesh</div>
        <h1>
          <span className="ktl-wrap" aria-label="Justice">
            <span className="ktl-dot" />
            <span className="ktl-j">J</span>ust
            <span className="ktl-i">ı</span>ce
          </span>{' '}
          with <em>clarity.</em>
        </h1>
        <p className="lead">
          I am <strong>Achche Lal Gautam</strong>, a Former Zila Panchayat Member and District Court Lawyer in Unnao. I assist clients
          across criminal, land &amp; property, matrimonial, civil and related legal matters.
        </p>
        <div className="actions">
          <a
            className="creepy-btn"
            href="#consult"
            id="heroCreepyBtn"
            onMouseLeave={() => {
              if (pLRef.current) pLRef.current.style.transform = 'translate(-50%,-50%)';
              if (pRRef.current) pRRef.current.style.transform = 'translate(-50%,-50%)';
            }}
          >
            <span className="creepy-eyes" ref={eyesRef}>
              <span className="creepy-eye">
                <span className="creepy-pupil" ref={pLRef} />
              </span>
              <span className="creepy-eye">
                <span className="creepy-pupil" ref={pRRef} />
              </span>
            </span>
            <span className="creepy-cover">Request Consultation →</span>
            <span className="creepy-ghost">Request Consultation →</span>
          </a>
          <a className="btn outline" href="#services">
            Explore Practice Areas
          </a>
        </div>
        <div className="stats">
          <div>
            <span>Direct consultation</span>
          </div>
          <div>
            <span>Court representation</span>
          </div>
          <div>
            <span>Case-focused strategy</span>
          </div>
        </div>
      </div>
      <div className="portrait-card">
        <img
          className="portrait"
          src="/assets/advocate-profile-achche-lal.png"
          alt="Achche Lal Gautam, District Court Lawyer"
        />
        <div className="caption">
          <strong>Achche Lal Gautam</strong>
          <br />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
            Former Zila Panchayat Member<br />District Court • Unnao
          </span>
        </div>
      </div>
    </section>
  );
}
