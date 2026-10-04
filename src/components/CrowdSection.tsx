'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    CrowdCanvas: any;
    gsap: any;
  }
}

export default function CrowdSection() {
  useEffect(() => {
    let crowdInstance: any = null;

    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load script ${src}`));
        document.body.appendChild(s);
      });
    };

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'),
      loadScript('/assets/crowd-canvas.js?v=2'),
    ])
      .then(() => {
        if (window.CrowdCanvas && document.getElementById('crowd-container')) {
          crowdInstance = new window.CrowdCanvas('crowd-container', {
            src: '/assets/all-peeps.png',
            rows: 15,
            cols: 7,
          });
        }
      })
      .catch((err) => console.warn('CrowdSection script load warning:', err));

    return () => {
      if (crowdInstance && typeof crowdInstance.destroy === 'function') {
        crowdInstance.destroy();
      }
    };
  }, []);

  return (
    <section id="crowd-section" style={{ position: 'relative', width: '100%', height: 400, background: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: '#000', zIndex: 10, fontFamily: 'sans-serif' }}>
        <span style={{ position: 'relative', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.4 }}>
          Client Community
        </span>
      </div>
      <div id="crowd-container" style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }} />
    </section>
  );
}
