'use client';

import { useEffect, useRef, useState } from 'react';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Practice Areas' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [spotlightVisible, setSpotlightVisible] = useState(false);
  const [spotlightX, setSpotlightX] = useState(0);
  const [ambienceX, setAmbienceX] = useState(0);

  const navRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    function updateAmbience(idx: number) {
      const navEl = navRef.current;
      const linkEl = linksRef.current[idx];
      if (!navEl || !linkEl) return;
      const nr = navEl.getBoundingClientRect();
      const lr = linkEl.getBoundingClientRect();
      const centerX = lr.left - nr.left + lr.width / 2;
      setAmbienceX(centerX);
    }

    updateAmbience(activeIdx);

    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      let current = 0;
      NAV_ITEMS.forEach((item, i) => {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollY) {
          current = i;
        }
      });
      if (current !== activeIdx) {
        setActiveIdx(current);
        updateAmbience(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => updateAmbience(activeIdx));
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeIdx]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const navEl = navRef.current;
    if (!navEl) return;
    const rect = navEl.getBoundingClientRect();
    setSpotlightX(e.clientX - rect.left);
    setSpotlightVisible(true);
  };

  const handleMouseLeave = () => {
    setSpotlightVisible(false);
  };

  return (
    <header>
      <div className="wrap nav">
        <a className="brand" href="#home">
          <span className="logo">⚖</span>
          <span>
            <b>Achche Lal Gautam</b>
            <small>District Court Lawyer</small>
          </span>
        </a>

        <div
          className="snav-pill"
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          role="navigation"
          aria-label="Main navigation"
          style={
            {
              '--spotlight-x': `${spotlightX}px`,
              '--ambience-x': `${ambienceX}px`,
            } as React.CSSProperties
          }
        >
          <ul className="snav-list">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  ref={(el) => { linksRef.current[idx] = el; }}
                  className={`snav-link${activeIdx === idx ? ' snav-active' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={`snav-spotlight${spotlightVisible ? ' snav-visible' : ''}`} />
          <div className="snav-ambience" />
        </div>

        <a className="btn" href="#consult">Book Consultation</a>
      </div>
    </header>
  );
}
