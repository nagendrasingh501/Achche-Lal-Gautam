export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <section className="contact-strip" id="contact">
        <div className="wrap">
          <div>
            <div style={{ font: '700 11px Arial', letterSpacing: 3, color: '#0008' }}>CONTACT</div>
            <h2 style={{ fontSize: 35, letterSpacing: -1, margin: '7px 0' }}>Achche Lal Gautam</h2>
            <div style={{ font: '14px Arial', color: '#0009' }}>District Court Lawyer • Unnao</div>
          </div>
          <a className="btn" href="#consult">Request a consultation →</a>
        </div>
      </section>
      <footer>© {year} Achche Lal Gautam. District Court Lawyer, Unnao.</footer>
    </>
  );
}
