'use client';

import { useState } from 'react';

const FLIP_CARDS = [
  {
    letter: 'C',
    icon: '📞',
    tooltip: 'Call',
    href: 'tel:+919839781903',
    bg: '#17130f',
  },
  {
    letter: 'O',
    icon: '💬',
    tooltip: 'WhatsApp',
    href: 'https://wa.me/919839781903',
    bg: '#25D366',
    target: '_blank',
  },
  {
    letter: 'N',
    icon: '✉️',
    tooltip: 'Email',
    href: 'mailto:achchelalgautam@gmail.com',
    bg: '#EA4335',
  },
  {
    letter: 'T',
    icon: 'f',
    tooltip: 'Facebook',
    href: 'https://facebook.com',
    bg: '#1877F2',
    target: '_blank',
  },
  {
    letter: 'A',
    icon: '📍',
    tooltip: 'Location',
    href: 'https://maps.google.com/?q=Kachari+Parisar+Unnao',
    bg: '#4285F4',
    target: '_blank',
  },
  {
    letter: 'C',
    icon: '📱',
    tooltip: 'Alternate Phone',
    href: 'tel:+919792220999',
    bg: '#17130f',
  },
  {
    letter: 'T',
    icon: '⚖',
    tooltip: 'Consult',
    href: '#consult',
    bg: '#c56e1e',
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <section className="contact-strip" id="contact">
        <div className="wrap">
          <div>
            <div style={{ font: '700 11px Arial', letterSpacing: 3, color: '#0008', marginBottom: 14 }}>
              GET IN TOUCH
            </div>
            
            {/* SocialFlipButton Container */}
            <div
              className="sfb-container"
              id="sfbContainer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered((prev) => !prev)}
              onClick={() => setIsHovered((prev) => !prev)}
            >
              <div className="sfb-line sfb-line-top" />
              <div className="sfb-line sfb-line-bot" />
              <div className={`sfb-wrap${isHovered ? ' sfb-hovered' : ''}`} id="sfbWrap">
                {FLIP_CARDS.map((card, index) => (
                  <a
                    key={index}
                    className="sfb-card"
                    href={card.href}
                    target={card.target}
                    rel={card.target ? 'noopener noreferrer' : undefined}
                  >
                    <div className="sfb-inner">
                      <div className="sfb-front">{card.letter}</div>
                      <div className="sfb-back" style={{ background: card.bg }}>
                        {card.icon}
                      </div>
                    </div>
                    <div className="sfb-tooltip">{card.tooltip}</div>
                  </a>
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: 35, letterSpacing: -1, margin: '18px 0 6px' }}>Achche Lal Gautam</h2>
            <div style={{ font: '14px Arial', color: '#0009' }}>
              Former Zila Panchayat Member • District Court Lawyer • Unnao
            </div>
          </div>
          <a className="btn" href="#consult">
            Request a consultation →
          </a>
        </div>
      </section>

      <footer>
        © {year} Achche Lal Gautam. Former Zila Panchayat Member &amp; District Court Lawyer, Unnao.
      </footer>
    </>
  );
}
